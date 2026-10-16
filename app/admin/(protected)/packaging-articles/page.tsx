import Image from "next/image";
import { getPackagingArticles, getActivePackagingSuppliers } from "@/lib/data";
import { saveArticle, deleteArticleAction, addArticleImage, removeArticleImage } from "./actions";
import type { PackagingArticle, PackagingSupplier } from "@/lib/types";

export const metadata = { title: "Articles de packaging" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

function SupplierSelect({ article, suppliers }: { article: PackagingArticle; suppliers: PackagingSupplier[] }) {
  const currentIsMissing =
    article.fournisseurId && !suppliers.some((s) => s.id === article.fournisseurId);

  return (
    <select name="fournisseurId" defaultValue={article.fournisseurId ?? ""} className={inputClass}>
      <option value="">— Aucun —</option>
      {currentIsMissing && (
        <option value={article.fournisseurId!}>Fournisseur désactivé (inactif)</option>
      )}
      {suppliers.map((supplier) => (
        <option key={supplier.id} value={supplier.id}>
          {supplier.nom}
        </option>
      ))}
    </select>
  );
}

export default async function AdminPackagingArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const [articles, suppliers] = await Promise.all([getPackagingArticles(), getActivePackagingSuppliers()]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Articles de packaging</h1>
      <p className="mt-1 text-sm text-white/50">
        Gérez le catalogue d&apos;articles proposés à l&apos;achat et/ou à la location. Ne
        renseignez que les informations réellement confirmées.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 space-y-10">
        {articles.map((article) => (
          <div key={article.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <form action={saveArticle} className="space-y-4">
              <input type="hidden" name="id" value={article.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nom</label>
                  <input name="nom" defaultValue={article.nom} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Slug (URL)</label>
                  <input name="slug" defaultValue={article.slug} className={inputClass} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Catégorie</label>
                  <input name="categorie" defaultValue={article.categorie} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Fournisseur</label>
                  <SupplierSelect article={article} suppliers={suppliers} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" defaultValue={article.description} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div>
                <label className={labelClass}>Caractéristiques (format, matière, capacité...)</label>
                <input name="specifications" defaultValue={article.specifications ?? ""} className={inputClass} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 p-4">
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      name="disponibleAchat"
                      defaultChecked={article.disponibleAchat}
                      className="h-4 w-4 rounded border-white/30 bg-white/5"
                    />
                    Disponible à l&apos;achat
                  </label>
                  <label className={`${labelClass} mt-3`}>Prix (achat)</label>
                  <input name="prixAchat" defaultValue={article.prixAchat ?? ""} placeholder="Ex : 2 500 FCFA / unité" className={inputClass} />
                </div>
                <div className="rounded-lg border border-white/10 p-4">
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      name="disponibleLocation"
                      defaultChecked={article.disponibleLocation}
                      className="h-4 w-4 rounded border-white/30 bg-white/5"
                    />
                    Disponible à la location
                  </label>
                  <label className={`${labelClass} mt-3`}>Prix (location)</label>
                  <input name="prixLocation" defaultValue={article.prixLocation ?? ""} placeholder="Ex : 500 FCFA / jour" className={inputClass} />
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input type="checkbox" name="actif" defaultChecked={article.actif} className="h-4 w-4 rounded border-white/30 bg-white/5" />
                  Visible sur le site
                </label>
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input type="checkbox" name="miseEnAvant" defaultChecked={article.miseEnAvant} className="h-4 w-4 rounded border-white/30 bg-white/5" />
                  Mettre en avant
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="rounded-lg bg-capen-green-500 px-5 py-2.5 text-sm font-semibold text-capen-ink hover:bg-capen-green-400">
                  Enregistrer
                </button>
              </div>
            </form>

            <form action={deleteArticleAction} className="mt-3">
              <input type="hidden" name="id" value={article.id} />
              <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                Supprimer cet article
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className={labelClass}>Photos ({article.images.length})</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {article.images.map((image) => (
                  <div key={image.src} className="group relative aspect-square overflow-hidden rounded-lg">
                    <Image src={image.src} alt={image.alt} fill sizes="100px" className="object-cover" />
                    <form action={removeArticleImage} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <input type="hidden" name="id" value={article.id} />
                      <input type="hidden" name="src" value={image.src} />
                      <button type="submit" className="text-xs font-semibold text-white">Supprimer</button>
                    </form>
                  </div>
                ))}
              </div>
              <form action={addArticleImage} className="mt-4 flex flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={article.id} />
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

      <div className="mt-10 rounded-xl border border-dashed border-white/15 p-6">
        <h2 className="text-lg font-semibold text-white">Ajouter un nouvel article</h2>
        <form action={saveArticle} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Nom *</label>
              <input name="nom" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Catégorie</label>
              <input name="categorie" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" rows={3} className={`${inputClass} resize-none`} />
          </div>
          <button type="submit" className="rounded-lg bg-capen-green-500 px-5 py-2.5 text-sm font-semibold text-capen-ink hover:bg-capen-green-400">
            Créer l&apos;article
          </button>
        </form>
      </div>
    </div>
  );
}
