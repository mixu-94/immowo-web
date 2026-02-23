"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

type MediaType = "image" | "video";

type MediaItem = {
  type: MediaType;
  src: string;
  poster?: string;
};

function guessType(src: string): MediaType {
  const s = src.toLowerCase();
  if (
    s.endsWith(".mp4") ||
    s.endsWith(".webm") ||
    s.endsWith(".mov") ||
    s.endsWith(".m4v")
  ) {
    return "video";
  }
  return "image";
}

export function MediaGallery({
  media,
  altBase,
}: {
  media: Array<string | MediaItem>;
  altBase: string;
}) {
  const items = useMemo<MediaItem[]>(() => {
    return (media ?? []).filter(Boolean).map((m) => {
      if (typeof m === "string") return { type: guessType(m), src: m };
      return {
        type: m.type ?? guessType(m.src),
        src: m.src,
        poster: m.poster,
      };
    });
  }, [media]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  if (!items.length) return null;

  const current = items[index];

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((it, i) => (
          <button
            key={`${it.src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className={[
              "group relative aspect-[16/11] overflow-hidden rounded-2xl",
              "border border-white/10 bg-white/5",
              "focus:outline-none focus:ring-2 focus:ring-white/20",
            ].join(" ")}
            aria-label={it.type === "video" ? "Video öffnen" : "Bild öffnen"}
          >
            {it.type === "image" ? (
              <Image
                src={it.src}
                alt={`${altBase} – Medien ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ) : (
              <>
                <video
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={it.src}
                  muted
                  playsInline
                  preload="metadata"
                  poster={it.poster}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/35" />
                <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs font-semibold tracking-widest text-white/90 backdrop-blur">
                  <Play className="h-4 w-4" />
                  VIDEO
                </div>
              </>
            )}
          </button>
        ))}
      </div>

      {/* TRUE FULLSCREEN MODAL (PORTAL TO BODY) */}
      {open && mounted
        ? createPortal(
            <div
              className="fixed inset-0 z-[999999] bg-black/90"
              onClick={close}
              role="dialog"
              aria-modal="true"
            >
              {/* top bar */}
              <div className="absolute inset-x-0 top-0 z-10">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
                  <div className="text-xs font-semibold tracking-widest text-white/70">
                    {index + 1} / {items.length}
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 backdrop-blur transition hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                    SCHLIESSEN
                  </button>
                </div>
              </div>

              {/* content */}
              <div
                className="absolute inset-0 flex items-center justify-center px-4 py-16"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full max-w-6xl">
                  <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
                    {current.type === "image" ? (
                      <Image
                        src={current.src}
                        alt={`${altBase} – Vollbild ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    ) : (
                      <video
                        className="h-full w-full object-contain"
                        src={current.src}
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                        poster={current.poster}
                      />
                    )}
                  </div>

                  {/* nav */}
                  {items.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white/90 backdrop-blur transition hover:bg-white/10"
                        aria-label="Vorheriges Medium"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 p-3 text-white/90 backdrop-blur transition hover:bg-white/10"
                        aria-label="Nächstes Medium"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
