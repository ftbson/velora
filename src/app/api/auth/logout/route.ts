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
    await revokeSession("customer");
    const response = NextResponse.json({ success: true });
    clearSessionCookie(response, "customer");
    return response;
  } catch (error) {
    console.error("Erreur lors de la déconnexion du client :", error);
    return NextResponse.json(
      { error: "Impossible de terminer la session." },
      { status: 500 },
    );
  }
}
