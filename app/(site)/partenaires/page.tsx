import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getActivePartners } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partenaires",
  description: "CAPEN construit des projets agricoles avec des entreprises, institutions, organismes agricoles et partenaires techniques ou financiers.",
};

export default async function PartenairesPage() {
  const partners = await getActivePartners();

  return (
    <>
      <PageHero
        eyebrow="Partenaires"
        title="Construisons des projets agricoles ensemble"
        description="Entreprises, institutions, organismes agricoles, partenaires techniques et financiers : CAPEN développe ses activités avec des partenaires qui partagent son ambition."
        image="/images/productions/banane/bananeraie-02.jpg"
        imageAlt="Bananeraie CAPEN"
      />

      <section className="section-y bg-capen-paper">
        <div className="container-capen">
          {partners.length === 0 ? (
            <Reveal className="mx-auto max-w-xl rounded-card border border-dashed border-capen-ink/20 bg-capen-cream p-12 text-center">
              <p className="text-capen-ink/60">
                CAPEN construit progressivement son réseau de partenaires. Cette page sera mise à
                jour au fur et à mesure de nos collaborations.
              </p>
              <Link href="/contact?intent=partenariat" className="btn-primary mt-6">
                Devenir partenaire
              </Link>
            </Reveal>
          ) : (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {partners.map((partner, i) => (
                <Reveal key={partner.id} delay={i * 80}>
                  <div className="flex h-32 flex-col items-center justify-center gap-3 rounded-card bg-capen-cream p-6 ring-1 ring-capen-ink/10">
                    {partner.logo ? (
                      <div className="relative h-12 w-full">
                        <Image src={partner.logo} alt={partner.nom} fill sizes="150px" className="object-contain" />
                      </div>
                    ) : (
                      <p className="text-center font-medium text-capen-ink">{partner.nom}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-y bg-capen-green-900 text-white">
        <div className="container-capen grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-capen-green-300">Vous êtes partenaire ?</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Institutions, entreprises, organismes agricoles
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-white/80">
              Que vous soyez une entreprise, une institution, un organisme agricole ou un
              partenaire technique ou financier, échangeons sur les possibilités de collaboration
              avec CAPEN.
            </p>
            <Link href="/contact?intent=partenariat" className="btn mt-8 bg-white text-capen-green-900 hover:bg-white/90">
              Devenir partenaire
            </Link>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/productions/banane/regimes-transport-01.jpg"
              alt="Régimes de bananes préparés pour le transport"
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
