import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { isAdminAuthenticated } from "@/lib/auth";
import { logout } from "../login/actions";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/site-info", label: "Coordonnées CAPEN" },
  { href: "/admin/productions", label: "Productions" },
  { href: "/admin/products", label: "Produits" },
  { href: "/admin/news", label: "Actualités" },
  { href: "/admin/gallery", label: "Galerie" },
  { href: "/admin/partners", label: "Partenaires" },
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col lg:flex-row">
      <aside className="shrink-0 border-b border-white/10 px-4 py-5 lg:w-64 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/logo-capen.jpg"
            alt="CAPEN"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div>
            <p className="font-display text-base font-semibold text-white">CAPEN</p>
            <p className="text-xs text-white/50">Administration</p>
          </div>
        </div>

        <nav className="mt-6 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col lg:overflow-visible">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 hidden lg:block">
          <Link href="/" className="text-xs text-white/40 hover:text-white/70">
            ← Retour au site public
          </Link>
        </div>

        <form action={logout} className="mt-4 hidden lg:block">
          <button type="submit" className="text-xs text-white/40 hover:text-red-300">
            Se déconnecter
          </button>
        </form>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 lg:px-10 lg:py-10">{children}</main>
    </div>
  );
}
