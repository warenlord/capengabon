"use server";

import { redirect } from "next/navigation";
import { getPackagingArticles, savePackagingArticles, upsertPackagingArticle, deletePackagingArticle } from "@/lib/data";
import { saveUploadedImage, isRealFile } from "@/lib/uploads";
import { revalidateSite } from "@/lib/revalidate";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveArticle(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const nom = String(formData.get("nom") || "").trim();
  const providedSlug = String(formData.get("slug") || "").trim();

  await upsertPackagingArticle({
    id: id || undefined,
    nom,
    slug: providedSlug || slugify(nom),
    categorie: String(formData.get("categorie") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    specifications: String(formData.get("specifications") || "").trim() || null,
    fournisseurId: String(formData.get("fournisseurId") || "").trim() || null,
    disponibleAchat: formData.get("disponibleAchat") === "on",
    prixAchat: String(formData.get("prixAchat") || "").trim() || null,
    disponibleLocation: formData.get("disponibleLocation") === "on",
    prixLocation: String(formData.get("prixLocation") || "").trim() || null,
    miseEnAvant: formData.get("miseEnAvant") === "on",
    actif: formData.get("actif") === "on",
  });

  revalidateSite();
  redirect("/admin/packaging-articles?saved=1");
}

export async function deleteArticleAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deletePackagingArticle(id);
  revalidateSite();
  redirect("/admin/packaging-articles?saved=1");
}

export async function addArticleImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const file = formData.get("file");
  const alt = String(formData.get("alt") || "").trim();

  if (isRealFile(file)) {
    const items = await getPackagingArticles();
    const idx = items.findIndex((a) => a.id === id);
    if (idx >= 0) {
      const src = await saveUploadedImage(file, "packaging-articles");
      items[idx].images.push({ src, alt: alt || items[idx].nom });
      await savePackagingArticles(items);
      revalidateSite();
    }
  }
  redirect("/admin/packaging-articles?saved=1");
}

export async function removeArticleImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const src = String(formData.get("src") || "");
  const items = await getPackagingArticles();
  const idx = items.findIndex((a) => a.id === id);
  if (idx >= 0) {
    items[idx].images = items[idx].images.filter((img) => img.src !== src);
    await savePackagingArticles(items);
    revalidateSite();
  }
  redirect("/admin/packaging-articles?saved=1");
}
