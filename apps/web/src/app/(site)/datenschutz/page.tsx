// src/app/(site)/datenschutz/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO sowie zu Cookies, externen Inhalten und Kontaktanfragen.",
};

type TocItem = {
  id: string;
  label: string;
};

const toc: TocItem[] = [
  { id: "verantwortlicher", label: "1. Verantwortlicher" },
  { id: "dsb", label: "2. Datenschutzbeauftragter" },
  { id: "allgemeines", label: "3. Allgemeines / Rechtsgrundlagen" },
  { id: "serverlogs", label: "4. Hosting & Server-Logfiles" },
  { id: "kontakt", label: "5. Kontaktaufnahme & Kontaktformular" },
  { id: "immobilien", label: "6. Immobilienanfragen / Exposé / Besichtigung" },
  { id: "cookies", label: "7. Cookies & Consent (TDDDG/DSGVO)" },
  { id: "analytics", label: "8. Reichweitenmessung / Analytics (optional)" },
  { id: "maps", label: "9. Google Maps (optional)" },
  { id: "youtube", label: "10. YouTube / Videos (optional)" },
  { id: "social", label: "11. Social Media Links" },
  { id: "empfaenger", label: "12. Empfänger & Auftragsverarbeiter" },
  { id: "drittland", label: "13. Drittlandübermittlungen" },
  { id: "speicherdauer", label: "14. Speicherdauer / Löschung" },
  { id: "rechte", label: "15. Betroffenenrechte" },
  { id: "aufsicht", label: "16. Aufsichtsbehörde" },
  { id: "sicherheit", label: "17. Sicherheit" },
  { id: "aenderungen", label: "18. Änderungen" },
];

const Stand = "26.02.2026";

