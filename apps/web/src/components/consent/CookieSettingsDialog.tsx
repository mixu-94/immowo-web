// src/components/consent/CookieSettingsDialog.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Cookie,
  ExternalLink,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

import { useConsent } from "./ConsentProvider";

// shadcn ui
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function Row({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 text-white/85">{icon}</div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-white/70">
            {description}
          </div>
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function CookieSettingsDialog({ open, onOpenChange }: Props) {
  const {
    consent,
    setConsent,
    acceptAll,
    acceptNecessaryOnly,
    analyticsAllowed,
    externalMediaAllowed,
  } = useConsent();

  const initial = useMemo(
    () => ({
      analytics: analyticsAllowed,
      externalMedia: externalMediaAllowed,
    }),
    [analyticsAllowed, externalMediaAllowed],
  );

  const [analytics, setAnalytics] = useState(initial.analytics);
  const [externalMedia, setExternalMedia] = useState(initial.externalMedia);

  // when dialog opens, sync state from context
  useEffect(() => {
    if (!open) return;
    setAnalytics(initial.analytics);
    setExternalMedia(initial.externalMedia);
  }, [open, initial.analytics, initial.externalMedia]);

  const hasChanges =
    analytics !== initial.analytics || externalMedia !== initial.externalMedia;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[110] border-white/10 bg-black/70 text-white backdrop-blur-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Cookie className="h-5 w-5 text-white/85" />
            </span>
            Cookie-Einstellungen
          </DialogTitle>

          <DialogDescription className="text-white/70">
            Wähle aus, welche Cookies und Dienste wir verwenden dürfen.
            Notwendige Cookies sind immer aktiv, damit die Website zuverlässig
            funktioniert.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <Row
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Notwendig"
            description="Diese Cookies sind für Grundfunktionen erforderlich (z.B. Sicherheit, Formular-Übertragung)."
          >
            <Switch checked disabled aria-readonly />
          </Row>

          <Row
            icon={<BarChart3 className="h-5 w-5" />}
            title="Analytics"
            description="Hilft uns, die Website zu verbessern (anonyme Nutzungsstatistiken)."
          >
            <Switch checked={analytics} onCheckedChange={setAnalytics} />
          </Row>

          <Row
            icon={<MapPinned className="h-5 w-5" />}
            title="Externe Medien (Google Maps)"
            description="Beim Laden können Daten an Drittanbieter übertragen werden (z.B. IP-Adresse)."
          >
            <Switch
              checked={externalMedia}
              onCheckedChange={setExternalMedia}
            />
          </Row>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[12px] leading-relaxed text-white/70">
            Mehr Informationen findest du in unserer{" "}
            <Link
              href="/datenschutz"
              className="inline-flex items-center gap-1 font-semibold text-white/85 underline underline-offset-4 hover:text-white"
            >
              Datenschutzerklärung <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            .
            <div className="mt-2 text-white/55">
              Consent-Status:{" "}
              <span className="font-semibold text-white/75">
                {consent ? "gesetzt" : "nicht gesetzt"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="border border-white/15 bg-white/5 text-white hover:bg-white/10"
              onClick={() => {
                acceptNecessaryOnly();
                onOpenChange(false);
              }}
            >
              Nur notwendig
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="border border-white/15 bg-white/5 text-white hover:bg-white/10"
              onClick={() => {
                acceptAll();
                onOpenChange(false);
              }}
            >
              Alle akzeptieren
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              className="text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              Abbrechen
            </Button>

            <Button
              type="button"
              className="bg-white text-black hover:bg-white/90 disabled:opacity-60"
              disabled={!hasChanges}
              onClick={() => {
                setConsent({ analytics, externalMedia });
                onOpenChange(false);
              }}
            >
              Speichern
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
