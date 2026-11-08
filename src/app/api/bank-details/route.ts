import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { bankDetails } from "@/lib/schema";

const BANK_DETAILS_ID = "default";
const ADMIN_TOKEN = "authenticated_admin_holz_session";

async function ensureBankDetailsTable() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS bank_details (
      id TEXT PRIMARY KEY NOT NULL,
      beneficiary TEXT NOT NULL,
      iban TEXT NOT NULL,
      bic TEXT NOT NULL,
      address TEXT,
      updated_at TEXT NOT NULL
    )
  `);
}

async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_token")?.value === ADMIN_TOKEN;
}

export async function GET() {
  try {
    await ensureBankDetailsTable();
    const [details] = await db
      .select({
        beneficiary: bankDetails.beneficiary,
        iban: bankDetails.iban,
        bic: bankDetails.bic,
        address: bankDetails.address,
      })
      .from(bankDetails)
      .where(eq(bankDetails.id, BANK_DETAILS_ID));

    return NextResponse.json(
      { bankDetails: details ?? null },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Erreur lors du chargement des coordonnées bancaires :", error);
    return NextResponse.json(
      { error: "Impossible de charger les coordonnées bancaires." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const beneficiary =
      typeof input.beneficiary === "string" ? input.beneficiary.trim() : "";
    const iban = typeof input.iban === "string" ? input.iban.trim() : "";
    const bic = typeof input.bic === "string" ? input.bic.trim() : "";
    const address =
      typeof input.address === "string" ? input.address.trim() : "";

    if (
      !beneficiary ||
      !iban ||
      !bic ||
      beneficiary.length > 120 ||
      iban.length > 50 ||
      bic.length > 20 ||
      address.length > 200
    ) {
      return NextResponse.json(
        { error: "Veuillez saisir un bénéficiaire, un IBAN et un SWIFT / BIC valides." },
        { status: 400 },
      );
    }

    await ensureBankDetailsTable();
    await db
      .insert(bankDetails)
      .values({
        id: BANK_DETAILS_ID,
        beneficiary,
        iban,
        bic,
        address: address || null,
        updatedAt: new Date().toISOString(),
      })
      .onConflictDoUpdate({
        target: bankDetails.id,
        set: {
          beneficiary,
          iban,
          bic,
          address: address || null,
          updatedAt: new Date().toISOString(),
        },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des coordonnées bancaires :", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer les coordonnées bancaires." },
      { status: 500 },
    );
  }
}
