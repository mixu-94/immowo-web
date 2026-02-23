"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  BarChart3,
  MapPinned,
  Settings2,
} from "lucide-react";
import { useConsent } from "./ConsentProvider";
import CookieSettingsDialog from "./CookieSettingsDialog";

export default function CookieBanner() {
  const { hasDecision, acceptAll, acceptNecessaryOnly } = useConsent();
  const [open, setOpen] = useState(false);

  // ✅ important: only render dialog after mount (prevents hydration issues with Radix Portal)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const points = useMemo(
    () => [
      { icon: <ShieldCheck className="h-4 w-4" />, label: "Notwendig" },
      {
        icon: <BarChart3 className="h-4 w-4" />,
        label: "Analytics (optional)",
      },
      {
        icon: <MapPinned className="h-4 w-4" />,
        label: "Google Maps (optional)",
      },
    ],
    [],
  );

  if (hasDecision) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 md:px-6 md:pb-6">
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/55 shadow-2xl backdrop-blur-xl">
          {/* subtle top highlight */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="p-4 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              {/* Left */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Cookie className="h-5 w-5 text-white/85" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Cookies & Datenschutz
                    </p>
                    <p className="text-xs text-white/70">
                      Wir verwenden Cookies für{" "}
                      <span className="font-semibold text-white/85">
                        notwendige Funktionen
                      </span>{" "}
                      und optional für Analytics sowie externe Medien (Google
                      Maps).
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {points.map((p) => (
                    <span
                      key={p.label}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
                    >
                      <span className="text-white/70">{p.icon}</span>
                      {p.label}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-[11px] leading-relaxed text-white/60">
                  Mehr Infos in unserer{" "}
                  <Link
                    href="/datenschutz"
                    className="font-semibold text-white/80 underline underline-offset-4 hover:text-white"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </div>
              </div>

              {/* Right */}
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => {
                    acceptNecessaryOnly();
                  }}
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
                >
                  Nur notwendig
                </button>

                <button
                  type="button"
                  onClick={() => {
                    acceptAll();
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Alle akzeptieren
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
                >
                  <Settings2 className="h-4 w-4" />
                  Einstellungen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CookieSettingsDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
