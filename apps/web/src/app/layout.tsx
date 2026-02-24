import type { Metadata } from "next";
import "@/styles/globals.css";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieBanner from "@/components/consent/CookieBanner";
import { Navbar } from "@/components/base/nav/Navbar";
import Footer from "@/components/base/footer/Footer";

export const metadata: Metadata = {
  title:
    "Immowo Ventures | Immobilien & Bauträgerprojekte – Neubau & schlüsselfertig",
  description:
    "Immowo Ventures: Schlüsselfertige Immobilien, ausgewählte Bestandsobjekte und Neubauprojekte vom Papier weg. Exposé auf Anfrage, professionelle Beratung & transparente Abwicklung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <ConsentProvider>
        <CookieBanner />
        <Navbar />
        <body className={`$ antialiased mt-14 bg-[#050B1A] `}>{children}</body>
        <Footer />
      </ConsentProvider>
    </html>
  );
}