// 👉 Wichtig: Bitte unbedingt mit euren echten Daten/Dienstleistern ersetzen.
// Wenn du möchtest, dass ich ALLES exakt auf euer Setup mappe (Hosting, Contact API, Consent-Storage, Mailer/CRM, Analytics),
// lade bitte src/app/api/contact/route.ts und eure Consent/Config-Dateien erneut hoch.
// (Ein Teil der früheren Uploads ist inzwischen abgelaufen.)

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050B1A] ">
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl text-black font-semibold tracking-tight sm:text-4xl">
              Datenschutzerklärung
            </h1>
            <p className="text-sm text-black ">Stand: {Stand}</p>
            <p className="max-w-3xl text-base leading-relaxed text-black ">
              Mit den folgenden Hinweisen informieren wir Sie über die
              Verarbeitung personenbezogener Daten beim Besuch unserer Website,
              bei Kontaktanfragen sowie im Zusammenhang mit Immobilienanfragen
              (z. B. Exposé, Besichtigungstermin, Rückrufbitte). Außerdem
              erklären wir den Einsatz von Cookies, Consent-Management und
              optionalen externen Inhalten (z. B. Google Maps, YouTube).
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* TOC */}
          <aside className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-zinc-900">Inhalt</h2>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                  DSGVO
                </span>
              </div>
              <nav className="mt-4">
                <ul className="space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-lg px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-xs leading-relaxed text-zinc-700">
                <p className="font-semibold text-zinc-900">Hinweis</p>
                <p className="mt-1">
                  Diese Seite ist so geschrieben, dass sie möglichst umfassend
                  ist. Bitte ersetzen Sie die
                  <span className="font-semibold"> [Platzhalter]</span> durch
                  Ihre tatsächlichen Angaben (Firma, Kontaktdaten, Hosting,
                  E-Mail/CRM, Analytics-Tools). Zu viel ist hier besser als zu
                  wenig – aber
                  <span className="font-semibold"> falsche Angaben</span> sind
                  kritisch.
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-8">
            <div className="prose prose-zinc max-w-none">
              <h2 id="verantwortlicher">1. Verantwortlicher</h2>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung
                (DSGVO) ist:
              </p>
              <div className="not-prose rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <p className="font-semibold text-zinc-900">
                  [Unternehmensname]
                </p>
                <p className="text-zinc-700">[Straße Hausnummer]</p>
                <p className="text-zinc-700">[PLZ Ort], [Land]</p>
                <p className="mt-3 text-zinc-700">
                  E-Mail: <span className="font-medium">[info@…]</span>
                  <br />
                  Telefon: <span className="font-medium">[+49 …]</span>
                </p>
              </div>

              <h2 id="dsb">2. Datenschutzbeauftragter</h2>
              <p>
                <strong>Sofern ein Datenschutzbeauftragter bestellt ist</strong>
                , erreichen Sie diesen unter:
                <br />
                <span className="font-semibold">
                  [Name/Firma, Anschrift, E-Mail, Telefon]
                </span>
              </p>
              <p>
                Falls kein Datenschutzbeauftragter bestellt ist:{" "}
                <em>Es ist kein Datenschutzbeauftragter bestellt.</em>
              </p>

              <h2 id="allgemeines text-black">
                3. Allgemeines / Rechtsgrundlagen
              </h2>
              <p>
                Wir verarbeiten personenbezogene Daten nur, soweit dies zur
                Bereitstellung dieser Website, zur Bearbeitung Ihrer Anfragen
                oder zur Durchführung (vor-)vertraglicher Maßnahmen erforderlich
                ist.
              </p>
              <ul className="text-white">
                <li>
                  <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertrag /
                  vorvertragliche Maßnahmen (typisch für Immobilienanfragen,
                  Exposé-Versand, Terminvereinbarung)
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – berechtigtes
                  Interesse (z. B. sicherer Betrieb der Website,
                  Missbrauchs-/Betrugsprävention, Kommunikation)
                </li>
                <li>
                  <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung (z.
                  B. für optionale externe Inhalte oder Tracking/Marketing,
                  sofern genutzt)
                </li>
              </ul>
              <p>
                Zusätzlich gelten für das Speichern/Auslesen von Informationen
                auf Ihrem Endgerät (Cookies, Local Storage, ähnliche
                Technologien) die Regeln des <strong>TDDDG (§ 25)</strong>{" "}
                (ehem. TTDSG).
              </p>

              <h2 id="serverlogs">4. Hosting & Server-Logfiles</h2>
              <p>
                Beim Besuch der Website werden durch unseren Hostinganbieter
                (und ggf. durch uns) Server-Logfiles verarbeitet. Dies umfasst
                typischerweise:
              </p>
              <ul className="text-white">
                <li>IP-Adresse (ggf. gekürzt/gekürzt gespeichert)</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>aufgerufene Seiten/Dateien</li>
                <li>Referrer-URL</li>
                <li>Browsertyp/-version, Betriebssystem</li>
                <li>Statuscodes, übertragene Datenmenge</li>
              </ul>
              <p>
                <strong>Zweck:</strong> technische Bereitstellung, Stabilität,
                Fehleranalyse und Sicherheit (z. B. Erkennung von
                Angriffen/Missbrauch).
                <br />
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO.
                <br />
                <strong>Speicherdauer:</strong> [z. B. 7–14 Tage] bzw. länger,
                sofern sicherheitsrelevant.
              </p>
              <p>
                <strong>Hosting-Dienstleister:</strong> [z. B.
                Vercel/Hetzner/IONOS/AWS …], [Land], ggf.
                Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO.
              </p>

              <h2 id="kontakt">5. Kontaktaufnahme & Kontaktformular</h2>
              <p>
                Wenn Sie uns per Kontaktformular, E-Mail oder Telefon
                kontaktieren, verarbeiten wir die von Ihnen übermittelten Daten
                (z. B. Name, Kontaktdaten, Inhalt der Anfrage), um Ihre Anfrage
                zu beantworten und mit Ihnen zu kommunizieren.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                (vorvertragliche Maßnahmen) und/oder Art. 6 Abs. 1 lit. f DSGVO
                (berechtigtes Interesse an der Beantwortung von Anfragen).
                <br />
                <strong>Speicherdauer:</strong> [z. B. 12 Monate nach Abschluss
                der Bearbeitung], sofern keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>
              <p>
                <strong>Pflichtfelder:</strong> Wir beschränken Pflichtangaben
                auf das Erforderliche (in der Regel Name und E-Mail). Telefon
                ist – sofern angeboten – idealerweise freiwillig.
              </p>

              <h2 id="immobilien">
                6. Immobilienanfragen / Exposé / Besichtigung
              </h2>
              <p>
                Als Immobilienmakler verarbeiten wir Ihre Angaben insbesondere
                zur Bearbeitung von Immobilienanfragen, zur Exposé-Zusendung,
                zur Vereinbarung von Besichtigungsterminen und zur Anbahnung
                oder Durchführung von Vermittlungsleistungen.
              </p>
              <ul className="text-white">
                <li>Kontaktdaten (Name, E-Mail, ggf. Telefon)</li>
                <li>
                  Objektbezug (z. B. Objekt-ID, URL/Slug, Interessensprofil)
                </li>
                <li>
                  Kommunikationsinhalte (Nachrichten, Rückrufwünsche,
                  Terminabsprachen)
                </li>
                <li>
                  ggf. notwendige Angaben zur Abwicklung (z. B. gewünschter
                  Einzugstermin, Budgetrahmen)
                </li>
              </ul>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
                (vorvertragliche Maßnahmen / Vertrag).
                <br />
                <strong>Speicherdauer:</strong> [z. B. 24 Monate nach letztem
                Kontakt] – abhängig von Bearbeitungsstatus, gesetzlichen
                Pflichten und berechtigten Interessen.
              </p>

              <h2 id="cookies">7. Cookies & Consent (TDDDG/DSGVO)</h2>
              <p>
                Wir verwenden Cookies und ähnliche Technologien (z. B. Local
                Storage), um die Website bereitzustellen und – sofern aktiviert
                – bestimmte Funktionen, Reichweitenmessung oder externe Inhalte
                zu ermöglichen.
              </p>
              <p>
                <strong>Technisch notwendige Cookies</strong> werden eingesetzt,
                um wesentliche Funktionen bereitzustellen (z. B. Sprachauswahl,
                Consent-Speicherung, Sicherheitsfunktionen). Diese sind in der
                Regel ohne Einwilligung zulässig.
              </p>
              <p>
                <strong>Nicht notwendige Cookies</strong> (z. B.
                Statistik/Marketing) setzen wir nur mit Ihrer Einwilligung über
                unser Consent-Management.
              </p>

              <div className="not-prose my-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-sm font-semibold text-zinc-900">
                  Cookie-Einstellungen
                </p>
                <p className="mt-1 text-sm text-zinc-700">
                  Sie können Ihre Einwilligung jederzeit ändern oder widerrufen
                  über:{" "}
                  <span className="font-medium">
                    [Link/Schaltfläche „Cookie-Einstellungen“ in eurem Footer]
                  </span>
                  .
                </p>
              </div>

              <h2 id="analytics">
                8. Reichweitenmessung / Analytics (optional)
              </h2>
              <p>
                <strong>Nur falls genutzt:</strong> Wir können Tools zur
                Reichweitenmessung/Analyse einsetzen, um zu verstehen, wie
                unsere Website genutzt wird, und um Inhalte/Angebote zu
                verbessern.
              </p>
              <p>
                <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung) i. V. m. § 25 TDDDG, sofern
                Cookies/Endgerätezugriff genutzt werden.
              </p>
              <p>
                <strong>Tool:</strong> [z. B. Google Analytics 4 / Matomo /
                Plausible / …]
                <br />
                <strong>Anbieter:</strong> [Name, Land]
                <br />
                <strong>Daten:</strong> z. B. Seitenaufrufe, Ereignisse,
                Geräteinformationen, gekürzte IP, Referrer, ungefähre
                Standortdaten (regionbasiert)
                <br />
                <strong>Speicherdauer:</strong> [z. B. 14 Monate / nach
                Tool-Konfiguration]
              </p>

              <h2 id="maps">9. Google Maps (optional)</h2>
              <p>
                <strong>Nur falls eingebunden:</strong> Wir binden ggf. Google
                Maps ein, um Standorte (z. B. Büro, Objektlage) interaktiv
                darzustellen.
              </p>
              <p>
                <strong>Anbieter:</strong> Google Ireland Limited, Gordon House,
                Barrow Street, Dublin 4, Irland.
                <br />
                <strong>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1
                lit. a DSGVO) und § 25 TDDDG, sofern Endgerätezugriffe erfolgen.
              </p>
              <p>
                Bei der Einbindung können Daten (z. B. IP-Adresse,
                Nutzungsdaten) an Google übermittelt werden. Es kann zudem zu
                Datenübermittlungen in Drittländer (z. B. USA) kommen; Details
                siehe Abschnitt „Drittlandübermittlungen“.
              </p>

              <h2 id="youtube">10. YouTube / Videos (optional)</h2>
              <p>
                <strong>Nur falls eingebunden:</strong> Wir binden ggf.
                YouTube-Videos ein (z. B. Objektvideos, Image-/Erklärvideos).
                Die Einbindung erfolgt idealerweise erst nach Einwilligung über
                unser Consent-Tool („Externe Medien“).
              </p>
              <p>
                <strong>Anbieter:</strong> Google Ireland Limited (YouTube),
                Dublin, Irland.
                <br />
                <strong>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1
                lit. a DSGVO) und § 25 TDDDG, sofern Endgerätezugriffe erfolgen.
              </p>
              <p>
                Je nach Einbindung (z. B. iFrame) kann YouTube/Google technische
                Daten (z. B. IP-Adresse) erhalten und Cookies setzen. Wir
                empfehlen die Nutzung datenschutzfreundlicher
                Einbettungsoptionen (z. B. „youtube-nocookie.com“), soweit
                technisch möglich.
              </p>

              <h2 id="social">11. Social Media Links</h2>
              <p>
                Auf unserer Website können Links zu Social-Media-Profilen (z. B.
                Instagram, Facebook, LinkedIn) enthalten sein. Bei einem Klick
                auf den Link werden Sie auf die Plattform des jeweiligen
                Anbieters weitergeleitet. Dort gilt die Datenschutzerklärung des
                jeweiligen Anbieters.
              </p>
              <p>
                <strong>Hinweis:</strong> Allein durch das Anzeigen unserer
                Website werden in der Regel keine Daten an Social-Media-Anbieter
                übertragen, sofern keine Plugins/Embeds geladen werden. Embeds
                (z. B. Instagram-Feeds) sollten nur nach Einwilligung geladen
                werden.
              </p>

              <h2 id="empfaenger">12. Empfänger & Auftragsverarbeiter</h2>
              <p>
                Wir setzen Dienstleister ein, die personenbezogene Daten in
                unserem Auftrag verarbeiten (Art. 28 DSGVO), insbesondere in
                folgenden Kategorien:
              </p>
              <ul className="text-white">
                <li>Hosting/Serverbetrieb</li>
                <li>E-Mail-/Kommunikationsdienste</li>
                <li>CRM / Lead-Management (falls genutzt)</li>
                <li>Newsletter-/Marketingtools (falls genutzt)</li>
                <li>IT-Wartung/Support, Sicherheitsdienstleister</li>
                <li>Analyse-/Trackingtools (falls genutzt)</li>
              </ul>
              <p>
                <strong>Konkrete Dienstleister:</strong> [Hosting: …], [E-Mail:
                …], [CRM: …], [Analytics: …], [Support: …]
              </p>
              <p>
                Eine Weitergabe an Dritte erfolgt ansonsten nur, wenn dies zur
                Vertragserfüllung erforderlich ist, eine Einwilligung vorliegt
                oder wir gesetzlich dazu verpflichtet sind.
              </p>

              <h2 id="drittland">13. Drittlandübermittlungen</h2>
              <p>
                Sofern Dienstleister Daten außerhalb der EU/des EWR verarbeiten
                oder Zugriff aus Drittländern möglich ist, erfolgt eine
                Übermittlung nur unter den Voraussetzungen der Art. 44 ff. DSGVO
                (z. B. Angemessenheitsbeschluss, Standardvertragsklauseln,
                zusätzliche technische/organisatorische Maßnahmen).
              </p>
              <p>
                <strong>Typische Fälle:</strong> US-basierte Anbieter (z. B.
                Google/YouTube), internationale Cloud-/SaaS-Dienste,
                Support-Zugriffe.
              </p>
              <p>
                <strong>Konkrete Anbieter & Garantien:</strong> [Anbieter +
                Garantien eintragen, z. B. SCC / DPF / zusätzliche Maßnahmen].
              </p>

              <h2 id="speicherdauer">14. Speicherdauer / Löschung</h2>
              <p>
                Wir speichern personenbezogene Daten nur so lange, wie es für
                die genannten Zwecke erforderlich ist oder gesetzliche
                Aufbewahrungspflichten bestehen.
              </p>
              <ul className="text-white">
                <li>
                  Kontaktanfragen/Leads: [z. B. 12–24 Monate nach letztem
                  Kontakt]
                </li>
                <li>
                  Immobilienvorgänge/Kommunikation: [z. B. 24 Monate, je nach
                  Status]
                </li>
                <li>Server-Logfiles: [z. B. 7–14 Tage]</li>
                <li>Einwilligungs-/Consent-Protokolle: [z. B. 12–36 Monate]</li>
              </ul>

              <h2 id="rechte">15. Betroffenenrechte</h2>
              <p>Sie haben nach der DSGVO insbesondere folgende Rechte:</p>
              <ul className="text-white">
                <li>Auskunft (Art. 15 DSGVO)</li>
                <li>Berichtigung (Art. 16 DSGVO)</li>
                <li>Löschung (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>
                  Widerspruch (Art. 21 DSGVO), sofern Verarbeitung auf Art. 6
                  Abs. 1 lit. f basiert
                </li>
                <li>
                  Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO) mit Wirkung
                  für die Zukunft
                </li>
              </ul>
              <p>
                Zur Ausübung Ihrer Rechte genügt eine Nachricht an die unter
                „Verantwortlicher“ genannten Kontaktdaten.
              </p>

              <h2 id="aufsicht">16. Aufsichtsbehörde</h2>
              <p>
                Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde
                zu beschweren. Für Unternehmen in Bayern ist häufig zuständig:
              </p>
              <div className="not-prose rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                <p className="font-semibold text-zinc-900">
                  Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)
                </p>
                <p className="text-zinc-700">
                  Promenade 18, 91522 Ansbach, Deutschland
                </p>
              </div>

              <h2 id="sicherheit">17. Sicherheit</h2>
              <p>
                Wir treffen technische und organisatorische Maßnahmen, um Ihre
                Daten vor Verlust, Missbrauch oder unberechtigtem Zugriff zu
                schützen. Dazu zählen u. a. Transportverschlüsselung
                (HTTPS/TLS), Zugriffskontrollen und ggf. Maßnahmen zur
                Missbrauchsprävention (z. B. Rate-Limiting/Spam-Schutz für
                Formulare).
              </p>

              <h2 id="aenderungen">18. Änderungen</h2>
              <p>
                Wir aktualisieren diese Datenschutzerklärung, wenn sich unsere
                Website, Dienste oder Rechtslage ändern. Die jeweils aktuelle
                Version finden Sie auf dieser Seite.
              </p>
            </div>

            {/* Bottom CTA */}
          </article>
        </div>
      </section>
    </main>
  );
}
