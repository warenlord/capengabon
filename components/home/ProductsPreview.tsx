import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export default async function ProductsPreview({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const siteInfo = await getSiteInfo();

  return (
    <section className="section-y bg-capen-cream">
      <div className="container-capen">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Nos produits</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Nos bâtons de manioc
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/nos-produits" className="btn-secondary">
              Voir tous nos produits
            </Link>
          </Reveal>
        </div>

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
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-capen-ink">{product.nom}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">{product.disponibilite}</p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {whatsappHref && (
                        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-4 py-2 text-sm">
                          Commander
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
  );
}
