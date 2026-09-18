import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getActiveProductions, getActiveProducts, getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Nos Produits",
  description: "Découvrez les bâtons de manioc commercialisés par CAPEN, ainsi que nos productions agricoles de banane et de manioc.",
};

export default async function NosProduitsPage() {
  const [productions, products, siteInfo] = await Promise.all([
    getActiveProductions(),
    getActiveProducts(),
    getSiteInfo(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Nos produits"
        title="De la production agricole aux produits commercialisés"
        image="/images/products/batons-manioc/emballage-03.jpg"
        imageAlt="Lots de bâtons de manioc conditionnés par CAPEN"
      />

      <section className="section-y bg-capen-cream">
        <div className="container-capen">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Produits commercialisés</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Nos bâtons de manioc
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => {
              const whatsappHref = siteInfo.whatsappNumber
                ? buildWhatsAppLink(siteInfo.whatsappNumber, productWhatsAppMessage(product.nom))
                : null;
              return (
                <Reveal key={product.id} delay={i * 90}>
                  <div className="flex h-full flex-col overflow-hidden rounded-card bg-capen-paper shadow-card ring-1 ring-capen-ink/5">
                    <Link href={`/nos-produits/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden">
                      <Image
                        src={product.images[0]?.src}
                        alt={product.images[0]?.alt ?? product.nom}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {product.miseEnAvant && (
                        <span className="absolute left-4 top-4 rounded-full bg-capen-green-600 px-3 py-1 text-xs font-semibold text-white">
                          En avant
                        </span>
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-capen-green-600">
                        {product.categorie}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-capen-ink">{product.nom}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">{product.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2.5">
                        {whatsappHref && (
                          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-4 py-2 text-sm">
                            Commander sur WhatsApp
                          </a>
                        )}
                        <Link href={`/nos-produits/${product.slug}`} className="btn-secondary px-4 py-2 text-sm">
                          Voir la fiche
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-y bg-capen-paper">
        <div className="container-capen">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Productions agricoles</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              À la base de nos produits
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/70">
              Nos produits commercialisés sont issus de nos propres productions agricoles.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {productions.map((production) => (
              <Link
                key={production.id}
                href={`/nos-productions/${production.slug}`}
                className="group flex items-center gap-5 rounded-card bg-capen-cream p-5 ring-1 ring-capen-ink/10 transition-shadow hover:shadow-card"
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Image src={production.images[0]?.src} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-capen-ink">{production.nom}</h3>
                  <p className="text-sm text-capen-ink/60">{production.statut}</p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="ml-auto shrink-0 text-capen-green-600" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
