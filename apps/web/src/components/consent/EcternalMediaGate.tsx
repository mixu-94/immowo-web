"use client";

import * as React from "react";

type ExternalMediaGateProps = {
  cookieName: string;
  title: string;
  description?: string;
  children: React.ReactNode;

  /**
   * Optional: falls du statt Standard-Fallback etwas Eigenes rendern willst.
   */
  fallback?: (opts: {
    grantConsent: () => void;
    hasConsent: boolean;
  }) => React.ReactNode;
};

function getCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
}

function setCookieValue(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

export function ExternalMediaGate(props: ExternalMediaGateProps) {
  const { cookieName, title, description, children, fallback } = props;

  const [hasConsent, setHasConsent] = React.useState<boolean>(false);
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    const value = getCookieValue(cookieName);
    setHasConsent(value === "1" || value === "true");
    setIsReady(true);
  }, [cookieName]);

  const grantConsent = React.useCallback(() => {
    // z.B. 180 Tage
    setCookieValue(cookieName, "1", 60 * 60 * 24 * 180);
    setHasConsent(true);
  }, [cookieName]);

  if (!isReady) {
    // SSR/CSR Übergang: kleines Skeleton
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="mt-3 h-3 w-2/3 rounded bg-white/10" />
        <div className="mt-4 h-9 w-40 rounded-full bg-white/10" />
      </div>
    );
  }

  if (hasConsent) return <>{children}</>;

  if (fallback) return <>{fallback({ grantConsent, hasConsent })}</>;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {description}
        </p>
      ) : null}

      <button
        type="button"
        onClick={grantConsent}
        className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white/90 transition hover:bg-white/15"
      >
        KARTE LADEN
      </button>

      <p className="mt-3 text-xs text-white/50">
        Durch das Laden können Daten an den externen Anbieter übertragen werden.
      </p>
    </div>
  );
}
