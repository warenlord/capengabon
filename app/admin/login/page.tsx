import { redirect } from "next/navigation";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/logo-capen.jpg"
            alt="CAPEN"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p className="font-display text-lg font-semibold text-white">CAPEN</p>
            <p className="text-xs text-white/50">Administration</p>
          </div>
        </div>
        <h1 className="mt-6 text-lg font-semibold text-white">Connexion</h1>
        <p className="mt-1 text-sm text-white/50">Accès réservé à l&apos;équipe CAPEN.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
