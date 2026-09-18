"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { submitContact } from "./actions";
import { initialFormState } from "@/lib/form-state";

const INTENTS = [
  { value: "achat", label: "Acheter des produits" },
  { value: "batons-manioc", label: "Commander des bâtons de manioc" },
  { value: "production-specifique", label: "Demander une production spécifique" },
  { value: "rejoindre", label: "Rejoindre CAPEN" },
  { value: "partenariat", label: "Proposer un partenariat" },
  { value: "information", label: "Obtenir des informations" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full sm:w-auto">
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
    </button>
  );
}

export default function ContactForm({ defaultIntent: forcedIntent }: { defaultIntent?: string } = {}) {
  const [state, formAction] = useActionState(submitContact, initialFormState);
  const searchParams = useSearchParams();
  const defaultIntent = forcedIntent ?? searchParams.get("intent") ?? "";

  if (state.status === "success") {
    return (
      <div className="rounded-card bg-capen-green-50 p-8 text-center ring-1 ring-capen-green-200">
        <p className="font-display text-xl font-semibold text-capen-green-800">Message envoyé</p>
        <p className="mt-3 text-capen-green-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="site_web">Site web</label>
        <input type="text" id="site_web" name="site_web" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="intent" className="field-label">Je souhaite *</label>
        <select id="intent" name="intent" required defaultValue={defaultIntent} className="field-input">
          <option value="" disabled>
            Choisissez un motif de contact
          </option>
          {INTENTS.map((intent) => (
            <option key={intent.value} value={intent.value}>
              {intent.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="field-label">Nom *</label>
          <input id="nom" name="nom" type="text" required className="field-input" />
        </div>
        <div>
          <label htmlFor="prenom" className="field-label">Prénom</label>
          <input id="prenom" name="prenom" type="text" className="field-input" />
        </div>
      </div>

      <div>
        <label htmlFor="entreprise" className="field-label">Entreprise / organisation</label>
        <input id="entreprise" name="entreprise" type="text" className="field-input" />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="telephone" className="field-label">Téléphone</label>
          <input id="telephone" name="telephone" type="tel" className="field-input" />
        </div>
        <div>
          <label htmlFor="whatsapp" className="field-label">WhatsApp</label>
          <input id="whatsapp" name="whatsapp" type="tel" className="field-input" />
        </div>
        <div>
          <label htmlFor="email" className="field-label">E-mail</label>
          <input id="email" name="email" type="email" className="field-input" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="field-label">Message *</label>
        <textarea id="message" name="message" rows={5} required className="field-input resize-none" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
