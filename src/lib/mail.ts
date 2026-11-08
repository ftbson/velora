import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";

const smtpPort = Number(process.env.SMTP_PORT ?? 465);

if (
  !process.env.SMTP_HOST ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS
) {
  throw new Error("SMTP_HOST, SMTP_USER and SMTP_PASS must be configured");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const notificationEmail = process.env.SMTP_USER;

export async function sendMail(options: SendMailOptions) {
  return transporter.sendMail({
    from: `Swiss Holz <${notificationEmail}>`,
    to: notificationEmail,
    ...options,
  });
}
