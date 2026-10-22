import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { getProductBySlug, getSiteInfo } from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";

function parsePriceXaf(prix: string | null): string | null {
  const match = prix?.match(/(\d[\d\s .]*\d|\d)\s*(?:FCFA|F\s?CFA|XAF)/i);
  return match ? match[1].replace(/[\s .]/g, "") : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.nom,
    description: product.description,
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: product.nom,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0].src, alt: product.images[0].alt }] : undefined,
    },
  };
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

  const priceXaf = parsePriceXaf(product.prix);
  const productUrl = `${SITE_URL}/nos-produits/${product.slug}`;

  return (
    <section className="section-y bg-capen-paper">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.nom,
          description: product.description,
          category: product.categorie,
          url: productUrl,
          image: product.images.map((img) => `${SITE_URL}${img.src}`),
          brand: { "@type": "Brand", name: SITE_NAME },
          ...(priceXaf && {
            offers: {
              "@type": "Offer",
              price: priceXaf,
              priceCurrency: "XAF",
              url: productUrl,
              seller: { "@type": "Organization", name: SITE_NAME },
            },
          }),
        }}
      />
      <div className="container-capen">
        <nav className="text-sm text-capen-ink/65">
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
            {product.prix && (
              <p className="mt-3 font-display text-3xl font-semibold text-capen-green-700">{product.prix}</p>
            )}
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

        <Reveal delay={150} className="mt-16">
          <div className="flex flex-col items-start justify-between gap-5 rounded-card bg-capen-earth-50 p-7 ring-1 ring-capen-earth-200 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-xl font-semibold text-capen-ink">
                Besoin de plus grandes quantités ?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-capen-ink/70">
                Entreprise, restaurant, revendeur ou besoin régulier au-delà de nos capacités
                habituelles : contactez notre équipe pour étudier une solution adaptée à votre
                volume.
              </p>
            </div>
            <Link href="/contact?intent=commande-volume" className="btn-primary shrink-0">
              Discuter de ma commande
            </Link>
          </div>
        </Reveal>

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
