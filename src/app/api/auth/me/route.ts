import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    return NextResponse.json(
      { user },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur lors du chargement de la session client :", error);
    return NextResponse.json(
      { error: "Die Sitzung konnte nicht überprüft werden." },
      { status: 500 },
    );
  }
}
