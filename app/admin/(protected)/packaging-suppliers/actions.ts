"use server";

import { redirect } from "next/navigation";
import { upsertPackagingSupplier, deletePackagingSupplier } from "@/lib/data";
import { revalidateSite } from "@/lib/revalidate";

export async function saveSupplier(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");

  await upsertPackagingSupplier({
    id: id || undefined,
    nom: String(formData.get("nom") || "").trim(),
    specialite: String(formData.get("specialite") || "").trim() || null,
    contact: String(formData.get("contact") || "").trim() || null,
    telephone: String(formData.get("telephone") || "").trim() || null,
    email: String(formData.get("email") || "").trim() || null,
    adresse: String(formData.get("adresse") || "").trim() || null,
    notes: String(formData.get("notes") || "").trim() || null,
    actif: formData.get("actif") === "on",
  });

  revalidateSite();
  redirect("/admin/packaging-suppliers?saved=1");
}

export async function deleteSupplierAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deletePackagingSupplier(id);
  revalidateSite();
  redirect("/admin/packaging-suppliers?saved=1");
}
