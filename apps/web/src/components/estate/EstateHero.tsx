import type { Listing } from "@/lib/types/listings";
import { formatEUR } from "./formatters";

type Props = { estate: Listing };

export function EstateHero({ estate }: Props) {
  // Passe hier die Feldnamen an dein Listing-Modell an
  const title = (estate as any).title ?? (estate as any).name ?? "Objekt";
  const price = (estate as any).price;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{formatEUR(price)}</span>
          {(estate as any).location ? (
            <span>• {(estate as any).location}</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
