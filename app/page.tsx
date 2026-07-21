import Hero from "./components/home/Hero";
import HomeOffer from "./components/home/HomeOffer";
import Why from "./components/home/Why";
import Collection from "./components/home/Collection";
import Story from "./components/home/Story";
import Stores from "./components/home/Stores";
import B2B from "./components/home/B2B";
import Closing from "./components/home/Closing";
import { getProducts } from "../lib/products";

export default async function HomePage() {
  const products = await getProducts();
  return (
    <main>
      <Hero />
      <HomeOffer />
      <Why />
      <Collection products={products} />
      <Story />
      <Stores />
      <B2B />
      <Closing />
    </main>
  );
}
