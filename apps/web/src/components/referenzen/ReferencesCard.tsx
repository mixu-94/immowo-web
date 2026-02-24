import Image from "next/image";
import Link from "next/link";
import type { ReferenceProperty } from "../../lib/types/references";

type Props = { project: ReferenceProperty };

function statusLabel(
  status?: ReferenceProperty["facts"] extends { status?: infer S } ? S : never,
) {
  switch (status) {
    case "verkauft":
      return "Verkauft";
    case "reserviert":
      return "Reserviert";
    case "in bau":
      return "In Bau";
    case "fertiggestellt":
      return "Fertiggestellt";
    default:
      return "Referenz";
  }
}

export function ReferenceCard({ project }: Props) {
  const badge = statusLabel(project.facts?.status);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/7">
      <Link
        href={`/referenzen/${project.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Referenz öffnen: ${project.title}`}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-400/25 via-fuchsia-400/20 to-indigo-400/20 blur-2xl" />
      </div>

      <div className="relative">
        <div className="relative h-44 w-full overflow-hidden">
          {project.coverImage ? (
            <Image
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs text-white/70">
                {project.category} • {project.year} • {project.location}
              </div>
              <h3 className="mt-1 truncate text-lg font-semibold text-white">
                {project.title}
              </h3>
              {project.subtitle ? (
                <p className="mt-1 line-clamp-1 text-sm text-white/75">
                  {project.subtitle}
                </p>
              ) : null}
            </div>

            <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80">
              {badge}
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <p className="line-clamp-3 text-sm leading-relaxed text-white/75">
            {project.description}
          </p>

          {/* Highlights / Badges */}
          <div className="flex flex-wrap gap-2">
            {project.highlights.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/75"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Facts */}
          {project.facts ? (
            <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-3">
              {project.facts.units ? (
                <div className="min-w-0">
                  <div className="text-[11px] text-white/55">Einheiten</div>
                  <div className="truncate text-sm font-medium text-white/85">
                    {project.facts.units}
                  </div>
                </div>
              ) : null}
              {project.facts.livingArea ? (
                <div className="min-w-0">
                  <div className="text-[11px] text-white/55">Wohnfläche</div>
                  <div className="truncate text-sm font-medium text-white/85">
                    {project.facts.livingArea}
                  </div>
                </div>
              ) : null}
              {project.facts.plotArea ? (
                <div className="min-w-0">
                  <div className="text-[11px] text-white/55">Grundstück</div>
                  <div className="truncate text-sm font-medium text-white/85">
                    {project.facts.plotArea}
                  </div>
                </div>
              ) : project.facts.rooms ? (
                <div className="min-w-0">
                  <div className="text-[11px] text-white/55">Zimmer</div>
                  <div className="truncate text-sm font-medium text-white/85">
                    {project.facts.rooms}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            {project.links?.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
