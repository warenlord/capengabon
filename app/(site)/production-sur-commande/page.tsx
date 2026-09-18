import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProductionRequestForm from "./ProductionRequestForm";

export const metadata: Metadata = {
  title: "Production sur commande",
  description: "CAPEN peut étudier la mise en culture d'autres productions selon les besoins de ses clients et partenaires. Soumettez votre besoin.",
};

const etapes = [
  { numero: "01", titre: "Expression du besoin", description: "Le client indique la culture recherchée, la quantité, la fréquence et le calendrier." },
  { numero: "02", titre: "Étude de faisabilité", description: "CAPEN étudie les conditions agricoles, la saisonnalité, les ressources, la surface nécessaire, les volumes et les délais." },
  { numero: "03", titre: "Planification", description: "Établissement d'un programme de culture lorsque le projet est validé." },
  { numero: "04", titre: "Production", description: "Mise en culture et suivi de la production." },
  { numero: "05", titre: "Commercialisation", description: "Organisation de la mise à disposition de la production." },
];

export default function ProductionSurCommandePage() {
  return (
    <>
      <PageHero
        eyebrow="Production sur commande"
        title="Vous recherchez une culture spécifique ?"
        description="Au-delà de ses productions actuelles de banane et de manioc, CAPEN peut étudier la mise en culture d'autres productions selon les besoins de ses clients et partenaires."
        image="/images/productions/banane/preparation-parcelle-01.jpg"
        imageAlt="Préparation d'une parcelle CAPEN"
      />

      <section className="section-y bg-capen-paper">
        <div className="container-capen">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Notre méthode</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Un processus clair, du besoin à la commercialisation
            </h2>
          </Reveal>

          <div className="relative mt-12 grid gap-8 lg:grid-cols-5 lg:gap-5">
            <div className="absolute left-0 top-6 hidden h-px w-full bg-capen-ink/15 lg:block" />
            {etapes.map((etape, i) => (
              <Reveal key={etape.numero} delay={i * 90} className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-capen-earth-500 font-display text-lg font-semibold text-white">
                  {etape.numero}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-capen-ink">{etape.titre}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-capen-ink/70">{etape.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-capen-cream">
        <div className="container-capen max-w-2xl">
          <Reveal>
            <p className="eyebrow">Soumettre un besoin</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Parlez-nous de votre projet
            </h2>
            <p className="mt-4 text-capen-ink/70">
              Une demande ne constitue jamais automatiquement un engagement de production : notre
              équipe étudie chaque besoin avant de vous recontacter.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-8 rounded-card bg-capen-paper p-6 shadow-card ring-1 ring-capen-ink/5 sm:p-8">
            <ProductionRequestForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
