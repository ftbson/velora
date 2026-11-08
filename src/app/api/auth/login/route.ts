import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import {
  clearRateLimit,
  createSession,
  isRateLimited,
  isSameOriginRequest,
  setSessionCookie,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    const email =
      isRecord(body) && typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";
    const password =
      isRecord(body) && typeof body.password === "string" ? body.password : "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !password || password.length > 128) {
      return NextResponse.json(
        { error: "E-Mail-Adresse oder Passwort ist ungültig." },
        { status: 400 },
      );
    }

    if (await isRateLimited("login", email, 10, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Zu viele Anmeldeversuche. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const dummyPasswordHash =
      "scrypt$MDEyMzQ1Njc4OWFiY2RlZg$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    const passwordIsValid = await verifyPassword(
      password,
      user?.passwordHash ?? dummyPasswordHash,
    );

    if (!user || !passwordIsValid) {
      return NextResponse.json(
        { error: "E-Mail-Adresse oder Passwort ist ungültig." },
        { status: 401 },
      );
    }

    await clearRateLimit("login", email);
    const session = await createSession(user.id, "customer");
    const response = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
    setSessionCookie(response, session.token, session.expiresAt, "customer");
    return response;
  } catch (error) {
    console.error("Fehler bei der Kundenanmeldung:", error);
    return NextResponse.json(
      { error: "Die Anmeldung ist derzeit nicht möglich. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
