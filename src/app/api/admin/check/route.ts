// app/api/admin/check/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies(); // Ajout de "await" ici
  const token = cookieStore.get("admin_token")?.value;

  if (token === "authenticated_admin_holz_session") {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}