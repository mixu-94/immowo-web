import type { Metadata } from "next";
import { LegalPage } from "@/components/Legals/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung" lastUpdated="23.02.2026">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der DSGVO:
        <br />
        <strong>Immowo Ventures GmbH</strong>
        <br />
        Dossenbergerstraße 5, 89312 Günzburg, Deutschland
        <br />
        E-Mail: <strong>[E-Mail ergänzen]</strong>
        <br />
        Telefon: <strong>[Telefon ergänzen]</strong>
      </p>

      <h2>2. Datenschutzbeauftragter</h2>
      <p>
        <strong>
          [Falls vorhanden: Kontaktdaten eintragen. Falls nicht: „Kein
          Datenschutzbeauftragter bestellt.“]
        </strong>
      </p>

      <h2>3. Datenverarbeitung beim Websitebesuch (Server-Logs)</h2>
      <p>
        Bei Besuch der Website werden technisch erforderliche Daten verarbeitet
        (z. B. IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, User-Agent,
        Referrer), um den Betrieb und die Sicherheit der Website zu
        gewährleisten.
      </p>
      <p>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
        sicherem Betrieb).
      </p>

      <h2>4. Pflichtangaben zur Freischaltung von Inhalten</h2>
      <p>
        Um den vollen Inhalt der Website zu sehen, erheben wir{" "}
        <strong>Name</strong>, <strong>E-Mail-Adresse</strong> und{" "}
        <strong>Telefonnummer</strong>.
      </p>
      <p>
        Zwecke: Freischaltung von Inhalten, Kontaktaufnahme, Bearbeitung von
        Anfragen, Zusendung weiterer Informationen zu passenden
        Immobilien/Services.
      </p>
      <p>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO
        (Nutzungsverhältnis/Anbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an Lead-Qualifizierung und Missbrauchsschutz).
      </p>

      <h2>5. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns kontaktieren (Formular, E-Mail, Telefon), verarbeiten wir
        Ihre Angaben zur Bearbeitung der Anfrage.
      </p>
      <p>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f
        DSGVO.
      </p>

      <h2>6. E-Mail-Versand (zusätzliche Informationen)</h2>
      <p>
        Wir nutzen Ihre E-Mail-Adresse, um Ihnen zusätzliche Informationen zu
        Anfragen, Objekten oder passenden Angeboten zuzusenden.
      </p>
      <ul>
        <li>
          Transaktionale E-Mails (Anfrage-/Service-Kommunikation): Art. 6 Abs. 1
          lit. b DSGVO.
        </li>
        <li>
          Werbliche E-Mails/Newsletter:{" "}
          <strong>
            [Einwilligungs-Mechanik festlegen, z. B. Double-Opt-In]
          </strong>{" "}
          (Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 7 UWG).
        </li>
      </ul>
      <p>
        Abmeldung/Widerruf ist jederzeit möglich (z. B. Abmeldelink oder
        Nachricht an uns).
      </p>

      <h2>7. Empfänger / Dienstleister</h2>
      <p>
        Wir setzen Dienstleister ein (Hosting, E-Mail, IT), die Daten in unserem
        Auftrag verarbeiten (Art. 28 DSGVO).
      </p>
      <p>
        <strong>
          [Hosting-Anbieter, E-Mail-Provider, ggf. CRM/Newsletter/Analytics
          konkret benennen]
        </strong>
      </p>

      <h2>8. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die Zwecke
        erforderlich ist oder gesetzliche Pflichten bestehen.
        <br />
        <strong>
          [Konkrete Löschfristen ergänzen, z. B. Leads 12–24 Monate]
        </strong>
      </p>

      <h2>9. Betroffenenrechte</h2>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch (Art. 21 DSGVO)</li>
        <li>Widerruf von Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <h2>10. Cookies / Consent / Tracking</h2>
      <p>
        <strong>
          [Eintragen, ob Cookies/Analytics/Marketing genutzt werden. Falls ja:
          Consent-Banner nach TTDSG + Tool-Namen, Zwecke, Speicherdauer.]
        </strong>
      </p>
    </LegalPage>
  );
}
