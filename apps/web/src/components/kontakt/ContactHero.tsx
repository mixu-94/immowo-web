import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall, Clock, ShieldCheck } from "lucide-react";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur">
      <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-10 md:items-center">
        {/* Left: editorial text */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold tracking-widest text-white/85">
            KONTAKT • RÜCKRUF • TERMINWUNSCH
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Persönlich erreichbar –{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
              diskret & professionell
            </span>
            .
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
            Ob schlüsselfertige Immobilie oder Neubauprojekt „vom Papier weg“:
            Wir klären die nächsten Schritte strukturiert – und melden uns
            zeitnah mit einer Bestätigung.
          </p>

          {/* Trust row (different look than other pages) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <MiniTrust
              icon={<Clock className="h-4 w-4 text-white/80" />}
              title="Schnelle Rückmeldung"
              text="Terminvorschlag & Bestätigung"
            />
            <MiniTrust
              icon={<ShieldCheck className="h-4 w-4 text-white/80" />}
              title="Diskret"
              text="Unterlagen auf Anfrage"
            />
            <MiniTrust
              icon={<PhoneCall className="h-4 w-4 text-white/80" />}
              title="Direkt"
              text="Kurzer Draht zum Team"
            />
          </div>
        </div>

        {/* Right: single premium hero image with overlay card */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-cyan-400/15 via-fuchsia-400/10 to-indigo-400/15 blur-2xl" />

          <div className="relative overflow-hidden rounded-[28px] border border-white/10">
            <div className="relative aspect-[4/3] md:aspect-[5/4]">
              <Image
                src="/assets/images/real-estate/realestate6.jpg"
                alt="Beratung & Kontakt"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>

            {/* Overlay card (makes it feel concierge-like) */}
            <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur">
              <div className="text-xs font-semibold tracking-widest text-white/70">
                RÜCKRUF-OPTION
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                Wunschzeit angeben – wir bestätigen den Termin.
              </div>
              <div className="mt-2 text-xs text-white/60">
                Hinweis: Details & Dokumente werden aus Diskretionsgründen
                häufig erst nach Anfrage freigegeben.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.45)]" />
    </section>
  );
}

function MiniTrust({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
        {icon}
        {title}
      </div>
      <div className="mt-1 text-xs text-white/65">{text}</div>
    </div>
  );
}
