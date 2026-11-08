import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  clearRateLimit,
  createSession,
  hashPassword,
  isRateLimited,
  isSameOriginRequest,
  setSessionCookie,
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
    if (!isRecord(body)) {
      return NextResponse.json({ error: "Bitte überprüfen Sie Ihre Angaben." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 8 ||
      password.length > 128
    ) {
      return NextResponse.json(
        { error: "Geben Sie einen Namen, eine gültige E-Mail-Adresse und ein Passwort mit mindestens 8 Zeichen ein." },
        { status: 400 },
      );
    }

    if (await isRateLimited("register", email, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Zu viele Versuche. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    const now = new Date().toISOString();
    const [user] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        name,
        email,
        passwordHash: await hashPassword(password),
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: users.email })
      .returning({ id: users.id, name: users.name, email: users.email });

    if (!user) {
      return NextResponse.json(
        { error: "Für diese E-Mail-Adresse konnte kein neues Konto erstellt werden. Melden Sie sich an oder verwenden Sie eine andere Adresse." },
        { status: 409 },
      );
    }

    await clearRateLimit("register", email);
    const session = await createSession(user.id, "customer");
    const response = NextResponse.json({ user }, { status: 201 });
    setSessionCookie(response, session.token, session.expiresAt, "customer");
    return response;
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    return NextResponse.json(
      { error: "Das Konto konnte nicht erstellt werden. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
