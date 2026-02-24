import Image from "next/image";
import Link from "next/link";

type LocationLike = string | { label?: string; region?: string } | undefined;

type ReferenceLike = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  location?: LocationLike;
  description: string;
  highlights: string[];
  facts?: {
    units?: string;
    livingArea?: string;
    plotArea?: string;
    rooms?: string;
    buildTime?: string;
    status?: string;
  };
  coverImage?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

type Props = { project: ReferenceLike };

function formatLocation(loc: LocationLike) {
  if (!loc) return "";
  if (typeof loc === "string") return loc;
  return loc.label ?? loc.region ?? "";
}

function statusLabel(
  status?: ReferenceLike["facts"] extends { status?: infer S } ? S : never,
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
  const href =
    project.links?.find((l) => l.label.toLowerCase().includes("details"))
      ?.href ?? `/referenzen/${encodeURIComponent(project.slug)}`;

  const badge = statusLabel(project.facts?.status);
  const loc = formatLocation(project.location);

  return (
    <Link
      href={href}
      className="group block relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/7"
    >
      <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/7">
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
                  {project.category} • {project.year}
                  {loc ? ` • ${loc}` : ""}
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

            {project.facts ? (
              <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-4 md:grid-cols-3">
                {project.facts.units ? (
                  <Fact label="Einheiten" value={project.facts.units} />
                ) : null}
                {project.facts.livingArea ? (
                  <Fact label="Wohnfläche" value={project.facts.livingArea} />
                ) : null}
                {project.facts.plotArea ? (
                  <Fact label="Grundstück" value={project.facts.plotArea} />
                ) : project.facts.rooms ? (
                  <Fact label="Zimmer" value={project.facts.rooms} />
                ) : null}
              </div>
            ) : null}

            {project.links?.length ? (
              <div className="flex flex-wrap items-center gap-3">
                {project.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-2xl bg-white px-4 py-2.5 text-sm font-medium text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="truncate text-sm font-medium text-white/85">{value}</div>
    </div>
  );
}
