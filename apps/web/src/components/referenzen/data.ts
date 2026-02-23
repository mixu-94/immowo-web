// components/referenzen/data.ts
import type { ReferenceProperty } from "./types";

export const referenceProjects: ReferenceProperty[] = [
    {
        id: "ref-efh-neubau-01",
        title: "Neubau Einfamilienhaus – Modernes Wohnen",
        subtitle: "Schlüsselfertig • energieeffizient • familienfreundlich",
        category: "Neubau",
        year: "2025",
        location: "Landkreis Günzburg",
        description:
            "Von der Planung bis zur Schlüsselübergabe: modernes EFH mit klaren Linien, offener Raumaufteilung und hochwertiger Ausstattung. Fokus lag auf effizienter Bauzeit und hoher Ausführungsqualität.",
        highlights: ["Schlüsselfertig", "Fußbodenheizung", "Große Fensterflächen", "Carport + Abstellraum"],
        facts: {
            livingArea: "165 m²",
            plotArea: "520 m²",
            rooms: "5 Zimmer",
            buildTime: "11 Monate",
            status: "fertiggestellt",
        },
        coverImage: {
            src: "/assets/images/real-estate/realestate1.jpg",
            alt: "Neubau EFH modern",
        },
        links: [{ label: "Ähnliches Projekt anfragen", href: "/kontakt" }],
    },
    {
        id: "ref-mfh-verkauf-02",
        title: "Mehrfamilienhaus – Verkauf & Vermarktung",
        subtitle: "Kapitalanlage • starke Nachfrage • klare Unterlagen",
        category: "Verkauf",
        year: "2024",
        location: "Augsburg (Region)",
        description:
            "Strukturierte Vermarktung mit vollständigen Unterlagen, professioneller Präsentation und sauberem Interessentenprozess. Ziel: schnelle, nachvollziehbare Entscheidung für Käufer und Verkäufer.",
        highlights: ["Exposé & Unterlagenpaket", "Besichtigungsmanagement", "Käuferqualifizierung", "Schnelle Abwicklung"],
        facts: {
            units: "6 WE",
            livingArea: "520 m²",
            status: "verkauft",
        },
        coverImage: {
            src: "/assets/images/real-estate/realestate1.jpg",
            alt: "Mehrfamilienhaus Referenz",
        },
        links: [{ label: "Verkauf anfragen", href: "/kontakt" }],
    },
    {
        id: "ref-projektentwicklung-03",
        title: "Projektentwicklung – Vom Papier bis zur Umsetzung",
        subtitle: "Konzept • Planung • Bau • Übergabe",
        category: "Projektentwicklung",
        year: "2025",
        location: "Bayern (Schwaben)",
        description:
            "Projektentwicklung ab Grundstücksbewertung: Konzept, Planung und Ausführung koordiniert. Fokus auf wirtschaftliche Grundrisse, klare Baukostensteuerung und terminsichere Umsetzung.",
        highlights: ["Grundrissoptimierung", "Baukostenkontrolle", "Koordination Gewerke", "Terminsicherheit"],
        facts: {
            units: "3 Einheiten",
            buildTime: "14 Monate",
            status: "fertiggestellt",
        },
        coverImage: {
            src: "/assets/images/real-estate/realestate1.jpg",
            alt: "Projektentwicklung Referenz",
        },
        links: [{ label: "Projekt besprechen", href: "/kontakt" }],
    },
    {
        id: "ref-sanierung-04",
        title: "Sanierung Bestand – Modernisierung & Wertsteigerung",
        subtitle: "Technik • Oberfläche • Energie • Wohnkomfort",
        category: "Sanierung",
        year: "2024",
        location: "Neu-Ulm (Region)",
        description:
            "Bestandsimmobilie modernisiert: Technik und Oberflächen erneuert, Raumwirkung verbessert, Wohnkomfort spürbar gesteigert. Ergebnis: deutlich bessere Präsentation & Marktpositionierung.",
        highlights: ["Bäder modernisiert", "Boden/Innenausbau", "Energie-Upgrade", "Neuer Look & Feel"],
        facts: {
            livingArea: "120 m²",
            rooms: "4 Zimmer",
            status: "fertiggestellt",
        },
        coverImage: {
            src: "/assets/images/real-estate/realestate1.jpg",
            alt: "Sanierung Referenz",
        },
        links: [{ label: "Sanierung anfragen", href: "/kontakt" }],
    },
];