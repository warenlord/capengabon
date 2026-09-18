import Image from "next/image";
import { getGallery } from "@/lib/data";
import { addGalleryPhoto, deleteGalleryPhoto } from "./actions";

export const metadata = { title: "Galerie" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";
const categories = ["Banane", "Manioc", "Produits", "Développement"];

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const photos = await getGallery();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Galerie — CAPEN sur le terrain</h1>
      <p className="mt-1 text-sm text-white/50">
        Ces photos alimentent la galerie du site et la page Actualités.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <form action={addGalleryPhoto} className="mt-8 flex flex-wrap items-end gap-4 rounded-xl border border-dashed border-white/15 p-6">
        <div>
          <label className={labelClass}>Photo *</label>
          <input type="file" name="file" accept="image/*" required className="text-sm text-white/70" />
        </div>
        <div>
          <label className={labelClass}>Texte alternatif</label>
          <input name="alt" className={inputClass} placeholder="Description de la photo" />
        </div>
        <div>
          <label className={labelClass}>Catégorie</label>
          <select name="categorie" className={inputClass}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700">
          Ajouter à la galerie
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
            <Image src={photo.src} alt={photo.alt} fill sizes="180px" className="object-cover" />
            <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {photo.categorie}
            </span>
            <form action={deleteGalleryPhoto} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <input type="hidden" name="id" value={photo.id} />
              <button type="submit" className="text-xs font-semibold text-white">Supprimer</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
