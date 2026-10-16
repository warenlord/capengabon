import Link from "next/link";

export default function CampaignBanner() {
  return (
    <Link
      href="/nos-produits/sacs-de-tubercules"
      className="block bg-capen-earth-700 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-capen-earth-800"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span aria-hidden="true">🗓️</span>
        <span>
          Tous les samedis : <strong className="font-semibold">5 sacs de tubercules</strong> à{" "}
          <strong className="font-semibold">30 000 FCFA</strong> le sac
        </span>
        <span className="underline underline-offset-2">Réserver le vôtre →</span>
      </span>
    </Link>
  );
}
