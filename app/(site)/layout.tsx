import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import { getSiteInfo } from "@/lib/data";

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
      <Header />
      <main id="contenu-principal">{children}</main>
      <Footer />
      <WhatsAppFloatButton whatsappNumber={siteInfo.whatsappNumber} />
    </>
  );
}
