import type { Listing } from "@/lib/types/listings";
import { InfoRow } from "./InfoRow";

type Props = { estate: Listing };

export function EstateFacts({ estate }: Props) {
  // Passe hier Feldnamen an (z.B. rooms, areaLiving, areaPlot, yearBuilt etc.)
  const rooms = (estate as any).rooms;
  const livingArea = (estate as any).livingArea;
  const plotArea = (estate as any).plotArea;
  const yearBuilt = (estate as any).yearBuilt;

  return (
    <section className="rounded-2xl border p-5">
      <h2 className="mb-4 text-lg font-semibold">Eckdaten</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <InfoRow label="Zimmer" value={rooms ? `${rooms}` : "-"} />
        <InfoRow
          label="Wohnfläche"
          value={livingArea ? `${livingArea} m²` : "-"}
        />
        <InfoRow label="Grundstück" value={plotArea ? `${plotArea} m²` : "-"} />
        <InfoRow label="Baujahr" value={yearBuilt ? `${yearBuilt}` : "-"} />
      </div>
    </section>
  );
}
