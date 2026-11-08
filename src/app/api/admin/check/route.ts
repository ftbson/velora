// app/api/admin/check/route.ts
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  try {
    if (await isAdminAuthenticated()) {
      return NextResponse.json(
        { authenticated: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur lors de la vérification de la session admin :", error);
    return NextResponse.json({ error: "Vérification impossible." }, { status: 500 });
  }
}