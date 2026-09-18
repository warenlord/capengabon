import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Trajectoire from "@/components/home/Trajectoire";
import { SITE_FULL_NAME, SITE_SLOGAN } from "@/lib/config";

export const metadata: Metadata = {
  title: "La Coopérative",
  description:
    "Découvrez CAPEN, Coopérative Agropastorale et Packaging des Enfants NGADI : son histoire familiale, son identité et sa trajectoire de développement.",
};

const adn = [
  "Famille",
  "Terre",
  "Travail",
  "Collectif",
  "Professionnalisme",
  "Développement",
];

const chaine = [
  { titre: "Produire", description: "Développement des cultures de banane et de manioc." },
  { titre: "Conditionner", description: "Préparation et présentation des produits récoltés." },
  { titre: "Commercialiser", description: "Mise à disposition des produits auprès de nos clients." },
];

export default function LaCooperativePage() {
  return (
    <>
      <PageHero
        eyebrow="La Coopérative"
        title="CAPEN, une coopérative agropastorale née d'une histoire familiale"
        description={SITE_FULL_NAME}
        image="/images/productions/manioc/epluchage-01.jpg"
        imageAlt="Préparation du manioc par l'équipe CAPEN"
      />

      <section className="section-y bg-capen-paper">
        <div className="container-capen grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Le nom CAPEN</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Coopérative Agropastorale et Packaging des Enfants NGADI
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
              CAPEN est issue d&apos;une dynamique familiale autour de l&apos;agriculture. Cette
              origine explique à la fois son nom et son slogan :
            </p>
            <p className="mt-4 font-display text-xl italic text-capen-green-700">« {SITE_SLOGAN} »</p>
            <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
              Cette histoire familiale porte aujourd&apos;hui une ambition plus large : construire
              progressivement une organisation agricole structurée, développer ses capacités de
              production et créer davantage de valeur autour des produits agricoles.
            </p>
          </Reveal>
          <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Image
              src="/images/productions/manioc/recolte-femme-01.jpg"
              alt="Membre de CAPEN présentant des racines de manioc récoltées"
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-capen-cream">
        <div className="container-capen">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Notre identité</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Famille, terre et travail collectif
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/75">
              L&apos;histoire familiale constitue l&apos;origine de CAPEN. La construction d&apos;une
              organisation agricole structurée en constitue la direction.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-8 flex flex-wrap gap-3">
            {adn.map((mot) => (
              <span
                key={mot}
                className="rounded-full bg-capen-paper px-5 py-2.5 text-sm font-semibold text-capen-ink ring-1 ring-capen-ink/10"
              >
                {mot}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-capen-paper">
        <div className="container-capen">
          <Reveal className="max-w-xl">
            <p className="eyebrow">Notre positionnement</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Produire, conditionner, commercialiser
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/75">
              CAPEN ne se limite pas à la production de banane et de manioc : la coopérative
              construit progressivement une véritable chaîne de valeur, avec la capacité de
              développer de nouvelles cultures selon la demande, une fois leur faisabilité
              confirmée.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {chaine.map((etape, i) => (
              <Reveal key={etape.titre} delay={i * 100}>
                <div className="rounded-card border border-capen-ink/10 bg-capen-cream p-7">
                  <span className="font-display text-2xl font-semibold text-capen-green-600">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-capen-ink">{etape.titre}</h3>
                  <p className="mt-2 text-sm text-capen-ink/70">{etape.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-6 rounded-card bg-capen-earth-50 p-6 text-sm text-capen-earth-700 ring-1 ring-capen-earth-200">
            + développer de nouvelles cultures selon la demande, lorsque leur faisabilité est confirmée.
          </Reveal>
        </div>
      </section>

      <Trajectoire />

      <section className="section-y bg-capen-paper">
        <div className="container-capen flex flex-col items-center text-center">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-capen-ink sm:text-3xl">
              Envie d&apos;en savoir plus sur CAPEN ?
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/nos-productions" className="btn-primary">Découvrir nos productions</Link>
              <Link href="/contact" className="btn-secondary">Nous contacter</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
