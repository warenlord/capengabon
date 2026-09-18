import Reveal from "@/components/Reveal";
import { SURFACE_ACTUELLE, SURFACE_JUIN_2027, EXTENSION_JUIN_2027, SURFACE_2030 } from "@/lib/config";

const etapes = [
  {
    periode: "Aujourd'hui — 2026",
    titre: SURFACE_ACTUELLE + " exploité",
    detail: "Banane & Manioc",
    statut: "actuel" as const,
  },
  {
    periode: "Juin 2027",
    titre: SURFACE_JUIN_2027 + " visés",
    detail: `Extension prévue de ${EXTENSION_JUIN_2027.replace("+", "")} hectares`,
    statut: "objectif" as const,
  },
  {
    periode: "Horizon 2030",
    titre: SURFACE_2030,
    detail: "Objectif de développement",
    statut: "objectif" as const,
  },
];

export default function Trajectoire() {
  return (
    <section className="section-y bg-capen-cream">
      <div className="container-capen">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Notre trajectoire</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            Une croissance progressive et assumée
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-capen-ink/15 sm:block lg:left-1/2" />
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {etapes.map((etape, i) => (
              <Reveal key={etape.periode} delay={i * 120}>
                <div className="relative pl-10 sm:pl-12 lg:pl-0 lg:text-center">
                  <span
                    className={`absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-capen-cream sm:h-9 sm:w-9 lg:static lg:mx-auto lg:mb-5 ${
                      etape.statut === "actuel" ? "bg-capen-green-600" : "bg-capen-earth-500"
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-wide text-capen-ink/65">
                    {etape.periode}
                  </p>
                  <p className="mt-2 font-display text-3xl font-semibold text-capen-ink">{etape.titre}</p>
                  <p className="mt-1 text-sm text-capen-ink/70">{etape.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-14 max-w-2xl text-center font-display text-lg italic text-capen-ink/70">
            Une croissance progressive de nos capacités de production pour accompagner les besoins
            du marché.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
