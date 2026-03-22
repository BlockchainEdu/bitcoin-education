import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { member as memberTable } from "../../../lib/db/schema";
import { createToken, setAuthCookie } from "../../../lib/auth-helpers";
import { eq } from "drizzle-orm";

// Handles Google OAuth callback
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;
  const redirectTo = state || "/";

  if (!code) {
    return res.redirect(redirectTo);
  }

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL;

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${appUrl}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("Google token exchange failed:", await tokenRes.text());
      return res.redirect(redirectTo);
    }

    const tokens = await tokenRes.json();

    // Get user info from Google
    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } }
    );

    if (!userInfoRes.ok) {
      console.error("Google userinfo failed:", await userInfoRes.text());
      return res.redirect(redirectTo);
    }

    const profile = await userInfoRes.json();

    // Find or create member
    let [member] = await db
      .select()
      .from(memberTable)
      .where(eq(memberTable.google_id, profile.id));

    if (!member) {
      // Check if email already exists (e.g., signed up with password first)
      [member] = await db
        .select()
        .from(memberTable)
        .where(eq(memberTable.email, profile.email));

      if (member) {
        // Link Google ID to existing account
        await db
          .update(memberTable)
          .set({ google_id: profile.id })
          .where(eq(memberTable.id, member.id));
      } else {
        // Create new member
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
}
