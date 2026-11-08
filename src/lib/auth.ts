import {
  createHash,
  randomBytes,
  randomUUID,
  scrypt as nodeScrypt,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import { and, count, eq, gt, lt } from "drizzle-orm";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import {
  authAttempts,
  authSessions,
  users,
} from "@/lib/schema";

const scrypt = promisify(nodeScrypt);
const CUSTOMER_SESSION_COOKIE = "velora_customer_session";
const ADMIN_SESSION_COOKIE = "velora_admin_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

export type SessionRole = "customer" | "admin";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function newOpaqueToken() {
  return randomBytes(32).toString("base64url");
}

export async function isRateLimited(
  action: string,
  identifier: string,
  limit: number,
  windowMs: number,
) {
  const identifierHash = hashToken(identifier);
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMs).toISOString();

  await db
    .delete(authAttempts)
    .where(lt(authAttempts.attemptedAt, new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()));
  await db
    .delete(authAttempts)
    .where(
      and(
        eq(authAttempts.action, action),
        eq(authAttempts.identifierHash, identifierHash),
        lt(authAttempts.attemptedAt, cutoff),
      ),
    );

  const [result] = await db
    .select({ attempts: count() })
    .from(authAttempts)
    .where(
      and(
        eq(authAttempts.action, action),
        eq(authAttempts.identifierHash, identifierHash),
        gt(authAttempts.attemptedAt, cutoff),
      ),
    );

  if ((result?.attempts ?? 0) >= limit) return true;

  await db.insert(authAttempts).values({
    id: randomUUID(),
    action,
    identifierHash,
    attemptedAt: now.toISOString(),
  });
  return false;
}

export async function clearRateLimit(action: string, identifier: string) {
  await db
    .delete(authAttempts)
    .where(
      and(
        eq(authAttempts.action, action),
        eq(authAttempts.identifierHash, hashToken(identifier)),
      ),
    );
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt.toString("base64url")}$${derivedKey.toString("base64url")}`;
}

export async function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, saltValue, expectedValue] = encodedHash.split("$");
  if (algorithm !== "scrypt" || !saltValue || !expectedValue) return false;

  const salt = Buffer.from(saltValue, "base64url");
  const expected = Buffer.from(expectedValue, "base64url");
  if (salt.length !== 16 || expected.length !== 64) return false;
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;
  return timingSafeEqual(actual, expected);
}

export function constantTimeStringEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash) && left.length === right.length;
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function createSession(userId: string | null, role: SessionRole) {
  const token = newOpaqueToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DURATION_MS).toISOString();
  await db
    .delete(authSessions)
    .where(lt(authSessions.expiresAt, now.toISOString()));
  await db.insert(authSessions).values({
    tokenHash: hashToken(token),
    userId,
    role,
    expiresAt,
    createdAt: now.toISOString(),
  });
  return { token, expiresAt };
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const token = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) return null;

  const now = new Date().toISOString();
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(authSessions)
    .innerJoin(users, eq(authSessions.userId, users.id))
    .where(
      and(
        eq(authSessions.tokenHash, hashToken(token)),
        eq(authSessions.role, "customer"),
        gt(authSessions.expiresAt, now),
      ),
    )
    .limit(1);

  return user ?? null;
}

export async function isAdminAuthenticated() {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return false;

  const [session] = await db
    .select({ tokenHash: authSessions.tokenHash })
    .from(authSessions)
    .where(
      and(
        eq(authSessions.tokenHash, hashToken(token)),
        eq(authSessions.role, "admin"),
        gt(authSessions.expiresAt, new Date().toISOString()),
      ),
    )
    .limit(1);

  return Boolean(session);
}

export async function revokeSession(role: SessionRole) {
  const cookieName =
    role === "admin" ? ADMIN_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE;
  const token = (await cookies()).get(cookieName)?.value;
  if (token) {
    await db
      .delete(authSessions)
      .where(
        and(
          eq(authSessions.tokenHash, hashToken(token)),
          eq(authSessions.role, role),
        ),
      );
  }
}

export function setSessionCookie(
  response: {
    cookies: {
      set: (options: {
        name: string;
        value: string;
        httpOnly: boolean;
        secure: boolean;
        sameSite: "strict";
        maxAge: number;
        path: string;
        expires: Date;
      }) => void;
    };
  },
  token: string,
  expiresAt: string,
  role: SessionRole,
) {
  response.cookies.set({
    name: role === "admin" ? ADMIN_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION_MS / 1000,
    path: "/",
    expires: new Date(expiresAt),
  });
}

export function clearSessionCookie(
  response: {
    cookies: {
      set: (name: string, value: string, options: { expires: Date; path: string }) => void;
    };
  },
  role: SessionRole,
) {
  response.cookies.set(
    role === "admin" ? ADMIN_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE,
    "",
    { expires: new Date(0), path: "/" },
  );
}
