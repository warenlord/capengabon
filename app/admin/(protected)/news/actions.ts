"use server";

import { redirect } from "next/navigation";
import { getNews, saveNews, upsertNews, deleteNews } from "@/lib/data";
import { saveUploadedImage, isRealFile } from "@/lib/uploads";
import { revalidateSite } from "@/lib/revalidate";
import type { NewsItem } from "@/lib/types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveNewsItem(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const titre = String(formData.get("titre") || "").trim();
  const providedSlug = String(formData.get("slug") || "").trim();
  const imageFile = formData.get("image");

  let image: NewsItem["image"] = null;
  if (id) {
    const existing = (await getNews()).find((n) => n.id === id);
    image = existing?.image ?? null;
  }
  if (isRealFile(imageFile)) {
    const src = await saveUploadedImage(imageFile, "news");
    image = { src, alt: titre };
  }

  await upsertNews({
    id: id || undefined,
    titre,
    slug: providedSlug || slugify(titre) || undefined,
    date: String(formData.get("date") || new Date().toISOString()),
    categorie: String(formData.get("categorie") || "Coopérative") as NewsItem["categorie"],
    resume: String(formData.get("resume") || "").trim(),
    contenu: String(formData.get("contenu") || "").trim(),
    image,
    publie: formData.get("publie") === "on",
  });

  revalidateSite();
  redirect("/admin/news?saved=1");
}

export async function deleteNewsAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deleteNews(id);
  revalidateSite();
  redirect("/admin/news?saved=1");
}

export async function addNewsGalleryImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const file = formData.get("file");
  const alt = String(formData.get("alt") || "").trim();

  if (isRealFile(file)) {
    const items = await getNews();
    const idx = items.findIndex((n) => n.id === id);
    if (idx >= 0) {
      const src = await saveUploadedImage(file, "news");
      items[idx].galerie.push({ src, alt: alt || items[idx].titre });
      await saveNews(items);
      revalidateSite();
    }
  }
  redirect("/admin/news?saved=1");
}

export async function removeNewsGalleryImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const src = String(formData.get("src") || "");
  const items = await getNews();
  const idx = items.findIndex((n) => n.id === id);
  if (idx >= 0) {
    items[idx].galerie = items[idx].galerie.filter((img) => img.src !== src);
    await saveNews(items);
    revalidateSite();
  }
  redirect("/admin/news?saved=1");
}
