export type ProdImage = {
  src: string;
  alt: string;
};

export type Production = {
  id: string;
  slug: string;
  nom: string;
  resume: string;
  description: string;
  images: ProdImage[];
  statut: string;
  ordreAffichage: number;
  actif: boolean;
};

export type Product = {
  id: string;
  nom: string;
  slug: string;
  categorie: string;
  description: string;
  images: ProdImage[];
  format: string | null;
  poids: string | null;
  conditionnement: string | null;
  disponibilite: string | null;
  prix: string | null;
  miseEnAvant: boolean;
  ordreAffichage: number;
  actif: boolean;
  dateCreation: string;
  dateModification: string;
};

export type NewsItem = {
  id: string;
  slug: string;
  titre: string;
  date: string;
  image: ProdImage | null;
  resume: string;
  contenu: string;
  galerie: ProdImage[];
  categorie: "Production" | "Coopérative" | "Événements" | "Partenariats" | "Développement";
  publie: boolean;
};

export type Partner = {
  id: string;
  nom: string;
  logo: string | null;
  siteWeb: string | null;
  description: string | null;
  ordreAffichage: number;
  actif: boolean;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  categorie: string;
  ordreAffichage: number;
};

export type SiteInfo = {
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  updatedAt: string;
};

export type ContactSubmission = {
  id: string;
  createdAt: string;
  intent: string;
  nom: string;
  prenom: string;
  entreprise: string;
  telephone: string;
  whatsapp: string;
  email: string;
  message: string;
};

export type ProductionRequestSubmission = {
  id: string;
  createdAt: string;
  nom: string;
  prenom: string;
  entreprise: string;
  telephone: string;
  whatsapp: string;
  email: string;
  culture: string;
  quantite: string;
  unite: string;
  frequence: string;
  periode: string;
  complement: string;
};
