import nodemailer from "nodemailer";
import { socials } from "@/lib/content";

export const runtime = "nodejs";

const LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
// Best-effort per-instance limit; enough to blunt a script hammering the form.
const hits = new Map();

const rateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT.max;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
  const errors = {};
  if (!name || name.length > 100) errors.name = "Enter your name.";
  if (!email || !EMAIL.test(email) || email.length > 200) errors.email = "Enter an email address like name@example.com.";
  if (!message || message.length < 10) errors.message = "Write a little more so I know what you need (at least 10 characters).";
  else if (message.length > 5000) errors.message = "Keep your message under 5,000 characters.";
  return errors;
};

const escape = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "The message couldn't be read. Refresh the page and try again." }, { status: 400 });
  }

  // Bots fill every field, including the hidden one; pretend it worked.
  if (body.website) return Response.json({ ok: true });

  const fields = {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    message: String(body.message || "").trim(),
  };
  const errors = validate(fields);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Too many messages from this connection. Wait a few minutes, or email me directly." },
      { status: 429 }
    );
  }

  const { SMTP_HOST = "smtp.gmail.com", SMTP_PORT = "465", SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_USER and SMTP_PASS are not set.");
    return Response.json(
      { error: `The form can't send right now. Email me at ${socials.email} instead.` },
      { status: 503 }
    );
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: `"Portfolio contact form" <${SMTP_USER}>`,
      to: CONTACT_TO || socials.email,
      replyTo: `"${fields.name.replace(/"/g, "")}" <${fields.email}>`,
      subject: `New message from ${fields.name}`,
      text: `${fields.message}\n\nFrom: ${fields.name} <${fields.email}>`,
      html: `<p style="white-space:pre-wrap">${escape(fields.message)}</p><p>From: ${escape(fields.name)} &lt;${escape(fields.email)}&gt;</p>`,
    });
  } catch (err) {
    console.error("Contact form: sending failed", err);
    return Response.json(
      { error: `The message didn't send. Try again, or email me at ${socials.email}.` },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
