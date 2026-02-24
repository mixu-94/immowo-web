// src/lib/data/listings.ts
import type { CategoryRow, Listing, EstateDetails } from "@/lib/types/listings";

const ESTATE_BASE_PATH = "/objekte";

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

export function makeListingSlug(title: string, id: string) {
    return `${slugify(title)}-${slugify(id)}`;
}

function withRouting(rows: CategoryRow[]): CategoryRow[] {
    return rows.map((row) => ({
        ...row,
        items: row.items.map((item) => {
            const slug = makeListingSlug(item.title, item.id);
            return {
                ...item,
                slug,
                href: `${ESTATE_BASE_PATH}/${slug}`,
            };
        }),
    }));
}

/**
 * ✅ ROW DATA (used for carousels/overview)
 * Keep it minimal = fast + clean.
 */
const rawRows: CategoryRow[] = [
    {
        id: "new",
        title: "NEU",
        href: "/neu",
        items: [
            {
                id: "re1",
                title: "Moderne Villa mit Seeblick",
                imageSrc: "/assets/images/real-estate/realestate1.jpg",
                href: "",
                location: "Bayern",
                badge: "NEU",
            },
            {
                id: "re2",
                title: "Luxus Penthouse im Grünen",
                imageSrc: "/assets/images/real-estate/realestate2.jpg",
                href: "",
                location: "Starnberg",
                badge: "SECRET SALE",
            },
            {
                id: "re3",
                title: "Baugrundstück mit Panorama",
                imageSrc: "/assets/images/real-estate/realestate3.jpg",
                href: "",
                location: "Allgäu",
                badge: "NEU",
            },
            {
                id: "re4",
                title: "Design Haus mit Pool",
                imageSrc: "/assets/images/real-estate/realestate4.jpg",
                href: "",
                location: "München Umland",
            },
            {
                id: "re5",
                title: "Architektenhaus in Hanglage",
                imageSrc: "/assets/images/real-estate/realestate5.jpg",
                href: "",
                location: "Bodensee",
                badge: "NEU",
            },
        ],
    },
    {
        id: "most",
        title: "MEISTGESEHEN",
        href: "/meistgesehen",
        items: [
            {
                id: "re6",
                title: "Landhaus mit Privatsee",
                imageSrc: "/assets/images/real-estate/realestate6.jpg",
                href: "",
                location: "Tirol",
            },
            {
                id: "re7",
                title: "Luxus Anwesen mit Park",
                imageSrc: "/assets/images/real-estate/realestate7.jpg",
                href: "",
                location: "Salzburg",
                badge: "SECRET SALE",
            },
            {
                id: "re8",
                title: "Modernes Chalet in Alpenlage",
                imageSrc: "/assets/images/real-estate/realestate8.jpg",
                href: "",
                location: "Zugspitze Region",
            },
            {
                id: "re9",
                title: "Villa mit Infinity Pool",
                imageSrc: "/assets/images/real-estate/realestate9.jpg",
                href: "",
                location: "Gardasee",
                badge: "VERKAUFT",
            },
            {
                id: "re10",
                title: "Waldresidenz mit Privatsphäre",
                imageSrc: "/assets/images/real-estate/realestate10.jpg",
                href: "",
                location: "Schwarzwald",
            },
            {
                id: "re11",
                title: "Seegrundstück mit Steg",
                imageSrc: "/assets/images/real-estate/realestate11.jpg",
                href: "",
                location: "Chiemsee",
            },
        ],
    },
];

export const categoryRows: CategoryRow[] = withRouting(rawRows);

/** Für Startseite/Carousels */
export async function getCategoryRows(): Promise<CategoryRow[]> {
    return categoryRows;
}

/** Für /immobilien (flache Liste) */
export async function getListings(): Promise<Listing[]> {
    return categoryRows.flatMap((r) => r.items);
}

/**
 * ✅ DETAIL DATA (used for /objekte/[slug])
 * Map by listing id so you can keep row data lightweight.
 */
