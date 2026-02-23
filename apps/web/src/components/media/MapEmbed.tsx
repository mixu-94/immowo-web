"use client";

import * as React from "react";

type MapEmbedProps = {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function MapEmbed({
  lat,
  lng,
  zoom = 14,
  title = "Karte",
}: MapEmbedProps) {
  const safeZoom = clamp(zoom, 3, 19);

  // kleines Bounding-Box-Delta (abhängig vom Zoom – grob, aber ausreichend fürs Embed)
  const delta = 0.02 * (14 / safeZoom);
  const left = lng - delta;
  const right = lng + delta;
  const top = lat + delta;
  const bottom = lat - delta;

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    `${left},${bottom},${right},${top}`,
  )}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="relative aspect-[16/10] w-full">
        <iframe
          title={title}
          src={src}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 p-3">
        <div className="text-xs font-semibold tracking-widest text-white/70">
          OPENSTREETMAP
        </div>
        <a
          className="text-xs font-semibold tracking-widest text-white/80 underline decoration-white/20 underline-offset-4 hover:text-white"
          href={`https://www.openstreetmap.org/?mlat=${encodeURIComponent(
            String(lat),
          )}&mlon=${encodeURIComponent(String(lng))}#map=${safeZoom}/${encodeURIComponent(
            String(lat),
          )}/${encodeURIComponent(String(lng))}`}
          target="_blank"
          rel="noreferrer"
        >
          IN OSM ÖFFNEN
        </a>
      </div>
    </div>
  );
}
