"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkAdminPassword, buildSessionCookieValue, ADMIN_COOKIE_NAME } from "@/lib/auth";
import type { FormState } from "@/lib/form-state";

export async function login(_prevState: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") || "");

  if (!process.env.ADMIN_PASSWORD) {
    return {
      status: "error",
      message: "Aucun mot de passe administrateur n'est configuré (variable ADMIN_PASSWORD).",
    };
  }

  if (!checkAdminPassword(password)) {
    return { status: "error", message: "Mot de passe incorrect." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, buildSessionCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
