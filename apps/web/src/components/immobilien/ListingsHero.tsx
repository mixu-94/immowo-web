import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  FileText,
  MapPin,
} from "lucide-react";

export function ListingsHero({ total }: { total: number }) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 backdrop-blur">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_60%)] blur-3xl" />
        <div className="absolute -top-24 right-[-160px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_62%)] blur-3xl" />
      </div>

      <div className="relative p-6 md:p-10">
        {/* Top: Search-first bar */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">
              IMMOBILIENÜBERSICHT
            </div>
            <h1 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-white md:text-4xl">
              Entdecken Sie{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
                ausgewählte Angebote
              </span>
              .
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
              {total} Objekte – schlüsselfertig, ausgewählte Bestandsimmobilien
              und Projekte „vom Papier weg“. Viele Unterlagen erhalten Sie
              diskret{" "}
              <span className="text-white/90 font-semibold">auf Anfrage</span>.
            </p>
          </div>

          {/* “Search Prompt” – wirkt wie Premium Portal */}
          <div className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur lg:min-w-[360px]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                <Search className="h-5 w-5 text-white/80" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">
                  Schnell finden
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Nutzen Sie die Filter: Typ, Region, Preis, Fläche, Zimmer.
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#filter"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Filter öffnen <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/kontakt"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                Beratung <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Middle: Cinematic image strip (statt Collage) */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 flex items-center justify-center ">
          <div className="relative md:flex gap-3 hidden  p-3 ">
            <StripImage
              src="/assets/images/real-estate/realestate1.jpg"
              alt="Immobilie 1"
            />
            <StripImage
              src="/assets/images/real-estate/realestate2.jpg"
              alt="Immobilie 2"
            />
            <StripImage
              src="/assets/images/real-estate/realestate3.jpg"
              alt="Immobilie 3"
            />
            <StripImage
              src="/assets/images/real-estate/realestate4.jpg"
              alt="Immobilie 4"
            />
          </div>
        </div>

        {/* Bottom: trust row */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <Trust
            icon={<ShieldCheck className="h-4 w-4 text-white/80" />}
            title="Professionell aufbereitet"
            text="Eckdaten klar strukturiert – effizient entscheiden."
          />
          <Trust
            icon={<FileText className="h-4 w-4 text-white/80" />}
            title="Unterlagen auf Anfrage"
            text="Exposé/Adresse/Docs diskret nach Kontakt."
          />
          <Trust
            icon={<MapPin className="h-4 w-4 text-white/80" />}
            title="Region statt Adresse"
            text="Diskretion bleibt gewahrt – Details im Gespräch."
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.45)]" />
    </section>
  );
}

function StripImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[180px] w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 sm:h-[210px] sm:w-[260px]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-95"
        sizes="260px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </div>
  );
}

function Trust({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
        {icon}
        {title}
      </div>
      <div className="mt-2 text-sm text-white/70">{text}</div>
    </div>
  );
}
