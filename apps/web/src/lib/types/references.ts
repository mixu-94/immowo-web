// lib/types/references.ts

export type ReferenceCategory =
    | "Neubau"
    | "Sanierung"
    | "Projektentwicklung"
    | "Verkauf"
    | "Kapitalanlage"
    | "Gewerbe";

export type ReferenceStatus = "verkauft" | "reserviert" | "fertiggestellt" | "in bau";

export type ReferenceService =
    | "Projektentwicklung"
    | "Bauträger"
    | "Vermarktung"
    | "Sanierung"
    | "Architektur"
    | "Innenausbau"
    | "Finishing"
    | "Fotografie"
    | "Branding"
    | "UI/Website";

export type ReferenceKPI = {
    label: string;
    value: string;
};

export type ReferenceMediaItem =
    | { type: "image"; src: string; alt?: string }
    | { type: "video"; src: string; posterSrc?: string };

export type ReferenceDocuments = {
    caseStudyPdfUrl?: string; // fehlt => UI zeigt "auf Anfrage"
    exposeSampleUrl?: string;
    brochureUrl?: string;
};

export type ReferenceFacts = {
    units?: string; // "6 WE"
    livingArea?: string; // "165 m²"
    plotArea?: string; // "520 m²"
    rooms?: string; // "5 Zimmer"
    buildTime?: string; // "11 Monate"
    status?: ReferenceStatus;
};

export type ReferenceLocation = {
    region?: string; // "Schwaben"
    label?: string; // "Augsburg (Region)"
    // optional diskrete Geo-Koordinate
    geo?: { lat: number; lng: number };
};

export type ReferenceSEO = {
    title?: string;
    description?: string;
    ogImage?: string;
};

export type ReferenceTimelineItem = {
    title: string;
    text: string;
};

export type Reference = {
    id: string;
    slug: string;

    title: string;
    subtitle?: string;

    category: ReferenceCategory;
    year: string;

    // diskret
    location: ReferenceLocation;

    description: string;
    highlights: string[];

    facts?: ReferenceFacts;
    kpis?: ReferenceKPI[];

    coverImage?: { src: string; alt: string };

    // für Detailseite
    media?: {
        gallery?: ReferenceMediaItem[];
    };

    documents?: ReferenceDocuments;

    services?: ReferenceService[];
    timeline?: ReferenceTimelineItem[];

    // flags
    isFeatured?: boolean;
    sortOrder?: number;

    // SEO
    seo?: ReferenceSEO;
};

export type ReferenceRow = {
    id: string;
    title: string;
    href?: string;
    items: Pick<
        Reference,
        "id" | "slug" | "title" | "subtitle" | "category" | "year" | "location" | "coverImage" | "isFeatured"
    >[];
};