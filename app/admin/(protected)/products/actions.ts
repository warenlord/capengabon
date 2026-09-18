"use server";

import { redirect } from "next/navigation";
import { getProducts, saveProducts, upsertProduct, deleteProduct } from "@/lib/data";
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

export async function saveProduct(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const nom = String(formData.get("nom") || "").trim();
  const providedSlug = String(formData.get("slug") || "").trim();

  await upsertProduct({
    id: id || undefined,
    nom,
    slug: providedSlug || slugify(nom),
    categorie: String(formData.get("categorie") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    format: String(formData.get("format") || "").trim() || null,
    poids: String(formData.get("poids") || "").trim() || null,
    conditionnement: String(formData.get("conditionnement") || "").trim() || null,
    disponibilite: String(formData.get("disponibilite") || "").trim() || null,
    prix: String(formData.get("prix") || "").trim() || null,
    miseEnAvant: formData.get("miseEnAvant") === "on",
    actif: formData.get("actif") === "on",
  });

  revalidateSite();
  redirect("/admin/products?saved=1");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deleteProduct(id);
  revalidateSite();
  redirect("/admin/products?saved=1");
}

export async function addProductImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const file = formData.get("file");
  const alt = String(formData.get("alt") || "").trim();

  if (isRealFile(file)) {
    const items = await getProducts();
    const idx = items.findIndex((p) => p.id === id);
    if (idx >= 0) {
      const src = await saveUploadedImage(file, "products");
      items[idx].images.push({ src, alt: alt || items[idx].nom });
      await saveProducts(items);
      revalidateSite();
    }
  }
  redirect("/admin/products?saved=1");
}

export async function removeProductImage(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const src = String(formData.get("src") || "");
  const items = await getProducts();
  const idx = items.findIndex((p) => p.id === id);
  if (idx >= 0) {
    items[idx].images = items[idx].images.filter((img) => img.src !== src);
    await saveProducts(items);
    revalidateSite();
  }
  redirect("/admin/products?saved=1");
}
