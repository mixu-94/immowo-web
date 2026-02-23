import type { Listing } from "@/lib/types/listings";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = { estate: Listing };

export function EstateCTA({ estate }: Props) {
  const contactHref = "/kontakt";
  const expose = (estate as any).exposeUrl as string | undefined;

  return (
    <section className="rounded-2xl border p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="font-semibold">Interesse?</div>
        <div className="text-sm text-muted-foreground">
          Schreib uns, wir senden dir weitere Infos oder ein Exposé.
        </div>
      </div>

      <div className="flex gap-2">
        <Button asChild>
          <Link href={contactHref}>Anfrage senden</Link>
        </Button>

        {expose ? (
          <Button asChild variant="outline">
            <a href={expose} target="_blank" rel="noreferrer">
              Exposé
            </a>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
