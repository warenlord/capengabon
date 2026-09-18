import Reveal from "@/components/Reveal";
import { SURFACE_ACTUELLE, EXTENSION_JUIN_2027, SURFACE_2030 } from "@/lib/config";

const stats = [
  {
    value: SURFACE_ACTUELLE,
    label: "Actuellement exploité",
    tag: "Situation actuelle",
  },
  {
    value: "2",
    label: "Productions principales : Banane & Manioc",
    tag: "Situation actuelle",
  },
  {
    value: EXTENSION_JUIN_2027,
    label: "Extension visée d'ici juin 2027",
    tag: "Objectif",
  },
  {
    value: SURFACE_2030,
    label: "Objectif à horizon 2030",
    tag: "Objectif",
  },
];

export default function ChiffresCles() {
  return (
    <section className="section-y bg-capen-green-900 text-white">
      <div className="container-capen">
        <Reveal>
          <p className="eyebrow text-capen-green-300">Où en est CAPEN</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
            CAPEN aujourd&apos;hui, une ambition pour demain
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="h-full rounded-card border border-white/10 bg-white/5 p-6 sm:p-7">
                <span
                  className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    stat.tag === "Objectif"
                      ? "bg-capen-earth-500/25 text-capen-earth-200"
                      : "bg-capen-green-500/25 text-capen-green-200"
                  }`}
                >
                  {stat.tag}
                </span>
                <p className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm leading-snug text-white/70">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
