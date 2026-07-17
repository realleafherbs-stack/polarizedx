import Hero from "./components/home/Hero";
import FeaturedProducts from "./components/home/FeaturedProducts";
import SecondPair from "./components/home/SecondPair";
import WhyX from "./components/home/WhyX";
import RetailPitch from "./components/home/RetailPitch";
import BluePair from "./components/home/BluePair";
import { getProducts } from "../lib/products";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main>
      <Hero />
      <FeaturedProducts products={products} />
      <SecondPair />
      <WhyX />
      <RetailPitch />
      <BluePair />
    </main>
  );
}
