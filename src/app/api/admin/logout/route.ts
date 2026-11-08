// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  isSameOriginRequest,
  revokeSession,
} from "@/lib/auth";

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 403 });
  }

  try {
    await revokeSession("admin");
    const response = NextResponse.json({ success: true });
    clearSessionCookie(response, "admin");
    return response;
  } catch (error) {
    console.error("Erreur lors de la déconnexion administrateur :", error);
    return NextResponse.json({ error: "Abmeldung nicht möglich." }, { status: 500 });
  }
}