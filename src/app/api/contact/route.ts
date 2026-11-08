import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, E-Mail-Adresse und Nachricht sind erforderlich." },
        { status: 400 },
      );
    }

    await sendMail({
      replyTo: email,
      subject: `[Kontakt] ${subject || "Neue Nachricht"}`,
      text: [
        "Neue Nachricht über das Kontaktformular",
        "",
        `Name: ${name}`,
        `E-Mail: ${email}`,
        `Telefon: ${phone || "Nicht angegeben"}`,
        `Betreff: ${subject || "Nicht angegeben"}`,
        "",
        "Nachricht:",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Fehler beim Senden der Kontaktanfrage:", error);
    return NextResponse.json(
      { error: "Die Nachricht konnte nicht gesendet werden." },
      { status: 500 },
    );
  }
}
