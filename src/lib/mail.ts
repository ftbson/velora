import nodemailer from "nodemailer";
import type { SendMailOptions, Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

export const notificationEmail =
  process.env.ADMIN_EMAIL || process.env.SMTP_USER || "info@swisholz.ch";

function getTransporter(): Transporter {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const smtpHost = process.env.SMTP_HOST || "mail.swisholz.ch";
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpUser = process.env.SMTP_USER || "info@swisholz.ch";
  const smtpPass = process.env.SMTP_PASS || "";

  cachedTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents certificate issues on custom Swiss mail servers
    },
    connectionTimeout: 15000,
    greetingTimeout: 10000,
  });

  return cachedTransporter;
}

export async function sendMail(options: SendMailOptions) {
  const transporter = getTransporter();
  const fromAddress = process.env.SMTP_USER || "info@swisholz.ch";

  return transporter.sendMail({
    from: `VELORA <${fromAddress}>`,
    to: notificationEmail,
    ...options,
  });
}

export interface OrderItemEmailData {
  title: string;
  category: string;
  quantity: number;
  unitPrice: number;
}

export interface NewOrderEmailParams {
  orderId: string;
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  createdAt: string;
  items: OrderItemEmailData[];
}

/**
 * 1. Email to ADMIN when a customer places a new order
 */
export async function sendAdminNewOrderEmail(data: NewOrderEmailParams) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #f0f0f0;">
        <td style="padding: 10px; font-weight: 600; color: #111;">${item.title} <span style="font-size: 12px; color: #777;">(${item.category})</span></td>
        <td style="padding: 10px; text-align: center; color: #333;">x ${item.quantity}</td>
        <td style="padding: 10px; text-align: right; font-weight: 600; color: #111;">CHF ${(item.unitPrice * item.quantity).toFixed(2)}</td>
      </tr>`,
    )
    .join("");

  const itemsText = data.items
    .map(
      (item) =>
        `- ${item.quantity}x ${item.title} (${item.category}) : CHF ${(item.unitPrice * item.quantity).toFixed(2)}`,
    )
    .join("\n");

  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://velora-shop.ch"}/admin`;

  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; margin: 0; padding: 25px 15px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e5ea;">
        
        <!-- Header -->
        <div style="background-color: #161616; padding: 24px; text-align: center; border-bottom: 3px solid #D52B1E;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">VELORA</h1>
          <p style="color: #d1d1d1; margin: 6px 0 0 0; font-size: 13px;">Admin-Benachrichtigung: Neue Bestellung eingegangen</p>
        </div>

        <div style="padding: 24px;">
          <!-- Badge Alerte -->
          <div style="background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 14px 18px; margin-bottom: 22px;">
            <div style="color: #b91c1c; font-weight: 700; font-size: 16px; margin-bottom: 4px;">
              🚨 Neue Kundenbestellung: #${data.orderId}
            </div>
            <div style="color: #4b5563; font-size: 13px;">
              Eingegangen am ${new Date(data.createdAt).toLocaleString("de-CH")}
            </div>
          </div>

          <!-- Customer details -->
          <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.5px; margin: 0 0 10px 0;">
            Kundendaten (Coordonnées du client)
          </h3>
          <div style="background: #f9fafb; border-radius: 10px; padding: 16px; margin-bottom: 22px; font-size: 14px; line-height: 1.6; color: #1f2937;">
            <div><strong>Name:</strong> ${data.firstName} ${data.lastName}</div>
            <div><strong>E-Mail:</strong> <a href="mailto:${data.email}" style="color: #D52B1E; text-decoration: none;">${data.email}</a></div>
            <div><strong>Telefon / WhatsApp:</strong> <a href="tel:${data.whatsapp}" style="color: #D52B1E; text-decoration: none;">${data.whatsapp}</a></div>
            <div><strong>Lieferadresse:</strong> ${data.streetAddress}, ${data.country}</div>
          </div>

          <!-- Order Items -->
          <h3 style="font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.5px; margin: 0 0 10px 0;">
            Bestellte Artikel
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <thead>
              <tr style="background: #f3f4f6; color: #374151;">
                <th style="padding: 10px; text-align: left;">Produkt</th>
                <th style="padding: 10px; text-align: center;">Menge</th>
                <th style="padding: 10px; text-align: right;">Preis</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <!-- Financial Totals -->
          <div style="border-top: 2px solid #e5e7eb; padding-top: 14px; margin-bottom: 26px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 14px; color: #4b5563;">
              <span>Zwischensumme:</span>
              <span>CHF ${data.subtotal.toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #16a34a; font-weight: 600;">
              <span>Lieferung:</span>
              <span>Kostenlos (0.00 CHF)</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: #111827; border-top: 1px dashed #d1d5db; padding-top: 8px;">
              <span>Gesamtbetrag:</span>
              <span style="color: #D52B1E;">CHF ${data.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <!-- CTA to Admin Dashboard -->
          <div style="text-align: center; margin-top: 28px;">
            <a href="${adminUrl}" style="background-color: #D52B1E; color: #ffffff; text-decoration: none; padding: 13px 28px; border-radius: 30px; font-weight: 700; font-size: 14px; display: inline-block;">
              Bestellung im Admin-Dashboard verwalten →
            </a>
          </div>

        </div>

        <div style="background-color: #f9fafb; padding: 14px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
          VELORA Schweiz | Automatisierte Systembenachrichtigung
        </div>
      </div>
    </body>
    </html>
  `;

  const text = [
    `🚨 NEUE BESTELLUNG: #${data.orderId}`,
    "--------------------------------------------------",
    `Datum: ${data.createdAt}`,
    "",
    "KUNDENDATEN:",
    `Kunde: ${data.firstName} ${data.lastName}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.whatsapp}`,
    `Adresse: ${data.streetAddress}, ${data.country}`,
    "",
    "ARTIKEL:",
    itemsText,
    "",
    `Zwischensumme: CHF ${data.subtotal.toFixed(2)}`,
    "Versand: Kostenlos (0.00 CHF)",
    `GESAMTBETRAG: CHF ${data.grandTotal.toFixed(2)}`,
    "",
    `Admin-Dashboard: ${adminUrl}`,
  ].join("\n");

  return sendMail({
    to: notificationEmail,
    replyTo: data.email,
    subject: `[VELORA] 🚨 Neue Bestellung #${data.orderId} von ${data.firstName} ${data.lastName} (CHF ${data.grandTotal.toFixed(2)})`,
    text,
    html,
  });
}

