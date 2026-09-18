import Image from "next/image";
import Link from "next/link";
import { getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { SITE_FULL_NAME, SITE_SLOGAN } from "@/lib/config";

export default async function Hero() {
  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE)
    : null;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/productions/banane/recolte-femme-portage-02.jpg"
          alt="Membre de CAPEN portant une récolte de bananes, sourire aux lèvres"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-capen-ink/85 via-capen-ink/45 to-capen-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-capen-ink/60 via-transparent to-transparent" />
      </div>

      <div className="container-capen relative flex min-h-[86vh] flex-col justify-end py-14 sm:min-h-[92vh] sm:py-20">
        <p className="eyebrow text-capen-green-200">CAPEN</p>
        <h2 className="mt-2 max-w-2xl font-display text-lg font-medium text-white/85 sm:text-xl">
          {SITE_FULL_NAME}
        </h2>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          {SITE_SLOGAN}
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg">
          CAPEN produit et commercialise des denrées agricoles et développe progressivement ses
          capacités pour répondre aux besoins du marché.
        </p>

        <p className="mt-5 text-sm font-medium uppercase tracking-wide text-white/70">
          Banane <span className="mx-2 text-white/40">•</span> Manioc{" "}
          <span className="mx-2 text-white/40">•</span> Cultures sur commande
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/nos-productions" className="btn-primary">
            Découvrir nos productions
          </Link>
          <Link
            href="/contact"
            className="btn bg-white/10 text-white ring-1 ring-inset ring-white/40 backdrop-blur hover:bg-white/20"
          >
            Nous contacter
          </Link>
          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92C21.95 6.45 17.5 2 12.04 2Zm5.83 14.19c-.25.7-1.24 1.27-2.03 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.31-5.11-4.51-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.63.48.25.6.83 2.07.9 2.22.07.15.12.33.02.53-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.15.28.68 1.12 1.46 1.82 1 .89 1.85 1.17 2.12 1.31.28.14.44.12.6-.07.17-.2.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.18 1.36Z" />
              </svg>
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
