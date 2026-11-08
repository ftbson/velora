import { randomUUID } from "node:crypto";
import { eq, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { emailVerificationTokens } from "@/lib/schema";
import { hashToken, newOpaqueToken } from "@/lib/auth";
import { sendMail } from "@/lib/mail";

export async function sendEmailVerification(
  request: Request,
  user: { id: string; name: string; email: string },
) {
  const token = newOpaqueToken();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  await db.transaction(async (tx) => {
    await tx
      .delete(emailVerificationTokens)
      .where(lt(emailVerificationTokens.expiresAt, now.toISOString()));
    await tx
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.userId, user.id));
    await tx.insert(emailVerificationTokens).values({
      tokenHash: hashToken(token),
      userId: user.id,
      expiresAt,
      createdAt: now.toISOString(),
    });
  });

  const verificationUrl = new URL("/verifier-email", request.url);
  verificationUrl.searchParams.set("token", token);
  await sendMail({
    to: user.email,
    subject: "Bestätigen Sie Ihre VELORA-E-Mail-Adresse",
    text: [
      `Hallo ${user.name},`,
      "",
      "bestätigen Sie Ihre E-Mail-Adresse über diesen Link:",
      verificationUrl.toString(),
      "",
      "Der Link ist 24 Stunden gültig. Falls Sie kein Konto erstellt haben, ignorieren Sie diese Nachricht.",
    ].join("\n"),
    messageId: `<${randomUUID()}@velora.ch>`,
  });
}
