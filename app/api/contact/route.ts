import { personal } from "@/content/personal";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_LOCAL_PART_PATTERN = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+$/;

function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value: string): boolean {
  const parts = value.split("@");
  if (parts.length !== 2) return false;

  const [local, domain] = parts;
  if (!local || !domain) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return false;
  }

  if (!EMAIL_LOCAL_PART_PATTERN.test(local)) {
    return false;
  }

  const labels = domain.split(".");
  if (labels.length < 2) return false;

  return labels.every(
    (label) =>
      /^[A-Za-z0-9-]+$/.test(label) &&
      !label.startsWith("-") &&
      !label.endsWith("-")
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
    };

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH
    ) {
      return Response.json(
        { error: "One or more fields exceed the allowed length." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: "Invalid email address." }, { status: 400 });
    }

    const host = process.env.CONTACT_SMTP_HOST;
    const portRaw = process.env.CONTACT_SMTP_PORT;
    const user = process.env.CONTACT_SMTP_USER;
    const pass = process.env.CONTACT_SMTP_PASS;

    if (!host || !portRaw || !user || !pass) {
      return Response.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const port = Number(portRaw);
    if (!Number.isInteger(port) || port <= 0) {
      return Response.json(
        { error: "Email service configuration is invalid." },
        { status: 500 }
      );
    }

    const secureSetting = process.env.CONTACT_SMTP_SECURE;
    const secure =
      secureSetting === "true" ? true : secureSetting === "false" ? false : port === 465;
    const toEmail = process.env.CONTACT_EMAIL_TO || personal.email;
    const fromEmail = process.env.CONTACT_EMAIL_FROM || user;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: sanitizeHeaderValue(fromEmail),
      to: sanitizeHeaderValue(toEmail),
      replyTo: sanitizeHeaderValue(email),
      subject: "New contact form message",
      text: [
        "You received a new message from the portfolio contact form.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <p>You received a new message from the portfolio contact form.</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email send failed:", error);
    return Response.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
