import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // ✅ IMPORTANT: nodemailer needs Node runtime

type Payload = {
    name: string;
    email: string;
    message: string;
    // simple spam honeypot
    website?: string;
};

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Partial<Payload>;

        const name = String(body.name ?? "").trim();
        const email = String(body.email ?? "").trim();
        const message = String(body.message ?? "").trim();
        const website = String(body.website ?? "").trim(); // honeypot

        // honeypot filled => bot
        if (website) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        if (!name || !email || !message) {
            return NextResponse.json(
                { ok: false, error: "Bitte alle Felder ausfüllen." },
                { status: 400 },
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { ok: false, error: "Bitte eine gültige E-Mail angeben." },
                { status: 400 },
            );
        }

        const {
            CONTACT_TO_EMAIL,
            SMTP_HOST,
            SMTP_PORT,
            SMTP_SECURE,
            SMTP_USER,
            SMTP_PASS,
            SMTP_FROM_NAME,
        } = process.env;

        if (!CONTACT_TO_EMAIL || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
            return NextResponse.json(
                { ok: false, error: "Server-Mail-Konfiguration fehlt (ENV)." },
                { status: 500 },
            );
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: String(SMTP_SECURE).toLowerCase() === "true",
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
        });

        const subject = `Kontaktanfrage: ${name}`;
        const text = [
            `Name: ${name}`,
            `E-Mail: ${email}`,
            "",
            "Nachricht:",
            message,
        ].join("\n");

        // ⚠️ For deliverability: FROM should be your own mailbox/domain.
        // We'll set replyTo to the user.
        await transporter.sendMail({
            from: `"${SMTP_FROM_NAME ?? "Website"}" <${SMTP_USER}>`,
            to: CONTACT_TO_EMAIL,
            subject,
            text,
            replyTo: email,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
            { status: 500 },
        );
    }
}