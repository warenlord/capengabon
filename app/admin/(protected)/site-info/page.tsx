import { getSiteInfo } from "@/lib/data";
import SiteInfoForm from "./SiteInfoForm";

export const metadata = { title: "Coordonnées CAPEN" };

export default async function AdminSiteInfoPage() {
  const siteInfo = await getSiteInfo();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Coordonnées CAPEN</h1>
      <p className="mt-1 text-sm text-white/50">
        Ces informations pilotent les boutons WhatsApp, e-mail et téléphone sur tout le site.
        Tant qu&apos;un champ est vide, le bouton correspondant reste masqué.
      </p>
      <div className="mt-8">
        <SiteInfoForm siteInfo={siteInfo} />
      </div>
    </div>
  );
}
