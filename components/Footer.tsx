import Image from "next/image";
import Link from "next/link";
import { getSiteInfo } from "@/lib/data";
import { SITE_FULL_NAME, SITE_SLOGAN, FOOTER_YEAR } from "@/lib/config";

export default async function Footer() {
  const siteInfo = await getSiteInfo();

  return (
    <footer className="border-t border-capen-ink/10 bg-capen-paper">
      <div className="container-capen grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo/logo-capen.jpg"
              alt="Logo CAPEN"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-display text-lg font-semibold text-capen-ink">CAPEN</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-capen-ink/70">{SITE_FULL_NAME}</p>
          <p className="mt-3 font-display text-base italic text-capen-green-700">{SITE_SLOGAN}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-capen-ink/65">
            Nos productions
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/nos-productions/banane" className="text-capen-ink/75 hover:text-capen-green-700">Banane</Link></li>
            <li><Link href="/nos-productions/manioc" className="text-capen-ink/75 hover:text-capen-green-700">Manioc</Link></li>
            <li><Link href="/production-sur-commande" className="text-capen-ink/75 hover:text-capen-green-700">Production sur commande</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-capen-ink/65">
            Nos produits
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/nos-produits/batons-de-manioc" className="text-capen-ink/75 hover:text-capen-green-700">Bâtons de manioc</Link></li>
            <li><Link href="/packaging" className="text-capen-ink/75 hover:text-capen-green-700">Packaging</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-capen-ink/65">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              {siteInfo.whatsappNumber ? (
                <a
                  href={`https://wa.me/${siteInfo.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-capen-ink/75 hover:text-capen-green-700"
                >
                  WhatsApp
                </a>
              ) : (
                <span className="text-capen-ink/65">WhatsApp — à venir</span>
              )}
            </li>
            <li>
              {siteInfo.email ? (
                <a href={`mailto:${siteInfo.email}`} className="text-capen-ink/75 hover:text-capen-green-700">
                  {siteInfo.email}
                </a>
              ) : (
                <span className="text-capen-ink/65">E-mail — à venir</span>
              )}
            </li>
            <li><Link href="/contact" className="text-capen-ink/75 hover:text-capen-green-700">Formulaire de contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-capen-ink/10">
        <div className="container-capen flex flex-col gap-3 py-6 text-xs text-capen-ink/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© CAPEN — {FOOTER_YEAR}</p>
          <div className="flex gap-5">
            <Link href="/mentions-legales" className="hover:text-capen-green-700">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-capen-green-700">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
