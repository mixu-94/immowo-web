// app/objekte/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getEstateBySlug } from "@/lib/data/listings";
import type { EstateDetails } from "@/lib/types/listings";
import { ObjectDetailPage } from "@/components/objekte/ObjectDetailPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const listing = (await getEstateBySlug(params.slug)) as EstateDetails | null;
  if (!listing) notFound();

  return <ObjectDetailPage listing={listing} />;
}
