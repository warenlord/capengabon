import Image from "next/image";
import { getProductions } from "@/lib/data";
import { updateProduction, addProductionImage, removeProductionImage } from "./actions";

export const metadata = { title: "Productions" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

export default async function AdminProductionsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const productions = await getProductions();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Productions</h1>
      <p className="mt-1 text-sm text-white/50">
        Banane et manioc sont les deux productions actuellement confirmées de CAPEN.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 space-y-10">
        {productions.map((production) => (
          <div key={production.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <form action={updateProduction} className="space-y-4">
              <input type="hidden" name="id" value={production.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nom</label>
                  <input name="nom" defaultValue={production.nom} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Statut affiché</label>
                  <input name="statut" defaultValue={production.statut} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Résumé court</label>
                <input name="resume" defaultValue={production.resume} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" defaultValue={production.description} rows={4} className={`${inputClass} resize-none`} />
              </div>
              <label className="flex items-center gap-2 text-sm text-white/70">
                <input type="checkbox" name="actif" defaultChecked={production.actif} className="h-4 w-4 rounded border-white/30 bg-white/5" />
                Visible sur le site
              </label>
              <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
                Enregistrer
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className={labelClass}>Photos ({production.images.length})</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {production.images.map((image) => (
                  <div key={image.src} className="group relative aspect-square overflow-hidden rounded-lg">
                    <Image src={image.src} alt={image.alt} fill sizes="100px" className="object-cover" />
                    <form action={removeProductionImage} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <input type="hidden" name="id" value={production.id} />
                      <input type="hidden" name="src" value={image.src} />
                      <button type="submit" className="text-xs font-semibold text-white">Supprimer</button>
                    </form>
                  </div>
                ))}
              </div>

              <form action={addProductionImage} className="mt-4 flex flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={production.id} />
                <div>
                  <label className={labelClass}>Ajouter une photo</label>
                  <input type="file" name="file" accept="image/*" required className="text-sm text-white/70" />
                </div>
                <div>
                  <label className={labelClass}>Texte alternatif</label>
                  <input name="alt" className={inputClass} placeholder="Description de la photo" />
                </div>
                <button type="submit" className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
