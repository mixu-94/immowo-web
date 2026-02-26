import { Listing } from "@/lib/types/listings";
import Image from "next/image";
import Link from "next/link";

type Props = { item: Listing };

export default function ListingCard({ item }: Props) {
  return (
    <Link
      href={item.href}
      className="
        group relative block flex-[0_0_auto]
        h-[150px] w-[260px] md:h-[170px] md:w-[300px]
        mr-3 outline-none cursor-pointer
      "
    >
      <div
        className="
          relative h-full w-full overflow-hidden rounded-xl
          bg-neutral-900 ring-1 ring-white/10 shadow-lg
          transition-all duration-300 ease-out
          group-hover:-translate-y-1 group-hover:shadow-2xl
          group-hover:ring-2 group-hover:ring-blue-400/40
          group-hover:scale-[1.03]
          group-focus-visible:-translate-y-1 group-focus-visible:shadow-2xl
          group-focus-visible:ring-2 group-focus-visible:ring-blue-400/40
          group-focus-visible:scale-[1.03]
        "
      >
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="
            object-cover
            transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]
            group-hover:scale-110 group-focus-visible:scale-110
          "
          sizes="(max-width: 768px) 260px, 300px"
        />

        {/* Overlays: pointer-events-none, damit Hover garantiert über die ganze Card wirkt */}
        <div
          className="
            pointer-events-none absolute inset-0
            opacity-0 transition-opacity duration-300
            group-hover:opacity-100 group-focus-visible:opacity-100
            bg-[radial-gradient(60%_60%_at_50%_20%,rgba(59,130,246,0.35),transparent_60%)]
          "
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0 opacity-80 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />

        {item.badge && (
          <div className="absolute right-3 top-3 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white shadow">
            {item.badge}
          </div>
        )}

        <div
          className="
            absolute bottom-0 left-0 right-0 p-4
            translate-y-4 opacity-0
            transition-all duration-300 ease-out
            group-hover:translate-y-0 group-hover:opacity-100
            group-focus-visible:translate-y-0 group-focus-visible:opacity-100
          "
        >
          <h3 className="text-sm font-semibold text-white drop-shadow md:text-base">
            {item.title}
          </h3>

          {item.location && (
            <p className="text-xs text-white/80">{item.location}</p>
          )}

          <div className="mt-2 flex items-center justify-between text-xs text-white/70">
            <span>Exposé ansehen</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
