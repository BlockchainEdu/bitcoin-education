import { db } from "../../../lib/db";
import { member } from "../../../lib/db/schema";
import { hashPassword, createToken, setAuthCookie } from "../../../lib/auth-helpers";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  // Check if user already exists
  const [existing] = await db
    .select({ id: member.id })
    .from(member)
    .where(eq(member.email, email.toLowerCase().trim()));

  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const password_hash = await hashPassword(password);

  const [user] = await db
    .insert(member)
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
}
