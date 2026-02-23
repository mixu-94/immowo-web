import type { Listing } from "@/lib/types/listings";
import { EstateHero } from "./EstateHero";
import { EstateFacts } from "./EstateFacts";
import { EstateMedia } from "./EstateMedia";
import { EstateDescription } from "./EstateDescription";
import { EstateAmenities } from "./EstateAmenities";
import { EstateCTA } from "./EstateCTA";

type Props = { estate: Listing };

export function EstatePage({ estate }: Props) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="flex flex-col gap-10">
        <EstateHero estate={estate} />
        <EstateMedia estate={estate} />
        <EstateFacts estate={estate} />
        <EstateDescription estate={estate} />
        <EstateAmenities estate={estate} />
        <EstateCTA estate={estate} />{" "}
      </div>
    </main>
  );
}
