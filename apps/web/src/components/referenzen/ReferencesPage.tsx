// components/referenzen/ReferencesPage.tsx
import { ReferencesShell } from "./ReferencesShell";
import { ReferencesHeader } from "./ReferencesHeader";
import { ReferencesExplorer } from "./ReferencesExplorer";
import { referenceProjects } from "./data";

export function ReferencesPage() {
  return (
    <ReferencesShell>
      <ReferencesHeader />
      <ReferencesExplorer projects={referenceProjects} />
    </ReferencesShell>
  );
}
