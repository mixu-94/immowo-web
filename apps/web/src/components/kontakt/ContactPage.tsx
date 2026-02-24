// components/kontakt/ContactPage.tsx
import { ContactShell } from "./ContactShell";
import { ContactHero } from "./ContactHero";
import { ContactPeople } from "./ContactPeople";
import { ContactForm } from "./ContactForm";
import { ContactTrust } from "./ContactTrust";
import { ScrollToFormOnListing } from "../ui/ScrollToForm";

export function ContactPage() {
  return (
    <ContactShell>
      <ContactHero />

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start ">
        <ContactPeople />
        <div id="formular">
          <ContactForm />
        </div>
      </section>

      <ContactTrust />
    </ContactShell>
  );
}
