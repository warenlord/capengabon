export function buildWhatsAppLink(number: string, message: string): string {
  const digitsOnly = number.replace(/[^0-9]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digitsOnly}?text=${encoded}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour CAPEN, je vous contacte depuis votre site internet et je souhaiterais obtenir des informations.";

export function productWhatsAppMessage(productName: string): string {
  return `Bonjour CAPEN, je vous contacte depuis votre site. Je souhaite commander : ${productName}.\nQuantité souhaitée : \nPouvez-vous me confirmer la disponibilité et les modalités de récupération ?`;
}

export function packagingArticleWhatsAppMessage(articleName: string): string {
  return `Bonjour CAPEN, je vous contacte depuis votre site à propos de l'article de packaging "${articleName}". Je souhaiterais connaître les modalités d'achat et/ou de location.`;
}
