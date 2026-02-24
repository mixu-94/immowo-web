"use client";

import { useMemo, useState } from "react";
import { ReferencesToolbar } from "./ReferencesToolbar";
import { ReferencesGrid } from "./ReferencesGrid";

type LocationLike = string | { label?: string; region?: string } | undefined;

type ReferenceLike = {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  description: string;
  highlights: string[];
  location?: LocationLike;
  facts?: {
    units?: string;
    livingArea?: string;
    plotArea?: string;
    rooms?: string;
    buildTime?: string;
    status?: string;
  };
  coverImage?: { src: string; alt: string };
  links?: { label: string; href: string }[];
};

type Props = {
  projects?: ReferenceLike[];
};

function formatLocation(loc: LocationLike) {
  if (!loc) return "";
  if (typeof loc === "string") return loc;
  return loc.label ?? loc.region ?? "";
}

export function ReferencesExplorer({ projects = [] }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p?.category && set.add(p.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const matchesCategory = activeCategory
        ? p.category === activeCategory
        : true;

      const haystack = [
        p.title,
        p.subtitle ?? "",
        p.category,
        p.year,
        formatLocation(p.location),
        p.description,
        (p.highlights ?? []).join(" "),
        p.facts?.units ?? "",
        p.facts?.livingArea ?? "",
        p.facts?.plotArea ?? "",
        p.facts?.rooms ?? "",
        p.facts?.buildTime ?? "",
        p.facts?.status ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = q ? haystack.includes(q) : true;
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, activeCategory]);

  return (
    <section>
      <ReferencesToolbar
        tags={categories}
        query={query}
        onQueryChange={setQuery}
        activeTag={activeCategory}
        onTagChange={setActiveCategory}
        resultCount={filtered.length}
      />

      <ReferencesGrid projects={filtered} />
    </section>
  );
}
