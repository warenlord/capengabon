import Image from "next/image";
import { getPartners } from "@/lib/data";
import { savePartner, deletePartnerAction } from "./actions";
import type { Partner } from "@/lib/types";

export const metadata = { title: "Partenaires" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

function PartnerForm({ partner }: { partner?: Partner }) {
  return (
    <form action={savePartner} className="mt-4 space-y-4" encType="multipart/form-data">
      {partner && <input type="hidden" name="id" value={partner.id} />}
      <div>
        <label className={labelClass}>Nom du partenaire *</label>
        <input name="nom" defaultValue={partner?.nom} required className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Site web</label>
        <input name="siteWeb" type="url" defaultValue={partner?.siteWeb ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <input name="description" defaultValue={partner?.description ?? ""} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Logo {partner?.logo ? "(remplacer)" : ""}</label>
        <input type="file" name="logo" accept="image/*" className="text-sm text-white/70" />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" name="actif" defaultChecked={partner?.actif ?? true} className="h-4 w-4 rounded border-white/30 bg-white/5" />
        Visible sur le site
      </label>
      <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
        {partner ? "Enregistrer" : "Ajouter le partenaire"}
      </button>
    </form>
  );
}

export default async function AdminPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const partners = await getPartners();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Partenaires</h1>
      <p className="mt-1 text-sm text-white/50">
        N&apos;ajoutez que des partenaires réels de CAPEN.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-white/15 p-6">
        <h2 className="text-lg font-semibold text-white">Ajouter un partenaire</h2>
        <PartnerForm />
      </div>

      <div className="mt-10 space-y-4">
        {partners.length === 0 && <p className="text-sm text-white/40">Aucun partenaire pour le moment.</p>}
        {partners.map((partner) => (
          <details key={partner.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <summary className="flex cursor-pointer items-center gap-3">
              {partner.logo && (
                <div className="relative h-10 w-14 overflow-hidden rounded-md bg-white/5">
                  <Image src={partner.logo} alt="" fill sizes="56px" className="object-contain" />
                </div>
              )}
              <span className="font-medium text-white">{partner.nom}</span>
            </summary>
            <div className="mt-4 border-t border-white/10 pt-4">
              <PartnerForm partner={partner} />
              <form action={deletePartnerAction} className="mt-3">
                <input type="hidden" name="id" value={partner.id} />
                <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                  Supprimer ce partenaire
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
