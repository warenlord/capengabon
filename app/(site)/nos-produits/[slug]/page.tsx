import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { getProductBySlug, getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.nom, description: product.description };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product || !product.actif) notFound();

  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, productWhatsAppMessage(product.nom))
    : null;

  const specs = [
    { label: "Format", value: product.format },
    { label: "Poids", value: product.poids },
    { label: "Conditionnement", value: product.conditionnement },
    { label: "Disponibilité", value: product.disponibilite },
    { label: "Prix", value: product.prix },
  ].filter((s) => s.value);

  return (
    <section className="section-y bg-capen-paper">
      <div className="container-capen">
        <nav className="text-sm text-capen-ink/50">
          <Link href="/nos-produits" className="hover:text-capen-green-700">Nos produits</Link>
          <span className="mx-2">/</span>
          <span className="text-capen-ink/80">{product.nom}</span>
        </nav>

        <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card">
              <Image
                src={product.images[0]?.src}
                alt={product.images[0]?.alt ?? product.nom}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">{product.categorie}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-capen-ink sm:text-4xl">
              {product.nom}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">{product.description}</p>

            {specs.length > 0 && (
              <dl className="mt-8 divide-y divide-capen-ink/10 rounded-card border border-capen-ink/10 bg-capen-cream">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                    <dt className="font-medium text-capen-ink/60">{spec.label}</dt>
                    <dd className="text-right text-capen-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  Commander sur WhatsApp
                </a>
              )}
              <Link href="/contact" className="btn-secondary">Nous contacter</Link>
            </div>
          </Reveal>
        </div>

        {product.images.length > 1 && (
          <div className="mt-16">
            <p className="eyebrow">Galerie</p>
            <div className="mt-6">
              <Gallery photos={product.images} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
