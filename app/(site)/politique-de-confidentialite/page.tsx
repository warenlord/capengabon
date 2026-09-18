import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getSiteInfo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false },
};

export default async function PolitiqueConfidentialitePage() {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <PageHero eyebrow="Vos données" title="Politique de confidentialité" />
      <section className="section-y bg-capen-paper">
        <div className="container-capen max-w-2xl space-y-8 text-[15px] leading-relaxed text-capen-ink/75">
          <div>
            <h2 className="font-display text-xl font-semibold text-capen-ink">Données collectées</h2>
            <p className="mt-2">
              Les formulaires de ce site (contact, demande de production, demande
              d&apos;approvisionnement) collectent les informations que vous renseignez
              volontairement : nom, prénom, entreprise, téléphone, WhatsApp, e-mail et message.
              Ces informations sont utilisées uniquement pour répondre à votre demande.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-capen-ink">Utilisation des données</h2>
            <p className="mt-2">
              Vos informations sont transmises à l&apos;équipe CAPEN et ne sont ni vendues, ni
              transmises à des tiers à des fins commerciales.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-capen-ink">Vos droits</h2>
            <p className="mt-2">
              Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données
              en contactant CAPEN à l&apos;adresse : {siteInfo.email || "à compléter"}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
