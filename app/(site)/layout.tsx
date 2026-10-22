import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import CampaignBanner from "@/components/CampaignBanner";
import JsonLd from "@/components/JsonLd";
import { getSiteInfo } from "@/lib/data";
import { SITE_NAME, SITE_FULL_NAME, SITE_SLOGAN, SITE_URL } from "@/lib/config";

// The content layer (data/, or a persistent disk in production) is only
// available at request time, not during `next build` — render the whole
// public site on demand rather than pre-rendering it statically.
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-capen-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          legalName: SITE_FULL_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/images/logo/logo-capen.jpg`,
          slogan: SITE_SLOGAN,
          areaServed: "GA",
          ...(siteInfo.email && { email: siteInfo.email }),
          ...((siteInfo.phone || siteInfo.whatsappNumber) && {
            telephone: siteInfo.phone || siteInfo.whatsappNumber,
          }),
        }}
      />
      <CampaignBanner />
      <Header />
      <main id="contenu-principal">{children}</main>
      <Footer />
      <WhatsAppFloatButton whatsappNumber={siteInfo.whatsappNumber} />
    </>
  );
}
