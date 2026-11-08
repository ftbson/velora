// app/api/admin/login/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Vérification des identifiants
    if (username === "Admin" && password === "AdminHolz") {
      const response = NextResponse.json({ success: true });

      // Définition d'un cookie de session sécurisé HTTP-only
      response.cookies.set({
        name: "admin_token",
        value: "authenticated_admin_holz_session",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // Valide 24 heures
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Ungültiger Benutzername oder Passwort" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}