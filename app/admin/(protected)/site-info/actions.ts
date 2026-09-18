"use server";

import { getSiteInfo, saveSiteInfo } from "@/lib/data";
import { revalidateSite } from "@/lib/revalidate";
import type { FormState } from "@/lib/form-state";

export async function updateSiteInfo(_prevState: FormState, formData: FormData): Promise<FormState> {
  const current = await getSiteInfo();

  await saveSiteInfo({
    ...current,
    whatsappNumber: String(formData.get("whatsappNumber") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    address: String(formData.get("address") || "").trim(),
    socials: {
      facebook: String(formData.get("facebook") || "").trim(),
      instagram: String(formData.get("instagram") || "").trim(),
      linkedin: String(formData.get("linkedin") || "").trim(),
    },
  });

  revalidateSite();
  return { status: "success", message: "Coordonnées mises à jour." };
}
