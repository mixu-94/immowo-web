// components/immobilien/ListingCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Ruler, BedDouble, Leaf } from "lucide-react";
import type { ListingLike } from "./filters";

function formatEUR(value?: number) {
  if (!value || value <= 0) return "Preis auf Anfrage";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ListingCard({ listing }: { listing: ListingLike }) {
  const slug = listing.slug ?? listing.id ?? "";
  const href = `/objekte/${encodeURIComponent(slug)}`;

  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/7"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={listing.imageSrc ?? "/assets/images/real-estate/realestate1.jpg"}
          alt={listing.title}
          fill
          className="object-cover opacity-95 transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-xs text-white/75">
            {listing.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.location}
              </span>
            ) : null}
          </div>
          <div className="mt-1 line-clamp-1 text-lg font-semibold text-white">
            {listing.title}
          </div>
          <div className="mt-1 text-sm font-semibold text-white/90">
            {formatEUR(listing.price)}
          </div>
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div className="grid grid-cols-3 gap-2">
          <Mini
            icon={<Ruler className="h-4 w-4 text-white/70" />}
            value={listing.livingArea ? `${listing.livingArea} m²` : "—"}
          />
          <Mini
            icon={<BedDouble className="h-4 w-4 text-white/70" />}
            value={listing.rooms ? `${listing.rooms} Zi.` : "—"}
          />
          <Mini
            icon={<Leaf className="h-4 w-4 text-white/70" />}
            value={listing.energyClass ?? "—"}
          />
        </div>

        <div className="flex items-center justify-between text-sm text-white/70">
          <span className="line-clamp-1">
            {listing.badge ?? "Premium Listing"}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-white/85">
            Details <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function Mini({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3 text-center">
      <div className="mx-auto mb-1 flex w-full items-center justify-center">
        {icon}
      </div>
      <div className="text-xs font-semibold text-white/85">{value}</div>
    </div>
  );
}
