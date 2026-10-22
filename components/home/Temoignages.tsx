import Reveal from "@/components/Reveal";
import type { Testimonial } from "@/lib/types";

export default function Temoignages({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-y bg-capen-paper">
      <div className="container-capen">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Ils nous font confiance</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            Ce que disent nos clients
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-card bg-capen-cream p-7 ring-1 ring-capen-ink/10">
                <blockquote className="flex-1 text-[17px] leading-relaxed text-capen-ink/80">
                  « {t.texte} »
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-capen-ink">{t.auteur}</span>
                  {t.contexte && <span className="text-capen-ink/60"> — {t.contexte}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
