import type { Metadata } from "next";
import "@/styles/globals.css";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieBanner from "@/components/consent/CookieBanner";
import { Navbar } from "@/components/base/nav/Navbar";
import Footer from "@/components/base/footer/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL; // z.B. https://immowo-ventures.de

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  title: {
    default:
      "Immowo Ventures | Immobilien kaufen – schlüsselfertig, Bestand & Neubauprojekt (Kauf ab Plan)",
    template: "%s | Immowo Ventures",
  },

  description:
    "Immowo Ventures: Schlüsselfertige Immobilien, ausgewählte Bestandsobjekte und Bauträger-/Neubauprojekte (Kauf ab Plan). Exposé & Unterlagen auf Anfrage, persönliche Beratung und transparente Abwicklung.",

  applicationName: "Immowo Ventures",
  category: "Real Estate",

  keywords: [
    "Immobilien kaufen",
    "schlüsselfertig",
    "Bestandsimmobilie",
    "Bauträgerprojekt",
    "Neubauprojekt",
    "Kauf ab Plan",
    "Exposé anfordern",
    "Immobilienangebote",
    "Immobilien Beratung",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: "Immowo Ventures",
    title:
      "Immowo Ventures | Immobilien kaufen – schlüsselfertig, Bestand & Neubauprojekt (Kauf ab Plan)",
    description:
      "Schlüsselfertige Immobilien, Bestandsobjekte und Bauträger-/Neubauprojekte (Kauf ab Plan). Exposé & Unterlagen auf Anfrage.",
    url: siteUrl ?? undefined,
    images: [
      {
        url: "/og.jpg", // <-- falls du noch keine OG Grafik hast: einfach weglassen oder später anlegen
        width: 1200,
        height: 630,
        alt: "Immowo Ventures – Immobilien & Bauträgerprojekte",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Immowo Ventures | Immobilien – schlüsselfertig & Kauf ab Plan",
    description:
      "Exposé & Unterlagen auf Anfrage • Beratung • transparente Abwicklung",
    images: ["/og.jpg"], // optional
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      // Optional (empfohlen):
      // { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      // { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    // Optional:
    // apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
