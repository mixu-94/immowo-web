// components/referenzen/ReferencesPage.tsx
import { ReferencesShell } from "./ReferencesShell";
import { ReferencesHeader } from "./ReferencesHeader";
import { ReferencesExplorer } from "./ReferencesExplorer";
import { getReferences } from "@/lib/data/references";

export async function ReferencesPage() {
  const projects = await getReferences();

  return (
    <ReferencesShell>
      <ReferencesHeader />
      <ReferencesExplorer projects={projects} />
    </ReferencesShell>
  );
}
