// components/objekte/ObjectTrust.tsx
import { BadgeCheck, FileText, ShieldCheck } from "lucide-react";

export function ObjectTrust() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-12">
      <div className="grid gap-4 md:grid-cols-3">
        <Card
          icon={<BadgeCheck className="h-5 w-5 text-white/85" />}
          title="Professionell aufbereitet"
          text="Unterlagen und Fakten übersichtlich, damit Entscheidungen schnell und sicher fallen."
        />
        <Card
          icon={<ShieldCheck className="h-5 w-5 text-white/85" />}
          title="Diskret & verlässlich"
          text="Anfragen behandeln wir vertraulich. Besichtigungen und Rückrufe werden bestätigt."
        />
        <Card
          icon={<FileText className="h-5 w-5 text-white/85" />}
          title="Transparenter Prozess"
          text="Klare Schritte von Exposé bis Termin – ohne unnötige Hürden."
        />
      </div>
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
