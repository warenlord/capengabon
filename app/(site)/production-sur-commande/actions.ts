"use server";

import { saveProductionRequest } from "@/lib/data";
import type { FormState } from "@/lib/form-state";

export async function submitProductionRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Anti-spam honeypot: real visitors never fill this hidden field.
  if (String(formData.get("site_web") || "").trim() !== "") {
    return { status: "success" };
  }

  const nom = String(formData.get("nom") || "").trim();
  const prenom = String(formData.get("prenom") || "").trim();
  const culture = String(formData.get("culture") || "").trim();
  const telephone = String(formData.get("telephone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!nom || !culture) {
    return { status: "error", message: "Merci de renseigner au minimum votre nom et la culture recherchée." };
  }
  if (!telephone && !whatsapp && !email) {
    return { status: "error", message: "Merci de renseigner au moins un moyen de vous recontacter (téléphone, WhatsApp ou e-mail)." };
  }

  await saveProductionRequest({
    nom,
    prenom,
    entreprise: String(formData.get("entreprise") || "").trim(),
    telephone,
    whatsapp,
    email,
    culture,
    quantite: String(formData.get("quantite") || "").trim(),
    unite: String(formData.get("unite") || "").trim(),
    frequence: String(formData.get("frequence") || "").trim(),
    periode: String(formData.get("periode") || "").trim(),
    complement: String(formData.get("complement") || "").trim(),
  });

  return {
    status: "success",
    message:
      "Votre demande a bien été transmise à CAPEN. Notre équipe étudiera sa faisabilité et pourra vous recontacter pour obtenir des informations complémentaires.",
  };
}
