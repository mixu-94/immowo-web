import { ListingsShell } from "./ListingsShell";
import { ListingsHero } from "./ListingsHero";
import { ListingsToolbar } from "./ListingsToolbar";
import { ListingsGrid } from "./ListingsGrid";

// ✅ wichtig: hier nur eine Datenquelle
// später: wird das Payload fetch
import { getListings } from "@/lib/data/listings";

export async function ListingsPage() {
  const listings = await getListings();

  return (
    <ListingsShell>
      <ListingsHero total={listings.length} />
      <ListingsToolbar listings={listings} />
      <h2 className="mt-10 text-xl font-semibold text-white">
        Andere Projekte
      </h2>
      <p className="mt-2 mb-4 text-sm text-white/70">
        Weitere Angebote, die nicht zu deinen aktuellen Filtern passen.
      </p>
      <ListingsGrid listings={listings} />
    </ListingsShell>
  );
}
