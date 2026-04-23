"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../ui/ProductCard";
import { ProductModal } from "../ui/ProductModal";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const CATEGORIES = ["ALL", "STREET", "RUNNING", "LIMITED", "CASUAL", "SPORTS"];

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    activeCategory === "ALL"
      ? products
      : products.filter((p) => p.category.toUpperCase() === activeCategory);

  return (
    <section id="shop" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 px-4">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl font-archivo leading-none tracking-tighter"
          >
            TRENDING <br />
            <span className="text-neon-green neon-text-green italic">COLLECTION</span>
          </motion.h2>
          <p className="text-white/40 text-sm mt-4">
            {products.length} product{products.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="flex flex-wrap gap-4 py-2 border-b border-white/10 w-full md:w-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 text-[10px] font-archivo tracking-[0.2em] transition-all relative overflow-hidden",
                activeCategory === cat ? "text-neon-green" : "text-white/40 hover:text-white"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green shadow-[0_0_10px_rgba(0,255,136,0.5)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 text-white/30">
          <p className="text-4xl font-archivo tracking-tighter mb-4">NO PRODUCTS</p>
          <p className="text-sm">No products found in this category.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} onClick={setSelectedProduct} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      {/* Explore More CTA */}
      <div className="mt-20 text-center">
        <button className="group relative px-12 py-6 overflow-hidden rounded-full border border-white/20 glass hover:border-neon-green transition-all">
          <div className="absolute inset-0 bg-neon-green translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative z-10 font-archivo text-xs tracking-[0.3em] group-hover:text-black transition-colors">
            EXPLORE FULL CATALOG
          </span>
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;
