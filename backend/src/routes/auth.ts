import { Router } from "express";
import { db } from "../db";
import { member as memberTable } from "../db/schema";
import {
  hashPassword,
  verifyPassword,
  createToken,
  setAuthCookie,
  clearAuthCookie,
  getUserFromRequest,
} from "../auth-helpers";
import { eq } from "drizzle-orm";

const router = Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const [existing] = await db
    .select({ id: memberTable.id })
    .from(memberTable)
    .where(eq(memberTable.email, email.toLowerCase().trim()));

  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const password_hash = await hashPassword(password);

  const [user] = await db
    .insert(memberTable)
    .values({
      email: email.toLowerCase().trim(),
      password_hash,
      name: name || "",
      role: "free",
      is_paid: false,
    })
    .returning();

  const token = createToken(user);
  setAuthCookie(res, token);

  return res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// POST /api/auth/signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const [user] = await db
    .select()
    .from(memberTable)
    .where(eq(memberTable.email, email.toLowerCase().trim()));

  if (!user || !user.password_hash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = createToken(user);
  setAuthCookie(res, token);

  return res.status(200).json({
    user: { id: user.id, email: user.email, name: user.name },
  });
});

// POST /api/auth/signout
router.post("/signout", async (req, res) => {
  clearAuthCookie(res);
  return res.status(200).json({ ok: true });
});

// GET /api/auth/me
router.get("/me", async (req, res) => {
  const payload = getUserFromRequest(req);
  if (!payload) {
    return res.status(200).json({ user: null, member: null });
  }

  const [member] = await db
    .select()
    .from(memberTable)
    .where(eq(memberTable.id, payload.id));

  if (!member) {
    return res.status(200).json({ user: null, member: null });
  }

  return res.status(200).json({
    user: { id: member.id, email: member.email },
    member: {
      id: member.id,
      email: member.email,
      name: member.name,
      role: member.role,
      is_paid: member.is_paid,
      stripe_customer_id: member.stripe_customer_id,
      paid_at: member.paid_at,
    },
  });
});

// GET /api/auth/google
router.get("/google", async (req, res) => {
  const next = (req.query.next as string) || "/";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${appUrl}/api/auth/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    state: next,
    prompt: "select_account",
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

// GET /api/auth/callback
router.get("/callback", async (req, res) => {
  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;
  const redirectTo = state || "/";

  if (!code) {
    return res.redirect(redirectTo);
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${appUrl}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("Google token exchange failed:", await tokenRes.text());
      return res.redirect(redirectTo);
    }

    const tokens = await tokenRes.json();

    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } }
    );

    if (!userInfoRes.ok) {
      console.error("Google userinfo failed:", await userInfoRes.text());
      return res.redirect(redirectTo);
    }

    const profile = await userInfoRes.json();

    let [member] = await db
      .select()
      .from(memberTable)
      .where(eq(memberTable.google_id, profile.id));

    if (!member) {
      [member] = await db
        .select()
        .from(memberTable)
        .where(eq(memberTable.email, profile.email));

      if (member) {
        await db
          .update(memberTable)
          .set({ google_id: profile.id })
          .where(eq(memberTable.id, member.id));
      } else {
        [member] = await db
          .insert(memberTable)
          .values({
            email: profile.email,
            name: profile.name || "",
            google_id: profile.id,
            role: "free",
            is_paid: false,
          })
          .returning();
      }
    }

    const token = createToken(member);
    setAuthCookie(res, token);
  } catch (err) {
    console.error("OAuth callback error:", err);
  }

  res.redirect(redirectTo);
});

export default router;
