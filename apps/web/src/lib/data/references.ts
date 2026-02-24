// lib/data/references.ts
import type { Reference, ReferenceCategory, ReferenceRow } from "@/lib/types/references";

const REFERENCE_BASE_PATH = "/referenzen";

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[ä]/g, "ae")
        .replace(/[ö]/g, "oe")
        .replace(/[ü]/g, "ue")
        .replace(/[ß]/g, "ss")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

function makeSlug(title: string, id: string) {
    return `${slugify(title)}-${slugify(id)}`;
}

function withSlugs(items: Omit<Reference, "slug">[]): Reference[] {
    return items.map((r) => ({ ...r, slug: makeSlug(r.title, r.id) }));
}

/**
 * ============================================================================
 * Single Source of Truth (Mock)
 * ============================================================================
 * Later with Payload:
 * - replace this array with CMS fetch
 * - keep the exported functions stable (UI won't change)
 */
export const references: Reference[] = withSlugs([
    {
        id: "ref-efh-neubau-01",
        title: "Neubau Einfamilienhaus – Modernes Wohnen",
        subtitle: "Schlüsselfertig • energieeffizient • familienfreundlich",
        category: "Neubau",
        year: "2025",
        location: { region: "Schwaben", label: "Landkreis Günzburg (Region)" },
        description:
            "Von der Planung bis zur Schlüsselübergabe: modernes EFH mit offener Raumaufteilung und hochwertiger Ausstattung. Fokus lag auf effizienter Bauzeit und hoher Ausführungsqualität.",
        highlights: ["Schlüsselfertig", "Fußbodenheizung", "Große Fensterflächen", "Energieeffizient"],
        facts: {
            livingArea: "165 m²",
            plotArea: "520 m²",
            rooms: "5 Zimmer",
            buildTime: "11 Monate",
            status: "fertiggestellt",
        },
        kpis: [
            { label: "Bauzeit", value: "11 Monate" },
            { label: "Wohnfläche", value: "165 m²" },
            { label: "Status", value: "Fertiggestellt" },
        ],
        coverImage: { src: "/assets/images/real-estate/realestate1.jpg", alt: "Neubau Referenz" },
        media: {
            gallery: [
                { type: "image", src: "/assets/images/real-estate/realestate2.jpg", alt: "Außenansicht" },
                { type: "image", src: "/assets/images/real-estate/realestate3.jpg", alt: "Wohnbereich" },
                { type: "image", src: "/assets/images/real-estate/realestate4.jpg", alt: "Details" },
            ],
        },
        services: ["Bauträger", "Projektentwicklung", "Finishing", "Fotografie"],
        timeline: [
            { title: "Konzept & Planung", text: "Grundrissoptimierung, Budgetrahmen, Ausstattungslinie." },
            { title: "Bauphase", text: "Koordination Gewerke, Qualitätssicherung, Terminsteuerung." },
            { title: "Übergabe", text: "Abnahme, Dokumentation, Schlüsselübergabe." },
        ],
        documents: {
            // caseStudyPdfUrl: "/assets/pdfs/case-study-efh.pdf", // optional
        },
        isFeatured: true,
        sortOrder: 10,
    },

    {
        id: "ref-mfh-verkauf-02",
        title: "Mehrfamilienhaus – Verkauf & Vermarktung",
        subtitle: "Kapitalanlage • klare Unterlagen • sauberer Prozess",
        category: "Verkauf",
        year: "2024",
        location: { region: "Schwaben", label: "Augsburg (Region)" },
        description:
            "Strukturierte Vermarktung mit vollständigem Unterlagenpaket, professioneller Präsentation und sauberem Interessentenprozess.",
        highlights: ["Exposé & Unterlagenpaket", "Käuferqualifizierung", "Besichtigungsmanagement", "Schnelle Abwicklung"],
        facts: { units: "6 WE", livingArea: "520 m²", status: "verkauft" },
        coverImage: { src: "/assets/images/real-estate/realestate5.jpg", alt: "Mehrfamilienhaus Referenz" },
        media: {
            gallery: [
                { type: "image", src: "/assets/images/real-estate/realestate6.jpg", alt: "Außenansicht" },
                { type: "image", src: "/assets/images/real-estate/realestate7.jpg", alt: "Details" },
            ],
        },
        services: ["Vermarktung", "Fotografie", "Branding"],
        timeline: [
            { title: "Aufbereitung", text: "Unterlagen, Story, Kennzahlen – strukturiert und klar." },
            { title: "Vermarktung", text: "Anfragen, Vorqualifizierung, Besichtigungen." },
            { title: "Abschluss", text: "Abstimmung bis zum Abschluss begleitet." },
        ],
        isFeatured: true,
        sortOrder: 9,
    },
]);

/** Kategorie-Helper */
export function getReferenceCategories(items: Reference[] = references): ReferenceCategory[] {
    const set = new Set<ReferenceCategory>();
    items.forEach((r) => set.add(r.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Sortierung (Featured zuerst) */
function sortRefs(items: Reference[]) {
    return [...items].sort((a, b) => {
        const af = a.isFeatured ? 1 : 0;
        const bf = b.isFeatured ? 1 : 0;
        if (af !== bf) return bf - af;
        const ao = a.sortOrder ?? 0;
        const bo = b.sortOrder ?? 0;
        if (ao !== bo) return bo - ao;
        return String(b.year).localeCompare(String(a.year));
    });
}

/** Für /referenzen Grid */
export async function getReferences(): Promise<Reference[]> {
    return sortRefs(references);
}

/** Für /referenzen/[slug] */
export async function getReferenceBySlug(slug: string): Promise<Reference | null> {
    const all = await getReferences();
    return all.find((r) => r.slug === slug) ?? null;
}

/** Für generateStaticParams */
export async function getAllReferenceSlugs(): Promise<string[]> {
    const all = await getReferences();
    return all.map((r) => r.slug);
}

/**
 * Optional: Rows für Startseite/Teaser (z.B. "Neubau", "Sanierung" etc.)
 * UI kann daraus Carousels bauen.
 */
export async function getReferenceRows(): Promise<ReferenceRow[]> {
    const all = await getReferences();
    const cats = getReferenceCategories(all);

    return cats.map((cat) => ({
        id: cat,
        title: cat,
        href: `${REFERENCE_BASE_PATH}?category=${encodeURIComponent(cat)}`,
        items: all
            .filter((r) => r.category === cat)
            .map((r) => ({
                id: r.id,
                slug: r.slug,
                title: r.title,
                subtitle: r.subtitle,
                category: r.category,
                year: r.year,
                location: r.location,
                coverImage: r.coverImage,
                isFeatured: r.isFeatured,
            })),
    }));
}