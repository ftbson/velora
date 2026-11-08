import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isRateLimited, isSameOriginRequest } from "@/lib/auth";
import { sendEmailVerification } from "@/lib/auth-email";
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return NextResponse.json({ error: "Geben Sie eine gültige E-Mail-Adresse ein." }, { status: 400 });
    }

    if (await isRateLimited("resend-verification", email, 3, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
        { status: 429 },
      );
    }

    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerifiedAt: users.emailVerifiedAt,
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user && !user.emailVerifiedAt) {
      try {
        await sendEmailVerification(request, user);
      } catch (error) {
        console.error("Erreur lors du renvoi du lien de vérification :", error);
        return NextResponse.json(
          { error: "L'e-mail n'a pas pu être envoyé. Réessayez plus tard." },
          { status: 503 },
        );
      }
    }

    return NextResponse.json({
      message: "Si un compte non vérifié existe pour cette adresse, un lien lui a été envoyé.",
    });
  } catch (error) {
    console.error("Erreur lors du renvoi du lien de vérification :", error);
    return NextResponse.json(
      { error: "Impossible de traiter la demande pour le moment." },
      { status: 500 },
    );
  }
}
