import { ReferenceCard } from "./ReferencesCard";

type LocationLike = string | { label?: string; region?: string } | undefined;

type ReferenceLike = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: string;
  year: string;
  description: string;
  highlights: string[];
  location?: LocationLike;
  facts?: any;
  coverImage?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

type Props = {
  projects: ReferenceLike[];
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
