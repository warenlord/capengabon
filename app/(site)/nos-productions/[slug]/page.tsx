import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { getProductionBySlug, getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const production = await getProductionBySlug(slug);
  if (!production) return {};
  return {
    title: production.nom,
    description: production.resume,
  };
}

export default async function ProductionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const production = await getProductionBySlug(slug);
  if (!production || !production.actif) notFound();

  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, productWhatsAppMessage(production.nom))
    : null;

  const [cover, ...rest] = production.images;

  return (
    <>
      <section className="relative overflow-hidden bg-capen-green-900">
        <div className="absolute inset-0">
          <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-capen-ink/60" />
        </div>
        <div className="container-capen relative py-16 sm:py-24">
          <p className="eyebrow text-capen-green-300">Nos productions</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
            {production.nom}
          </h1>
          <span className="mt-4 inline-block rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-capen-green-700">
            {production.statut}
          </span>
        </div>
      </section>

      <section className="section-y bg-capen-paper">
        <div className="container-capen grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-capen-ink sm:text-3xl">
              À propos de notre {production.nom.toLowerCase()}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
              {production.description}
            </p>

            <div className="mt-8 rounded-card bg-capen-cream p-6 ring-1 ring-capen-ink/10">
              <h3 className="font-display text-lg font-semibold text-capen-ink">Approvisionnement</h3>
              <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">
                Vous souhaitez vous approvisionner en {production.nom.toLowerCase()} auprès de
                CAPEN ? Contactez notre équipe pour connaître la disponibilité actuelle et
                échanger sur vos besoins (volumes, fréquence, calendrier).
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {whatsappHref && (
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                    Demander un approvisionnement
                  </a>
                )}
                <Link href="/contact?intent=achat" className="btn-secondary">
                  Nous écrire
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {rest.slice(0, 4).map((image) => (
                <div key={image.src} className="relative aspect-square overflow-hidden rounded-card">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, 45vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="section-y bg-capen-cream">
          <div className="container-capen">
            <Reveal className="max-w-xl">
              <p className="eyebrow">Galerie</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
                {production.nom} chez CAPEN
              </h2>
            </Reveal>
            <Reveal delay={100} className="mt-10">
              <Gallery photos={production.images} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
