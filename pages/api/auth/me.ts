import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { member as memberTable } from "../../../lib/db/schema";
import { getUserFromRequest } from "../../../lib/auth-helpers";
import { eq } from "drizzle-orm";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
}
