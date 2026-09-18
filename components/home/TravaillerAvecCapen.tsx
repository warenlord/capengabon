import Link from "next/link";
import Reveal from "@/components/Reveal";

const parcours = [
  {
    titre: "Vous êtes acheteur ?",
    texte:
      "Vous recherchez un approvisionnement en produits agricoles ou alimentaires ? Présentez-nous vos besoins en produits, volumes et fréquence.",
    cta: "Demander un approvisionnement",
    href: "/contact?intent=achat",
  },
  {
    titre: "Vous êtes producteur ?",
    texte:
      "Vous souhaitez rejoindre ou travailler avec CAPEN ? Contactez-nous pour échanger sur les possibilités de collaboration.",
    cta: "Rejoindre CAPEN",
    href: "/rejoindre-capen",
  },
  {
    titre: "Vous êtes partenaire ?",
    texte:
      "Entreprises, institutions, organismes agricoles, partenaires techniques ou financiers : construisons des projets agricoles ensemble.",
    cta: "Devenir partenaire",
    href: "/partenaires",
  },
];

export default function TravaillerAvecCapen() {
  return (
    <section className="section-y bg-capen-paper">
      <div className="container-capen">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Travailler avec CAPEN</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            Trois façons de collaborer avec nous
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {parcours.map((item, i) => (
            <Reveal key={item.titre} delay={i * 100}>
              <div className="flex h-full flex-col rounded-card border border-capen-ink/10 bg-capen-cream p-7">
                <h3 className="font-display text-xl font-semibold text-capen-ink">{item.titre}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-capen-ink/70">{item.texte}</p>
                <Link href={item.href} className="btn-secondary mt-6 self-start">
                  {item.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
