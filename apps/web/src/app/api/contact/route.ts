// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Payload = {
    name: string;
    email: string;

    phone?: string;
    contactPreference?: "telefon" | "email";
    topic?: string;

    message?: string;
    callbackRequested?: boolean;

    preferredDate?: string;
    preferredTimeWindow?: string;
    preferredTime?: string;
    durationMinutes?: number;
    tz?: string;

    listing?: string;
    listingTitle?: string;

    website?: string; // honeypot
};

function safeStr(v: unknown) {
    return String(v ?? "").trim();
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function clampInt(v: unknown, fallback: number, min: number, max: number) {
    const n = Number(v);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(min, Math.min(max, Math.round(n)));
}

function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function timeWindowLabel(win: string) {
    const map: Record<string, string> = {
        "09-12": "09:00 – 12:00",
        "12-15": "12:00 – 15:00",
        "15-18": "15:00 – 18:00",
        "18-20": "18:00 – 20:00",
    };
    return map[win] ?? win;
}

function topicLabel(topic: string) {
    const t = topic.toLowerCase();
    const map: Record<string, string> = {
        allgemein: "Allgemein",
        expose: "Exposé / Unterlagen",
        kaufen: "Immobilie kaufen",
        neubau: "Neubau / vom Papier weg",
        verkauf: "Verkauf / Vermarktung",
    };
    return map[t] ?? topic;
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Partial<Payload>;

        // Honeypot
        const website = safeStr(body.website);
        if (website) return NextResponse.json({ ok: true }, { status: 200 });

        // Fields
        const name = safeStr(body.name);
        const email = safeStr(body.email);
        const phone = safeStr(body.phone);
        const topic = safeStr(body.topic);
        const message = safeStr(body.message);

        const callbackRequested = Boolean(body.callbackRequested);

        const contactPreferenceRaw = safeStr(body.contactPreference);
        const contactPreference =
            contactPreferenceRaw === "telefon" || contactPreferenceRaw === "email"
                ? (contactPreferenceRaw as "telefon" | "email")
                : undefined;

        const preferredDate = safeStr(body.preferredDate);
        const preferredTimeWindow = safeStr(body.preferredTimeWindow);
        const preferredTime = safeStr(body.preferredTime);
        const durationMinutes = clampInt(body.durationMinutes, 15, 15, 120);
        const tz = safeStr(body.tz);

        const listing = safeStr(body.listing);
        const listingTitle = safeStr(body.listingTitle);

        // Validation
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

        const hasMessage = message.length > 0;
        if (!hasMessage && !callbackRequested) {
            return NextResponse.json(
                { ok: false, error: "Bitte eine Nachricht schreiben oder Rückruf auswählen." },
                { status: 400 }
            );
        }
        if (callbackRequested && phone.length === 0) {
            return NextResponse.json(
                { ok: false, error: "Für einen Rückruf bitte eine Telefonnummer angeben." },
                { status: 400 }
            );
        }

        // Meta
        const ua = req.headers.get("user-agent") ?? "";
        const fwd = req.headers.get("x-forwarded-for") ?? "";
        const ip = fwd.split(",")[0]?.trim() ?? "";
        const receivedAt = new Date().toISOString();

        const topicNice = topic ? topicLabel(topic) : "-";

        // Subject
        const subjectParts = ["Kontaktanfrage", name];
        if (listing) subjectParts.push(`Objekt: ${listing}`);
        if (topicNice !== "-") subjectParts.push(topicNice);
        const subject = subjectParts.join(" | ");

        // Text mail
        const text = [
            "KONTAKTANFRAGE (Website)",
            "=======================",
            "",
            "Kontakt",
            `- Name: ${name}`,
            `- E-Mail: ${email}`,
            `- Telefon: ${phone || "-"}`,
            `- Bevorzugter Kontakt: ${contactPreference ?? "-"}`,
            `- Thema: ${topicNice}`,
            `- Rückruf gewünscht: ${callbackRequested ? "Ja" : "Nein"}`,
            "",
            "Objekt-Kontext",
            `- Objekt/Slug: ${listing || "-"}`,
            `- Objekttitel: ${listingTitle || "-"}`,
            "",
            "Terminwunsch",
            `- Datum: ${preferredDate || "-"}`,
            `- Zeitfenster: ${preferredTimeWindow ? timeWindowLabel(preferredTimeWindow) : "-"}`,
            `- Uhrzeit (optional): ${preferredTime || "-"}`,
            `- Dauer: ${durationMinutes} Min.`,
            `- Zeitzone: ${tz || "-"}`,
            "",
            "Nachricht",
            message || "-",
            "",
            "Technische Infos",
            `- Eingegangen: ${receivedAt}`,
            `- IP: ${ip || "-"}`,
            `- User-Agent: ${ua || "-"}`,
        ].join("\n");

        // HTML mail
        const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5;">
        <h2 style="margin:0 0 12px;">Kontaktanfrage (Website)</h2>

        <h3 style="margin:18px 0 8px;">Kontakt</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><b>Name:</b> ${escapeHtml(name)}</li>
          <li><b>E-Mail:</b> ${escapeHtml(email)}</li>
          <li><b>Telefon:</b> ${escapeHtml(phone || "-")}</li>
          <li><b>Bevorzugter Kontakt:</b> ${escapeHtml(contactPreference ?? "-")}</li>
          <li><b>Thema:</b> ${escapeHtml(topicNice)}</li>
          <li><b>Rückruf gewünscht:</b> ${callbackRequested ? "Ja" : "Nein"}</li>
        </ul>

        <h3 style="margin:18px 0 8px;">Objekt-Kontext</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><b>Objekt/Slug:</b> ${escapeHtml(listing || "-")}</li>
          <li><b>Objekttitel:</b> ${escapeHtml(listingTitle || "-")}</li>
        </ul>

        <h3 style="margin:18px 0 8px;">Terminwunsch</h3>
        <ul style="margin:0; padding-left:18px;">
          <li><b>Datum:</b> ${escapeHtml(preferredDate || "-")}</li>
          <li><b>Zeitfenster:</b> ${escapeHtml(
            preferredTimeWindow ? timeWindowLabel(preferredTimeWindow) : "-"
        )}</li>
          <li><b>Uhrzeit (optional):</b> ${escapeHtml(preferredTime || "-")}</li>
          <li><b>Dauer:</b> ${durationMinutes} Min.</li>
          <li><b>Zeitzone:</b> ${escapeHtml(tz || "-")}</li>
        </ul>

        <h3 style="margin:18px 0 8px;">Nachricht</h3>
        <div style="white-space:pre-wrap; border:1px solid #eee; padding:12px; border-radius:10px;">
          ${escapeHtml(message || "-")}
        </div>

        <p style="color:#666; margin-top:18px; font-size:12px;">
          Eingegangen: ${escapeHtml(receivedAt)}<br/>
          IP: ${escapeHtml(ip || "-")}<br/>
          User-Agent: ${escapeHtml(ua || "-")}
        </p>
      </div>
    `;

        // ✅ LOG MODE (ohne SMTP)
        const MAIL_MODE = process.env.MAIL_MODE ?? "smtp";
        if (MAIL_MODE === "log") {
            console.log("[api/contact] SUBJECT:", subject);
            console.log("[api/contact] TEXT:\n" + text);

            return NextResponse.json(
                { ok: true, mode: "log", preview: { subject, text, html } },
                { status: 200 }
            );
        }

        // SMTP MODE
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
            auth: { user: SMTP_USER, pass: SMTP_PASS },
            // tls: {
            //     rejectUnauthorized: false, // ⚠️ NUR TEST/DEV
            // },
        });

        await transporter.sendMail({
            from: `"${SMTP_FROM_NAME ?? "Website"}" <${SMTP_USER}>`,
            to: CONTACT_TO_EMAIL,
            subject,
            text,
            html,
            replyTo: email,
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error("[api/contact] ERROR:", err);
        return NextResponse.json(
            { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
            { status: 500 }
        );
    }
}


// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export const runtime = "nodejs"; // nodemailer needs Node runtime

// type Payload = {
//     name: string;
//     email: string;

//     phone?: string;
//     contactPreference?: "telefon" | "email";
//     topic?: string;

//     message?: string;

//     callbackRequested?: boolean;

//     // Terminwunsch (MVP)
//     preferredDate?: string; // yyyy-mm-dd
//     preferredTimeWindow?: string; // e.g. "09-12"
//     preferredTime?: string; // hh:mm
//     durationMinutes?: number;
//     tz?: string;

//     // honeypot
//     website?: string;
// };

// function isValidEmail(email: string) {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// export async function POST(req: Request) {
//     try {
//         const body = (await req.json()) as Partial<Payload>;

//         const name = String(body.name ?? "").trim();
//         const email = String(body.email ?? "").trim();

//         const phone = String(body.phone ?? "").trim();
//         const topic = String(body.topic ?? "").trim();
//         const contactPreference = String(body.contactPreference ?? "").trim();
//         const callbackRequested = Boolean(body.callbackRequested);

//         const message = String(body.message ?? "").trim();

//         const preferredDate = String(body.preferredDate ?? "").trim();
//         const preferredTimeWindow = String(body.preferredTimeWindow ?? "").trim();
//         const preferredTime = String(body.preferredTime ?? "").trim();
//         const durationMinutes = Number(body.durationMinutes ?? 15);
//         const tz = String(body.tz ?? "").trim();

//         const website = String(body.website ?? "").trim(); // honeypot

//         // bot => pretend ok
//         if (website) {
//             return NextResponse.json({ ok: true }, { status: 200 });
//         }

//         if (!name || !email) {
//             return NextResponse.json(
//                 { ok: false, error: "Bitte Name und E-Mail ausfüllen." },
//                 { status: 400 }
//             );
//         }

//         if (!isValidEmail(email)) {
//             return NextResponse.json(
//                 { ok: false, error: "Bitte eine gültige E-Mail angeben." },
//                 { status: 400 }
//             );
//         }

//         // MVP-Validierung:
//         // Entweder Nachricht ODER Rückruf mit Telefonnummer (Termin optional)
//         const hasMessage = message.length > 0;
//         const hasPhoneForCallback = callbackRequested ? phone.length > 0 : true;

//         if (!hasMessage && !callbackRequested) {
//             return NextResponse.json(
//                 { ok: false, error: "Bitte eine Nachricht schreiben oder Rückruf auswählen." },
//                 { status: 400 }
//             );
//         }

//         if (!hasPhoneForCallback) {
//             return NextResponse.json(
//                 { ok: false, error: "Für einen Rückruf bitte eine Telefonnummer angeben." },
//                 { status: 400 }
//             );
//         }

//         const {
//             CONTACT_TO_EMAIL,
//             SMTP_HOST,
//             SMTP_PORT,
//             SMTP_SECURE,
//             SMTP_USER,
//             SMTP_PASS,
//             SMTP_FROM_NAME,
//         } = process.env;

//         if (!CONTACT_TO_EMAIL || !SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
//             return NextResponse.json(
//                 { ok: false, error: "Server-Mail-Konfiguration fehlt (ENV)." },
//                 { status: 500 }
//             );
//         }

//         const transporter = nodemailer.createTransport({
//             host: SMTP_HOST,
//             port: Number(SMTP_PORT),
//             secure: String(SMTP_SECURE).toLowerCase() === "true",
//             auth: {
//                 user: SMTP_USER,
//                 pass: SMTP_PASS,
//             },
//         });

//         const subjectParts = ["Kontaktanfrage", name];
//         if (topic) subjectParts.push(`(${topic})`);
//         const subject = subjectParts.join(": ");

//         const text = [
//             `Name: ${name}`,
//             `E-Mail: ${email}`,
//             phone ? `Telefon: ${phone}` : `Telefon: -`,
//             contactPreference ? `Bevorzugt: ${contactPreference}` : `Bevorzugt: -`,
//             topic ? `Thema: ${topic}` : `Thema: -`,
//             `Rückruf gewünscht: ${callbackRequested ? "Ja" : "Nein"}`,
//             "",
//             "Terminwunsch:",
//             `Datum: ${preferredDate || "-"}`,
//             `Zeitfenster: ${preferredTimeWindow || "-"}`,
//             `Uhrzeit (optional): ${preferredTime || "-"}`,
//             `Dauer: ${Number.isFinite(durationMinutes) ? `${durationMinutes} Min.` : "-"}`,
//             `Zeitzone: ${tz || "-"}`,
//             "",
//             "Nachricht:",
//             message || "-",
//         ].join("\n");

//         await transporter.sendMail({
//             from: `"${SMTP_FROM_NAME ?? "Website"}" <${SMTP_USER}>`,
//             to: CONTACT_TO_EMAIL,
//             subject,
//             text,
//             replyTo: email,
//         });

//         return NextResponse.json({ ok: true }, { status: 200 });
//     } catch {
//         return NextResponse.json(
//             { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
//             { status: 500 }
//         );
//     }
// }