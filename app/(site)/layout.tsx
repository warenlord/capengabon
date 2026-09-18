import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import { getSiteInfo } from "@/lib/data";

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
