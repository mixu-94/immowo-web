export type ListingBadge = "NEU" | "SECRET SALE" | "VERKAUFT";

export type Listing = {
    id: string;
    title: string;
    imageSrc: string;
    href: string;
    location?: string;
    badge?: ListingBadge;

    // optional routing helpers
    slug?: string;
};

export type CategoryRow = {
    id: string;
    title: string; // "NEU", "MEISTGESEHEN"
    items: Listing[];
    href?: string; // "mehr" link
};

/**
 * ✅ Detail page type (Payload-ready)
 * Keep these optional so your UI only renders what exists.
 */
export type EstateDetails = Listing & {
    videoSrc?: string;
    gallery?: string[];
    geo?: GeoPoint;
    price?: number;
    currency?: "EUR";
    livingArea?: number;
    plotArea?: number;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    yearBuilt?: number;
    energyClass?: string;
    heatingType?: string;
    commissionText?: string;
    availability?: string;
    description?: string;
    highlights?: string[];
    features?: string[];
};


export type GeoPoint = {
    lat: number;
    lng: number;
};
