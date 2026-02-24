"use client";

import { useMemo, useState } from "react";
import type { ListingLike } from "./filters";
import { defaultFilters, matchesFilters } from "./filters";
import { ListingsGrid } from "./ListingsGrid";

export function ListingsToolbar({ listings }: { listings: ListingLike[] }) {
  const [filters, setFilters] = useState(defaultFilters);

  const filtered = useMemo(() => {
    return listings.filter((l) => matchesFilters(l, filters));
  }, [listings, filters]);

  return (
    <section className="mt-10">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur md:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <div className="text-xs font-semibold tracking-widest text-white/60">
              FILTER
            </div>
            <h2 className="mt-2 text-lg font-semibold text-white">
              Suchen & eingrenzen
            </h2>
            <p className="mt-2 text-sm text-white/70">
              {filtered.length} Treffer
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={filters.q}
              onChange={(e) => setFilters((p) => ({ ...p, q: e.target.value }))}
              placeholder="Suche (Ort, Objekt, Features)…"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            />
            <input
              value={filters.location}
              onChange={(e) =>
                setFilters((p) => ({ ...p, location: e.target.value }))
              }
              placeholder="Region / Ort"
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          <Select
            label="Typ"
            value={filters.variant}
            onChange={(v) => setFilters((p) => ({ ...p, variant: v as any }))}
            options={[
              ["any", "Alle"],
              ["ready", "Fertig"],
              ["build", "Bauprojekt"],
              ["investment", "Investment"],
            ]}
          />
          <Select
            label="Status"
            value={filters.status}
            onChange={(v) => setFilters((p) => ({ ...p, status: v as any }))}
            options={[
              ["any", "Alle"],
              ["verfügbar", "Verfügbar"],
              ["reserviert", "Reserviert"],
              ["in_bau", "In Bau"],
              ["verkauft", "Verkauft"],
            ]}
          />
          <NumberField
            label="Preis min"
            value={filters.minPrice ?? ""}
            onChange={(v) => setFilters((p) => ({ ...p, minPrice: v }))}
          />
          <NumberField
            label="Preis max"
            value={filters.maxPrice ?? ""}
            onChange={(v) => setFilters((p) => ({ ...p, maxPrice: v }))}
          />
          <NumberField
            label="m² min"
            value={filters.minArea ?? ""}
            onChange={(v) => setFilters((p) => ({ ...p, minArea: v }))}
          />
          <NumberField
            label="Zimmer min"
            value={filters.minRooms ?? ""}
            onChange={(v) => setFilters((p) => ({ ...p, minRooms: v }))}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => setFilters(defaultFilters)}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Zurücksetzen
          </button>

          <div className="text-xs text-white/55">
            Tipp: Viele Details/Unterlagen sind “auf Anfrage” verfügbar.
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ListingsGrid listings={filtered} />
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
      >
        {options.map(([v, t]) => (
          <option key={v} value={v} className="text-black">
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | number;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
        {label}
      </div>
      <input
        value={value}
        onChange={(e) => {
          const raw = e.target.value.trim();
          if (!raw) return onChange(undefined);

          const num = globalThis.Number(raw); // ✅ garantiert der echte Number()
          onChange(globalThis.Number.isFinite(num) ? num : undefined);
        }}
        inputMode="numeric"
        placeholder="—"
        className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/20"
      />
    </div>
  );
}
