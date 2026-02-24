import type { ReferenceProperty } from "../../lib/types/references";
import { ReferenceCard } from "./ReferencesCard";

type Props = {
  projects: ReferenceProperty[];
};

export function ReferencesGrid({ projects }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {projects.map((p) => (
        <ReferenceCard key={p.id} project={p} />
      ))}
    </div>
  );
}
