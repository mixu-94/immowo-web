"use client";

import Link from "next/link";
import { useMemo } from "react";
import { MapPin, BedDouble, Bath, Ruler, Home, BadgeCheck } from "lucide-react";

import type { EstateDetails } from "@/lib/types/listings";
import SmartImage from "@/components/base/SmartImage";

function formatPrice(price?: number, currency: string = "EUR") {
  if (!price || price <= 0) return "Preis auf Anfrage";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatNumber(n?: number, suffix = "") {
  if (!n || n <= 0) return "–";
  return `${n.toLocaleString("de-DE")}${suffix}`;
}

function variantLabel(variant?: string) {
  switch ((variant ?? "").toLowerCase()) {
    case "investment":
      return "Investment";
    case "ready":
      return "Bezugsfertig";
    case "build":
      return "Projekt / Grundstück";
    default:
      return variant ? variant : "Objekt";
  }
}

type Props = {
  listing: EstateDetails;
  className?: string;
};

export default function ListingCard({ listing, className }: Props) {
  const href = useMemo(() => {
    const raw = (listing as any)?.href as string | undefined;
    if (raw && raw.trim().length > 0) return raw;
    const slug = (listing as any)?.slug as string | undefined;
    return slug ? `/objekte/${slug}` : "/";
  }, [listing]);

  const title = (listing as any)?.title ?? "Objekt";
  const locationLabel =
    (listing as any)?.locationLabel ??
    (listing as any)?.locationInfo?.label ??
    (listing as any)?.location ??
    (listing as any)?.locationInfo?.region ??
    "–";

  const status =
    (listing as any)?.status ?? (listing as any)?.classification?.status;
  const variant =
    (listing as any)?.variant ?? (listing as any)?.classification?.variant;

  const price = (listing as any)?.price ?? (listing as any)?.pricing?.price;
  const currency =
    (listing as any)?.currency ?? (listing as any)?.pricing?.currency ?? "EUR";

  const livingArea =
    (listing as any)?.livingArea ?? (listing as any)?.facts?.livingArea;
  const plotArea =
    (listing as any)?.plotArea ?? (listing as any)?.facts?.plotArea;
  const bedrooms =
    (listing as any)?.bedrooms ?? (listing as any)?.facts?.bedrooms;
  const bathrooms =
    (listing as any)?.bathrooms ?? (listing as any)?.facts?.bathrooms;

  const imageSrc =
    (listing as any)?.imageSrc ??
    (listing as any)?.media?.gallery?.[0]?.src ??
    (listing as any)?.media?.galleryUrls?.[0] ??
    "/assets/images/real-estate/placeholder.jpg";

  return (
    <Link
      href={href}
      className={[
        "group block h-full",
        "rounded-[var(--radius-xl)]",
        "border border-[color:var(--color-border)]",
        "bg-[color:var(--color-surface)]",
        "shadow-[var(--shadow-card)]",

        // ✨ smoother + premium hover
        "will-change-transform",
        "transition-[transform,box-shadow,border-color] duration-700 ease-[cubic-bezier(.16,1,.3,1)]",
        "hover:-translate-y-1.5 hover:shadow-[0_28px_70px_rgba(0,0,0,.45)]",
        "hover:border-[color:var(--color-border-strong)]",
        "hover:scale-[1.01]",

        // focus states
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)]/60",
        className ?? "",
      ].join(" ")}
    >
      <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
        <div className="relative aspect-[16/10] w-full">
          <SmartImage
            src={imageSrc}
            alt={title}
            fill
            // ✨ smoother zoom
            className={[
              "h-full w-full object-cover",
              "will-change-transform",
              "transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]",
              "group-hover:scale-[1.10]",
            ].join(" ")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* overlay base gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* ✨ subtle gold glow on hover */}
          <div
            className="
              pointer-events-none absolute inset-0
              opacity-0 transition-opacity duration-700 ease-[cubic-bezier(.16,1,.3,1)]
              group-hover:opacity-100
              bg-[radial-gradient(60%_60%_at_50%_20%,rgba(214,181,109,0.20),transparent_65%)]
            "
          />

          {/* gold line */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-accent)]/70 to-transparent" />

          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            <span
              className="
                inline-flex items-center gap-1.5 rounded-full
                border border-[color:var(--color-border)]
                bg-black/35 px-3 py-1
                text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85
                transition-colors duration-700 ease-[cubic-bezier(.16,1,.3,1)]
                group-hover:border-[color:var(--color-accent)]/40
              "
            >
              <BadgeCheck className="h-3.5 w-3.5 opacity-80" />
              {status ?? "verfügbar"}
            </span>

            <span
              className="
                inline-flex items-center rounded-full
                border border-[color:var(--color-border)]
                bg-black/35 px-3 py-1
                text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85
                transition-colors duration-700 ease-[cubic-bezier(.16,1,.3,1)]
                group-hover:border-[color:var(--color-accent)]/40
              "
            >
              {variantLabel(variant)}
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-base sm:text-lg font-semibold tracking-tight text-white">
                  {title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 opacity-80" />
                  <span className="truncate">{locationLabel}</span>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  Preis
                </div>
                <div className="text-base sm:text-lg font-semibold text-white">
                  {formatPrice(price, currency)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] p-3 transition-colors duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:border-[color:var(--color-border-strong)]">
          <div className="flex items-center gap-2 text-sm text-white/85">
            <Ruler className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            <span className="font-semibold">
              {formatNumber(livingArea, " m²")}
            </span>
            <span className="text-white/60">Wohnfl.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/85">
            <Home className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            <span className="font-semibold">
              {formatNumber(plotArea, " m²")}
            </span>
            <span className="text-white/60">Grund</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/85">
            <BedDouble className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            <span className="font-semibold">{formatNumber(bedrooms)}</span>
            <span className="text-white/60">Schlafz.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/85">
            <Bath className="h-4 w-4 text-[color:var(--color-accent)]/85" />
            <span className="font-semibold">{formatNumber(bathrooms)}</span>
            <span className="text-white/60">Bäder</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center w-full gap-2">
          <div
            className="
              text-xs font-semibold uppercase tracking-[0.18em]
              text-[color:var(--color-accent)] opacity-90
              transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]
              group-hover:opacity-100 group-hover:translate-x-0.5
            "
          >
            Details ansehen{" "}
            <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-0.5">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
