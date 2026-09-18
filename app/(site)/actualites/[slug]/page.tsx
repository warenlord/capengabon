import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import { getPublishedNews, getNewsBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const news = await getPublishedNews();
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  return { title: item.titre, description: item.resume };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item || !item.publie) notFound();

  return (
    <article className="section-y bg-capen-paper">
      <div className="container-capen max-w-3xl">
        <Link href="/actualites" className="text-sm text-capen-ink/50 hover:text-capen-green-700">
          ← Toutes les actualités
        </Link>

        <Reveal>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-capen-green-600">
            {item.categorie} <span className="mx-1 text-capen-ink/30">·</span> {formatDate(item.date)}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-capen-ink sm:text-4xl">
            {item.titre}
          </h1>
        </Reveal>

        {item.image && (
          <Reveal delay={80} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-card">
            <Image src={item.image.src} alt={item.image.alt} fill sizes="800px" className="object-cover" priority />
          </Reveal>
        )}

        <Reveal delay={140} className="mt-8 max-w-none text-[17px] leading-relaxed text-capen-ink/80">
          {item.contenu.split("\n").map((paragraphe, i) => (
            <p key={i} className="mb-4">{paragraphe}</p>
          ))}
        </Reveal>

        {item.galerie.length > 0 && (
          <Reveal delay={180} className="mt-10">
            <Gallery photos={item.galerie} />
          </Reveal>
        )}
      </div>
    </article>
  );
}
