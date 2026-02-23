"use client";

import * as React from "react";
import type { ConsentState } from "@/lib/consent/types";
import {
  DEFAULT_CONSENT_STATE,
  acceptAll,
  necessaryOnly,
} from "@/lib/consent/types";
import { loadConsent, saveConsent } from "@/lib/consent/storage";

type ConsentContextValue = {
  consent: ConsentState | null;
  hasDecision: boolean;

  analyticsAllowed: boolean;
  externalMediaAllowed: boolean;

  setConsent: (next: Pick<ConsentState, "analytics" | "externalMedia">) => void;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
};

const ConsentContext = React.createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  // Hooks IMMER oben & immer gleich:
  const [consent, setConsentState] = React.useState<ConsentState | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const existing = loadConsent();
    if (existing) setConsentState(existing);
  }, []);

  const hasDecision = consent !== null;

  const analyticsAllowed = Boolean(consent?.analytics);
  const externalMediaAllowed = Boolean(consent?.externalMedia);

  const setConsent = React.useCallback(
    (next: Pick<ConsentState, "analytics" | "externalMedia">) => {
      const merged: ConsentState = {
        ...DEFAULT_CONSENT_STATE,
        ...(consent ?? {}),
        analytics: next.analytics,
        externalMedia: next.externalMedia,
      };
      setConsentState(saveConsent(merged));
    },
    [consent],
  );

  const acceptAllFn = React.useCallback(() => {
    setConsentState(saveConsent(acceptAll()));
  }, []);

  const acceptNecessaryOnlyFn = React.useCallback(() => {
    setConsentState(saveConsent(necessaryOnly()));
  }, []);

  // mounted ist optional; du kannst es später nutzen, um client-only UI zu verzögern
  // aber KEIN early return hier, damit Hooks nie variieren.

  const value = React.useMemo<ConsentContextValue>(
    () => ({
      consent,
      hasDecision,
      analyticsAllowed,
      externalMediaAllowed,
      setConsent,
      acceptAll: acceptAllFn,
      acceptNecessaryOnly: acceptNecessaryOnlyFn,
    }),
    [
      consent,
      hasDecision,
      analyticsAllowed,
      externalMediaAllowed,
      setConsent,
      acceptAllFn,
      acceptNecessaryOnlyFn,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = React.useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
