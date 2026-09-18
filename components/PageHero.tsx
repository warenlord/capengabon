import Image from "next/image";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-capen-green-900">
      {image && (
        <div className="absolute inset-0">
          <Image src={image} alt={imageAlt ?? ""} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-capen-ink/65" />
        </div>
      )}
      <div className="container-capen relative py-16 sm:py-20">
        <p className="eyebrow text-capen-green-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && <p className="mt-4 max-w-xl text-white/80">{description}</p>}
      </div>
    </section>
  );
}
