import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import {
  hashPassword,
  isRateLimited,
  isSameOriginRequest,
} from "@/lib/auth";
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
    if (!isRecord(body)) {
      return NextResponse.json({ error: "Ungültige Angaben." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (
      name.length < 2 ||
      name.length > 100 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      password.length < 12 ||
      password.length > 128
    ) {
      return NextResponse.json(
        { error: "Vérifiez votre nom, votre e-mail et votre mot de passe (12 caractères minimum)." },
        { status: 400 },
      );
    }

    if (await isRateLimited("register", email, 5, 60 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez plus tard." },
        { status: 429 },
      );
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const [user] = await db
      .insert(users)
      .values({
        id: randomUUID(),
        name,
        email,
        passwordHash,
        emailVerifiedAt: null,
        createdAt: now,
        updatedAt: now,
      })
      .onConflictDoNothing({ target: users.email })
      .returning({ id: users.id, name: users.name, email: users.email });

    if (!user) {
      return NextResponse.json({
        message: "Si cette adresse peut être utilisée, un e-mail de vérification va vous être envoyé.",
      });
    }

    try {
      await sendEmailVerification(request, user);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail de vérification :", error);
      return NextResponse.json(
        { error: "Compte créé, mais l'e-mail n'a pas pu être envoyé. Utilisez « Renvoyer le lien »." },
        { status: 503 },
      );
    }

    return NextResponse.json({
      message: "Consultez votre boîte e-mail pour vérifier votre adresse.",
    });
  } catch (error) {
    console.error("Erreur lors de la création du compte :", error);
    return NextResponse.json(
      { error: "Impossible de créer le compte pour le moment." },
      { status: 500 },
    );
  }
}
