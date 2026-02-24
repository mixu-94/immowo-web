// components/referenzen/ReferencesPage.tsx
import { ReferencesShell } from "./ReferencesShell";
import { ReferencesHeader } from "./ReferencesHeader";
import { ReferencesExplorer } from "./ReferencesExplorer";
import { referenceProjects } from "@/lib/data/references";
export function ReferencesPage() {
  return (
    <ReferencesShell>
      <ReferencesHeader />
      <ReferencesExplorer projects={referenceProjects} />
    </ReferencesShell>
  );
}
