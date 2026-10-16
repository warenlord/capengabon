import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getActivePackagingArticles, getActivePackagingProcessSteps, getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, packagingArticleWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Packaging",
  description: "Le Packaging fait partie de l'identité de CAPEN : découvrez notre catalogue d'articles de conditionnement, disponibles à l'achat et à la location, et le déroulé de notre service.",
};

export default async function PackagingPage() {
  const [steps, articles, siteInfo] = await Promise.all([
    getActivePackagingProcessSteps(),
    getActivePackagingArticles(),
    getSiteInfo(),
  ]);

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
              Une activité au service de nos clients
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
              Le mot « Packaging » fait partie intégrante du nom de CAPEN — Coopérative
              Agropastorale et Packaging des Enfants NGADI. Il traduit une ambition : ne pas se
              limiter à la production agricole, mais aussi préparer et conditionner nos produits
              pour les mettre à disposition de nos clients, comme c&apos;est déjà le cas pour nos
              bâtons de manioc.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/75">
              Nous mettons également à disposition de nos clients des articles de conditionnement,
              à l&apos;achat comme à la location, pour accompagner leurs propres besoins.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-wrap gap-3">
            <Link href="/nos-produits/batons-de-manioc" className="btn-primary">
              Voir nos bâtons de manioc
            </Link>
            <Link href="/contact?intent=packaging" className="btn-secondary">
              Nous contacter
            </Link>
          </Reveal>
        </div>
      </section>

      {steps.length > 0 && (
        <section className="section-y bg-capen-cream">
          <div className="container-capen">
            <Reveal className="max-w-xl">
              <p className="eyebrow">Notre méthode</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
                Comment se déroule le service
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((step, i) => (
                <Reveal key={step.id} delay={i * 90}>
                  <div className="relative h-full rounded-card bg-capen-paper p-6 ring-1 ring-capen-ink/10">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-capen-green-500 font-display text-sm font-semibold text-capen-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-capen-ink">{step.titre}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">{step.description}</p>
                    {i < steps.length - 1 && (
                      <svg
                        className="absolute -right-5 top-9 hidden text-capen-green-400 lg:block"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-y bg-capen-paper">
        <div className="container-capen">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Catalogue</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Nos articles de packaging
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/70">
              Chaque article est proposé à l&apos;achat et/ou à la location, selon vos besoins.
            </p>
          </Reveal>

          {articles.length === 0 ? (
            <Reveal delay={120} className="mx-auto mt-10 max-w-xl rounded-card border border-dashed border-capen-ink/20 bg-capen-cream p-12 text-center">
              <p className="text-capen-ink/60">
                CAPEN construit progressivement son catalogue d&apos;articles de packaging,
                disponibles à l&apos;achat et/ou à la location. Cette page sera mise à jour au fur
                et à mesure de leur ajout.
              </p>
              <Link href="/contact?intent=packaging" className="btn-primary mt-6">
                Nous contacter
              </Link>
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => {
                const whatsappHref = siteInfo.whatsappNumber
                  ? buildWhatsAppLink(siteInfo.whatsappNumber, packagingArticleWhatsAppMessage(article.nom))
                  : null;
                return (
                  <Reveal key={article.id} delay={i * 90}>
                    <div className="flex h-full flex-col overflow-hidden rounded-card bg-capen-cream shadow-card ring-1 ring-capen-ink/5">
                      <Link href={`/packaging/articles/${article.slug}`} className="relative block aspect-[4/5] overflow-hidden">
                        <Image
                          src={article.images[0]?.src}
                          alt={article.images[0]?.alt ?? article.nom}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {article.miseEnAvant && (
                          <span className="absolute left-4 top-4 rounded-full bg-capen-green-500 px-3 py-1 text-xs font-semibold text-capen-ink">
                            En avant
                          </span>
                        )}
                      </Link>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-capen-green-600">
                          {article.categorie}
                        </p>
                        <h3 className="mt-1.5 font-display text-xl font-semibold text-capen-ink">{article.nom}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">{article.description}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {article.disponibleAchat && (
                            <span className="rounded-full bg-capen-green-50 px-3 py-1 text-xs font-medium text-capen-green-700 ring-1 ring-capen-green-200">
                              Achat : {article.prixAchat || "Prix sur demande"}
                            </span>
                          )}
                          {article.disponibleLocation && (
                            <span className="rounded-full bg-capen-green-50 px-3 py-1 text-xs font-medium text-capen-green-700 ring-1 ring-capen-green-200">
                              Location : {article.prixLocation || "Prix sur demande"}
                            </span>
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2.5">
                          {whatsappHref && (
                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-4 py-2 text-sm">
                              Commander sur WhatsApp
                            </a>
                          )}
                          <Link href={`/packaging/articles/${article.slug}`} className="btn-secondary px-4 py-2 text-sm">
                            Voir la fiche
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