/**
 * 2. Email to CUSTOMER when admin updates the order status
 */
export interface StatusUpdateEmailParams {
  order: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    streetAddress: string;
    grandTotal: number;
  };
  newStatus: "pending" | "paid" | "shipped" | "cancelled";
  items?: OrderItemEmailData[];
}

export async function sendCustomerOrderStatusEmail({
  order,
  newStatus,
  items = [],
}: StatusUpdateEmailParams) {
  let statusTitle = "In Bearbeitung";
  let statusBadgeColor = "#f59e0b";
  let statusMessage =
    "Ihre Bestellung ist bei uns eingegangen und wird derzeit von unserem Team bearbeitet.";
  let statusNextStep =
    "Sie werden per E-Mail informiert, sobald Ihre Bestellung versendet wird.";

  if (newStatus === "paid") {
    statusTitle = "Bestätigt & Bezahlt";
    statusBadgeColor = "#16a34a";
    statusMessage =
      "Ihre Bestellung wurde erfolgreich geprüft und bestätigt! Ihre Artikel werden jetzt für den schnellen, kostenlosen Versand vorbereitet.";
    statusNextStep =
      "Unser Lager bereitet Ihr Paket vor. Die Lieferung erfolgt innerhalb von 2 bis 4 Werktagen.";
  } else if (newStatus === "shipped") {
    statusTitle = "Versendet (Auf dem Weg)";
    statusBadgeColor = "#2563eb";
    statusMessage =
      "Gute Neuigkeiten! Ihre Bestellung wurde verpackt und an unseren Versandpartner übergeben. Sie ist jetzt auf dem Weg zu Ihnen.";
    statusNextStep =
      "Ihre Lieferung trifft in den nächsten 2 bis 4 Werktagen an Ihrer angegebenen Lieferadresse ein.";
  } else if (newStatus === "cancelled") {
    statusTitle = "Storniert";
    statusBadgeColor = "#dc2626";
    statusMessage =
      "Ihre Bestellung wurde storniert. Falls Sie Fragen dazu haben oder eine Rücküberweisung wünschen, steht Ihnen unser Kundenservice gern zur Seite.";
    statusNextStep =
      "Kontaktieren Sie uns bitte per E-Mail oder telefonisch für weitere Informationen.";
  }

  const itemsHtml =
    items.length > 0
      ? `
      <div style="margin-top: 20px;">
        <h4 style="font-size: 13px; text-transform: uppercase; color: #6b7280; margin: 0 0 10px 0;">Bestellte Artikel:</h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          ${items
            .map(
              (item) => `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 8px 0; color: #111;">${item.title}</td>
              <td style="padding: 8px 0; text-align: center; color: #666;">x ${item.quantity}</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #111;">CHF ${(item.unitPrice * item.quantity).toFixed(2)}</td>
            </tr>`,
            )
            .join("")}
        </table>
      </div>`
      : "";

  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f9; margin: 0; padding: 25px 15px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e5e5ea;">
        
        <!-- Header -->
        <div style="background-color: #161616; padding: 26px; text-align: center; border-bottom: 3px solid #D52B1E;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">VELORA</h1>
          <p style="color: #d1d1d1; margin: 6px 0 0 0; font-size: 13px;">Schweizer E-Bikes, Zubehör & Service</p>
        </div>

        <div style="padding: 26px;">
          <h2 style="font-size: 20px; color: #111827; margin: 0 0 12px 0;">
            Guten Tag ${order.firstName} ${order.lastName},
          </h2>
          <p style="font-size: 14.5px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
            Es gibt ein Update zu Ihrer Bestellung <strong style="color: #111827;">#${order.id}</strong>:
          </p>

          <!-- Status Card -->
          <div style="background-color: #f9fafb; border-radius: 12px; padding: 20px; border-left: 5px solid ${statusBadgeColor}; margin-bottom: 24px;">
            <div style="display: inline-block; background-color: ${statusBadgeColor}; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 12px; border-radius: 20px; margin-bottom: 10px;">
              Neuer Status: ${statusTitle}
            </div>
            <p style="font-size: 15px; font-weight: 600; color: #111827; margin: 0 0 8px 0;">
              ${statusMessage}
            </p>
            <p style="font-size: 13.5px; color: #4b5563; margin: 0; line-height: 1.5;">
              ${statusNextStep}
            </p>
          </div>

          <!-- Order Details Card -->
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 18px; margin-bottom: 24px;">
            <h4 style="font-size: 13px; text-transform: uppercase; color: #6b7280; margin: 0 0 10px 0;">Bestellübersicht</h4>
            <div style="font-size: 13.5px; color: #374151; line-height: 1.6;">
              <div><strong>Bestellnummer:</strong> #${order.id}</div>
              <div><strong>Lieferadresse:</strong> ${order.streetAddress}, ${order.country}</div>
              <div><strong>Lieferung:</strong> <span style="color: #16a34a; font-weight: 600;">Kostenlos (0.00 CHF)</span></div>
              <div style="margin-top: 8px; font-size: 15px; font-weight: 700; color: #111827;">
                Gesamtbetrag: <span style="color: #D52B1E;">CHF ${order.grandTotal.toFixed(2)}</span>
              </div>
            </div>
            ${itemsHtml}
          </div>

          <!-- Support Box -->
          <div style="background-color: #f3f4f6; border-radius: 10px; padding: 16px; font-size: 13px; color: #4b5563; line-height: 1.5;">
            <strong style="color: #111827;">Haben Sie Fragen zu Ihrer Bestellung?</strong><br>
            Unser Kundenservice hilft Ihnen gerne:<br>
            📞 Telefon: <a href="tel:+41767529493" style="color: #D52B1E; font-weight: 600; text-decoration: none;">+41 76 752 94 93</a> (Mo. – Fr. 08:30 – 18:00 Uhr)<br>
            ✉️ E-Mail: <a href="mailto:info@swisholz.ch" style="color: #D52B1E; font-weight: 600; text-decoration: none;">info@swisholz.ch</a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
          &copy; ${new Date().getFullYear()} VELORA Schweiz. Alle Rechte vorbehalten.<br>
          Kostenloser Versand in der ganzen Schweiz &amp; Liechtenstein.
        </div>
      </div>
    </body>
    </html>
  `;

  const text = [
    `Guten Tag ${order.firstName} ${order.lastName},`,
    "",
    `Es gibt ein Update zu Ihrer Bestellung #${order.id}:`,
    `Neuer Status: ${statusTitle}`,
    "",
    statusMessage,
    statusNextStep,
    "",
    "Bestellübersicht:",
    `- Bestellnummer: #${order.id}`,
    `- Lieferadresse: ${order.streetAddress}, ${order.country}`,
    `- Gesamtbetrag: CHF ${order.grandTotal.toFixed(2)} (Kostenlose Lieferung)`,
    "",
    "Haben Sie Fragen?",
    "Telefon: +41 76 752 94 93",
    "E-Mail: info@swisholz.ch",
    "",
    "Mit freundlichen Grüssen,",
    "Ihr VELORA Team",
  ].join("\n");

  return sendMail({
    to: order.email,
    subject: `[VELORA] Status-Update zu Ihrer Bestellung #${order.id}: ${statusTitle}`,
    text,
    html,
  });
}
