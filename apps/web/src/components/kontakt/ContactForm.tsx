"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  User,
  MessageSquare,
  Send,
  Phone,
  CheckCircle2,
  CalendarDays,
  Clock3,
  Timer,
  HelpCircle,
  FileText,
  ExternalLink,
} from "lucide-react";

type DoneState = null | "ok" | string;

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<DoneState>(null);

  const params = useSearchParams();

  const listing = params.get("listing") ?? "";
  const listingTitle = params.get("title") ?? "";
  const listingHref = listing ? `/objekte/${encodeURIComponent(listing)}` : "";

  const defaultTopic = useMemo(() => {
    // Wenn wir von einer Objektseite kommen, ist "Exposé/Unterlagen" der bessere Default.
    if (listing) return "expose";
    return "allgemein";
  }, [listing]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      contactPreference: String(form.get("contactPreference") ?? "telefon"),
      topic: String(form.get("topic") ?? "allgemein"),
      message: String(form.get("message") ?? ""),
      callbackRequested: form.get("callbackRequested") === "on",

      // Terminwunsch (MVP)
      preferredDate: String(form.get("preferredDate") ?? ""),
      preferredTimeWindow: String(form.get("preferredTimeWindow") ?? ""),
      preferredTime: String(form.get("preferredTime") ?? ""),
      durationMinutes: Number(form.get("durationMinutes") ?? 15),

      // Objekt-Kontext (neu)
      listing: String(form.get("listing") ?? ""),
      listingTitle: String(form.get("listingTitle") ?? ""),

      // honeypot
      website: String(form.get("website") ?? ""),
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:p-8">
      <header className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-white/60">
          KONTAKTFORMULAR
        </div>
        <h2 className="mt-2 text-xl font-semibold text-white">
          Nachricht senden oder Rückruf anfragen
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Hinterlassen Sie Ihre Daten – optional mit Terminwunsch. Wir melden
          uns mit einer Bestätigung zurück.
        </p>
      </header>

      {/* ✅ Objekt-Kontext Karte */}
      {listing ? (
        <div className="mb-6 rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <FileText className="h-5 w-5 text-white/85" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Anfrage zu Objekt
                </div>
                <div className="mt-1 text-sm text-white/75">
                  {listingTitle ? listingTitle : `Objekt ${listing}`}
                </div>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/70">
                  ID/Slug: {listing}
                </div>
              </div>
            </div>

            {listingHref ? (
              <a
                href={listingHref}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
                Objekt ansehen
              </a>
            ) : null}
          </div>

          <p className="mt-3 text-xs text-white/55">
            Tipp: Exposé/Unterlagen werden aus Diskretionsgründen häufig erst
            nach Anfrage freigegeben.
          </p>
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Honeypot */}
        <input
          name="website"
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
        />

        {/* ✅ Hidden Objekt-Kontext */}
        <input type="hidden" name="listing" value={listing} />
        <input type="hidden" name="listingTitle" value={listingTitle} />

        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Name" icon={<User className="h-5 w-5 text-white/60" />}>
            <input
              name="name"
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
              placeholder="Max Mustermann"
            />
          </Field>

          <Field
            label="E-Mail"
            icon={<Mail className="h-5 w-5 text-white/60" />}
          >
            <input
              name="email"
              type="email"
              required
              className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
              placeholder="name@domain.de"
            />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Field
              label="Telefon (optional)"
              icon={<Phone className="h-5 w-5 text-white/60" />}
            >
              <input
                name="phone"
                type="tel"
                className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                placeholder="+49 170 1234567"
                inputMode="tel"
                autoComplete="tel"
              />
            </Field>
            <p className="mt-2 text-xs text-white/50">
              Empfohlen, wenn Sie einen Rückruf wünschen.
            </p>
          </div>

          <div className="grid gap-3">
            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80 backdrop-blur transition hover:bg-white/7">
              <input
                type="checkbox"
                name="callbackRequested"
                className="mt-1 h-4 w-4 accent-white"
              />
              <span className="leading-relaxed">
                Bitte um Rückruf{" "}
                <span className="text-white/50">(wir melden uns zeitnah)</span>
              </span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <Select
                name="contactPreference"
                label="Bevorzugt"
                icon={<HelpCircle className="h-5 w-5 text-white/60" />}
                options={[
                  { value: "telefon", label: "Telefon" },
                  { value: "email", label: "E-Mail" },
                ]}
                defaultValue="telefon"
              />

              <Select
                name="topic"
                label="Thema"
                icon={<MessageSquare className="h-5 w-5 text-white/60" />}
                options={[
                  { value: "allgemein", label: "Allgemein" },
                  {
                    value: "expose",
                    label: "Exposé / Unterlagen (auf Anfrage)",
                  },
                  { value: "kaufen", label: "Immobilie kaufen" },
                  { value: "neubau", label: "Neubau / vom Papier weg" },
                  { value: "verkauf", label: "Verkauf / Vermarktung" },
                ]}
                defaultValue={defaultTopic}
              />
            </div>
          </div>
        </div>

        {/* Terminwunsch (MVP) */}
        <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
          <div className="mb-4">
            <div className="text-sm font-semibold text-white">Terminwunsch</div>
            <div className="mt-1 text-xs text-white/60">
              Wir bestätigen den Termin per E-Mail/Telefon.
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Field
              label="Datum"
              icon={<CalendarDays className="h-5 w-5 text-white/60" />}
            >
              <input
                type="date"
                name="preferredDate"
                className="w-full bg-transparent text-white outline-none"
              />
            </Field>

            <Select
              name="preferredTimeWindow"
              label="Zeitfenster"
              icon={<Clock3 className="h-5 w-5 text-white/60" />}
              options={[
                { value: "", label: "Bitte wählen" },
                { value: "09-12", label: "09:00 – 12:00" },
                { value: "12-15", label: "12:00 – 15:00" },
                { value: "15-18", label: "15:00 – 18:00" },
                { value: "18-20", label: "18:00 – 20:00" },
              ]}
              defaultValue=""
            />

            <Select
              name="durationMinutes"
              label="Dauer"
              icon={<Timer className="h-5 w-5 text-white/60" />}
              options={[
                { value: "15", label: "15 Min." },
                { value: "30", label: "30 Min." },
                { value: "45", label: "45 Min." },
              ]}
              defaultValue="15"
            />
          </div>

          <div className="mt-4">
            <Field
              label="Bevorzugte Uhrzeit (optional)"
              icon={<Clock3 className="h-5 w-5 text-white/60" />}
            >
              <input
                type="time"
                name="preferredTime"
                className="w-full bg-transparent text-white outline-none"
              />
            </Field>
            <p className="mt-2 text-xs text-white/55">
              Wenn möglich richten wir uns danach – ansonsten innerhalb Ihres
              Zeitfensters.
            </p>
          </div>
        </div>

        {/* Nachricht */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
            Nachricht (optional)
          </label>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <div className="mb-2 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-white/60" />
              <span className="text-sm text-white/70">Worum geht es?</span>
            </div>
            <textarea
              name="message"
              rows={6}
              className="w-full resize-none bg-transparent text-white outline-none placeholder:text-white/35"
              placeholder="Kurzbeschreibung (z.B. Objekt, Standort, Budget, Fragen)…"
            />
          </div>
          <p className="mt-2 text-xs text-white/50">
            Wenn Sie nur einen Rückruf möchten, kann das Feld leer bleiben.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {loading ? "Senden…" : "Absenden"}
        </button>

        {done === "ok" ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5" />
              <div>
                <div className="font-semibold">Vielen Dank!</div>
                <div className="mt-1 text-emerald-100/80">
                  Ihre Anfrage ist eingegangen. Wir melden uns zeitnah bei
                  Ihnen.
                </div>
              </div>
            </div>
          </div>
        ) : done ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
            {done}
          </div>
        ) : null}

        <p className="text-xs text-white/50">
          Hinweis: Ihre Daten werden ausschließlich zur Bearbeitung Ihrer
          Anfrage verwendet.
        </p>
      </form>
    </section>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        {icon}
        {children}
      </div>
    </div>
  );
}

function Select({
  name,
  label,
  icon,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        {icon}
        <select
          name={name}
          className="w-full bg-transparent text-white outline-none"
          defaultValue={defaultValue}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-black">
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