const estateDetailsById: Record<string, Omit<EstateDetails, keyof Listing>> = {
    re1: {
        price: 3950000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 320,
        plotArea: 980,
        rooms: 7,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2021,
        energyClass: "A",
        heatingType: "Wärmepumpe",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Eine moderne Villa mit großzügigen Glasfronten, ruhiger Lage und beeindruckendem Blick auf den See. Hochwertige Materialien, klare Linien und ein durchdachtes Raumkonzept schaffen ein exklusives Wohngefühl.",
        highlights: [
            "Panoramablick auf den See",
            "Großzügige Südterrasse",
            "Smart-Home Vorbereitung",
            "Garage + Stellplätze",
        ],
        features: [
            "Fußbodenheizung",
            "Echtholzparkett",
            "Designer-Küche",
            "Weinklimaschrank",
            "Einbauschränke",
            "Alarmanlage vorbereitet",
        ],
        gallery: [
            "/assets/images/real-estate/realestate2.jpg",
            "/assets/images/real-estate/realestate3.jpg",
            "/assets/images/real-estate/realestate4.jpg",
            "/assets/images/real-estate/realestate5.jpg",
        ],
    },

    re2: {
        price: 2450000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 185,
        rooms: 4,
        bedrooms: 2,
        bathrooms: 2,
        yearBuilt: 2019,
        energyClass: "A+",
        heatingType: "Fernwärme",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Sofort verfügbar",
        description:
            "Ein zurückgezogenes Penthouse mit Privatsphäre, Dachterrasse und lichtdurchfluteten Wohnbereichen. Ideal für diskrete Käufer, die hochwertige Architektur und Naturanbindung kombinieren möchten.",
        highlights: ["Private Dachterrasse", "Aufzug direkt in die Wohnung", "2 TG-Stellplätze"],
        features: ["Kamin", "Klimatisierung", "Gäste-WC", "Smart Lighting"],
        gallery: [
            "/assets/images/real-estate/realestate6.jpg",
            "/assets/images/real-estate/realestate7.jpg",
            "/assets/images/real-estate/realestate8.jpg",
        ],
        // videoSrc: "/assets/videos/penthouse.mp4",
    },

    re3: {
        price: 890000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        plotArea: 1620,
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Großzügiges Grundstück mit Weitblick in begehrter Höhenlage. Ideale Voraussetzungen für ein modernes Einfamilienhaus oder ein anspruchsvolles Chalet-Konzept (vorbehaltlich Genehmigung).",
        highlights: ["Panoramablick", "Ruhige Lage", "Sehr gute Anbindung"],
        features: ["Süd-West Ausrichtung", "Anliegerstraße", "Erschließung in der Nähe"],
        gallery: [
            "/assets/images/real-estate/realestate9.jpg",
            "/assets/images/real-estate/realestate10.jpg",
        ],
    },

    re4: {
        price: 2790000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 265,
        plotArea: 740,
        rooms: 6,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2020,
        energyClass: "A",
        heatingType: "Wärmepumpe",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Puristische Architektur mit klaren Linien, großformatigen Glasflächen und privatem Außenbereich. Der beheizte Pool und die hochwertige Ausstattung machen dieses Objekt zu einem ganzjährigen Rückzugsort.",
        highlights: ["Beheizter Pool", "Offene Galerie", "Private Lounge-Terrasse"],
        features: ["Naturstein", "Einbauküche", "Home Office", "Elektrische Verschattung"],
        gallery: [
            "/assets/images/real-estate/realestate1.jpg",
            "/assets/images/real-estate/realestate5.jpg",
            "/assets/images/real-estate/realestate8.jpg",
        ],
    },

    re5: {
        price: 3180000,
        currency: "EUR",
        livingArea: 290,
        plotArea: 910,
        rooms: 7,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2017,
        energyClass: "A",
        heatingType: "Pellet + Solarthermie",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Architektonisches Statement in Hanglage mit Terrassierung und beeindruckender Lichtführung. Ein Zuhause, das Design und Alltagstauglichkeit auf höchstem Niveau verbindet.",
        highlights: ["Hanglage mit Terrassen", "Weitblick", "Doppelgarage"],
        features: ["Sauna", "Fitnessraum", "Hauswirtschaftsraum", "Outdoor-Küche"],
        gallery: [
            "/assets/images/real-estate/realestate2.jpg",
            "/assets/images/real-estate/realestate7.jpg",
            "/assets/images/real-estate/realestate11.jpg",
        ],
    },

    re6: {
        price: 4650000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 410,
        plotArea: 5200,
        rooms: 10,
        bedrooms: 6,
        bathrooms: 5,
        yearBuilt: 2012,
        energyClass: "B",
        heatingType: "Biomasse",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Ein außergewöhnliches Landhaus mit eigenem Privatsee und weitläufigem Park. Absolute Privatsphäre, repräsentative Räume und ein unvergleichliches Naturerlebnis.",
        highlights: ["Privatsee", "Parkähnliches Grundstück", "Gästehaus"],
        features: ["Bootssteg", "Weinkeller", "Kaminlounge", "Security-System"],
        gallery: [
            "/assets/images/real-estate/realestate7.jpg",
            "/assets/images/real-estate/realestate8.jpg",
            "/assets/images/real-estate/realestate9.jpg",
        ],
    },

    re7: {
        price: 8900000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 720,
        plotArea: 11000,
        rooms: 14,
        bedrooms: 8,
        bathrooms: 7,
        yearBuilt: 2008,
        energyClass: "B",
        heatingType: "Gas + Solar",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Diskret / nach Vereinbarung",
        description:
            "Repräsentatives Anwesen mit Park, Blickachsen und hochwertigen Details. Ideal für Käufer, die Diskretion und außergewöhnliche Qualität in bester Lage suchen.",
        highlights: ["Parkanlage", "Indoor Spa", "Gäste-Trakt"],
        features: ["Indoor-Pool", "Spa & Sauna", "Aufzug", "Personalwohnung", "Weinkeller"],
        gallery: [
            "/assets/images/real-estate/realestate10.jpg",
            "/assets/images/real-estate/realestate11.jpg",
            "/assets/images/real-estate/realestate6.jpg",
        ],
    },

    re8: {
        price: 3290000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 240,
        plotArea: 620,
        rooms: 6,
        bedrooms: 4,
        bathrooms: 3,
        yearBuilt: 2018,
        energyClass: "A",
        heatingType: "Wärmepumpe",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Saison 2026 verfügbar",
        description:
            "Modernes Chalet mit alpinem Charakter: warme Materialien, großzügige Sichtachsen und perfekte Balance aus Design und Gemütlichkeit.",
        highlights: ["Bergblick", "Offener Kamin", "Ski-Room"],
        features: ["Sauna", "Kamin", "Ski-/Bike-Room", "Panorama-Terrasse", "E-Ladestation"],
        gallery: [
            "/assets/images/real-estate/realestate9.jpg",
            "/assets/images/real-estate/realestate4.jpg",
            "/assets/images/real-estate/realestate2.jpg",
        ],
    },

    re9: {
        price: 0,
        currency: "EUR",
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        livingArea: 360,
        plotArea: 1200,
        rooms: 8,
        bedrooms: 5,
        bathrooms: 4,
        yearBuilt: 2016,
        energyClass: "A",
        heatingType: "Wärmepumpe",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Verkauft",
        description:
            "Exklusive Villa mit Infinity Pool und Blick auf den See. Dieses Objekt ist bereits verkauft, dient jedoch als Referenz für ähnliche Off-Market Angebote.",
        highlights: ["Infinity Pool", "Seeblick", "Off-Market Referenz"],
        features: ["Outdoor Lounge", "Smart Home", "Weinkeller"],
        gallery: [
            "/assets/images/real-estate/realestate1.jpg",
            "/assets/images/real-estate/realestate3.jpg",
        ],
    },

    re10: {
        price: 1980000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        livingArea: 215,
        plotArea: 4300,
        rooms: 6,
        bedrooms: 3,
        bathrooms: 2,
        yearBuilt: 2014,
        energyClass: "B",
        heatingType: "Pellet",
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Rückzugsort im Grünen: Waldresidenz mit großem Grundstück, ruhiger Zufahrt und behaglicher Atmosphäre.",
        highlights: ["Sehr ruhige Lage", "Großes Grundstück", "Home Office möglich"],
        features: ["Kamin", "Werkstatt", "Gartenhaus", "Carport"],
        gallery: [
            "/assets/images/real-estate/realestate5.jpg",
            "/assets/images/real-estate/realestate6.jpg",
            "/assets/images/real-estate/realestate11.jpg",
        ],
    },

    re11: {
        price: 2150000,
        geo: { lat: 48.2439, lng: 10.3626 }, // Dummy
        currency: "EUR",
        plotArea: 980,
        commissionText: "3,57% inkl. MwSt. Käuferprovision",
        availability: "Nach Absprache",
        description:
            "Seltenes Seegrundstück mit privatem Steg. Perfekt für eine außergewöhnliche Neubauplanung (vorbehaltlich Genehmigungen).",
        highlights: ["Privater Steg", "Direkter Seezugang", "Rarität"],
        features: ["Süd-Ausrichtung", "Ruhige Nachbarschaft", "Gute Infrastruktur"],
        gallery: [
            "/assets/images/real-estate/realestate2.jpg",
            "/assets/images/real-estate/realestate8.jpg",
        ],
    },
};

export async function getAllEstates(): Promise<Listing[]> {
    const rows = await getListings();
    return rows.flatMap((r) => r.items);
}

export async function getEstateBySlug(slug: string): Promise<EstateDetails | null> {
    const all = await getListings();
    const base = all.find((x) => x.slug === slug);
    if (!base) return null;

    const details = estateDetailsById[base.id] ?? {};
    return { ...base, ...details };
}