// components/referenzen/ReferenceDetail.tsx
import Image from "next/image";
import Link from "next/link";
import type { ReferenceProperty } from "../../lib/types/references";
import { ReferencesShell } from "./ReferencesShell";

type Props = { project: ReferenceProperty };

export function ReferenceDetail({ project }: Props) {
  return (
    <ReferencesShell>
      <div className="mb-6">
        <Link
          href="/referenzen"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          <span className="text-white/40">←</span> Zurück zu Referenzen
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
        {/* Hero */}
        <div className="relative h-[320px] w-full md:h-[420px]">
          {project.coverImage ? (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              {project.category} • {project.year} • {project.location}
            </div>
            <h1 className="mt-3 text-balance text-2xl font-semibold text-white md:text-4xl">
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
                {project.subtitle}
              </p>
            ) : null}
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-white">
                Projektüberblick
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">
                {project.description}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-white/85">
                Highlights
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold text-white/90">Fakten</div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                {project.facts?.units ? (
                  <Fact label="Einheiten" value={project.facts.units} />
                ) : null}
                {project.facts?.livingArea ? (
                  <Fact label="Wohnfläche" value={project.facts.livingArea} />
                ) : null}
                {project.facts?.plotArea ? (
                  <Fact label="Grundstück" value={project.facts.plotArea} />
                ) : null}
                {project.facts?.rooms ? (
                  <Fact label="Zimmer" value={project.facts.rooms} />
                ) : null}
                {project.facts?.buildTime ? (
                  <Fact label="Bauzeit" value={project.facts.buildTime} />
                ) : null}
                {project.facts?.status ? (
                  <Fact label="Status" value={project.facts.status} />
                ) : null}
              </div>

              <div className="mt-5 h-px w-full bg-white/10" />

              <Link
                href="/kontakt"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
              >
                Ähnliches Projekt anfragen
              </Link>

              <p className="mt-3 text-xs text-white/50">
                Hinweis: Referenzen sind teils anonymisiert (Region/Typ), um
                Privatsphäre zu wahren.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </ReferencesShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-0.5 font-medium text-white/85">{value}</div>
    </div>
  );
}
