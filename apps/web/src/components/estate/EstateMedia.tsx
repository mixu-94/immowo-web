import type { Listing } from "@/lib/types/listings";
import SmartImage from "@/components/base/SmartImage";

type Props = { estate: Listing };

export function EstateMedia({ estate }: Props) {
  const images: string[] =
    (estate as any).images ?? (estate as any).gallery ?? [];

  if (!images.length) return null;

  return (
    <section className="grid gap-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {images.slice(0, 3).map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <SmartImage src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
