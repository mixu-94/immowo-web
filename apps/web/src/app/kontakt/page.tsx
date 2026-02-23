"use client";

import { useState } from "react";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Phone,
  CheckCircle2,
} from "lucide-react";

type DoneState = null | "ok" | string;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<DoneState>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      callbackRequested: form.get("callbackRequested") === "on",
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""), // honeypot
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as any;

    setLoading(false);

    if (!res.ok) {
      setDone(data?.error ?? "Fehler beim Senden.");
      return;
    }

    setDone("ok");
    e.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-[var(--a-black-3)]">
      {/* subtle background polish */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1020] via-[var(--a-black-3)] to-[var(--a-black-3)]" />
        <div className="absolute -left-24 top-[-140px] h-[360px] w-[520px] rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-[-220px] top-[60px] h-[520px] w-[720px] rounded-full bg-white/6 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
        <header className="mb-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/75 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-white/70" />
            Kontakt
          </p>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Rückruf anfragen oder Nachricht senden
          </h1>

          <p className="mt-2 max-w-2xl text-white/70">
            Hinterlassen Sie Ihre Kontaktdaten. Wenn Sie einen Rückruf wünschen,
            setzen Sie einfach den Haken – wir melden uns schnellstmöglich.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl md:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Honeypot (hidden) */}
            <input
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
            />

            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
                  Name
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <User className="h-5 w-5 text-white/60" />
                  <input
                    name="name"
                    required
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                    placeholder="Max Mustermann"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
                  E-Mail
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Mail className="h-5 w-5 text-white/60" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                    placeholder="name@domain.de"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Phone */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
                  Telefonnummer
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <Phone className="h-5 w-5 text-white/60" />
                  <input
                    name="phone"
                    type="tel"
                    className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                    placeholder="+49 170 1234567"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </div>
                <p className="mt-2 text-xs text-white/50">
                  Optional – empfohlen, wenn Sie einen Rückruf wünschen.
                </p>
              </div>

              {/* Callback checkbox */}
              <div className="flex items-center">
                <label className="flex w-full items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur transition hover:bg-white/7">
                  <input
                    type="checkbox"
                    name="callbackRequested"
                    className="mt-1 h-4 w-4 accent-white"
                  />
                  <span className="leading-relaxed">
                    Bitte um Rückruf{" "}
                    <span className="text-white/50">
                      (wir melden uns schnellstmöglich)
                    </span>
                  </span>
                </label>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
                Nachricht (optional)
              </label>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="mb-2 flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-white/60" />
                  <span className="text-sm text-white/70">Worum geht es?</span>
                </div>
                <textarea
                  name="message"
                  rows={6}
                  className="w-full resize-none bg-transparent text-white outline-none placeholder:text-white/35"
                  placeholder="Kurze Beschreibung (z.B. Objekt, Wunsch-Termin, Fragen)…"
                />
              </div>
              <p className="mt-2 text-xs text-white/50">
                Wenn Sie nur einen Rückruf möchten, kann das Feld leer bleiben.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? "Senden…" : "Absenden"}
            </button>

            {done === "ok" ? (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                  <div>
                    <p className="font-semibold">Danke!</p>
                    <p className="mt-1 text-emerald-100/90">
                      Ihre Anfrage wurde gesendet. Wir melden uns
                      schnellstmöglich zurück.
                    </p>
                  </div>
                </div>
              </div>
            ) : done ? (
              <p className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
                {done}
              </p>
            ) : null}
          </form>
        </section>

        {/* small note */}
        <p className="mt-6 text-center text-xs text-white/45">
          Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zur
          Bearbeitung der Anfrage zu.
        </p>
      </div>
    </main>
  );
}
