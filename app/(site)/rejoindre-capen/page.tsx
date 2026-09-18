import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/app/(site)/contact/ContactForm";
import { getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Rejoindre CAPEN",
  description: "Vous êtes producteur et souhaitez rejoindre ou travailler avec CAPEN ? Contactez notre équipe pour échanger sur les possibilités de collaboration.",
};

export default async function RejoindreCapenPage() {
  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE)
    : null;

  return (
    <>
      <PageHero
        eyebrow="Vous êtes producteur ?"
        title="Rejoindre CAPEN"
        description="Vous cultivez la terre et souhaitez travailler avec CAPEN ? Parlons de votre activité et des possibilités de collaboration."
        image="/images/productions/manioc/plant-manioc-01.jpg"
        imageAlt="Plant de manioc en développement sur une parcelle CAPEN"
      />

      <section className="section-y bg-capen-paper">
        <div className="container-capen grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Pourquoi nous rejoindre</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-capen-ink sm:text-3xl">
              Une organisation agricole en construction
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
              CAPEN développe progressivement une organisation agricole structurée, autour de la
              production, du conditionnement et de la commercialisation de denrées alimentaires.
              Si vous êtes producteur et souhaitez échanger sur une collaboration avec la
              coopérative, contactez-nous : notre équipe reviendra vers vous pour en discuter.
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-card">
              <Image
                src="/images/productions/banane/recolte-equipe-01.jpg"
                alt="Équipe CAPEN pendant la récolte des bananes"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-8">
                Nous écrire sur WhatsApp
              </a>
            )}
          </Reveal>

          <Reveal delay={100} className="rounded-card bg-capen-cream p-6 shadow-card ring-1 ring-capen-ink/5 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-capen-ink">Présentez-nous votre activité</h2>
            <div className="mt-6">
              <Suspense fallback={<p className="text-sm text-capen-ink/65">Chargement du formulaire…</p>}>
                <ContactForm defaultIntent="rejoindre" />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
