import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Production } from "@/lib/types";

export default function ProductionsPreview({ productions }: { productions: Production[] }) {
  return (
    <section className="section-y bg-capen-cream">
      <div className="container-capen">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Nos productions</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            Des cultures ancrées dans le terrain
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {productions.map((production, i) => (
            <Reveal key={production.id} delay={i * 100}>
              <Link
                href={`/nos-productions/${production.slug}`}
                className="group block h-full overflow-hidden rounded-card bg-capen-paper shadow-card ring-1 ring-capen-ink/5 transition-shadow hover:shadow-cardHover"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={production.images[0]?.src}
                    alt={production.images[0]?.alt ?? production.nom}
                    fill
                    sizes="(min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-capen-green-700">
                    {production.statut}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-capen-ink">
                    {production.nom}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-capen-ink/70">
                    {production.resume}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-capen-green-700">
                    Découvrir
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
