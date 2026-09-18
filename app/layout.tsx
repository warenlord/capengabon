import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SITE_FULL_NAME, SITE_NAME, SITE_SLOGAN, SITE_URL } from "@/lib/config";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_FULL_NAME}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: `${SITE_NAME} (${SITE_FULL_NAME}) produit et commercialise des denrées agricoles — banane, manioc et bâtons de manioc — et développe progressivement ses capacités. ${SITE_SLOGAN}.`,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_FULL_NAME}`,
    description: `${SITE_SLOGAN}. Production et commercialisation de banane, manioc et bâtons de manioc.`,
    images: ["/images/productions/banane/recolte-femme-portage-02.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-capen-cream font-sans text-capen-ink antialiased">
        {children}
      </body>
    </html>
  );
}
