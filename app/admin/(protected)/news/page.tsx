import Image from "next/image";
import { getNews } from "@/lib/data";
import { saveNewsItem, deleteNewsAction, addNewsGalleryImage, removeNewsGalleryImage } from "./actions";
import type { NewsItem } from "@/lib/types";

export const metadata = { title: "Actualités" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";
const categories = ["Production", "Coopérative", "Événements", "Partenariats", "Développement"];

function toDateInputValue(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

function NewsForm({ item }: { item?: NewsItem }) {
  return (
    <form action={saveNewsItem} className="mt-4 space-y-4" encType="multipart/form-data">
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Titre *</label>
          <input name="titre" defaultValue={item?.titre} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input name="slug" defaultValue={item?.slug} className={inputClass} placeholder="généré automatiquement si vide" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Date</label>
          <input type="date" name="date" defaultValue={item ? toDateInputValue(item.date) : undefined} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Catégorie</label>
          <select name="categorie" defaultValue={item?.categorie ?? "Coopérative"} className={inputClass}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Résumé</label>
        <input name="resume" defaultValue={item?.resume} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Contenu</label>
        <textarea name="contenu" defaultValue={item?.contenu} rows={5} className={`${inputClass} resize-none`} />
      </div>
      <div>
        <label className={labelClass}>Photo de couverture {item?.image ? "(remplacer)" : ""}</label>
        <input type="file" name="image" accept="image/*" className="text-sm text-white/70" />
      </div>
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" name="publie" defaultChecked={item?.publie} className="h-4 w-4 rounded border-white/30 bg-white/5" />
        Publier sur le site
      </label>
      <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
        {item ? "Enregistrer" : "Créer l'actualité"}
      </button>
    </form>
  );
}

export default async function AdminNewsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const news = await getNews();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Actualités</h1>
      <p className="mt-1 text-sm text-white/50">
        Créez, modifiez, publiez ou dépubliez les actualités affichées sur le site.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-white/15 p-6">
        <h2 className="text-lg font-semibold text-white">Nouvelle actualité</h2>
        <NewsForm />
      </div>

      <div className="mt-10 space-y-4">
        {news.length === 0 && <p className="text-sm text-white/40">Aucune actualité pour le moment.</p>}
        {news.map((item) => (
          <details key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <summary className="cursor-pointer list-none">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <div className="relative h-12 w-16 overflow-hidden rounded-md">
                      <Image src={item.image.src} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-white">{item.titre || "(sans titre)"}</p>
                    <p className="text-xs text-white/40">
                      {item.categorie} · {new Date(item.date).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.publie ? "bg-capen-green-500/15 text-capen-green-400" : "bg-white/10 text-white/50"
                  }`}
                >
                  {item.publie ? "Publiée" : "Brouillon"}
                </span>
              </div>
            </summary>

            <div className="mt-6 border-t border-white/10 pt-6">
              <NewsForm item={item} />

              <form action={deleteNewsAction} className="mt-3">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                  Supprimer cette actualité
                </button>
              </form>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className={labelClass}>Galerie ({item.galerie.length})</p>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {item.galerie.map((image) => (
                    <div key={image.src} className="group relative aspect-square overflow-hidden rounded-lg">
                      <Image src={image.src} alt={image.alt} fill sizes="100px" className="object-cover" />
                      <form action={removeNewsGalleryImage} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="src" value={image.src} />
                        <button type="submit" className="text-xs font-semibold text-white">Supprimer</button>
                      </form>
                    </div>
                  ))}
                </div>
                <form action={addNewsGalleryImage} className="mt-4 flex flex-wrap items-end gap-3">
                  <input type="hidden" name="id" value={item.id} />
                  <div>
                    <label className={labelClass}>Ajouter une photo à la galerie</label>
                    <input type="file" name="file" accept="image/*" required className="text-sm text-white/70" />
                  </div>
                  <button type="submit" className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20">
                    Ajouter
                  </button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
