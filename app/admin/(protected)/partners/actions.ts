"use server";

import { redirect } from "next/navigation";
import { getPartners, upsertPartner, deletePartner } from "@/lib/data";
import { saveUploadedImage, isRealFile } from "@/lib/uploads";
import { revalidateSite } from "@/lib/revalidate";

export async function savePartner(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const logoFile = formData.get("logo");

  let logo: string | null = null;
  if (id) {
    const existing = (await getPartners()).find((p) => p.id === id);
    logo = existing?.logo ?? null;
  }
  if (isRealFile(logoFile)) {
    logo = await saveUploadedImage(logoFile, "partners");
  }

  await upsertPartner({
    id: id || undefined,
    nom: String(formData.get("nom") || "").trim(),
    siteWeb: String(formData.get("siteWeb") || "").trim() || null,
    description: String(formData.get("description") || "").trim() || null,
    logo,
    actif: formData.get("actif") === "on",
  });

  revalidateSite();
  redirect("/admin/partners?saved=1");
}

export async function deletePartnerAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deletePartner(id);
  revalidateSite();
  redirect("/admin/partners?saved=1");
}
