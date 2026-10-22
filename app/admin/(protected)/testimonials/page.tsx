import { getTestimonials } from "@/lib/data";
import { saveTestimonial, deleteTestimonialAction } from "./actions";
import type { Testimonial } from "@/lib/types";

export const metadata = { title: "Témoignages" };

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <form action={saveTestimonial} className="mt-4 space-y-4">
      {testimonial && <input type="hidden" name="id" value={testimonial.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nom du client *</label>
          <input name="auteur" defaultValue={testimonial?.auteur} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Précision (optionnel)</label>
          <input
            name="contexte"
            defaultValue={testimonial?.contexte ?? ""}
            placeholder="Ex : Cliente à Libreville"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Témoignage *</label>
        <textarea name="texte" defaultValue={testimonial?.texte} required rows={4} className={`${inputClass} resize-none`} />
      </div>
      {testimonial && (
        <div>
          <label className={labelClass}>Ordre d&apos;affichage</label>
          <input
            name="ordreAffichage"
            type="number"
            min={1}
            defaultValue={testimonial.ordreAffichage}
            className={`${inputClass} w-24`}
          />
        </div>
      )}
      <label className="flex items-center gap-2 text-sm text-white/70">
        <input type="checkbox" name="actif" defaultChecked={testimonial?.actif ?? true} className="h-4 w-4 rounded border-white/30 bg-white/5" />
        Visible sur le site
      </label>
      <button type="submit" className="rounded-lg bg-capen-green-500 px-5 py-2.5 text-sm font-semibold text-capen-ink hover:bg-capen-green-400">
        {testimonial ? "Enregistrer" : "Ajouter le témoignage"}
      </button>
    </form>
  );
}

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const testimonials = await getTestimonials();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Témoignages</h1>
      <p className="mt-1 text-sm text-white/50">
        N&apos;ajoutez que de vrais avis de clients, avec leur accord. La section n&apos;apparaît sur la
        page d&apos;accueil que lorsqu&apos;au moins un témoignage est visible.
      </p>
      {saved && (
        <p className="mt-4 rounded-lg bg-capen-green-500/10 px-4 py-2.5 text-sm text-capen-green-400">
          Modifications enregistrées.
        </p>
      )}

      <div className="mt-8 rounded-xl border border-dashed border-white/15 p-6">
        <h2 className="text-lg font-semibold text-white">Ajouter un témoignage</h2>
        <TestimonialForm />
      </div>

      <div className="mt-10 space-y-4">
        {testimonials.length === 0 && <p className="text-sm text-white/40">Aucun témoignage pour le moment.</p>}
        {testimonials.map((testimonial) => (
          <details key={testimonial.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <summary className="flex cursor-pointer items-center gap-3">
              <span className="font-medium text-white">{testimonial.auteur}</span>
              {!testimonial.actif && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">Masqué</span>
              )}
            </summary>
            <div className="mt-4 border-t border-white/10 pt-4">
              <TestimonialForm testimonial={testimonial} />
              <form action={deleteTestimonialAction} className="mt-3">
                <input type="hidden" name="id" value={testimonial.id} />
                <button type="submit" className="text-xs font-medium text-red-300/70 hover:text-red-300">
                  Supprimer ce témoignage
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
