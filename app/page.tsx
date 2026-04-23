import { createClient } from "@/lib/supabase-server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import TrendingProducts from "@/components/sections/TrendingProducts";
import { NextDrop } from "@/components/sections/NextDrop";
import { TikTokTrending } from "@/components/sections/TikTokTrending";
import Footer from "@/components/sections/Footer";
import { Product } from "@/data/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  const visibleProducts: Product[] = products || [];

  return (
    <main className="relative min-h-screen bg-background selection:bg-neon-green selection:text-black">
      <Navbar />
      <Hero />
      <TrendingProducts products={visibleProducts} />
      <NextDrop />
      <TikTokTrending />
      <Footer />
    </main>
  );
}
