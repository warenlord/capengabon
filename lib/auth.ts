import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "capen_admin_session";
const SESSION_VALUE = "ok";

function getSecret(): string {
  return process.env.SESSION_SECRET || "capen-dev-secret-change-me";
}

function sign(value: string): string {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function buildSessionCookieValue(): string {
  return `${SESSION_VALUE}.${sign(SESSION_VALUE)}`;
}

function isValidSessionValue(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  const [value, signature] = cookieValue.split(".");
  if (!value || !signature) return false;
  return sign(value) === signature;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const cookie = store.get(COOKIE_NAME)?.value;
  return isValidSessionValue(cookie);
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
