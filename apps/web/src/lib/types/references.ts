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
    /**
     * Wenn URL fehlt => UI zeigt "AUF ANFRAGE"
     * (passt zur diskreten Premium-Positionierung)
     */
    caseStudyPdfUrl?: string;
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
    geo?: { lat: number; lng: number }; // optional diskret
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

/**
 * Für "große Referenzen"/Case Studies:
 * - sections: flexible Textabschnitte
 * - caseStudy: strukturierte Story (Challenge/Approach/Result)
 * - testimonial: optional, wenn ihr sowas nutzen dürft
 */
export type ReferenceSection = {
    heading: string;        // z.B. "Ausgangslage"
    content: string;        // 1-2 Absätze (Plaintext oder Markdown light)
};

export type ReferenceCaseStudy = {
    challenge?: string;
    approach?: string;
    result?: string;
};

export type ReferenceTestimonial = {
    quote: string;
    author?: string;
    role?: string;
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

    description: string;   // Kurzbeschreibung (2–3 Sätze)
    highlights: string[];  // kurze Badge-Bullets

    facts?: ReferenceFacts;
    kpis?: ReferenceKPI[];

    coverImage?: { src: string; alt: string };

    media?: {
        gallery?: ReferenceMediaItem[];
    };

    documents?: ReferenceDocuments;

    services?: ReferenceService[];
    timeline?: ReferenceTimelineItem[];

    // Long-form content
    sections?: ReferenceSection[];
    caseStudy?: ReferenceCaseStudy;
    testimonial?: ReferenceTestimonial;

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

/**
 * ✅ Compatibility Alias:
 * Viele deiner Komponenten importieren noch "ReferenceProperty".
 * Damit bricht nichts, auch wenn du noch nicht überall umgestellt hast.
 */
export type ReferenceProperty = Reference;