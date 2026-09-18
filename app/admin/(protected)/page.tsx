import Link from "next/link";
import { getProductions, getProducts, getNews, getPartners, getGallery, getSiteInfo } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [productions, products, news, partners, gallery, siteInfo] = await Promise.all([
    getProductions(),
    getProducts(),
    getNews(),
    getPartners(),
    getGallery(),
    getSiteInfo(),
  ]);

  const cards = [
    { label: "Productions", value: productions.length, href: "/admin/productions" },
    { label: "Produits", value: products.length, href: "/admin/products" },
    { label: "Actualités publiées", value: news.filter((n) => n.publie).length, href: "/admin/news" },
    { label: "Photos en galerie", value: gallery.length, href: "/admin/gallery" },
    { label: "Partenaires", value: partners.length, href: "/admin/partners" },
  ];

  const missingContact = [
    !siteInfo.whatsappNumber && "Numéro WhatsApp",
    !siteInfo.email && "Adresse e-mail",
    !siteInfo.phone && "Téléphone",
  ].filter(Boolean) as string[];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Tableau de bord</h1>
      <p className="mt-1 text-sm text-white/50">Vue d&apos;ensemble du contenu du site CAPEN.</p>

      {missingContact.length > 0 && (
        <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-5">
          <p className="text-sm font-medium text-amber-300">
            Coordonnées incomplètes : {missingContact.join(", ")}.
          </p>
          <p className="mt-1 text-sm text-white/50">
            Tant que ces informations ne sont pas renseignées, les boutons correspondants sont
            masqués sur le site public.
          </p>
          <Link href="/admin/site-info" className="mt-3 inline-block text-sm font-semibold text-capen-green-400 hover:underline">
            Compléter les coordonnées →
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]"
          >
            <p className="text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-1 text-sm text-white/50">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
