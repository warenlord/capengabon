"use server";

import { saveContactSubmission } from "@/lib/data";
import type { FormState } from "@/lib/form-state";

export async function submitContact(_prevState: FormState, formData: FormData): Promise<FormState> {
  if (String(formData.get("site_web") || "").trim() !== "") {
    return { status: "success" };
  }

  const nom = String(formData.get("nom") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const telephone = String(formData.get("telephone") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!nom || !message) {
    return { status: "error", message: "Merci de renseigner au minimum votre nom et votre message." };
  }
  if (!telephone && !whatsapp && !email) {
    return { status: "error", message: "Merci de renseigner au moins un moyen de vous recontacter (téléphone, WhatsApp ou e-mail)." };
  }

  await saveContactSubmission({
    intent: String(formData.get("intent") || "").trim(),
    nom,
    prenom: String(formData.get("prenom") || "").trim(),
    entreprise: String(formData.get("entreprise") || "").trim(),
    telephone,
    whatsapp,
    email,
    message,
  });

  return {
    status: "success",
    message: "Votre message a bien été transmis à CAPEN. Notre équipe reviendra vers vous dans les meilleurs délais.",
  };
}
