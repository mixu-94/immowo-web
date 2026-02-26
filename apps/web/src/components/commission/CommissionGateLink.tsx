"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { BuyerCommission } from "@/lib/types/listings";
import { acceptCommission, hasAcceptedCommission } from "@/lib/commission/gate";
import { CommissionGateDialog } from "./CommissionGateDialog";

type Props = {
  href?: string;
  slug: string;
  commission?: BuyerCommission;
  className?: string;
  children: React.ReactNode;
};

export function CommissionGateLink({
  href,
  slug,
  commission,
  className,
  children,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const targetHref = useMemo(() => {
    const trimmed = (href ?? "").trim();
    return trimmed.length > 0 ? trimmed : `/objekte/${slug}`;
  }, [href, slug]);

  const accepted = useMemo(
    () => hasAcceptedCommission(slug, commission),
    [slug, commission],
  );

  return (
    <>
      <Link
        href={targetHref}
        onClick={(e) => {
          if (accepted) return;
          e.preventDefault();
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </Link>

      <CommissionGateDialog
        open={open}
        onOpenChange={setOpen}
        commission={commission}
        onAccept={() => {
          acceptCommission(slug, commission);
          setOpen(false); // ✅ close here
          // ✅ navigate after close tick
          setTimeout(() => router.push(targetHref), 0);
        }}
        onDecline={() => setOpen(false)}
      />
    </>
  );
}
