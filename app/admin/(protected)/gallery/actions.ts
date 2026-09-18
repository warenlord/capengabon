"use server";

import { redirect } from "next/navigation";
import { addGalleryImage, deleteGalleryImage, getGallery } from "@/lib/data";
import { saveUploadedImage, isRealFile } from "@/lib/uploads";
import { revalidateSite } from "@/lib/revalidate";

export async function addGalleryPhoto(formData: FormData): Promise<void> {
  const file = formData.get("file");
  if (isRealFile(file)) {
    const src = await saveUploadedImage(file, "gallery");
    const items = await getGallery();
    await addGalleryImage({
      src,
      alt: String(formData.get("alt") || "").trim() || "Photo CAPEN",
      categorie: String(formData.get("categorie") || "Développement").trim(),
      ordreAffichage: items.length + 1,
    });
    revalidateSite();
  }
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryPhoto(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deleteGalleryImage(id);
  revalidateSite();
  redirect("/admin/gallery?saved=1");
}
