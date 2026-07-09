import ShopHero from "../components/shop/ShopHero";
import ShopProducts from "../components/shop/ShopProducts";
import ShopTrustBar from "../components/shop/ShopTrustBar";
import ShopRetail from "../components/shop/ShopRetail";
import { getProducts } from "../../lib/products";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <main>
      <ShopHero />
      <ShopProducts products={products} />
      <ShopTrustBar />
      <ShopRetail />
    </main>
  );
}
