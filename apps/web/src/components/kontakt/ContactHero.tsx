// components/kontakt/ContactHero.tsx
import Image from "next/image";
import { PhoneCall, Sparkles } from "lucide-react";

const imgs = {
  a: "/assets/images/real-estate/realestate1.jpg",
  b: "/assets/images/real-estate/realestate2.jpg",
  c: "/assets/images/real-estate/realestate3.jpg",
  d: "/assets/images/real-estate/realestate4.jpg",
};

export function ContactHero() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/85 backdrop-blur">
          <Sparkles className="h-4 w-4" />
          KONTAKT • RÜCKRUF • TERMINWUNSCH
        </div>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
          Sprechen wir über{" "}
          <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent">
            Ihr Immobilienvorhaben
          </span>
          .
        </h1>

        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
          Ob schlüsselfertige Immobilie oder Neubauprojekt „vom Papier weg“ –
          wir klären schnell, strukturiert und transparent die nächsten
          Schritte. Hinterlassen Sie eine Nachricht oder einen
          Rückruf-/Terminwunsch.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/70">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            Klare Unterlagen
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            Schnelle Rückmeldung
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
            Bauträger & Verkauf
          </span>
        </div>

        <div className="mt-8 inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <PhoneCall className="h-5 w-5 text-white/85" />
          </div>
          <div className="text-sm text-white/80">
            <div className="font-semibold text-white">Rückruf gewünscht?</div>
            <div className="text-white/65">
              Tragen Sie unten Ihr Zeitfenster ein – wir bestätigen den Termin.
            </div>
          </div>
        </div>
      </div>

      {/* Image collage */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-tr from-cyan-400/15 via-fuchsia-400/10 to-indigo-400/15 blur-2xl" />
        <div className="relative grid gap-3 rounded-[36px] border border-white/10 bg-white/5 p-3 backdrop-blur">
          <div className="grid grid-cols-2 gap-3">
            <Tile
              src={imgs.a}
              alt="Immobilie Außenansicht"
              className="aspect-[4/3]"
            />
            <Tile src={imgs.b} alt="Neubau Referenz" className="aspect-[4/3]" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Tile
              src={imgs.c}
              alt="Innenraum"
              className="col-span-2 aspect-[4/3]"
            />
            <Tile src={imgs.d} alt="Detail" className="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover opacity-95 transition duration-500 hover:scale-[1.03]"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
    </div>
  );
}
