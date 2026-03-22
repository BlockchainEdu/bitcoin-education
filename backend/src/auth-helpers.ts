import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize, parse } from "cookie";
import type { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET!;
const COOKIE_NAME = "ben_token";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface AuthPayload {
  id: string;
  email: string;
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(user: { id: string; email: string }): string {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: MAX_AGE,
  });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(res: Response, token: string): void {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    })
  );
}

export function clearAuthCookie(res: Response): void {
  res.setHeader(
    "Set-Cookie",
    serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    })
  );
}

export function getUserFromRequest(req: Request): AuthPayload | null {
  const cookies = parse(req.headers.cookie || "");
  let token = cookies[COOKIE_NAME];

  if (!token) {
    token = req.headers.authorization?.replace("Bearer ", "") || "";
  }

  if (!token) return null;
  return verifyToken(token);
}
