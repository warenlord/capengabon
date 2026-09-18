import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getSiteInfo } from "@/lib/data";
import { SITE_FULL_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

export default async function MentionsLegalesPage() {
  const siteInfo = await getSiteInfo();

  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <section className="section-y bg-capen-paper">
        <div className="container-capen max-w-2xl space-y-8 text-[15px] leading-relaxed text-capen-ink/75">
          <div>
            <h2 className="font-display text-xl font-semibold text-capen-ink">Éditeur du site</h2>
            <p className="mt-2">
              {SITE_FULL_NAME} (CAPEN).
              <br />
              Adresse : {siteInfo.address || "à compléter"}
              <br />
              E-mail : {siteInfo.email || "à compléter"}
              <br />
              Téléphone : {siteInfo.phone || "à compléter"}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-capen-ink">Hébergement</h2>
            <p className="mt-2">Informations d&apos;hébergement à compléter.</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-capen-ink">Propriété intellectuelle</h2>
            <p className="mt-2">
              L&apos;ensemble des contenus (textes, photographies, logo) présents sur ce site sont
              la propriété de CAPEN, sauf mention contraire, et ne peuvent être reproduits sans
              autorisation préalable.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
