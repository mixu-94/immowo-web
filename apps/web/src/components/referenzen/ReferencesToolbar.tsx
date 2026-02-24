"use client";

type Props = {
  tags: string[];
  query: string;
  onQueryChange: (v: string) => void;
  activeTag: string | null;
  onTagChange: (v: string | null) => void;
  resultCount: number;
};

export function ReferencesToolbar({
  tags,
  query,
  onQueryChange,
  activeTag,
  onTagChange,
  resultCount,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Suche nach Projekt, Kategorie, Region, Highlights…"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none backdrop-blur transition focus:border-white/20 md:w-[420px]"
          />
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/35">
            ⌘K
          </div>
        </div>

        <div className="text-sm text-white/60">
          {resultCount} {resultCount === 1 ? "Referenz" : "Referenzen"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagChange(null)}
          className={[
            "rounded-full px-3 py-1.5 text-xs transition",
            activeTag === null
              ? "bg-white text-black"
              : "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10",
          ].join(" ")}
        >
          Alle
        </button>

        {tags.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onTagChange(active ? null : tag)}
              className={[
                "rounded-full px-3 py-1.5 text-xs transition",
                active
                  ? "bg-white text-black"
                  : "border border-white/15 bg-white/5 text-white/80 hover:bg-white/10",
              ].join(" ")}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
