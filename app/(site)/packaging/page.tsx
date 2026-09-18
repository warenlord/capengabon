import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Packaging",
  description: "Le Packaging fait partie de l'identité de CAPEN. Cette activité se développe progressivement, aux côtés de la production et de la commercialisation.",
};

export default function PackagingPage() {
  return (
    <>
      <PageHero
        eyebrow="Packaging"
        title="Une dimension au cœur de l'identité CAPEN"
        image="/images/products/batons-manioc/emballage-02.jpg"
        imageAlt="Conditionnement de bâtons de manioc par CAPEN"
      />

      <section className="section-y bg-capen-paper">
        <div className="container-capen max-w-2xl">
          <Reveal>
            <p className="eyebrow">Le mot Packaging</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Une activité en construction
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
              Le mot « Packaging » fait partie intégrante du nom de CAPEN — Coopérative
              Agropastorale et Packaging des Enfants NGADI. Il traduit une ambition : ne pas se
              limiter à la production agricole, mais aussi préparer et conditionner nos produits
              pour les mettre à disposition de nos clients, comme c&apos;est déjà le cas pour nos
              bâtons de manioc.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/75">
              Cette activité continue de se structurer. Les informations détaillées sur nos
              prestations, formats et capacités de conditionnement seront publiées ici au fur et à
              mesure de leur confirmation.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-10 rounded-card border border-dashed border-capen-ink/20 bg-capen-cream p-8 text-center">
            <p className="text-capen-ink/60">
              Cette section sera enrichie prochainement avec le détail de nos capacités de
              conditionnement.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-8 flex flex-wrap gap-3">
            <Link href="/nos-produits/batons-de-manioc" className="btn-primary">
              Voir nos bâtons de manioc
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
