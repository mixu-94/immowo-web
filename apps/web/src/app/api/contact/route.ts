import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // nodemailer needs Node runtime

type Payload = {
    name: string;
    email: string;

    phone?: string;
    contactPreference?: "telefon" | "email";
    topic?: string;

    message?: string;

    callbackRequested?: boolean;

    // Terminwunsch (MVP)
    preferredDate?: string; // yyyy-mm-dd
    preferredTimeWindow?: string; // e.g. "09-12"
    preferredTime?: string; // hh:mm
    durationMinutes?: number;
    tz?: string;

    // honeypot
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

        const phone = String(body.phone ?? "").trim();
        const topic = String(body.topic ?? "").trim();
        const contactPreference = String(body.contactPreference ?? "").trim();
        const callbackRequested = Boolean(body.callbackRequested);

        const message = String(body.message ?? "").trim();

        const preferredDate = String(body.preferredDate ?? "").trim();
        const preferredTimeWindow = String(body.preferredTimeWindow ?? "").trim();
        const preferredTime = String(body.preferredTime ?? "").trim();
        const durationMinutes = Number(body.durationMinutes ?? 15);
        const tz = String(body.tz ?? "").trim();

        const website = String(body.website ?? "").trim(); // honeypot

        // bot => pretend ok
        if (website) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        if (!name || !email) {
            return NextResponse.json(
                { ok: false, error: "Bitte Name und E-Mail ausfüllen." },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { ok: false, error: "Bitte eine gültige E-Mail angeben." },
                { status: 400 }
            );
        }

        // MVP-Validierung:
        // Entweder Nachricht ODER Rückruf mit Telefonnummer (Termin optional)
        const hasMessage = message.length > 0;
        const hasPhoneForCallback = callbackRequested ? phone.length > 0 : true;

        if (!hasMessage && !callbackRequested) {
            return NextResponse.json(
                { ok: false, error: "Bitte eine Nachricht schreiben oder Rückruf auswählen." },
                { status: 400 }
            );
        }

        if (!hasPhoneForCallback) {
            return NextResponse.json(
                { ok: false, error: "Für einen Rückruf bitte eine Telefonnummer angeben." },
                { status: 400 }
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
                { status: 500 }
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

        const subjectParts = ["Kontaktanfrage", name];
        if (topic) subjectParts.push(`(${topic})`);
        const subject = subjectParts.join(": ");

        const text = [
            `Name: ${name}`,
            `E-Mail: ${email}`,
            phone ? `Telefon: ${phone}` : `Telefon: -`,
            contactPreference ? `Bevorzugt: ${contactPreference}` : `Bevorzugt: -`,
            topic ? `Thema: ${topic}` : `Thema: -`,
            `Rückruf gewünscht: ${callbackRequested ? "Ja" : "Nein"}`,
            "",
            "Terminwunsch:",
            `Datum: ${preferredDate || "-"}`,
            `Zeitfenster: ${preferredTimeWindow || "-"}`,
            `Uhrzeit (optional): ${preferredTime || "-"}`,
            `Dauer: ${Number.isFinite(durationMinutes) ? `${durationMinutes} Min.` : "-"}`,
            `Zeitzone: ${tz || "-"}`,
            "",
            "Nachricht:",
            message || "-",
        ].join("\n");

        await transporter.sendMail({
            from: `"${SMTP_FROM_NAME ?? "Website"}" <${SMTP_USER}>`,
            to: CONTACT_TO_EMAIL,
            subject,
            text,
            replyTo: email,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json(
            { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
            { status: 500 }
        );
    }
}