import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { SITE_SLOGAN } from "@/lib/config";

export default function Histoire() {
  return (
    <section className="section-y bg-capen-paper">
      <div className="container-capen grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Notre histoire</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            Une histoire de famille, une ambition collective
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-capen-ink/75">
            CAPEN signifie <strong className="text-capen-ink">Coopérative Agropastorale et
            Packaging des Enfants NGADI</strong>. Issue d&apos;une dynamique familiale autour de
            l&apos;agriculture, la coopérative développe progressivement ses activités de
            production et de commercialisation de denrées alimentaires.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-capen-ink/75">
            Cette histoire familiale porte aujourd&apos;hui une ambition plus large : construire
            progressivement une organisation agricole structurée, développer ses capacités de
            production et créer davantage de valeur autour des produits agricoles.
          </p>
          <p className="mt-6 font-display text-xl italic text-capen-green-700">
            « {SITE_SLOGAN} »
          </p>
          <Link href="/la-cooperative" className="btn-secondary mt-8">
            Découvrir CAPEN
          </Link>
        </Reveal>

        <Reveal delay={100} className="grid grid-cols-2 gap-4">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-card">
            <Image
              src="/images/productions/banane/bananeraie-manioc-01.jpg"
              alt="Parcelle CAPEN associant bananiers et manioc"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-card">
            <Image
              src="/images/productions/manioc/recolte-femme-01.jpg"
              alt="Membre de CAPEN présentant des racines de manioc"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-card">
            <Image
              src="/images/productions/banane/recolte-equipe-01.jpg"
              alt="Équipe CAPEN pendant la récolte des bananes"
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
