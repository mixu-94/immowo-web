"use client";

import { useMemo, useState } from "react";
import type { ReferenceProperty } from "./types";
import { ReferencesToolbar } from "./ReferencesToolbar";
import { ReferencesGrid } from "./ReferencesGrid";

type Props = {
  projects: ReferenceProperty[];
};

export function ReferencesExplorer({ projects }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => set.add(p.category));
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
        p.location ?? "",
        p.year,
        p.category,
        p.description,
        p.highlights.join(" "),
        p.facts?.units ?? "",
        p.facts?.livingArea ?? "",
        p.facts?.plotArea ?? "",
        p.facts?.rooms ?? "",
        p.facts?.buildTime ?? "",
        p.facts?.status ?? "",
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = q.length ? haystack.includes(q) : true;
      return matchesCategory && matchesQuery;
    });
  }, [projects, query, activeCategory]);

  return (
    <section>
      {/* Toolbar kann bleiben – wir füttern ihn einfach mit Kategorien statt Tags */}
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
