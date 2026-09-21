"use server";

import { redirect } from "next/navigation";
import { getPackagingProcessSteps, upsertPackagingProcessStep, deletePackagingProcessStep } from "@/lib/data";
import { revalidateSite } from "@/lib/revalidate";

export async function saveProcessStep(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  const existing = id ? (await getPackagingProcessSteps()).find((s) => s.id === id) : undefined;
  const ordreRaw = Number(formData.get("ordreAffichage"));

  await upsertPackagingProcessStep({
    id: id || undefined,
    titre: String(formData.get("titre") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    ordreAffichage: Number.isFinite(ordreRaw) && ordreRaw > 0 ? ordreRaw : existing?.ordreAffichage,
    actif: formData.get("actif") === "on",
  });

  revalidateSite();
  redirect("/admin/packaging-process?saved=1");
}

export async function deleteProcessStepAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") || "");
  await deletePackagingProcessStep(id);
  revalidateSite();
  redirect("/admin/packaging-process?saved=1");
}
