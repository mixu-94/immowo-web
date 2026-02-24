// lib/data/references.ts
import type { Reference, ReferenceCategory, ReferenceRow } from "@/lib/types/references";

/**
 * ============================================================================
 * REFERENCES DATA LAYER (Mock heute, Payload später)
 * ============================================================================
 * Ziel:
 * - Single Source of Truth: `references`
 * - Alle UI-Seiten (Grid, Filter, Detail, SEO, SSG) hängen nur an den Funktionen unten.
 *
 * Payload später:
 * - Collection: `references`
 * - fields: title, subtitle, slug, category, year, location(region/label), description, highlights,
 *           facts, kpis, services, timeline, media.gallery, documents, caseStudy, sections, testimonial,
 *           seo, isFeatured, sortOrder
 *
 * Best Practice:
 * - Diskretion: keine exakte Adresse öffentlich, nur location.label/region
 * - Dokumente: wenn URLs fehlen -> UI zeigt "AUF ANFRAGE" (Premium + Schutz)
 * - Detailseite: genug Content für SEO (sections + caseStudy + timeline)
 * ============================================================================
 */

const REFERENCE_BASE_PATH = "/referenzen";

/** URL-friendly slug (stabil, CMS-kompatibel) */
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
    // title + id macht Slug stabil auch bei ähnlichen Namen
    return `${slugify(title)}-${slugify(id)}`;
}

function withSlugs(items: Omit<Reference, "slug">[]): Reference[] {
    return items.map((r) => ({ ...r, slug: makeSlug(r.title, r.id) }));
}

/**
 * ----------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH
 * ----------------------------------------------------------------------------
 * Tipp: Damit das Frontend robust wird, sollten mindestens je Variante
 * ("Neubau", "Sanierung", "Projektentwicklung", "Verkauf") 1–2 Referenzen
 * möglichst vollständig befüllt sein.
 */
