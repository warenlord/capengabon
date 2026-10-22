"use server";

import { redirect } from "next/navigation";
import { getTestimonials, upsertTestimonial, deleteTestimonial } from "@/lib/data";
import { revalidateSite } from "@/lib/revalidate";

export async function saveTestimonial(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const existing = id ? (await getTestimonials()).find((t) => t.id === id) : undefined;
  const ordreRaw = Number(formData.get("ordreAffichage"));

  await upsertTestimonial({
    id: id || undefined,
    auteur: String(formData.get("auteur") || "").trim(),
    contexte: String(formData.get("contexte") || "").trim() || null,
    texte: String(formData.get("texte") || "").trim(),
    ordreAffichage: Number.isFinite(ordreRaw) && ordreRaw > 0 ? ordreRaw : existing?.ordreAffichage,
    actif: formData.get("actif") === "on",
  });

  revalidateSite();
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonialAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deleteTestimonial(id);
  revalidateSite();
  redirect("/admin/testimonials?saved=1");
}
