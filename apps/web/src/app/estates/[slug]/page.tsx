// app/objekte/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Bath,
  BedDouble,
  Calendar,
  CheckCircle2,
  Euro,
  Flame,
  Home,
  Images,
  Info,
  KeyRound,
  LandPlot,
  Leaf,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { getEstateBySlug } from "@/lib/data/listings";
import type { EstateDetails } from "@/lib/types/listings";
import { ExternalMediaGate } from "@/components/consent/EcternalMediaGate";
import { MapEmbed } from "@/components/media/MapEmbed";
import { MediaGallery } from "@/components/media/MediaGallery";

function formatEUR(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="mt-0.5 text-white/90">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label}
        </div>
        <div className="mt-1 break-words text-sm font-semibold text-white/95">
          {value}
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/7"
    >
      <div className="mt-0.5 text-white/90">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {label}
        </div>
        <div className="mt-1 break-words text-sm font-semibold text-white/95">
          {value}
        </div>
      </div>
    </a>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="text-white/90">{icon}</div>
        <h2 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export default async function ObjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const listing = (await getEstateBySlug(params.slug)) as EstateDetails | null;
  if (!listing) notFound();

  const heroIsVideo = Boolean(listing.videoSrc);
  const heroIsImage = Boolean(listing.imageSrc) && !heroIsVideo;

  // ✅ Ansprechpartner (später kannst du das sauber aus listing/CMS ziehen)
  const agent = {
    name: "Max Mustermann",
    role: "Immobilienberater • ArchiVend",
    phone: "+49 123 456 789",
    phoneHref: "tel:+49123456789",
    email: "makler@archivend.de",
    emailHref: "mailto:makler@archivend.de",
    imageSrc: "/assets/team/makler.jpg", // <- anpassen
    availability: "Mo–Fr 9–18 Uhr",
  };

  return (
    <main className="min-h-screen bg-[var(--a-black-3)]">
      {/* HERO */}
      <header className="relative w-full overflow-hidden">
        <div className="relative h-[62vh] min-h-[520px] w-full">
          {heroIsVideo ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={listing.videoSrc}
              controls
              playsInline
              preload="metadata"
            />
          ) : heroIsImage ? (
            <Image
              src={listing.imageSrc}
              alt={listing.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />
          <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_140px_rgba(0,0,0,0.6)]" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
            <div
              className="
                absolute inset-0
                backdrop-blur-md
                bg-black/20
                [mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
                [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_45%,black)]
              "
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-[var(--a-black-3)]" />
          </div>

          <div className="absolute left-0 right-0 top-0 z-10">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur transition hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                ZURÜCK
              </Link>

              <div className="flex items-center gap-2">
                {listing.badge ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                    <BadgeCheck className="h-4 w-4" />
                    {listing.badge}
                  </span>
                ) : null}

                {heroIsVideo ? (
                  <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur sm:inline-flex">
                    <PlayCircle className="h-4 w-4" />
                    VIDEO
                  </span>
                ) : heroIsImage ? (
                  <span className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur sm:inline-flex">
                    <Images className="h-4 w-4" />
                    FOTO
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {/* NOTE: Tailwind doesn't have z-1 by default; use z-[1] */}
          <div className="absolute inset-0 z-[1] flex items-end">
            <div className="mx-auto w-full max-w-7xl px-6 pb-10">
              <div className="max-w-3xl">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  {listing.location ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </span>
                  ) : null}

                  {listing.commissionText ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                      <KeyRound className="h-4 w-4" />
                      COURTAGE
                    </span>
                  ) : null}
                </div>

                <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-5xl [text-shadow:0_10px_40px_rgba(0,0,0,0.55)]">
                  {listing.title}
                </h1>

                {typeof listing.price === "number" && listing.price > 0 ? (
                  <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
                    <Euro className="h-5 w-5 text-white/90" />
                    <span className="text-lg font-semibold text-white">
                      {formatEUR(listing.price)}
                    </span>
                    <span className="text-xs font-semibold tracking-widest text-white/60">
                      KAUFPREIS
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            {listing.highlights?.length ? (
              <Section
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Highlights"
              >
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {listing.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/80" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {listing.description ? (
              <Section icon={<Info className="h-5 w-5" />} title="Beschreibung">
                <p className="text-sm leading-relaxed text-white/85 md:text-base">
                  {listing.description}
                </p>
              </Section>
            ) : null}

            {listing.features?.length ? (
              <Section icon={<Home className="h-5 w-5" />} title="Ausstattung">
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {listing.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/80" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}

            {/* ✅ Galerie: Fotos + Videos + Vollbild (Lightbox) */}
            {listing.gallery?.length || listing.videoSrc ? (
              <Section icon={<Images className="h-5 w-5" />} title="Galerie">
                <MediaGallery
                  altBase={listing.title}
                  media={[
                    ...(listing.gallery ?? []),
                    ...(listing.videoSrc ? [listing.videoSrc] : []), // optional: Hero-Video auch in Galerie
                  ]}
                />
              </Section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            {/* Ansprechpartner / Makler */}
            <Section
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Ihr Ansprechpartner"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <Image
                    src={agent.imageSrc}
                    alt={agent.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/95">
                    {agent.name}
                  </div>
                  <div className="mt-1 text-sm text-white/65">{agent.role}</div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/80 backdrop-blur">
                      <BadgeCheck className="h-4 w-4" />
                      DIREKTKONTAKT
                    </span>

                    {agent.availability ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/75 backdrop-blur">
                        <Calendar className="h-4 w-4" />
                        {agent.availability}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3">
                <ContactRow
                  icon={<Phone className="h-5 w-5" />}
                  label="Telefon"
                  value={agent.phone}
                  href={agent.phoneHref}
                />
                <ContactRow
                  icon={<Mail className="h-5 w-5" />}
                  label="E-Mail"
                  value={agent.email}
                  href={agent.emailHref}
                />

                <Link
                  href="/kontakt"
                  className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition hover:bg-white/90"
                >
                  Rückruf anfordern
                </Link>

                <p className="text-xs leading-relaxed text-white/60">
                  Schreiben oder rufen Sie direkt an – wir melden uns in der
                  Regel innerhalb von 24 Stunden zurück.
                </p>
              </div>
            </Section>

            <Section icon={<Ruler className="h-5 w-5" />} title="Eckdaten">
              <div className="grid grid-cols-1 gap-3">
                <InfoRow
                  icon={<Euro className="h-5 w-5" />}
                  label="Kaufpreis"
                  value={
                    typeof listing.price === "number" && listing.price > 0
                      ? formatEUR(listing.price)
                      : undefined
                  }
                />
                <InfoRow
                  icon={<Ruler className="h-5 w-5" />}
                  label="Wohnfläche"
                  value={
                    typeof listing.livingArea === "number"
                      ? `${listing.livingArea} m²`
                      : undefined
                  }
                />
                <InfoRow
                  icon={<LandPlot className="h-5 w-5" />}
                  label="Grundstück"
                  value={
                    typeof listing.plotArea === "number"
                      ? `${listing.plotArea} m²`
                      : undefined
                  }
                />
                <InfoRow
                  icon={<Home className="h-5 w-5" />}
                  label="Zimmer"
                  value={listing.rooms}
                />
                <InfoRow
                  icon={<BedDouble className="h-5 w-5" />}
                  label="Schlafzimmer"
                  value={listing.bedrooms}
                />
                <InfoRow
                  icon={<Bath className="h-5 w-5" />}
                  label="Badezimmer"
                  value={listing.bathrooms}
                />
                <InfoRow
                  icon={<Calendar className="h-5 w-5" />}
                  label="Baujahr"
                  value={listing.yearBuilt}
                />
                <InfoRow
                  icon={<Flame className="h-5 w-5" />}
                  label="Heizung"
                  value={listing.heatingType}
                />
                <InfoRow
                  icon={<Leaf className="h-5 w-5" />}
                  label="Energieklasse"
                  value={listing.energyClass}
                />
                <InfoRow
                  icon={<KeyRound className="h-5 w-5" />}
                  label="Verfügbarkeit"
                  value={listing.availability}
                />
              </div>
            </Section>

            {listing.geo?.lat && listing.geo?.lng ? (
              <Section icon={<MapPin className="h-5 w-5" />} title="Lage">
                <ExternalMediaGate
                  cookieName="consent_external_maps"
                  title="Externe Karte"
                  description="Zum Anzeigen der Karte wird OpenStreetMap als externer Dienst geladen. Erst nach deiner Zustimmung wird die Karte angezeigt."
                >
                  <MapEmbed
                    lat={listing.geo.lat}
                    lng={listing.geo.lng}
                    zoom={15}
                    title={`${listing.title} – Lage`}
                  />
                </ExternalMediaGate>
              </Section>
            ) : listing.location ? (
              <Section icon={<MapPin className="h-5 w-5" />} title="Lage">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Ort
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white/90">
                    {listing.location}
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    Für die Karte fehlen Koordinaten (lat/lng). Hinterlege bitte
                    geo-Daten im Listing.
                  </p>
                </div>
              </Section>
            ) : null}

            {listing.commissionText ? (
              <Section
                icon={<KeyRound className="h-5 w-5" />}
                title="Maklerhinweis"
              >
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm leading-relaxed text-white/85">
                    {listing.commissionText}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/80">
                    <BadgeCheck className="h-4 w-4" />
                    TRANSPARENZ
                  </div>
                </div>
              </Section>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  );
}

// Optional: better title per object (works with app router)
// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   const listing = getAllListings()
//     .map((l) => ({ ...l, slug: makeListingSlug(l) }))
//     .find((l) => l.slug === params.slug);
//   if (!listing) return { title: "Objekt nicht gefunden" };
//   return { title: `${listing.title} | adaki` };
// }
