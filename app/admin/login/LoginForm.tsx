"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { initialFormState } from "@/lib/form-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-capen-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-capen-green-700 disabled:opacity-50"
    >
      {pending ? "Connexion…" : "Se connecter"}
    </button>
  );
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialFormState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">
          Mot de passe administrateur
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-white placeholder:text-white/30 focus:border-capen-green-500 focus:outline-none focus:ring-2 focus:ring-capen-green-500/30"
        />
      </div>
      {state.status === "error" && (
        <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
