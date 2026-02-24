import type { Metadata } from "next";
import { buildReferencesIndexMetadata } from "@/lib/seo/referencesMetadata";
import { ReferencesPage } from "@/components/referenzen/ReferencesPage";

export const metadata: Metadata = buildReferencesIndexMetadata();

export default function Page() {
  return <ReferencesPage />;
}
