"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { BuyerCommission } from "@/lib/types/listings";
import { acceptCommission, hasAcceptedCommission } from "@/lib/commission/gate";
import { CommissionGateDialog } from "./CommissionGateDialog";

type Props = {
  slug: string;
  commission?: BuyerCommission;
};

export function CommissionGateEnforcer({ slug, commission }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // verhindert: Accept -> close -> onOpenChange(false) -> decline
  const ignoreNextClose = useRef(false);

  useEffect(() => {
    const ok = hasAcceptedCommission(slug, commission);
    setBlocked(!ok);
    setOpen(!ok);
  }, [slug, commission]);

  const declineToRoot = () => {
    router.replace("/"); // oder "/immobilien"
  };

  if (!blocked) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" />

      <CommissionGateDialog
        open={open}
        onOpenChange={(next) => {
          // X / ESC / outside click => next=false
          if (!next) {
            if (ignoreNextClose.current) {
              ignoreNextClose.current = false;
              setOpen(false);
              return;
            }
            setOpen(false);
            declineToRoot();
            return;
          }
          setOpen(true);
        }}
        commission={commission}
        onAccept={() => {
          ignoreNextClose.current = true;
          acceptCommission(slug, commission);
          setBlocked(false);
          setOpen(false);
        }}
        onDecline={declineToRoot} // Ablehnen-Button => Root
      />
    </>
  );
}
