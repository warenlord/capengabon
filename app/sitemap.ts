import type { MetadataRoute } from "next";
import { getActiveProductions, getActiveProducts, getPublishedNews } from "@/lib/data";
import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productions, products, news] = await Promise.all([
    getActiveProductions(),
    getActiveProducts(),
    getPublishedNews(),
  ]);

  const staticRoutes = [
    "",
    "/la-cooperative",
    "/nos-productions",
    "/nos-produits",
    "/packaging",
    "/production-sur-commande",
    "/actualites",
    "/partenaires",
    "/rejoindre-capen",
    "/contact",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const productionRoutes = productions.map((p) => ({
    url: `${SITE_URL}/nos-productions/${p.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/nos-produits/${p.slug}`,
    lastModified: new Date(p.dateModification),
  }));

  const newsRoutes = news.map((n) => ({
    url: `${SITE_URL}/actualites/${n.slug}`,
    lastModified: new Date(n.date),
  }));

  return [...staticRoutes, ...productionRoutes, ...productRoutes, ...newsRoutes];
}
