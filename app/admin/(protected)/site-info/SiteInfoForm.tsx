"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { updateSiteInfo } from "./actions";
import { initialFormState } from "@/lib/form-state";
import type { SiteInfo } from "@/lib/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-capen-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-capen-green-700 disabled:opacity-50"
    >
      {pending ? "Enregistrement…" : "Enregistrer"}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30";
const labelClass = "mb-1.5 block text-sm font-medium text-white/70";

export default function SiteInfoForm({ siteInfo }: { siteInfo: SiteInfo }) {
  const [state, formAction] = useActionState(updateSiteInfo, initialFormState);

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="whatsappNumber" className={labelClass}>
          Numéro WhatsApp (format international, ex : 237699000000)
        </label>
        <input id="whatsappNumber" name="whatsappNumber" type="text" defaultValue={siteInfo.whatsappNumber} className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className={labelClass}>Adresse e-mail</label>
        <input id="email" name="email" type="email" defaultValue={siteInfo.email} className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>Téléphone</label>
        <input id="phone" name="phone" type="text" defaultValue={siteInfo.phone} className={inputClass} />
      </div>
      <div>
        <label htmlFor="address" className={labelClass}>Adresse</label>
        <input id="address" name="address" type="text" defaultValue={siteInfo.address} className={inputClass} />
      </div>

      <div className="h-px bg-white/10" />
      <p className="text-sm font-medium text-white/70">Réseaux sociaux (optionnel)</p>

      <div>
        <label htmlFor="facebook" className={labelClass}>Facebook</label>
        <input id="facebook" name="facebook" type="url" defaultValue={siteInfo.socials.facebook} className={inputClass} />
      </div>
      <div>
        <label htmlFor="instagram" className={labelClass}>Instagram</label>
        <input id="instagram" name="instagram" type="url" defaultValue={siteInfo.socials.instagram} className={inputClass} />
      </div>
      <div>
        <label htmlFor="linkedin" className={labelClass}>LinkedIn</label>
        <input id="linkedin" name="linkedin" type="url" defaultValue={siteInfo.socials.linkedin} className={inputClass} />
      </div>

      {state.status !== "idle" && (
        <p className={`text-sm ${state.status === "success" ? "text-capen-green-400" : "text-red-300"}`}>
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
