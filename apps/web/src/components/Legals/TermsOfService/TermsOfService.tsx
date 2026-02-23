"use client";

import React, { useState } from "react";
import Link from "next/link";

const TermsOfService = () => {
  const [language, setLanguage] = useState<"de" | "en">("de"); // Language state

  // Toggle language
  const toggleLanguage = (lang: "de" | "en") => {
    setLanguage(lang);
  };

  return (
    <section className="w-full bg-black p-8 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Language Switch */}
        <div className="mb-6 mt-16 flex justify-end">
          <button
            onClick={() => toggleLanguage("de")}
            className={`mr-4 ${language === "de" ? "text-[var(--adaki-red)] underline" : "text-[var(--adaki-grey-3)]"}`}
          >
            Deutsch
          </button>
          <button
            onClick={() => toggleLanguage("en")}
            className={`${language === "en" ? "text-[var(--adaki-red)] underline" : "text-[var(--adaki-grey-3)]"}`}
          >
            English
          </button>
        </div>

        {/* Terms of Service in German */}
        {language === "de" && (
          <div>
            <h2 className="mb-6 text-3xl font-bold">
              Allgemeine Geschäftsbedingungen (AGB)
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">
                  1. Geltungsbereich und Vertragspartner
                </h3>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle
                  Verträge, die über unsere Website zwischen Ihnen als Nutzer
                  und uns, der
                  <strong>
                    {" "}
                    Xunlai UG, vertreten durch Michael Schindler, Drosselweg 7,
                    86381 Krumbach
                  </strong>{" "}
                  abgeschlossen werden.
                </p>
                <p>
                  Unser Impressum mit allen relevanten Informationen finden Sie
                  unter{" "}
                  <Link
                    href="/impressum"
                    className="text-[var(--adaki-red)] underline"
                  >
                    Impressum
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  2. Leistungsbeschreibung
                </h3>
                <p>
                  Wir bieten digitale Inhalte und Dienstleistungen an,
                  insbesondere Non-Fungible Tokens (NFTs). Die Nutzung unserer
                  Plattform erfolgt auf eigenes Risiko. Wir übernehmen keine
                  Haftung für etwaige Verluste oder Schäden, die durch den Kauf
                  oder die Nutzung unserer digitalen Produkte entstehen.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">3. Vertragsschluss</h3>
                <p>
                  Die Präsentation unserer Produkte auf der Website stellt kein
                  rechtlich bindendes Angebot dar, sondern eine unverbindliche
                  Aufforderung zur Abgabe eines Angebots durch den Nutzer. Der
                  Vertrag kommt erst mit unserer ausdrücklichen Bestätigung oder
                  durch die Bereitstellung der digitalen Inhalte zustande.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">4. Preise und Zahlung</h3>
                <p>
                  Als Kleinunternehmer im Sinne von § 19 UStG erheben wir keine
                  Umsatzsteuer und weisen diese daher auch nicht aus.
                </p>
                <p>
                  Die Zahlung erfolgt entweder per Kryptowährungen (z.B.
                  Bitcoin, Cardano), oder über traditionelle Zahlungsmethoden
                  wie Kreditkarte oder PayPal.
                </p>
                <p>
                  Bitte beachten Sie, dass Kryptowährungen starken Schwankungen
                  unterliegen. Der zu zahlende Betrag wird auf Basis des
                  aktuellen Wechselkurses zum Zeitpunkt der Transaktion
                  berechnet. Der Nutzer ist verantwortlich für die korrekte
                  Abwicklung der Transaktion und die Angabe der korrekten
                  Wallet-Adresse.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">5. Widerrufsrecht</h3>
                <p>
                  Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Dieses
                  Widerrufsrecht erlischt jedoch vorzeitig bei Verträgen über
                  die Lieferung von digitalen Inhalten, die nicht auf einem
                  körperlichen Datenträger geliefert werden, wenn der Nutzer
                  ausdrücklich zugestimmt hat, dass wir mit der Ausführung des
                  Vertrags vor Ablauf der Widerrufsfrist beginnen und er dadurch
                  sein Widerrufsrecht verliert.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  6. Lieferung und Eigentumsvorbehalt
                </h3>

                {/* Lieferung digitaler Produkte */}
                <p>
                  <strong>Lieferung digitaler Produkte:</strong> Die Lieferung
                  von digitalen Produkten erfolgt unmittelbar nach
                  Zahlungseingang, sofern nicht anders vereinbart.
                </p>

                {/* Lieferung physischer Produkte (Modeartikel) */}
                <p>
                  <strong>Lieferung physischer Produkte:</strong> Physische
                  Produkte, wie z.B. Kleidungsstücke, werden an die vom Nutzer
                  angegebene Lieferadresse versendet. Bei Produkten, die mit
                  einem NFT verknüpft sind, liegt der Lieferung eine Scheckkarte
                  mit einer vorläufigen Wallet-Adresse bei, über die der Käufer
                  auf das NFT zugreifen kann. Produkte ohne NFT-Verknüpfung
                  werden regulär ohne zusätzliche digitale Inhalte versendet.
                </p>
                <p>
                  Der Käufer ist verpflichtet, das NFT so schnell wie möglich
                  auf sein eigenes Wallet zu übertragen. Eine detaillierte
                  Anleitung zum Transfer des NFTs wird mitgeliefert. Wir
                  übernehmen keine Haftung für den Verlust des NFTs, wenn der
                  Käufer das NFT nicht rechtzeitig auf sein eigenes Wallet
                  überträgt.
                </p>
                <p>
                  Die Lieferung erfolgt, sofern nicht anders vereinbart, durch
                  einen von uns ausgewählten Versanddienstleister. Versandkosten
                  sowie eventuelle Zölle oder Importgebühren trägt der Käufer
                  und diese werden im Bestellprozess angezeigt.
                </p>

                {/* Eigentumsvorbehalt */}
                <p>
                  Das Eigentum an physischen Produkten bleibt bis zur
                  vollständigen Bezahlung des Kaufpreises bei uns. Das Eigentum
                  an NFTs, die im Rahmen eines rein digitalen Kaufs erworben
                  werden, geht auf den Käufer über, sobald das NFT auf das vom
                  Käufer angegebene Wallet übertragen wurde.
                </p>
                <p>
                  Nach Erhalt eines physischen Artikels, der mit einem NFT
                  verknüpft ist und dem eine vorläufige Wallet beiliegt,
                  übernehmen wir keine Haftung für den Zugang zur Wallet oder
                  die Sicherheit der darin enthaltenen NFTs. Der Käufer ist
                  allein verantwortlich für die Übertragung des NFTs auf sein
                  eigenes, sicheres Wallet. Wir haften nicht für Verluste oder
                  Schäden, die nach Erhalt des Pakets auftreten, einschließlich
                  Verlusten durch unberechtigten Zugriff auf die Wallet.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  7. Haftung und Haftungsausschluss
                </h3>
                <p>
                  Wir haften uneingeschränkt für Vorsatz und grobe
                  Fahrlässigkeit sowie für Schäden, die aus der Verletzung des
                  Lebens, des Körpers oder der Gesundheit resultieren.
                </p>
                <p>
                  Für leichte Fahrlässigkeit haften wir nur, wenn wesentliche
                  Vertragspflichten (Kardinalpflichten) verletzt werden.
                  Wesentliche Vertragspflichten sind solche Pflichten, deren
                  Erfüllung die ordnungsgemäße Durchführung des Vertrages
                  überhaupt erst ermöglicht und auf deren Einhaltung der
                  Vertragspartner regelmäßig vertrauen darf. In diesem Fall ist
                  unsere Haftung auf den vertragstypischen und vorhersehbaren
                  Schaden begrenzt.
                </p>
                <p>
                  Eine weitergehende Haftung für leichte Fahrlässigkeit ist
                  ausgeschlossen. Dies gilt insbesondere für indirekte Schäden,
                  Folgeschäden, entgangenen Gewinn, ausgebliebene Einsparungen
                  oder Schäden aus Ansprüchen Dritter, sofern diese nicht auf
                  Vorsatz oder grober Fahrlässigkeit beruhen.
                </p>
                <p>
                  Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten
                  unserer gesetzlichen Vertreter, Mitarbeiter und
                  Erfüllungsgehilfen, wenn Ansprüche direkt gegen diese geltend
                  gemacht werden.
                </p>
                <p>
                  Die Haftungsbeschränkungen gelten nicht, soweit eine Garantie
                  übernommen wurde oder Ansprüche nach dem Produkthaftungsgesetz
                  betroffen sind.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">8. Datenschutz</h3>
                <p>
                  Der Schutz Ihrer persönlichen Daten ist uns wichtig. Weitere
                  Informationen zum Datenschutz und zur Verarbeitung Ihrer Daten
                  finden Sie in unserer{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-red-500 underline"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">9. Vertragsänderungen</h3>
                <p>
                  Wir behalten uns das Recht vor, diese AGB jederzeit mit
                  Wirkung für die Zukunft zu ändern. Änderungen werden dem
                  Nutzer rechtzeitig per E-Mail oder auf unserer Website
                  mitgeteilt.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  10. Anwendbares Recht und Gerichtsstand
                </h3>
                <p>
                  Für sämtliche Rechtsbeziehungen der Parteien gilt das Recht
                  der Bundesrepublik Deutschland. Für Unternehmer ist der
                  ausschließliche Gerichtsstand unser Geschäftssitz.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  11. Salvatorische Klausel
                </h3>
                <p>
                  Sollten einzelne Bestimmungen dieses Vertrags unwirksam oder
                  undurchführbar sein, so bleibt der Vertrag im Übrigen wirksam.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  12. Vertragssprache und Kommunikation
                </h3>
                <p>
                  Die für den Vertragsschluss zur Verfügung stehende Sprache ist
                  Deutsch. Alle Informationen, Kundenservice und Kommunikation
                  im Zusammenhang mit dem Vertrag erfolgen in deutscher Sprache.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  13. Haftung für externe Links
                </h3>
                <p>
                  Unsere Website kann Links zu externen Websites Dritter
                  enthalten, auf deren Inhalte wir keinen Einfluss haben. Daher
                  können wir für diese fremden Inhalte auch keine Gewähr
                  übernehmen. Für die Inhalte der verlinkten Seiten ist stets
                  der jeweilige Anbieter oder Betreiber der Seiten
                  verantwortlich.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  14. Technische Voraussetzungen
                </h3>
                <p>
                  Der Käufer ist dafür verantwortlich, sicherzustellen, dass er
                  über die technischen Voraussetzungen verfügt, um digitale
                  Produkte, insbesondere NFTs, zu erwerben, zu speichern und zu
                  nutzen. Dies beinhaltet unter anderem ein sicheres und
                  kompatibles Wallet sowie entsprechende Geräte oder Software.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Terms of Service in English */}
        {language === "en" && (
          <div>
            <h2 className="mb-6 text-3xl font-bold">Terms and Conditions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">
                  1. Scope and Contracting Parties
                </h3>
                <p>
                  These Terms and Conditions (T&Cs) apply to all contracts
                  concluded via our website between you as a user and us,
                  <strong>
                    {" "}
                    Xunlai UG, represented by Michael Schindler, Drosselweg 7,
                    86381 Krumbach
                  </strong>
                  .
                </p>
                <p>
                  You can find our legal information, including all relevant
                  details, in our{" "}
                  <Link href="/impressum" className="text-red-500 underline">
                    Imprint
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  2. Description of Services
                </h3>
                <p>
                  We offer digital content and services, particularly
                  Non-Fungible Tokens (NFTs). The use of our platform is at your
                  own risk. We assume no liability for any losses or damages
                  resulting from the purchase or use of our digital products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  3. Conclusion of Contract
                </h3>
                <p>
                  The presentation of our products on the website does not
                  constitute a legally binding offer, but a non-binding
                  invitation for the user to submit an offer. The contract is
                  concluded only with our express confirmation or by providing
                  the digital content.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">4. Prices and Payment</h3>
                <p>
                  As a small business under § 19 of the German VAT Act (UStG),
                  we do not charge or show VAT.
                </p>
                <p>
                  Payment can be made either by cryptocurrencies (e.g., Bitcoin,
                  Cardano) or traditional payment methods such as credit card or
                  PayPal.
                </p>
                <p>
                  Please note that cryptocurrencies are subject to significant
                  fluctuations. The amount to be paid is calculated based on the
                  current exchange rate at the time of the transaction. The user
                  is responsible for ensuring the correct processing of the
                  transaction and providing the correct wallet address.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  5. Right of Withdrawal
                </h3>
                <p>
                  Consumers have a statutory right of withdrawal. However, this
                  right of withdrawal expires prematurely for contracts for the
                  delivery of digital content not delivered on a physical data
                  carrier if the user has expressly agreed that we may begin
                  executing the contract before the withdrawal period expires,
                  and the user has acknowledged that they will lose their right
                  of withdrawal by consenting to this.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  6. Delivery and Retention of Title
                </h3>

                {/* Delivery of Digital Products */}
                <p>
                  <strong>Delivery of Digital Products:</strong> The delivery of
                  digital products takes place immediately after payment is
                  received, unless otherwise agreed.
                </p>

                {/* Delivery of Physical Products (Fashion Items) */}
                <p>
                  <strong>Delivery of Physical Products:</strong> Physical
                  products, such as clothing items, are shipped to the delivery
                  address provided by the user. For products linked to an NFT,
                  the delivery includes a card with a temporary wallet address,
                  through which the buyer can access the NFT. Products without
                  NFT linkage will be delivered regularly without any additional
                  digital content.
                </p>
                <p>
                  The buyer is required to transfer the NFT to their own wallet
                  as soon as possible. A detailed guide on how to transfer the
                  NFT will be provided. We assume no liability for the loss of
                  the NFT if the buyer does not transfer the NFT to their own
                  wallet in a timely manner.
                </p>
                <p>
                  Delivery is made, unless otherwise agreed, by a shipping
                  service provider selected by us. Shipping costs, as well as
                  any applicable customs duties or import fees, are borne by the
                  buyer and will be displayed during the order process.
                </p>

                {/* Retention of Title */}
                <p>
                  Ownership of physical products remains with us until full
                  payment of the purchase price has been made. Ownership of NFTs
                  purchased as part of a digital-only transaction is transferred
                  to the buyer once the NFT has been transferred to the wallet
                  provided by the buyer.
                </p>
                <p>
                  After receiving a physical item linked to an NFT, which
                  includes a temporary wallet, we assume no liability for access
                  to the wallet or the security of the NFTs contained therein.
                  The buyer is solely responsible for transferring the NFT to
                  their own secure wallet. We are not liable for any losses or
                  damages that occur after receipt of the package, including
                  losses due to unauthorized access to the wallet.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  7. Liability and Disclaimer of Liability
                </h3>
                <p>
                  We are fully liable for intent and gross negligence as well as
                  for damages resulting from injury to life, body, or health.
                </p>
                <p>
                  In cases of slight negligence, we are only liable for breaches
                  of essential contractual obligations (cardinal obligations).
                  Cardinal obligations are those obligations whose fulfillment
                  is essential for the proper execution of the contract and on
                  whose compliance the contractual partner regularly relies. In
                  such cases, our liability is limited to the typical,
                  foreseeable damage.
                </p>
                <p>
                  Any further liability for slight negligence is excluded. This
                  applies in particular to indirect damages, consequential
                  damages, loss of profit, missed savings, or damages arising
                  from claims by third parties, unless they are based on intent
                  or gross negligence.
                </p>
                <p>
                  The aforementioned limitations of liability also apply in
                  favor of our legal representatives, employees, and vicarious
                  agents if claims are asserted directly against them.
                </p>
                <p>
                  The limitations of liability do not apply insofar as a
                  guarantee has been given or claims under the Product Liability
                  Act are affected.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">8. Data Protection</h3>
                <p>
                  Protecting your personal data is important to us. You can find
                  more information about data protection and how we process your
                  data in our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[var(--adaki-red)] underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  9. Contract Modifications
                </h3>
                <p>
                  We reserve the right to change these terms and conditions at
                  any time with effect for the future. Changes will be
                  communicated to the user in a timely manner via email or on
                  our website.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  10. Applicable Law and Jurisdiction
                </h3>
                <p>
                  All legal relationships between the parties are governed by
                  the laws of the Federal Republic of Germany. For
                  entrepreneurs, the exclusive place of jurisdiction is our
                  business location.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  11. Severability Clause
                </h3>
                <p>
                  Should any provision of this contract be invalid or
                  unenforceable, the remainder of the contract shall remain
                  valid.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  12. Contract Language and Communication
                </h3>
                <p>
                  The language available for the conclusion of the contract is
                  German. All information, customer service, and communication
                  related to the contract will be conducted in German.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  13. Liability for External Links
                </h3>
                <p>
                  Our website may contain links to external third-party websites
                  over whose content we have no control. Therefore, we cannot
                  accept any liability for these external contents. The
                  respective provider or operator of the linked pages is always
                  responsible for the contents of the linked pages.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">
                  14. Technical Requirements
                </h3>
                <p>
                  The buyer is responsible for ensuring that they have the
                  technical requirements to purchase, store, and use digital
                  products, particularly NFTs. This includes having a secure and
                  compatible wallet, as well as the necessary devices or
                  software.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="mt-8">
          <Link href="/">
            <button className="btn-custom">Back to Home</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
