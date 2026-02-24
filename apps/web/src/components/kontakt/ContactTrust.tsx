// components/kontakt/ContactTrust.tsx
import { Lock, Scale, BadgeCheck } from "lucide-react";

export function ContactTrust() {
  return (
    <section className="mt-10 grid gap-6 lg:grid-cols-3">
      <Card
        icon={<BadgeCheck className="h-5 w-5 text-white/85" />}
        title="Professionelle Abwicklung"
        text="Klare Kommunikation, strukturierte Prozesse und nachvollziehbare Unterlagen – damit Entscheidungen sicher getroffen werden."
      />
      <Card
        icon={<Scale className="h-5 w-5 text-white/85" />}
        title="Transparenz & Fairness"
        text="Wir sprechen offen über Ablauf, Konditionen und nächste Schritte – ohne unnötige Reibung."
      />
      <Card
        icon={<Lock className="h-5 w-5 text-white/85" />}
        title="Datenschutz & Diskretion"
        text="Ihre Daten behandeln wir vertraulich und nur zum Zweck der Anfrage. Datensparsamkeit ist Standard."
      />
    </section>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/15 hover:bg-white/7">
      <div className="mb-3 flex items-center gap-3">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-2">
          {icon}
        </div>
        <h3 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-white/75">{text}</p>
    </div>
  );
}
