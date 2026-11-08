import { NextResponse } from "next/server";
import {
  clearRateLimit,
  constantTimeStringEqual,
  createSession,
  isRateLimited,
  isSameOriginRequest,
  setSessionCookie,
} from "@/lib/auth";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    const username =
      isRecord(body) && typeof body.username === "string" ? body.username.trim() : "";
    const password =
      isRecord(body) && typeof body.password === "string" ? body.password : "";
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      return NextResponse.json(
        { error: "L'accès administrateur n'est pas configuré." },
        { status: 503 },
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: "Benutzername oder Passwort ist ungültig." },
        { status: 401 },
      );
    }
    if (username.length > 100 || password.length > 256) {
      return NextResponse.json(
        { error: "Benutzername oder Passwort ist ungültig." },
        { status: 401 },
      );
    }

    if (await isRateLimited("admin-login", username.toLowerCase(), 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Zu viele Anmeldeversuche. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    if (
      !constantTimeStringEqual(username, expectedUsername) ||
      !constantTimeStringEqual(password, expectedPassword)
    ) {
      return NextResponse.json(
        { error: "Benutzername oder Passwort ist ungültig." },
        { status: 401 },
      );
    }

    await clearRateLimit("admin-login", username.toLowerCase());
    const session = await createSession(null, "admin");
    const response = NextResponse.json({ success: true });
    setSessionCookie(response, session.token, session.expiresAt, "admin");
    return response;
  } catch (error) {
    console.error("Erreur lors de l'authentification administrateur :", error);
    return NextResponse.json(
      { error: "Anmeldung ist derzeit nicht möglich." },
      { status: 500 },
    );
  }
}