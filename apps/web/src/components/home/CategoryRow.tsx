import Link from "next/link";

import { CategoryRow as CategoryRowType } from "@/lib/types/listings";
import ListingCarousel from "../listings/ListingCarousel";

type Props = {
  row: CategoryRowType;
};

export default function CategoryRow({ row }: Props) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-4">
        <h2 className="text-2xl ml-5 font-semibold tracking-wide text-white">
          {row.title.toUpperCase()}
        </h2>

        {row.href && (
          <Link
            href={row.href}
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            MEHR
          </Link>
        )}
      </div>

      <ListingCarousel items={row.items} />
    </section>
  );
}
