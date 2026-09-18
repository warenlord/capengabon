"use server";

import { redirect } from "next/navigation";
import { getProductions, saveProductions } from "@/lib/data";
import { saveUploadedImage, isRealFile } from "@/lib/uploads";
import { revalidateSite } from "@/lib/revalidate";

export async function updateProduction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const items = await getProductions();
  const idx = items.findIndex((p) => p.id === id);
  if (idx >= 0) {
    items[idx] = {
      ...items[idx],
      nom: String(formData.get("nom") || items[idx].nom).trim(),
      resume: String(formData.get("resume") || "").trim(),
      description: String(formData.get("description") || "").trim(),
      statut: String(formData.get("statut") || "").trim(),
      actif: formData.get("actif") === "on",
    };
    await saveProductions(items);
    revalidateSite();
  }
  redirect("/admin/productions?saved=1");
}

export async function addProductionImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const file = formData.get("file");
  const alt = String(formData.get("alt") || "").trim();

  if (isRealFile(file)) {
    const items = await getProductions();
    const idx = items.findIndex((p) => p.id === id);
    if (idx >= 0) {
      const src = await saveUploadedImage(file, "productions");
      items[idx].images.push({ src, alt: alt || items[idx].nom });
      await saveProductions(items);
      revalidateSite();
    }
  }
  redirect("/admin/productions?saved=1");
}

export async function removeProductionImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const src = String(formData.get("src") || "");
  const items = await getProductions();
  const idx = items.findIndex((p) => p.id === id);
  if (idx >= 0) {
    items[idx].images = items[idx].images.filter((img) => img.src !== src);
    await saveProductions(items);
    revalidateSite();
  }
  redirect("/admin/productions?saved=1");
}
