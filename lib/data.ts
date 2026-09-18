import { promises as fs } from "fs";
import path from "path";
import { CONTENT_DIR, SEED_CONTENT_DIR, SUBMISSIONS_DIR, IS_EXTERNAL_STORAGE } from "./storage-paths";
import type {
  Production,
  Product,
  NewsItem,
  Partner,
  GalleryImage,
  SiteInfo,
  ContactSubmission,
  ProductionRequestSubmission,
} from "./types";

/**
 * On a persistent disk (DATA_DIR set), the JSON content lives outside the
 * deployed code so admin edits survive redeploys. The first read of each
 * file seeds it from the bundled ./data folder shipped in the repo.
 */
async function ensureSeeded(file: string): Promise<void> {
  if (!IS_EXTERNAL_STORAGE) return;
  const target = path.join(CONTENT_DIR, file);
  try {
    await fs.access(target);
  } catch {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    const seed = await fs.readFile(path.join(SEED_CONTENT_DIR, file), "utf-8");
    await fs.writeFile(target, seed, "utf-8");
  }
}

async function readJson<T>(file: string): Promise<T> {
  await ensureSeeded(file);
  const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2), "utf-8");
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- Productions ----------
export async function getProductions(): Promise<Production[]> {
  const items = await readJson<Production[]>("productions.json");
  return items.sort((a, b) => a.ordreAffichage - b.ordreAffichage);
}
export async function getActiveProductions(): Promise<Production[]> {
  return (await getProductions()).filter((p) => p.actif);
}
export async function getProductionBySlug(slug: string): Promise<Production | undefined> {
  return (await getProductions()).find((p) => p.slug === slug);
}
export async function saveProductions(items: Production[]): Promise<void> {
  await writeJson("productions.json", items);
}

// ---------- Products ----------
export async function getProducts(): Promise<Product[]> {
  const items = await readJson<Product[]>("products.json");
  return items.sort((a, b) => a.ordreAffichage - b.ordreAffichage);
}
export async function getActiveProducts(): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.actif);
}
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}
export async function saveProducts(items: Product[]): Promise<void> {
  await writeJson("products.json", items);
}
export async function upsertProduct(product: Partial<Product> & { id?: string }): Promise<void> {
  const items = await getProducts();
  const now = new Date().toISOString();
  if (product.id) {
    const idx = items.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      items[idx] = { ...items[idx], ...product, dateModification: now } as Product;
    }
  } else {
    items.push({
      id: newId("prod"),
      nom: "",
      slug: "",
      categorie: "",
      description: "",
      images: [],
      format: null,
      poids: null,
      conditionnement: null,
      disponibilite: null,
      prix: null,
      miseEnAvant: false,
      ordreAffichage: items.length + 1,
      actif: true,
      dateCreation: now,
      dateModification: now,
      ...product,
    } as Product);
  }
  await saveProducts(items);
}
export async function deleteProduct(id: string): Promise<void> {
  const items = await getProducts();
  await saveProducts(items.filter((p) => p.id !== id));
}

// ---------- News ----------
export async function getNews(): Promise<NewsItem[]> {
  const items = await readJson<NewsItem[]>("news.json");
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}
export async function getPublishedNews(): Promise<NewsItem[]> {
  return (await getNews()).filter((n) => n.publie);
}
export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  return (await getNews()).find((n) => n.slug === slug);
}
export async function saveNews(items: NewsItem[]): Promise<void> {
  await writeJson("news.json", items);
}
export async function upsertNews(item: Partial<NewsItem> & { id?: string }): Promise<void> {
  const items = await getNews();
  if (item.id) {
    const idx = items.findIndex((n) => n.id === item.id);
    if (idx >= 0) items[idx] = { ...items[idx], ...item } as NewsItem;
  } else {
    items.push({
      id: newId("news"),
      slug: newId("actualite"),
      titre: "",
      date: new Date().toISOString(),
      image: null,
      resume: "",
      contenu: "",
      galerie: [],
      categorie: "Coopérative",
      publie: false,
      ...item,
    } as NewsItem);
  }
  await saveNews(items);
}
export async function deleteNews(id: string): Promise<void> {
  const items = await getNews();
  await saveNews(items.filter((n) => n.id !== id));
}

// ---------- Partners ----------
export async function getPartners(): Promise<Partner[]> {
  const items = await readJson<Partner[]>("partners.json");
  return items.sort((a, b) => a.ordreAffichage - b.ordreAffichage);
}
export async function getActivePartners(): Promise<Partner[]> {
  return (await getPartners()).filter((p) => p.actif);
}
export async function savePartners(items: Partner[]): Promise<void> {
  await writeJson("partners.json", items);
}
export async function upsertPartner(item: Partial<Partner> & { id?: string }): Promise<void> {
  const items = await getPartners();
  if (item.id) {
    const idx = items.findIndex((p) => p.id === item.id);
    if (idx >= 0) items[idx] = { ...items[idx], ...item } as Partner;
  } else {
    items.push({
      id: newId("partner"),
      nom: "",
      logo: null,
      siteWeb: null,
      description: null,
      ordreAffichage: items.length + 1,
      actif: true,
      ...item,
    } as Partner);
  }
  await savePartners(items);
}
export async function deletePartner(id: string): Promise<void> {
  const items = await getPartners();
  await savePartners(items.filter((p) => p.id !== id));
}

// ---------- Gallery ----------
export async function getGallery(): Promise<GalleryImage[]> {
  const items = await readJson<GalleryImage[]>("gallery.json");
  return items.sort((a, b) => a.ordreAffichage - b.ordreAffichage);
}
export async function saveGallery(items: GalleryImage[]): Promise<void> {
  await writeJson("gallery.json", items);
}
export async function addGalleryImage(item: Omit<GalleryImage, "id">): Promise<void> {
  const items = await getGallery();
  items.push({ id: newId("gal"), ...item });
  await saveGallery(items);
}
export async function deleteGalleryImage(id: string): Promise<void> {
  const items = await getGallery();
  await saveGallery(items.filter((g) => g.id !== id));
}

// ---------- Site info ----------
export async function getSiteInfo(): Promise<SiteInfo> {
  return readJson<SiteInfo>("site-info.json");
}
export async function saveSiteInfo(info: SiteInfo): Promise<void> {
  await writeJson("site-info.json", { ...info, updatedAt: new Date().toISOString() });
}

// ---------- Submissions ----------
async function appendSubmission<T>(file: string, entry: T): Promise<void> {
  await fs.mkdir(SUBMISSIONS_DIR, { recursive: true });
  const filePath = path.join(SUBMISSIONS_DIR, file);
  let items: T[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    items = JSON.parse(raw) as T[];
  } catch {
    items = [];
  }
  items.push(entry);
  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}

export async function saveContactSubmission(data: Omit<ContactSubmission, "id" | "createdAt">): Promise<void> {
  await appendSubmission<ContactSubmission>("contact.json", {
    id: newId("contact"),
    createdAt: new Date().toISOString(),
    ...data,
  });
}

export async function saveProductionRequest(
  data: Omit<ProductionRequestSubmission, "id" | "createdAt">
): Promise<void> {
  await appendSubmission<ProductionRequestSubmission>("production-sur-commande.json", {
    id: newId("request"),
    createdAt: new Date().toISOString(),
    ...data,
  });
}
