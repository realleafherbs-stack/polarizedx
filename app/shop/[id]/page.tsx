import { notFound } from "next/navigation";
import ProductDetail, { type Review } from "../../components/shop/ProductDetail";
import { getProducts } from "../../../lib/products";

async function getReviews(productId: string): Promise<Review[]> {
  if (!process.env.CRM_URL) return [];
  try {
    const res = await fetch(
      `${process.env.CRM_URL}/api/${process.env.CRM_SITE_SLUG}/reviews?productId=${productId}`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.handle || p.id }));
}

export async function generateMetadata(props: PageProps<"/shop/[id]">) {
  const { id } = await props.params;
  const products = await getProducts();
  const product = products.find((p) => p.handle === id || p.id === id);
  if (!product) return { title: "מוצר לא נמצא" };
  const title = product.metaTitle || `${product.name} | POLARIZED-X`;
  const description = product.metaDescription || product.description;
  const ogImg = product.ogImage || product.images?.[0];
  return {
    title,
    description,
    openGraph: {
      title,
      description: description ?? undefined,
      images: ogImg ? [{ url: ogImg }] : product.images?.map((img) => ({ url: img })),
    },
  };
}

export default async function ProductPage(props: PageProps<"/shop/[id]">) {
  const { id } = await props.params;
  const products = await getProducts();
  const product = products.find((p) => p.handle === id || p.id === id);
  if (!product) notFound();

  const reviews = await getReviews(product.id);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.variantId,
    offers: {
      "@type": "Offer",
      priceCurrency: "ILS",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/shop/${product.handle || product.id}`,
      seller: { "@type": "Organization", name: "POLARIZED-X" },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail
        product={product}
        relatedProducts={
          product.relatedProductIds?.length
            ? products.filter((p) => product.relatedProductIds!.includes(p.id))
            : []
        }
        reviews={reviews}
      />
    </main>
  );
}
