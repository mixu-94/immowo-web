// app/unternehmen/page.tsx
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Handshake,
  Scale,
  Lock,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="text-white/90">{icon}</div>
        <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label}
        </div>
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-3">
        <div className="text-white/90">{icon}</div>
        <h3 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-white/75">{text}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/85">
      <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/80" />
      <span>{children}</span>
    </li>
  );
}

export default function UnternehmenPage() {
  return (
    <main className="min-h-screen bg-[var(--a-black-3)]">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-[var(--a-black-3)]" />

        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              VERTRAUEN • DISKRETION • QUALITÄT
            </div>

            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
              Unternehmen
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/75 md:text-lg">
              Wir stehen für eine hochprofessionelle Beratung rund um exklusive
              Immobilien — mit klaren Prozessen, höchster Transparenz und einem
              Anspruch, der sich an Premium-Standards orientiert.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
              >
                Kontakt aufnehmen
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/objekte/moderne-villa-mit-seeblick-re1"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                Objekte ansehen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<ShieldCheck className="h-5 w-5" />}
              label="Verlässlichkeit"
              value="Premium Prozesse"
            />
            <StatCard
              icon={<Handshake className="h-5 w-5" />}
              label="Diskretion"
              value="Vertrauliche Beratung"
            />
            <StatCard
              icon={<Scale className="h-5 w-5" />}
              label="Transparenz"
              value="Klare Konditionen"
            />
            <StatCard
              icon={<Lock className="h-5 w-5" />}
              label="Sicherheit"
              value="Datenschutz by Design"
            />
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto w-full max-w-7xl px-6 pb-16">
        {/* Trust pillars */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Feature
            icon={<Award className="h-5 w-5" />}
            title="Exzellenter Qualitätsanspruch"
            text="Wir arbeiten strukturiert, schnell und präzise — mit einem Standard, der an erstklassige Serviceanbieter angelehnt ist. Jede Anfrage wird sorgfältig geprüft, jede Empfehlung ist nachvollziehbar."
          />
          <Feature
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Reputation durch Ergebnisse"
            text="Unser Fokus liegt auf nachhaltigen Lösungen: saubere Unterlagen, klare Kommunikation und eine zuverlässige Begleitung — von der ersten Anfrage bis zur finalen Entscheidung."
          />
          <Feature
            icon={<Globe className="h-5 w-5" />}
            title="Modern & international anschlussfähig"
            text="Digitale Prozesse, hochwertige Exposés und ein professionelles Handling sorgen für eine Erfahrung, die sich auf jedem Endgerät konsequent premium anfühlt."
          />
        </section>

        {/* How we work */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <Handshake className="h-5 w-5 text-white/90" />
            <h2 className="text-base font-semibold tracking-tight text-white">
              So arbeiten wir
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <ul className="grid grid-cols-1 gap-3">
              <Bullet>
                Erstgespräch mit klarer Erwartungshaltung und vertraulichem
                Rahmen
              </Bullet>
              <Bullet>
                Sorgfältige Prüfung von Objekt- und Marktdaten (Plausibilität &
                Qualität)
              </Bullet>
              <Bullet>
                Transparente Schritte, damit Sie jederzeit wissen, wo Sie stehen
              </Bullet>
            </ul>

            <ul className="grid grid-cols-1 gap-3">
              <Bullet>
                Hochwertige Aufbereitung (Exposé, Unterlagen, Medien, Struktur)
              </Bullet>
              <Bullet>
                Diskrete Abstimmung mit Eigentümern, Partnern und Interessenten
              </Bullet>
              <Bullet>
                Professionelle Begleitung bis zur Entscheidung und darüber
                hinaus
              </Bullet>
            </ul>
          </div>
        </section>

        {/* Compliance / trust note */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-3">
              <Scale className="h-5 w-5 text-white/90" />
              <h3 className="text-base font-semibold tracking-tight text-white">
                Transparenz & Fairness
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              Klare Kommunikation, nachvollziehbare Konditionen und ein
              professioneller Umgang mit sensiblen Informationen sind für uns
              selbstverständlich. Hinweise zu Courtage, Abläufen und
              Verpflichtungen stellen wir eindeutig und verständlich dar.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-3">
              <Lock className="h-5 w-5 text-white/90" />
              <h3 className="text-base font-semibold tracking-tight text-white">
                Datenschutz & Diskretion
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-white/75">
              Ihre Daten behandeln wir strikt vertraulich. Prozesse sind so
              gestaltet, dass nur notwendige Informationen verarbeitet werden —
              sicher, minimiert und mit einem hohen Anspruch an
              Datensparsamkeit.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-base font-semibold tracking-tight text-white">
                Bereit für ein Erstgespräch?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Wir beantworten Fragen strukturiert und transparent — damit Sie
                schnell Klarheit haben und fundiert entscheiden können.
              </p>
            </div>

            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
            >
              Kontakt aufnehmen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
