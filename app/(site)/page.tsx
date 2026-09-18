import Hero from "@/components/home/Hero";
import Histoire from "@/components/home/Histoire";
import ChiffresCles from "@/components/home/ChiffresCles";
import ProductionsPreview from "@/components/home/ProductionsPreview";
import ChaineValeur from "@/components/home/ChaineValeur";
import ProductsPreview from "@/components/home/ProductsPreview";
import ProductionCommandeTeaser from "@/components/home/ProductionCommandeTeaser";
import TerrainPreview from "@/components/home/TerrainPreview";
import Trajectoire from "@/components/home/Trajectoire";
import TravaillerAvecCapen from "@/components/home/TravaillerAvecCapen";
import ActualitesPreview from "@/components/home/ActualitesPreview";
import ContactTeaser from "@/components/home/ContactTeaser";
import { getActiveProductions, getActiveProducts, getPublishedNews, getGallery } from "@/lib/data";

export default async function HomePage() {
  const [productions, products, news, gallery] = await Promise.all([
    getActiveProductions(),
    getActiveProducts(),
    getPublishedNews(),
    getGallery(),
  ]);

  return (
    <>
      <Hero />
      <Histoire />
      <ChiffresCles />
      <ProductionsPreview productions={productions} />
      <ChaineValeur />
      <ProductsPreview products={products} />
      <ProductionCommandeTeaser />
      <TerrainPreview photos={gallery} />
      <Trajectoire />
      <TravaillerAvecCapen />
      <ActualitesPreview news={news} />
      <ContactTeaser />
    </>
  );
}
