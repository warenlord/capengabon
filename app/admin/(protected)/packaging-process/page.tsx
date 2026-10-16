import { getPackagingProcessSteps } from "@/lib/data";
import { saveProcessStep, deleteProcessStepAction } from "./actions";
import type { PackagingProcessStep } from "@/lib/types";

export const metadata = { title: "Étapes du process (Packaging)" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

function StepForm({ step }: { step?: PackagingProcessStep }) {
  return (
    <form action={saveProcessStep} className="mt-4 space-y-4">
      {step && <input type="hidden" name="id" value={step.id} />}
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className={labelClass}>Titre *</label>
          <input name="titre" defaultValue={step?.titre} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Ordre</label>
          <input
            name="ordreAffichage"
            type="number"
            min={1}
            defaultValue={step?.ordreAffichage}
            className={`${inputClass} w-24`}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" defaultValue={step?.description} rows={3} className={`${inputClass} resize-none`} />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" name="actif" defaultChecked={step?.actif ?? true} className="h-4 w-4 rounded border-white/30 bg-white/5" />
        Visible sur le site
      </label>
      <button type="submit" className="rounded-lg bg-capen-green-500 px-5 py-2.5 text-sm font-semibold text-capen-ink hover:bg-capen-green-400">
        {step ? "Enregistrer" : "Ajouter l'étape"}
      </button>
    </form>
  );
}

export default async function AdminPackagingProcessPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const steps = await getPackagingProcessSteps();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Étapes du process (Packaging)</h1>
      <p className="mt-1 text-sm text-white/50">
        Décrivez le déroulé de votre service de packaging pour vos clients. L&apos;ordre
        détermine l&apos;affichage sur la page publique.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-10 space-y-4">
        {steps.length === 0 && <p className="text-sm text-white/40">Aucune étape pour le moment.</p>}
        {steps.map((step) => (
          <details key={step.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6" open>
            <summary className="flex cursor-pointer items-center gap-3">
              <span className="font-display text-lg text-white/40">{String(step.ordreAffichage).padStart(2, "0")}</span>
              <span className="font-medium text-white">{step.titre}</span>
              {!step.actif && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">Masquée</span>
              )}
            </summary>
            <div className="mt-4 border-t border-white/10 pt-4">
              <StepForm step={step} />
              <form action={deleteProcessStepAction} className="mt-3">
                <input type="hidden" name="id" value={step.id} />
                <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                  Supprimer cette étape
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-dashed border-white/15 p-6">
        <h2 className="text-lg font-semibold text-white">Ajouter une étape</h2>
        <StepForm />
      </div>
    </div>
  );
}
