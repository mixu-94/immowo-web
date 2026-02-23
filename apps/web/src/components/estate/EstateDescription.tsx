import type { Listing } from "@/lib/types/listings";

type Props = { estate: Listing };

export function EstateDescription({ estate }: Props) {
  const text = (estate as any).description ?? (estate as any).text;

  if (!text) return null;

  return (
    <section className="rounded-2xl border p-5">
      <h2 className="mb-4 text-lg font-semibold">Beschreibung</h2>
      <div className="prose prose-sm max-w-none">
        <p>{text}</p>
      </div>
    </section>
  );
}
