import type { Listing } from "@/lib/types/listings";

type Props = { estate: Listing };

export function EstateAmenities({ estate }: Props) {
  const amenities: string[] =
    (estate as any).amenities ?? (estate as any).features ?? [];

  if (!amenities.length) return null;

  return (
    <section className="rounded-2xl border p-5">
      <h2 className="mb-4 text-lg font-semibold">Ausstattung</h2>

      <ul className="grid gap-2 md:grid-cols-2">
        {amenities.map((a) => (
          <li key={a} className="text-sm">
            • {a}
          </li>
        ))}
      </ul>
    </section>
  );
}
