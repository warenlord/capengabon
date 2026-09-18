import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function ProductionCommandeTeaser() {
  return (
    <section className="section-y bg-capen-earth-900 text-white">
      <div className="container-capen grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow text-capen-earth-200">Production sur commande</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Vous recherchez une culture spécifique ?
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/80">
            Au-delà de ses productions actuelles de banane et de manioc, CAPEN peut étudier la
            mise en culture d&apos;autres productions selon les besoins de ses clients et
            partenaires.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-white/75">
            <li>Expression du besoin → Étude de faisabilité → Planification → Production → Commercialisation</li>
          </ul>
          <Link href="/production-sur-commande" className="btn-earth mt-8 bg-white text-capen-earth-900 hover:bg-white/90">
            Soumettre un besoin de production
          </Link>
        </Reveal>

        <Reveal delay={100} className="relative aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src="/images/productions/banane/preparation-parcelle-01.jpg"
            alt="Préparation d'une parcelle en vue d'une nouvelle culture"
            fill
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
