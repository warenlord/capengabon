import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import type { GalleryImage } from "@/lib/types";

export default function TerrainPreview({ photos }: { photos: GalleryImage[] }) {
  const selection = photos.slice(0, 8);

  return (
    <section id="terrain" className="section-y bg-capen-paper">
      <div className="container-capen">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal className="max-w-xl">
            <p className="eyebrow">CAPEN sur le terrain</p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
              Le travail réel, en images
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link href="/actualites#terrain" className="btn-secondary">
              Voir toute la galerie
            </Link>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-10">
          <Gallery photos={selection.map((p) => ({ src: p.src, alt: p.alt, categorie: p.categorie }))} />
        </Reveal>
      </div>
    </section>
  );
}
