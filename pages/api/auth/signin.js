import { db } from "../../../lib/db";
import { member } from "../../../lib/db/schema";
import { verifyPassword, createToken, setAuthCookie } from "../../../lib/auth-helpers";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const [user] = await db
    .select()
    .from(member)
    .where(eq(member.email, email.toLowerCase().trim()));

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
}
