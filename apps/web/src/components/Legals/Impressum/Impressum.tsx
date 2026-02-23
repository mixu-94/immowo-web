import React from "react";

function ImpressumArea() {
  return (
    <section className="w-full">
      <div className="container">
        <div className="flex w-full justify-center rounded-lg bg-[var(--primary-95)] p-1">
          <div className="max-w-2xl">
            <div className="flex flex-col items-center justify-center gap-5 text-center">
              <div className="rounded-lg border p-4 text-left">
                <h5 className="mb-4 text-xl font-semibold">Impressum</h5>
                <p className="mb-4">
                  Angaben gemäß § 5 TMG <br />
                  Xunlai UG (haftungsbeschränkt) <br />
                  Drosselweg 7 <br />
                  86381 Krumbach <br />
                  Deutschland <br />
                </p>

                <p className="mb-4">
                  Vertreten durch Michael Schindler (Geschäftsführer / CEO)
                </p>

                <h5 className="mb-4 text-xl font-semibold">Kontakt</h5>
                <p className="mb-4">
                  info@xunlai.io <br />
                  www.xunlai.io
                </p>

                <h5 className="mb-4 text-xl font-semibold">
                  Eintragung im Handelsregister:
                </h5>
                <p>
                  Registergericht: Memmingen <br />
                  Registernummer: HRB 20199
                </p>
                {/* Uncomment this if needed in the future */}
                {/* <p>
                  Umsatzsteuer-ID gemäß §27 a Umsatzsteuergesetz: Wird gerade
                  beantragt
                </p> */}
              </div>
              <p className="">
                Non-german visitors: German law requires to publish the
                following text in german language. It contains information
                regarding legal form of the company, authorship, data protection
                and privacy informations, disclaimer, copyright notices and
                german tax information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImpressumArea;