export const references: Reference[] = withSlugs([
    // --------------------------------------------------------------------------
    // 1) Neubau – schlüsselfertig (vollständig befüllt)
    // --------------------------------------------------------------------------
    {
        id: "ref-efh-neubau-01",
        title: "Neubau Einfamilienhaus – Modernes Wohnen",
        subtitle: "Schlüsselfertig • energieeffizient • familienfreundlich",
        category: "Neubau",
        year: "2025",
        location: {
            region: "Schwaben",
            label: "Landkreis Günzburg (Region)",
            // geo optional (diskret): falls du eine grobe Karte oder Link nutzen willst
            geo: { lat: 48.455, lng: 10.275 },
        },

        // Kurzbeschreibung (2–3 Sätze) – erscheint in Grid/Teaser & im Detail-Intro
        description:
            "Von der Planung bis zur Schlüsselübergabe: modernes EFH mit offener Raumaufteilung, klaren Linien und hochwertiger Ausstattung. Fokus lag auf effizienter Bauzeit, sauberer Dokumentation und hoher Ausführungsqualität.",

        // Kurze Chips/Badges – für Card & Hero
        highlights: [
            "Schlüsselfertig",
            "Fußbodenheizung",
            "Große Fensterflächen",
            "Hochwertige Ausstattung",
            "Diskrete Vermarktung",
            "Qualitätssicherung",
        ],

        // Fakten (Strings fürs MVP ok – später in Payload gern als Zahlen + Formatter)
        facts: {
            livingArea: "165 m²",
            plotArea: "520 m²",
            rooms: "5 Zimmer",
            buildTime: "11 Monate",
            status: "fertiggestellt",
        },

        // KPIs = kleine Kacheln, super für Trust/SEO
        kpis: [
            { label: "Bauzeit", value: "11 Monate" },
            { label: "Wohnfläche", value: "165 m²" },
            { label: "Status", value: "Fertiggestellt" },
            { label: "Ausstattung", value: "Premium" },
        ],

        // Cover für Detail-Hero + Card
        coverImage: {
            src: "/assets/images/real-estate/realestate1.jpg",
            alt: "Neubau Einfamilienhaus – moderne Architektur",
        },

        // Gallery für Detailseite (Case Study)
        media: {
            gallery: [
                { type: "image", src: "/assets/images/real-estate/realestate2.jpg", alt: "Außenansicht" },
                { type: "image", src: "/assets/images/real-estate/realestate3.jpg", alt: "Wohnbereich" },
                { type: "image", src: "/assets/images/real-estate/realestate4.jpg", alt: "Küche / Details" },
                { type: "image", src: "/assets/images/real-estate/realestate5.jpg", alt: "Terrasse / Garten" },
            ],
        },

        // Welche Leistungen wurden erbracht (für Trust + Filter)
        services: ["Projektentwicklung", "Bauträger", "Finishing", "Fotografie"],

        // Timeline macht Case Study “groß”
        timeline: [
            {
                title: "Konzept & Planung",
                text: "Grundrissoptimierung, Budgetrahmen, Materialkonzept und Auswahl der Ausstattungslinie.",
            },
            {
                title: "Bauphase",
                text: "Koordination der Gewerke, Qualitätssicherung über Checkpoints, Terminsteuerung und laufende Abstimmungen.",
            },
            {
                title: "Übergabe",
                text: "Abnahme, Dokumentation, Übergabe der Unterlagen und Schlüsselübergabe.",
            },
        ],

        // Strukturierte Case Study (SEO + Marketing)
        caseStudy: {
            challenge:
                "Ziel war ein modernes, alltagstaugliches EFH – mit planbarer Bauzeit, hoher Ausführungsqualität und klarer Dokumentation für Käufer.",
            approach:
                "Grundriss/Ausstattung wurden iterativ optimiert. In der Umsetzung standen Koordination, Qualitätscheckpoints und transparente Kommunikation im Vordergrund.",
            result:
                "Schlüsselfertige Übergabe im geplanten Zeitrahmen. Hochwertige Ausführung und nachvollziehbare Unterlagen für Betrieb und Wartung.",
        },

        // Lange Textabschnitte (für “große Referenzen”)
        sections: [
            {
                heading: "Ausgangslage",
                content:
                    "Das Projekt wurde mit dem Anspruch gestartet, modernes Wohnen mit hoher Alltagstauglichkeit zu verbinden. Besonderer Fokus lag auf Licht, Raumgefühl, Stauraum und einer langlebigen Ausstattung.",
            },
            {
                heading: "Planung & Qualitätssicherung",
                content:
                    "Die Planung wurde entlang der Nutzung optimiert (Wege, Möblierung, Tageslicht). In der Umsetzung wurden Checkpoints zur Qualitätssicherung etabliert, um Ausführung und Details konstant auf hohem Niveau zu halten.",
            },
            {
                heading: "Ergebnis & Übergabe",
                content:
                    "Die Übergabe erfolgte mit strukturierter Dokumentation. Dadurch erhalten Käufer eine klare Basis für Betrieb, Wartung und spätere Erweiterungen.",
            },
        ],

        // Optional: Testimonial (anonymisiert)
        testimonial: {
            quote:
                "Sehr strukturierter Ablauf und klare Kommunikation. Besonders die dokumentierte Übergabe hat überzeugt.",
            author: "Käufer (anonymisiert)",
            role: "Privatkunde",
        },

        // Dokumente: wenn URLs fehlen -> UI “AUF ANFRAGE”
        documents: {
            // caseStudyPdfUrl: "/assets/pdfs/case-study-efh.pdf",
            // exposeSampleUrl: "/assets/pdfs/expose-sample.pdf",
        },

        seo: {
            // Optional: pro Referenz SEO überschreiben (wenn du willst)
            // title: "Neubau Referenz in Schwaben – schlüsselfertig | Immowo Ventures",
            // description: "Schlüsselfertiger Neubau in Schwaben: Planung, Bauphase, Übergabe – Referenzprojekt von Immowo Ventures.",
            // ogImage: "/assets/images/real-estate/realestate1.jpg",
        },

        isFeatured: true,
        sortOrder: 10,
    },

    // --------------------------------------------------------------------------
    // 2) Verkauf/Vermarktung – MFH (voller Prozess, starke Conversion-Story)
    // --------------------------------------------------------------------------
    {
        id: "ref-mfh-verkauf-02",
        title: "Mehrfamilienhaus – Verkauf & Vermarktung",
        subtitle: "Kapitalanlage • klare Unterlagen • sauberer Prozess",
        category: "Verkauf",
        year: "2024",
        location: { region: "Schwaben", label: "Augsburg (Region)" },

        description:
            "Strukturierte Vermarktung mit vollständigem Unterlagenpaket, professioneller Präsentation und sauberer Interessentenqualifizierung. Ziel war eine planbare Abwicklung mit hoher Qualität der Anfragen.",

        highlights: [
            "Unterlagenpaket",
            "Käuferqualifizierung",
            "Besichtigungsmanagement",
            "Diskret",
            "Schnelle Abwicklung",
        ],

        facts: { units: "6 WE", livingArea: "520 m²", status: "verkauft" },

        kpis: [
            { label: "Einheiten", value: "6 WE" },
            { label: "Status", value: "Verkauft" },
            { label: "Fokus", value: "Vermarktung" },
            { label: "Unterlagen", value: "strukturiert" },
        ],

        coverImage: {
            src: "/assets/images/real-estate/realestate5.jpg",
            alt: "Mehrfamilienhaus – Vermarktung Referenz",
        },

        media: {
            gallery: [
                { type: "image", src: "/assets/images/real-estate/realestate6.jpg", alt: "Außenansicht" },
                { type: "image", src: "/assets/images/real-estate/realestate7.jpg", alt: "Details" },
            ],
        },

        services: ["Vermarktung", "Fotografie", "Branding"],

        timeline: [
            {
                title: "Aufbereitung",
                text: "Unterlagen strukturiert, Exposé erstellt, Bildmaterial abgestimmt, Daten konsolidiert.",
            },
            {
                title: "Vermarktung",
                text: "Anfragen, Vorqualifizierung, klarer Ablauf für Besichtigungen & Feedback.",
            },
            {
                title: "Abschluss",
                text: "Kommunikation bis Abschluss begleitet, Dokumentation und Übergabe der Unterlagen abgestimmt.",
            },
        ],

        caseStudy: {
            challenge:
                "Ziel war eine diskrete, effiziente Vermarktung – mit klaren Unterlagen und qualifizierten Interessenten, ohne unnötige Besichtigungstermine.",
            approach:
                "Unterlagenpaket standardisiert, Präsentation optimiert und einen klaren Prozess etabliert (Vorqualifizierung → Termin → Feedback/Next Step).",
            result:
                "Planbarer Ablauf mit hoher Anfragequalität und sauberer Kommunikation bis zum Abschluss.",
        },

        sections: [
            {
                heading: "Unterlagen & Struktur",
                content:
                    "Ein vollständiges Unterlagenpaket reduziert Rückfragen und erhöht die Entscheidungssicherheit. Die Referenz wurde daher mit klaren Kennzahlen und einer nachvollziehbaren Objektstory präsentiert.",
            },
            {
                heading: "Interessentenprozess",
                content:
                    "Die Qualität der Anfragen wurde durch Vorqualifizierung und transparente Kommunikation gesteuert. Termine wurden effizient organisiert und dokumentiert.",
            },
        ],

        documents: {
            // caseStudyPdfUrl: "/assets/pdfs/case-study-mfh.pdf",
        },

        isFeatured: true,
        sortOrder: 9,
    },

    // --------------------------------------------------------------------------
    // 3) Projektentwicklung – Neubauprojekt (Kauf ab Plan)
    // --------------------------------------------------------------------------
    {
        id: "ref-projektentwicklung-03",
        title: "Projektentwicklung – Neubauprojekt (Kauf ab Plan)",
        subtitle: "Konzept • Planung • Umsetzung • Übergabe",
        category: "Projektentwicklung",
        year: "2025",
        location: { region: "Bayern", label: "Schwaben (Bayern)" },

        description:
            "Projektentwicklung ab Grundstücksbewertung: Konzept, Planung und Umsetzung koordiniert. Fokus auf wirtschaftliche Grundrisse, klare Kostensteuerung und terminsichere Umsetzung.",

        highlights: ["Kauf ab Plan", "Grundrissoptimierung", "Kostenrahmen", "Terminsicherheit", "Qualitätssicherung"],

        facts: { units: "3 Einheiten", buildTime: "14 Monate", status: "fertiggestellt" },

        kpis: [
            { label: "Einheiten", value: "3" },
            { label: "Bauzeit", value: "14 Monate" },
            { label: "Modell", value: "Kauf ab Plan" },
            { label: "Status", value: "Fertiggestellt" },
        ],

        coverImage: {
            src: "/assets/images/real-estate/realestate8.jpg",
            alt: "Projektentwicklung – Referenz",
        },

        media: {
            gallery: [
                { type: "image", src: "/assets/images/real-estate/realestate9.jpg", alt: "Visualisierung" },
                { type: "image", src: "/assets/images/real-estate/realestate10.jpg", alt: "Baufortschritt" },
                { type: "image", src: "/assets/images/real-estate/realestate11.jpg", alt: "Fertigstellung" },
            ],
        },

        services: ["Projektentwicklung", "Bauträger", "Vermarktung"],

        timeline: [
            { title: "Machbarkeit", text: "Bewertung, Potenzialanalyse, Konzept und Zielgruppe." },
            { title: "Planung", text: "Layouts, Kostenrahmen, Terminplan und Abstimmungen." },
            { title: "Umsetzung", text: "Koordination, Qualitätssicherung, Abnahme, Übergabe." },
        ],

        caseStudy: {
            challenge:
                "Projektentwicklung mit Fokus auf wirtschaftliche Grundrisse, Kostenrahmen und terminsichere Umsetzung – bei gleichzeitig hochwertiger Positionierung.",
            approach:
                "Machbarkeit geprüft, Konzept/Layouts definiert, Kosten- und Terminplanung erstellt und Umsetzung mit Qualitätscheckpoints begleitet.",
            result:
                "Fertigstellung mit transparentem Ablauf. Strukturierte Unterlagenbasis für Vermarktung und Übergabe.",
        },

        sections: [
            {
                heading: "Machbarkeit & Konzept",
                content:
                    "Zu Beginn stand die Potenzialanalyse: Layout-Varianten, Zielgruppe, Wirtschaftlichkeit und Risiken. Daraus entstand ein umsetzbares Konzept mit klarer Priorisierung.",
            },
            {
                heading: "Planung bis Umsetzung",
                content:
                    "Kostenrahmen und Terminplan wurden entlang der Planung konkretisiert. In der Umsetzung lag der Fokus auf Koordination, Qualität und planbarer Kommunikation.",
            },
        ],

        documents: {},

        isFeatured: false,
        sortOrder: 8,
    },

    // --------------------------------------------------------------------------
    // 4) Sanierung – Bestandsobjekt (Before/After Story, SEO stark)
    // --------------------------------------------------------------------------
    {
        id: "ref-sanierung-04",
        title: "Sanierung Bestand – Modernisierung & Wertsteigerung",
        subtitle: "Technik • Oberfläche • Wohnkomfort • Präsentation",
        category: "Sanierung",
        year: "2024",
        location: { region: "Schwaben", label: "Neu-Ulm (Region)" },

        description:
            "Bestandsimmobilie modernisiert: Technik und Oberflächen erneuert, Raumwirkung verbessert und Wohnkomfort gesteigert. Ergebnis: bessere Marktpositionierung und hochwertige Präsentation.",

        highlights: ["Modernisierung", "Innenausbau", "Bäder", "Neuer Look & Feel", "Aufbereitung zur Vermarktung"],

        facts: { livingArea: "120 m²", rooms: "4 Zimmer", status: "fertiggestellt", buildTime: "10 Wochen" },

        kpis: [
            { label: "Dauer", value: "10 Wochen" },
            { label: "Wohnfläche", value: "120 m²" },
            { label: "Status", value: "Fertiggestellt" },
            { label: "Fokus", value: "Wertsteigerung" },
        ],

        coverImage: { src: "/assets/images/real-estate/realestate4.jpg", alt: "Sanierung – Referenz" },

        media: {
            gallery: [
                { type: "image", src: "/assets/images/real-estate/realestate3.jpg", alt: "Nachher – Wohnbereich" },
                { type: "image", src: "/assets/images/real-estate/realestate2.jpg", alt: "Nachher – Details" },
            ],
        },

        services: ["Sanierung", "Innenausbau", "Fotografie"],

        timeline: [
            { title: "Analyse", text: "Zustand, Maßnahmenpaket, Budget und Zeitplan." },
            { title: "Umsetzung", text: "Technik, Oberflächen, Innenausbau, Abnahme." },
            { title: "Präsentation", text: "Hochwertige Darstellung zur Vermarktung." },
        ],

        caseStudy: {
            challenge:
                "Bestand sollte modernisiert und marktfähig positioniert werden – mit Fokus auf Wohnkomfort und saubere Ausführung innerhalb kurzer Zeit.",
            approach:
                "Maßnahmenpaket definiert, Umsetzung strukturiert koordiniert und die Präsentation (Fotos/Story) aufgewertet.",
            result:
                "Modernes, stimmiges Gesamtbild mit deutlich verbessertem Wohngefühl und starker Darstellung für die Vermarktung.",
        },

        sections: [
            {
                heading: "Maßnahmenpaket",
                content:
                    "Technik und Oberflächen wurden gezielt erneuert, um Wartbarkeit und Komfort zu steigern. Priorität: sichtbare Qualitätswirkung mit vernünftiger Kostenstruktur.",
            },
            {
                heading: "Präsentation",
                content:
                    "Nach Abschluss wurde die Immobilie professionell präsentiert – mit Fokus auf Licht, Raumgefühl und Details. Das erhöht die Entscheidungssicherheit bei Interessenten.",
            },
        ],

        isFeatured: false,
        sortOrder: 7,
    },
]);

/** sort: featured -> sortOrder -> year (desc) */
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

/** Category list derived from data (no duplicates in separate configs) */
export function getReferenceCategories(items: Reference[] = references): ReferenceCategory[] {
    const set = new Set<ReferenceCategory>();
    items.forEach((r) => set.add(r.category));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** For /referenzen grid */
export async function getReferences(): Promise<Reference[]> {
    return sortRefs(references);
}

/** For /referenzen/[slug] */
export async function getReferenceBySlug(slug: string): Promise<Reference | null> {
    const all = await getReferences();
    return all.find((r) => r.slug === slug) ?? null;
}

/** For generateStaticParams */
export async function getAllReferenceSlugs(): Promise<string[]> {
    const all = await getReferences();
    return all.map((r) => r.slug);
}

/**
 * Optional: Rows for carousels/teasers.
 * Useful if you want a homepage section like "Neubau" / "Sanierung".
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