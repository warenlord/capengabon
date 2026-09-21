import { getPackagingSuppliers } from "@/lib/data";
import { saveSupplier, deleteSupplierAction } from "./actions";
import type { PackagingSupplier } from "@/lib/types";

export const metadata = { title: "Fournisseurs (Packaging)" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

function SupplierForm({ supplier }: { supplier?: PackagingSupplier }) {
  return (
    <form action={saveSupplier} className="mt-4 space-y-4">
      {supplier && <input type="hidden" name="id" value={supplier.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nom du fournisseur *</label>
          <input name="nom" defaultValue={supplier?.nom} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Spécialité</label>
          <input
            name="specialite"
            defaultValue={supplier?.specialite ?? ""}
            placeholder="Ex : Sacs et sachets, Cartons, Bidons..."
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Personne de contact</label>
          <input name="contact" defaultValue={supplier?.contact ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Téléphone</label>
          <input name="telephone" defaultValue={supplier?.telephone ?? ""} className={inputClass} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>E-mail</label>
          <input name="email" type="email" defaultValue={supplier?.email ?? ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Adresse</label>
          <input name="adresse" defaultValue={supplier?.adresse ?? ""} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Notes internes</label>
        <textarea name="notes" defaultValue={supplier?.notes ?? ""} rows={3} className={`${inputClass} resize-none`} />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" name="actif" defaultChecked={supplier?.actif ?? true} className="h-4 w-4 rounded border-white/30 bg-white/5" />
        Fournisseur actif
      </label>
      <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
        {supplier ? "Enregistrer" : "Ajouter le fournisseur"}
      </button>
    </form>
  );
}

export default async function AdminPackagingSuppliersPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const suppliers = await getPackagingSuppliers();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Fournisseurs (Packaging)</h1>
      <p className="mt-1 text-sm text-white/50">
        Usage interne uniquement : ces fournisseurs ne sont jamais affichés sur le site public.
        Ils servent à indiquer d&apos;où provient chaque article de packaging.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-white/15 p-6">
        <h2 className="text-lg font-semibold text-white">Ajouter un fournisseur</h2>
        <SupplierForm />
      </div>

      <div className="mt-10 space-y-4">
        {suppliers.length === 0 && <p className="text-sm text-white/40">Aucun fournisseur pour le moment.</p>}
        {suppliers.map((supplier) => (
          <details key={supplier.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <summary className="flex cursor-pointer items-center gap-3">
              <span className="font-medium text-white">{supplier.nom}</span>
              {supplier.specialite && <span className="text-sm text-white/50">— {supplier.specialite}</span>}
              {!supplier.actif && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">Inactif</span>
              )}
            </summary>
            <div className="mt-4 border-t border-white/10 pt-4">
              <SupplierForm supplier={supplier} />
              <form action={deleteSupplierAction} className="mt-3">
                <input type="hidden" name="id" value={supplier.id} />
                <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                  Supprimer ce fournisseur
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
