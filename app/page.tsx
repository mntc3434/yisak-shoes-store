import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import TrendingProducts from "@/components/sections/TrendingProducts";
import { NextDrop } from "@/components/sections/NextDrop";
import { TikTokTrending } from "@/components/sections/TikTokTrending";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-neon-green selection:text-black">
      <Navbar />
      
      <Hero />

      <TrendingProducts />

      <NextDrop />

      <TikTokTrending />

      <Footer />
    </main>
  );
}
