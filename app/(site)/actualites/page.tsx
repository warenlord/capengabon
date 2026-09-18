import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { getPublishedNews, getGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Actualités & CAPEN sur le terrain",
  description: "Suivez les actualités de CAPEN et découvrez notre travail sur le terrain : plantations, récoltes, produits et développement de la coopérative.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ActualitesPage() {
  const [news, gallery] = await Promise.all([getPublishedNews(), getGallery()]);

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="CAPEN sur le terrain"
        description="Le travail réel de la coopérative : plantations, récoltes, produits et vie de CAPEN."
        image="/images/productions/banane/recolte-equipe-01.jpg"
        imageAlt="Équipe CAPEN pendant la récolte des bananes"
      />

      <section id="terrain" className="section-y bg-capen-paper">
        <div className="container-capen">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Galerie</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Nos parcelles, nos récoltes, nos produits
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <Gallery photos={gallery.map((g) => ({ src: g.src, alt: g.alt, categorie: g.categorie }))} />
          </Reveal>
        </div>
      </section>

      <section id="actualites" className="section-y bg-capen-cream">
        <div className="container-capen">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Actualités</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Ce qui se passe chez CAPEN
            </h2>
          </Reveal>

          {news.length === 0 ? (
            <Reveal delay={100} className="mt-10 rounded-card border border-dashed border-capen-ink/20 bg-capen-paper p-12 text-center">
              <p className="text-capen-ink/60">
                Aucune actualité publiée pour le moment. Revenez bientôt pour suivre le
                développement de CAPEN.
              </p>
              <Link href="/contact" className="btn-secondary mt-6">Nous contacter</Link>
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item, i) => (
                <Reveal key={item.id} delay={i * 80}>
                  <Link
                    href={`/actualites/${item.slug}`}
                    className="group block h-full overflow-hidden rounded-card bg-capen-paper shadow-card ring-1 ring-capen-ink/5"
                  >
                    {item.image && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-capen-green-600">
                        {item.categorie} <span className="mx-1 text-capen-ink/30">·</span> {formatDate(item.date)}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold text-capen-ink">{item.titre}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">{item.resume}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
