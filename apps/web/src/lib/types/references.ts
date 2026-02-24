// components/referenzen/types.ts
export type ReferenceKPI = {
    label: string;
    value: string;
};

export type ReferenceCategory =
    | "Neubau"
    | "Sanierung"
    | "Projektentwicklung"
    | "Verkauf"
    | "Kapitalanlage"
    | "Gewerbe";

export type ReferenceProperty = {
    id: string;
    title: string;            // z.B. "Modernes EFH mit Garten"
    subtitle?: string;        // z.B. "Schlüsselfertig • KfW-Standard"
    category: ReferenceCategory;

    year: string;             // Abschlussjahr oder Verkaufsjahr
    location: string;         // Stadt / Region (keine genaue Adresse)

    description: string;      // 2-3 Sätze, Story/Outcome

    highlights: string[];     // kurze Bullet-Badges (z.B. "KfW 40", "Massivbau", "Bauzeit 11 Monate")

    facts?: {
        units?: string;         // z.B. "6 WE"
        livingArea?: string;    // z.B. "165 m²"
        plotArea?: string;      // z.B. "520 m²"
        rooms?: string;         // z.B. "5 Zimmer"
        buildTime?: string;     // z.B. "11 Monate"
        status?: "verkauft" | "reserviert" | "fertiggestellt" | "in bau";
    };

    coverImage?: {
        src: string;
        alt: string;
    };

    // Optional: wenn ihr Detailseiten baut (später)
    links?: {
        label: string;
        href: string;
    }[];
};