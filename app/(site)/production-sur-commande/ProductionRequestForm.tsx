"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitProductionRequest } from "./actions";
import { initialFormState } from "@/lib/form-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-earth w-full sm:w-auto">
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
    </button>
  );
}

export default function ProductionRequestForm() {
  const [state, formAction] = useActionState(submitProductionRequest, initialFormState);

  if (state.status === "success") {
    return (
      <div className="rounded-card bg-capen-green-50 p-8 text-center ring-1 ring-capen-green-200">
        <p className="font-display text-xl font-semibold text-capen-green-800">Demande envoyée</p>
        <p className="mt-3 text-capen-green-700">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot anti-spam field, hidden from real visitors */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="site_web">Site web</label>
        <input type="text" id="site_web" name="site_web" tabIndex={-1} autoComplete="off" />
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

      <div className="h-px bg-capen-ink/10" />

      <div>
        <label htmlFor="culture" className="field-label">Culture recherchée *</label>
        <input id="culture" name="culture" type="text" required className="field-input" placeholder="Ex : igname, piment, maïs..." />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="quantite" className="field-label">Quantité souhaitée</label>
          <input id="quantite" name="quantite" type="text" className="field-input" />
        </div>
        <div>
          <label htmlFor="unite" className="field-label">Unité</label>
          <input id="unite" name="unite" type="text" className="field-input" placeholder="kg, sacs, tonnes..." />
        </div>
        <div>
          <label htmlFor="frequence" className="field-label">Fréquence</label>
          <input id="frequence" name="frequence" type="text" className="field-input" placeholder="Ponctuelle, mensuelle..." />
        </div>
      </div>

      <div>
        <label htmlFor="periode" className="field-label">Date / période souhaitée</label>
        <input id="periode" name="periode" type="text" className="field-input" />
      </div>

      <div>
        <label htmlFor="complement" className="field-label">Informations complémentaires</label>
        <textarea id="complement" name="complement" rows={4} className="field-input resize-none" />
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
