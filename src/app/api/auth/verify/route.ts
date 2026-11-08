import { and, eq, gt, isNull, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emailVerificationTokens, orders, users } from "@/lib/schema";
import { hashToken, isSameOriginRequest } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!token || token.length > 100) {
    return NextResponse.redirect(new URL("/connexion?verified=invalid", url));
  }

  const verificationUrl = new URL("/verifier-email", url);
  verificationUrl.searchParams.set("token", token);
  return NextResponse.redirect(verificationUrl);
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 403 });
  }

  try {
    const body: unknown = await request.json();
    const token =
      typeof body === "object" &&
      body !== null &&
      "token" in body &&
      typeof body.token === "string"
        ? body.token
        : "";
    if (!token || token.length > 100) {
      return NextResponse.json({ error: "Ungültiger Bestätigungslink." }, { status: 400 });
    }

    const [verification] = await db
      .select({
        userId: emailVerificationTokens.userId,
        email: users.email,
      })
      .from(emailVerificationTokens)
      .innerJoin(users, eq(emailVerificationTokens.userId, users.id))
      .where(
        and(
          eq(emailVerificationTokens.tokenHash, hashToken(token)),
          gt(emailVerificationTokens.expiresAt, new Date().toISOString()),
        ),
      )
      .limit(1);

    if (!verification) {
      return NextResponse.json(
        { error: "Dieser Link ist ungültig oder abgelaufen." },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();
    await db.transaction(async (tx) => {
      await tx
        .update(users)
        .set({ emailVerifiedAt: now, updatedAt: now })
        .where(eq(users.id, verification.userId));
      await tx
        .update(orders)
        .set({ userId: verification.userId })
        .where(
          and(
            isNull(orders.userId),
            sql`lower(${orders.email}) = lower(${verification.email})`,
          ),
        );
      await tx
        .delete(emailVerificationTokens)
        .where(eq(emailVerificationTokens.tokenHash, hashToken(token)));
    });

    return NextResponse.json({ verified: true });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'adresse e-mail :", error);
    return NextResponse.json(
      { error: "Die E-Mail-Adresse konnte nicht bestätigt werden." },
      { status: 500 },
    );
  }
}
