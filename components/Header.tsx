import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/config";
import { getSiteInfo } from "@/lib/data";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const siteInfo = await getSiteInfo();
  const whatsappHref = siteInfo.whatsappNumber
    ? buildWhatsAppLink(siteInfo.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE)
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-capen-ink/10 bg-capen-cream/90 backdrop-blur supports-[backdrop-filter]:bg-capen-cream/75">
      <div className="container-capen flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/logo/logo-capen.jpg"
            alt="CAPEN — Coopérative Agropastorale et Packaging des Enfants NGADI"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className="hidden text-lg font-display font-semibold tracking-tight text-capen-ink sm:block">
            CAPEN
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-capen-ink/80 transition-colors hover:text-capen-green-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter CAPEN sur WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1fb959] transition-colors hover:bg-[#25D366]/20 sm:flex"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92C21.95 6.45 17.5 2 12.04 2Zm5.83 14.19c-.25.7-1.24 1.27-2.03 1.44-.54.11-1.24.2-3.6-.77-3.02-1.25-4.96-4.31-5.11-4.51-.15-.2-1.22-1.62-1.22-3.09s.75-2.19 1.02-2.49c.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.63.48.25.6.83 2.07.9 2.22.07.15.12.33.02.53-.09.2-.14.32-.28.5-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.15.28.68 1.12 1.46 1.82 1 .89 1.85 1.17 2.12 1.31.28.14.44.12.6-.07.17-.2.71-.83.9-1.11.19-.28.38-.24.63-.14.26.1 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.18 1.36Z" />
              </svg>
            </a>
          )}
          <Link href="/contact" className="btn-primary hidden sm:inline-flex">
            Nous contacter
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
