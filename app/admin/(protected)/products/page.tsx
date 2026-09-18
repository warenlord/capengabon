import Image from "next/image";
import { getProducts } from "@/lib/data";
import { saveProduct, deleteProductAction, addProductImage, removeProductImage } from "./actions";

export const metadata = { title: "Produits" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Produits commercialisés</h1>
      <p className="mt-1 text-sm text-white/50">
        Gérez les fiches de vos produits (ex : bâtons de manioc). Ne renseignez que les
        informations réellement confirmées : les champs laissés vides ne s&apos;affichent pas sur
        le site.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 space-y-10">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <form action={saveProduct} className="space-y-4">
              <input type="hidden" name="id" value={product.id} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nom</label>
                  <input name="nom" defaultValue={product.nom} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Slug (URL)</label>
                  <input name="slug" defaultValue={product.slug} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Catégorie</label>
                <input name="categorie" defaultValue={product.categorie} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea name="description" defaultValue={product.description} rows={3} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Format</label>
                  <input name="format" defaultValue={product.format ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Poids</label>
                  <input name="poids" defaultValue={product.poids ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Conditionnement</label>
                  <input name="conditionnement" defaultValue={product.conditionnement ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Disponibilité</label>
                  <input name="disponibilite" defaultValue={product.disponibilite ?? ""} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Prix (optionnel)</label>
                  <input name="prix" defaultValue={product.prix ?? ""} className={inputClass} />
                </div>
              </div>
              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input type="checkbox" name="actif" defaultChecked={product.actif} className="h-4 w-4 rounded border-white/30 bg-white/5" />
                  Visible sur le site
                </label>
                <label className="flex items-center gap-2 text-sm text-white/70">
                  <input type="checkbox" name="miseEnAvant" defaultChecked={product.miseEnAvant} className="h-4 w-4 rounded border-white/30 bg-white/5" />
                  Mettre en avant
                </label>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
                  Enregistrer
                </button>
              </div>
            </form>

            <form action={deleteProductAction} className="mt-3">
              <input type="hidden" name="id" value={product.id} />
              <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                Supprimer ce produit
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className={labelClass}>Photos ({product.images.length})</p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {product.images.map((image) => (
                  <div key={image.src} className="group relative aspect-square overflow-hidden rounded-lg">
                    <Image src={image.src} alt={image.alt} fill sizes="100px" className="object-cover" />
                    <form action={removeProductImage} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="src" value={image.src} />
                      <button type="submit" className="text-xs font-semibold text-white">Supprimer</button>
                    </form>
                  </div>
                ))}
              </div>
              <form action={addProductImage} className="mt-4 flex flex-wrap items-end gap-3">
                <input type="hidden" name="id" value={product.id} />
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
        <h2 className="text-lg font-semibold text-white">Ajouter un nouveau produit</h2>
        <form action={saveProduct} className="mt-4 space-y-4">
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
          <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
            Créer le produit
          </button>
        </form>
      </div>
    </div>
  );
}
