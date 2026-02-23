import Link from "next/link";

export function ReferencesHeader() {
  return (
    <section className="mb-10 md:mb-12">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Referenzen • Neubau • Sanierung • Projektentwicklung • Verkauf
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-[1.4fr_0.6fr] md:items-end">
        <div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Immobilien, die{" "}
            <span className="text-white/70">nicht nur gut aussehen</span>{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              sondern geliefert werden.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-white/70 md:text-base">
            Eine Auswahl abgeschlossener Projekte: schlüsselfertige Immobilien,
            Sanierungen sowie Entwicklungen „vom Papier weg“ – mit Fokus auf
            Qualität, Zeitplan und Klarheit in der Abwicklung.
          </p>
        </div>

        <div className="flex items-center gap-3 md:justify-end">
          <Link
            href="/kontakt"
            className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Beratung anfragen
          </Link>
          <Link
            href="/immobilien"
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/10"
          >
            Aktuelle Angebote
          </Link>
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
