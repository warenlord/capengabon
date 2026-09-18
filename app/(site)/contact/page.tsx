import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import { getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez CAPEN par WhatsApp, e-mail ou via notre formulaire pour vos achats, commandes, demandes de production ou partenariats.",
};

export default async function ContactPage() {
  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE)
    : null;

  return (
    <>
      <PageHero eyebrow="Contact" title="Parlons de votre besoin" />

      <section className="section-y bg-capen-paper">
        <div className="container-capen grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-5">
            <Reveal className="rounded-card bg-capen-cream p-7 ring-1 ring-capen-ink/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1fb959]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92C21.95 6.45 17.5 2 12.04 2Zm5.83 14.19c-.25.7-1.24 1.27-2.03 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.31-5.11-4.51-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.63.48.25.6.83 2.07.9 2.22.07.15.12.33.02.53-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.15.28.68 1.12 1.46 1.82 1 .89 1.85 1.17 2.12 1.31.28.14.44.12.6-.07.17-.2.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.18 1.36Z" />
                </svg>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-capen-ink">WhatsApp</h2>
              <p className="mt-1.5 text-sm text-capen-ink/70">Échangez directement avec CAPEN.</p>
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-5">
                  Nous contacter sur WhatsApp
                </a>
              ) : (
                <p className="mt-5 text-sm italic text-capen-ink/65">Numéro à venir</p>
              )}
            </Reveal>

            <Reveal delay={80} className="rounded-card bg-capen-cream p-7 ring-1 ring-capen-ink/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-capen-green-100 text-capen-green-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 6l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-capen-ink">E-mail</h2>
              {siteInfo.email ? (
                <>
                  <p className="mt-1.5 text-sm text-capen-ink/70">{siteInfo.email}</p>
                  <a href={`mailto:${siteInfo.email}`} className="btn-secondary mt-5">Nous écrire</a>
                </>
              ) : (
                <p className="mt-1.5 text-sm italic text-capen-ink/65">Adresse à venir</p>
              )}
            </Reveal>

            {siteInfo.phone && (
              <Reveal delay={140} className="rounded-card bg-capen-cream p-7 ring-1 ring-capen-ink/10">
                <h2 className="font-display text-xl font-semibold text-capen-ink">Téléphone</h2>
                <a href={`tel:${siteInfo.phone}`} className="mt-1.5 block text-sm text-capen-ink/70 hover:text-capen-green-700">
                  {siteInfo.phone}
                </a>
              </Reveal>
            )}
          </div>

          <Reveal delay={100} className="rounded-card bg-capen-cream p-6 shadow-card ring-1 ring-capen-ink/5 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-capen-ink">Formulaire de contact</h2>
            <div className="mt-6">
              <Suspense fallback={<p className="text-sm text-capen-ink/65">Chargement du formulaire…</p>}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
