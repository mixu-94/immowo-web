// apps/web/src/app/(site)/referenzen/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Data layer (Mock heute, Payload später)
import {
  getAllReferenceSlugs,
  getReferenceBySlug,
} from "@/lib/data/references";

// SEO builder (hast du schon erstellt)
import { buildReferenceMetadata } from "@/lib/seo/referencesMetadata";

// Deine Detail-UI Komponente (anpassen, falls sie anders heißt)
import { ReferenceDetail } from "@/components/referenzen/ReferenceDetail";

// ISR: Seite wird statisch ausgeliefert, aber regelmäßig aktualisiert
export const revalidate = 300; // 5 Minuten

// Optional: wenn du NICHT willst, dass unbekannte slugs zur Laufzeit generiert werden
// export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllReferenceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const ref = await getReferenceBySlug(params.slug);
  if (!ref) return { title: "Referenz nicht gefunden | Immowo Ventures" };

  return buildReferenceMetadata(ref);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const ref = await getReferenceBySlug(params.slug);
  if (!ref) notFound();

  return <ReferenceDetail project={ref} />;
}
