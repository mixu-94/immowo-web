import type { BuyerCommission } from "@/lib/types/listings";

const VERSION = "v1";

export function commissionGateKey(slug: string) {
    return `buyer_commission_gate:${VERSION}:${slug}`;
}

export function commissionHash(c?: BuyerCommission) {
    if (!c) return "none";
    // Wenn Provision geändert wird, soll Gate wieder kommen:
    return [
        c.kind,
        c.value,
        c.vatIncluded ? "vat_incl" : "vat_excl",
        c.vatRate ?? 19,
        c.due ?? "",
        c.note ?? "",
        c.basis ?? "",
    ].join("|");
}

export function hasAcceptedCommission(slug: string, commission?: BuyerCommission) {
    if (typeof window === "undefined") return false;
    const raw = localStorage.getItem(commissionGateKey(slug));
    if (!raw) return false;

    try {
        const parsed = JSON.parse(raw) as { acceptedAt: string; hash: string };
        return parsed.hash === commissionHash(commission);
    } catch {
        return false;
    }
}

export function acceptCommission(slug: string, commission?: BuyerCommission) {
    if (typeof window === "undefined") return;
    localStorage.setItem(
        commissionGateKey(slug),
        JSON.stringify({ acceptedAt: new Date().toISOString(), hash: commissionHash(commission) }),
    );
}