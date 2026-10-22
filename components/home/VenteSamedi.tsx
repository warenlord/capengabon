import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { buildWhatsAppLink, productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

const TIMEZONE = "Africa/Libreville";

function prochainSamedi(): { label: string; aujourdhui: boolean } {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date())
    .split("-")
    .map(Number);
  const today = new Date(Date.UTC(y, m - 1, d));
  const joursRestants = (6 - today.getUTCDay() + 7) % 7;
  const samedi = new Date(Date.UTC(y, m - 1, d + joursRestants));
  const label = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(samedi);
  return { label, aujourdhui: joursRestants === 0 };
}

export default function VenteSamedi({
  product,
  whatsappNumber,
}: {
  product: Product | undefined;
  whatsappNumber: string;
}) {
  if (!product || !product.actif || !product.images[0]) return null;

  const { label, aujourdhui } = prochainSamedi();
  const whatsappHref = whatsappNumber
    ? buildWhatsAppLink(whatsappNumber, productWhatsAppMessage(product.nom))
    : null;

  return (
    <section className="section-y bg-capen-earth-50">
      <div className="container-capen">
        <div className="grid items-center gap-10 overflow-hidden rounded-card bg-capen-paper p-5 shadow-card ring-1 ring-capen-ink/5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-10">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="eyebrow">Vente du samedi</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              {product.nom}
            </h2>
            <p className="mt-3 text-lg font-semibold text-capen-earth-700">
              {aujourdhui ? "Aujourd'hui" : "Prochaine vente"} : {label}
            </p>

            {product.prix && (
              <p className="mt-5 font-display text-4xl font-semibold text-capen-green-700">{product.prix}</p>
            )}
            {product.disponibilite && (
              <p className="mt-3 text-[17px] leading-relaxed text-capen-ink/75">{product.disponibilite}</p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {whatsappHref && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  Réserver sur WhatsApp
                </a>
              )}
              <Link href={`/nos-produits/${product.slug}`} className="btn-secondary">
                Voir la fiche
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
