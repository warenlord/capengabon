import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

export default async function ContactTeaser() {
  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE)
    : null;

  return (
    <section className="section-y bg-capen-green-900 text-white">
      <div className="container-capen flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow text-capen-green-300">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Parlons de votre besoin
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/75">
            Achat, commande de bâtons de manioc, production sur commande, partenariat : notre
            équipe vous répond directement.
          </p>
        </Reveal>
        <Reveal delay={100} className="mt-8 flex flex-wrap justify-center gap-3">
          {whatsappHref && (
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              Nous contacter sur WhatsApp
            </a>
          )}
          <Link href="/contact" className="btn bg-white text-capen-green-900 hover:bg-white/90">
            Formulaire de contact
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
