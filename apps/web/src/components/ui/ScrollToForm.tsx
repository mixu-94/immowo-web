"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function ScrollToFormOnListing() {
  const params = useSearchParams();
  const listing = params.get("listing");
  const didRunRef = useRef(false);

  useEffect(() => {
    // In React Strict Mode läuft useEffect in dev 2x -> guard
    if (didRunRef.current) return;
    didRunRef.current = true;

    if (!listing) return;

    // Nächster Tick, damit Layout fertig ist
    requestAnimationFrame(() => {
      const el = document.getElementById("formular");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [listing]);

  return null;
}
