// components/referenzen/ReferenceDetail.tsx
import Image from "next/image";
import Link from "next/link";
import { ReferencesShell } from "./ReferencesShell";
import type { Reference } from "@/lib/types/references";
import { FileText, Lock, ShieldCheck, Wrench, ArrowRight } from "lucide-react";

type Props = { project: Reference };

function locationText(loc: Reference["location"]) {
  return loc?.label ?? loc?.region ?? "";
}

export function ReferenceDetail({ project }: Props) {
  const loc = locationText(project.location);
  const gallery = project.media?.gallery ?? [];
  const caseStudyPdf = project.documents?.caseStudyPdfUrl;

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

      <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
        {/* Hero */}
        <header className="relative h-[320px] w-full md:h-[460px]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80">
              <span>{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
              {loc ? (
                <>
                  <span>•</span>
                  <span>{loc}</span>
                </>
              ) : null}
            </div>

            <h1 className="mt-3 text-balance text-2xl font-semibold text-white md:text-4xl">
              {project.title}
            </h1>

            {project.subtitle ? (
              <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
                {project.subtitle}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {project.highlights.slice(0, 10).map((h) => (
                <span
                  key={h}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/75"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="grid gap-8 p-6 md:grid-cols-[1.25fr_0.75fr] md:p-8">
          {/* Left */}
          <div className="space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-white">
                Projektüberblick
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">
                {project.description}
              </p>
            </section>

            {/* Case study blocks (optional) */}
            {project.caseStudy?.challenge ||
            project.caseStudy?.approach ||
            project.caseStudy?.result ? (
              <section className="grid gap-3 md:grid-cols-3">
                {project.caseStudy?.challenge ? (
                  <Card
                    title="Ausgangslage"
                    text={project.caseStudy.challenge}
                  />
                ) : null}
                {project.caseStudy?.approach ? (
                  <Card title="Vorgehen" text={project.caseStudy.approach} />
                ) : null}
                {project.caseStudy?.result ? (
                  <Card title="Ergebnis" text={project.caseStudy.result} />
                ) : null}
              </section>
            ) : null}

            {/* Long sections (optional) */}
            {project.sections?.length ? (
              <section className="space-y-5">
                {project.sections.map((s) => (
                  <div
                    key={s.heading}
                    className="rounded-3xl border border-white/10 bg-black/20 p-5"
                  >
                    <h3 className="text-sm font-semibold text-white/90">
                      {s.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      {s.content}
                    </p>
                  </div>
                ))}
              </section>
            ) : null}

            {/* Services */}
            {project.services?.length ? (
              <section>
                <h3 className="text-sm font-semibold text-white/85">
                  Leistungsumfang
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75"
                    >
                      <Wrench className="h-4 w-4 text-white/60" />
                      {s}
                    </span>
                  ))}
                </div>
              </section>
            ) : null}

            {/* Timeline */}
            {project.timeline?.length ? (
              <section>
                <h3 className="text-sm font-semibold text-white/85">Ablauf</h3>
                <ol className="mt-3 space-y-3">
                  {project.timeline.map((t, idx) => (
                    <li
                      key={`${t.title}-${idx}`}
                      className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                        <span className="text-xs font-bold">{idx + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white/90">
                          {t.title}
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                          {t.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {/* Gallery */}
            {gallery.length ? (
              <section>
                <h3 className="text-sm font-semibold text-white/85">Galerie</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {gallery
                    .filter((m) => m.type === "image")
                    .slice(0, 8)
                    .map((m, i) => (
                      <div
                        key={`${m.type}-${m.src}-${i}`}
                        className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"
                      >
                        <Image
                          src={m.src}
                          alt={m.alt ?? project.title}
                          fill
                          className="object-cover opacity-95"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                      </div>
                    ))}
                </div>
              </section>
            ) : null}

            {/* Testimonial */}
            {project.testimonial?.quote ? (
              <section className="rounded-3xl border border-white/10 bg-black/20 p-6">
                <h3 className="text-sm font-semibold text-white/85">
                  Stimme zum Projekt
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  “{project.testimonial.quote}”
                </p>
                {project.testimonial.author || project.testimonial.role ? (
                  <div className="mt-3 text-xs text-white/55">
                    {project.testimonial.author ?? "—"}
                    {project.testimonial.role
                      ? ` • ${project.testimonial.role}`
                      : ""}
                  </div>
                ) : null}
              </section>
            ) : null}
          </div>

          {/* Right */}
          <aside className="space-y-4">
            {project.kpis?.length ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/90">
                  <ShieldCheck className="h-5 w-5 text-white/75" />
                  Kennzahlen
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {project.kpis.slice(0, 8).map((k) => (
                    <div
                      key={k.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3"
                    >
                      <div className="text-[11px] text-white/55">{k.label}</div>
                      <div className="mt-0.5 text-sm font-medium text-white/85">
                        {k.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {project.facts ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white/90">
                  Fakten
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {project.facts.units ? (
                    <Fact label="Einheiten" value={project.facts.units} />
                  ) : null}
                  {project.facts.livingArea ? (
                    <Fact label="Wohnfläche" value={project.facts.livingArea} />
                  ) : null}
                  {project.facts.plotArea ? (
                    <Fact label="Grundstück" value={project.facts.plotArea} />
                  ) : null}
                  {project.facts.rooms ? (
                    <Fact label="Zimmer" value={project.facts.rooms} />
                  ) : null}
                  {project.facts.buildTime ? (
                    <Fact label="Bauzeit" value={project.facts.buildTime} />
                  ) : null}
                  {project.facts.status ? (
                    <Fact label="Status" value={project.facts.status} />
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold text-white/90">
                Unterlagen
              </div>
              <div className="mt-4 space-y-3">
                <DocRow
                  title="Case Study (PDF)"
                  available={Boolean(caseStudyPdf)}
                />
              </div>

              <Link
                href="/kontakt"
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
              >
                Ähnliches Projekt anfragen{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <p className="mt-3 text-xs text-white/50">
                Hinweis: Referenzen sind teils anonymisiert (Region/Typ), um
                Privatsphäre zu wahren.
              </p>
            </div>
          </aside>
        </div>
      </article>
    </ReferencesShell>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
    </div>
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

function DocRow({ title, available }: { title: string; available: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white/85">
        <Lock className="h-4 w-4 text-white/60" />
        {title}
      </div>
      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/70">
        {available ? "DOWNLOAD" : "AUF ANFRAGE"}
      </span>
    </div>
  );
}
