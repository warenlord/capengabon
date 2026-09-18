import Image from "next/image";
import Reveal from "@/components/Reveal";

const steps = [
  {
    numero: "01",
    titre: "Produire",
    description: "Développement des cultures de banane et de manioc sur nos parcelles.",
    image: "/images/productions/banane/preparation-parcelle-02.jpg",
    alt: "Développement d'une parcelle CAPEN",
  },
  {
    numero: "02",
    titre: "Récolter",
    description: "Organisation des récoltes par l'équipe CAPEN, saison après saison.",
    image: "/images/productions/manioc/recolte-pile-01.jpg",
    alt: "Récolte de manioc sur une parcelle CAPEN",
  },
  {
    numero: "03",
    titre: "Conditionner",
    description: "Préparation et présentation des produits selon les opérations réalisées par CAPEN.",
    image: "/images/products/batons-manioc/emballage-01.jpg",
    alt: "Conditionnement des bâtons de manioc",
  },
  {
    numero: "04",
    titre: "Commercialiser",
    description: "Mise à disposition des produits auprès de nos clients et partenaires.",
    image: "/images/products/batons-manioc/emballage-03.jpg",
    alt: "Bâtons de manioc prêts pour la commercialisation",
  },
];

export default function ChaineValeur() {
  return (
    <section className="section-y bg-capen-paper">
      <div className="container-capen">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Notre chaîne de valeur</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            De la terre au marché
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.numero} delay={i * 90}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-card">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-capen-ink/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 font-display text-2xl font-semibold text-white/90">
                    {step.numero}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-display text-xl font-semibold text-white">{step.titre}</h3>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-capen-ink/70">{step.description}</p>
                {i < steps.length - 1 && (
                  <svg
                    className="absolute -right-5 top-1/3 hidden text-capen-green-400 lg:block"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
