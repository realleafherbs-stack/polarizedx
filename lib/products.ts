export interface StoreProduct {
  id: string;
  handle: string;
  name: string;
  badge?: string;
  color?: string;
  material?: string;
  price: number;
  variantId: string;
  thumbnail?: string | null;
  images?: string[];
  description?: string;
  features?: string[];
  cardFeatures?: string[];
  variants: { id: string; title?: string; price?: number }[];
  options?: { id: string; title: string; value?: string }[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  videoUrl?: string | null;
  soldCount?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  specsRaw?: string | null;
  inTheBox?: string | null;
  usageInstructions?: string | null;
  warrantyInfo?: string | null;
  faqRaw?: string | null;
  relatedProductIds?: string[];
}

export const SHIPPING_FEE = 29;
export const FREE_SHIPPING_THRESHOLD = 199;

interface CrmProduct {
  id: string;
  handle: string;
  name: string;
  price: number;
  description?: string;
  badge?: string;
  image?: string;
  images?: string[];
  payperSku?: string;
  cardFeatures?: string[];
  features?: string[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  videoUrl?: string;
  soldCount?: string;
  rating?: number;
  reviewCount?: number;
  specsRaw?: string;
  inTheBox?: string;
  usageInstructions?: string;
  warrantyInfo?: string;
  faqRaw?: string;
  relatedProductIds?: string[];
}

function toStoreProduct(p: CrmProduct): StoreProduct {
  const gallery = p.images ?? [];
  const allImages = p.image ? [p.image, ...gallery.filter((img) => img !== p.image)] : gallery;
  return {
    id: p.id,
    handle: p.handle,
    name: p.name,
    price: p.price,
    description: p.description,
    badge: p.badge,
    thumbnail: allImages[0] ?? null,
    images: allImages,
    cardFeatures: p.cardFeatures ?? [],
    features: p.features ?? [],
    variantId: p.payperSku ?? "",
    variants: [],
    metaTitle: p.metaTitle ?? null,
    metaDescription: p.metaDescription ?? null,
    ogImage: p.ogImage ?? null,
    videoUrl: p.videoUrl ?? null,
    soldCount: p.soldCount ?? null,
    rating: p.rating ?? null,
    reviewCount: p.reviewCount ?? null,
    specsRaw: p.specsRaw ?? null,
    inTheBox: p.inTheBox ?? null,
    usageInstructions: p.usageInstructions ?? null,
    warrantyInfo: p.warrantyInfo ?? null,
    faqRaw: p.faqRaw ?? null,
    relatedProductIds: p.relatedProductIds ?? [],
  };
}

export async function getProducts(): Promise<StoreProduct[]> {
  try {
    const res = await fetch(
      `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/products`,
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) }
    );
    if (!res.ok) return [];

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    return data.map(toStoreProduct);
  } catch {
    return [];
  }
}
