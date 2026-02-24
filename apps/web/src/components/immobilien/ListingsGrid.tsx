// components/immobilien/ListingsGrid.tsx
import type { ListingLike } from "./filters";
import { ListingCard } from "./ListingCard";

export function ListingsGrid({ listings }: { listings: ListingLike[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard key={l.slug ?? l.id ?? l.title} listing={l} />
      ))}
    </div>
  );
}
