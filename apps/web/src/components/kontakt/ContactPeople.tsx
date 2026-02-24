// components/kontakt/ContactPeople.tsx
import Image from "next/image";
import { Mail, Phone, BadgeCheck } from "lucide-react";

type Person = {
  name: string;
  role: string;
  phone: string;
  email: string;
  imageSrc: string;
  focus: string[];
};

const people: Person[] = [
  {
    name: "Max Mustermann",
    role: "Vertrieb • Neubau & Bestand",
    phone: "+49 170 1234567",
    email: "vertrieb@beispiel.de",
    imageSrc: "/assets/images/real-estate/realestate5.jpg",
    focus: ["Schlüsselfertig", "Besichtigungen", "Käuferprozess"],
  },
  {
    name: "Julia Musterfrau",
    role: "Projektentwicklung • Bauträger",
    phone: "+49 170 7654321",
    email: "projekte@beispiel.de",
    imageSrc: "/assets/images/real-estate/realestate6.jpg",
    focus: ["Vom Papier weg", "Planung", "Bauablauf"],
  },
];

export function ContactPeople() {
  return (
    <aside className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="mb-2 text-xs font-semibold tracking-widest text-white/60">
          ANSPRECHPARTNER
        </div>
        <h2 className="text-lg font-semibold text-white">Direkter Kontakt</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Wählen Sie den passenden Ansprechpartner – oder senden Sie einfach das
          Formular. Wir melden uns schnellstmöglich.
        </p>
      </div>

      {people.map((p) => (
        <div
          key={p.email}
          className="group rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/15 hover:bg-white/7"
        >
          <div className="flex gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={p.imageSrc}
                alt={p.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="truncate text-sm font-semibold text-white">
                  {p.name}
                </div>
                <BadgeCheck className="h-4 w-4 text-white/60" />
              </div>
              <div className="mt-1 text-xs text-white/65">{p.role}</div>

              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a
                  href={`tel:${p.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-white/60" />
                  {p.phone}
                </a>
                <a
                  href={`mailto:${p.email}`}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-white/60" />
                  {p.email}
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.focus.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-white/70 backdrop-blur">
        <div className="font-semibold text-white/85">Hinweis</div>
        <p className="mt-2 leading-relaxed"></p>
      </div> */}
    </aside>
  );
}
