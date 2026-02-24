// app/(site)/objekte/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectDetailPage } from "@/components/objekte/ObjectDetailPage";
import { buildListingMetadata } from "@/lib/seo/listingMetadata";
import { getAllListingSlugs, getListingBySlug } from "@/lib/data/listings";

// ISR: Seite wird statisch ausgeliefert, aber regelmäßig aktualisiert
export const revalidate = 300; // 5 Minuten (anpassen)

// Optional: wenn du NICHT willst, dass unbekannte Slugs zur Laufzeit gerendert werden:
// export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllListingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const listing = await getListingBySlug(params.slug);
  if (!listing) return { title: "Objekt nicht gefunden | Immowo Ventures" };

  return buildListingMetadata(listing);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const listing = await getListingBySlug(params.slug);
  if (!listing) notFound();

  return <ObjectDetailPage listing={listing} />;
}
