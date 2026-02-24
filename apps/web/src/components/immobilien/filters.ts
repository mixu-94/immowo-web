export type ListingVariant = "build" | "ready" | "investment" | "any";
export type ListingStatus = "verfügbar" | "reserviert" | "verkauft" | "in_bau" | "any";

export type ListingLike = {
    id?: string;
    slug?: string;
    title: string;
    location?: string;
    price?: number;
    livingArea?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    badge?: string;
    imageSrc?: string;
    highlights?: string[];
    energyClass?: string;
    availability?: string;
    // optional future payload fields:
    variant?: "build" | "ready" | "investment";
    status?: "verfügbar" | "reserviert" | "verkauft" | "in_bau";
};

export type Filters = {
    q: string;
    location: string;
    variant: ListingVariant;
    status: ListingStatus;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    minRooms?: number;
};

export const defaultFilters: Filters = {
    q: "",
    location: "",
    variant: "any",
    status: "any",
};

export function matchesFilters(l: ListingLike, f: Filters) {
    const q = f.q.trim().toLowerCase();
    const loc = f.location.trim().toLowerCase();

    const haystack = [
        l.title,
        l.location ?? "",
        l.badge ?? "",
        ...(l.highlights ?? []),
        l.energyClass ?? "",
    ]
        .join(" ")
        .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (loc && !(l.location ?? "").toLowerCase().includes(loc)) return false;

    const variant = (l.variant ?? inferVariant(l)) as ListingVariant;
    const status = (l.status ?? inferStatus(l)) as ListingStatus;

    if (f.variant !== "any" && variant !== f.variant) return false;
    if (f.status !== "any" && status !== f.status) return false;

    if (typeof f.minPrice === "number" && typeof l.price === "number" && l.price < f.minPrice) return false;
    if (typeof f.maxPrice === "number" && typeof l.price === "number" && l.price > f.maxPrice) return false;

    if (typeof f.minArea === "number" && typeof l.livingArea === "number" && l.livingArea < f.minArea) return false;
    if (typeof f.maxArea === "number" && typeof l.livingArea === "number" && l.livingArea > f.maxArea) return false;

    if (typeof f.minRooms === "number" && typeof l.rooms === "number" && l.rooms < f.minRooms) return false;

    return true;
}

function inferVariant(l: ListingLike): ListingVariant {
    const s = [l.badge ?? "", l.title ?? "", ...(l.highlights ?? [])].join(" ").toLowerCase();
    if (/(projekt|neubau|bauphase|vom papier|grundstück|kfw)/.test(s)) return "build";
    if (/(kapitalanlage|rendite|vermietet|investment)/.test(s)) return "investment";
    if (/(bezugsfertig|schlüsselfertig|sofort)/.test(s)) return "ready";
    return "any";
}

function inferStatus(l: ListingLike): ListingStatus {
    const s = [l.badge ?? "", l.availability ?? ""].join(" ").toLowerCase();
    if (/(verkauft|sold)/.test(s)) return "verkauft";
    if (/(reserviert|reserved)/.test(s)) return "reserviert";
    if (/(in bau|bauphase)/.test(s)) return "in_bau";
    return "verfügbar";
}