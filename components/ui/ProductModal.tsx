"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Zap, ShieldCheck, Truck } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  if (!product) return null;

  const imageUrl = product.image_url || "/products/nebula-g1.png";
  const availableSizes = product.sizes?.filter((s) => s.stock > 0) ?? [];

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl glass border border-white/10 rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-[160] p-3 glass rounded-full hover:bg-neon-pink transition-colors"
          >
            <X size={24} />
          </button>

          {/* Left: Image */}
          <div className="relative h-[400px] lg:h-full bg-white/5 flex items-center justify-center p-12">
            <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 to-transparent" />
            <div className="relative w-full h-full transform -rotate-12">
              <Image src={imageUrl} alt={product.name} fill unoptimized className="object-contain" />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="p-8 md:p-16 flex flex-col gap-8 overflow-y-auto max-h-[80vh] lg:max-h-none">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-archivo tracking-[0.3em] text-neon-green border border-neon-green/30 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-[10px] font-archivo tracking-[0.3em] text-white/40 border border-white/20 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-archivo leading-none tracking-tighter uppercase">
                {product.name}
              </h2>
              <p className="text-2xl font-archivo text-white/90">{product.price} Birr</p>
            </div>

            {product.description && (
              <p className="text-sm text-white/50 leading-relaxed max-w-md italic">
                &quot;{product.description}&quot;
              </p>
            )}

            {/* Dynamic Size Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-archivo tracking-[0.3em] text-white/50">SELECT SIZE</h4>
                {selectedSize && (
                  <span className="text-xs text-neon-green">Size {selectedSize} selected</span>
                )}
              </div>

              {availableSizes.length === 0 ? (
                <p className="text-white/30 text-sm py-4 text-center border border-white/10 rounded-xl">
                  Out of Stock
                </p>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {product.sizes?.map((s, i) => {
                    const sizeLabel = String(s.size);
                    const inStock = s.stock > 0;
                    const isSelected = selectedSize === sizeLabel;
                    return (
                      <button
                        key={i}
                        disabled={!inStock}
                        onClick={() => setSelectedSize(sizeLabel)}
                        className={cn(
                          "h-14 rounded-xl border font-archivo text-sm transition-all focus:outline-none",
                          isSelected
                            ? "bg-neon-green text-black border-white shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                            : inStock
                            ? "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                            : "glass border-white/5 text-white/20 cursor-not-allowed line-through"
                        )}
                      >
                        {sizeLabel}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                disabled={!selectedSize || availableSizes.length === 0}
                onClick={handleAddToCart}
                className={cn(
                  "w-full py-6 font-archivo text-xs tracking-[0.4em] rounded-[1.25rem] flex items-center justify-center gap-4 transition-all",
                  selectedSize
                    ? "bg-neon-green text-black hover:scale-[1.02] active:scale-95"
                    : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                )}
              >
                {availableSizes.length === 0
                  ? "OUT OF STOCK"
                  : selectedSize
                  ? "ADD TO BAG"
                  : "SELECT SIZE TO PROCEED"}
                <ShoppingCart size={18} />
              </button>

              <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5 mt-4">
                <div className="flex flex-col items-center gap-2 text-center">
                  <ShieldCheck size={16} className="text-neon-green" />
                  <span className="text-[8px] font-archivo tracking-widest text-white/30 uppercase">Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck size={16} className="text-neon-green" />
                  <span className="text-[8px] font-archivo tracking-widest text-white/30 uppercase">Free Ship</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Zap size={16} className="text-neon-green" />
                  <span className="text-[8px] font-archivo tracking-widest text-white/30 uppercase">Instant Pay</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
