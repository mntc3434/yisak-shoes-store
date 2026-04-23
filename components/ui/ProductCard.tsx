"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const imageUrl = product.image_url || "/products/nebula-g1.png";
  const totalStock = product.sizes?.reduce((sum, s) => sum + s.stock, 0) ?? 0;

  return (
    <div
      className="relative w-full h-[450px] [perspective:1000px] group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => onClick(product)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] glass rounded-2xl border border-white/10 overflow-hidden group-hover:neon-border transition-all flex flex-col">
          {/* Badge */}
          {totalStock === 0 && (
            <div className="absolute top-4 left-4 z-10 bg-white/10 text-white/60 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              SOLD OUT
            </div>
          )}

          {/* Pricing */}
          <div className="absolute top-4 right-4 z-10 font-archivo text-xl text-white/90">
            {product.price} Birr
          </div>

          {/* Image */}
          <div className="relative flex-1 flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-radial from-neon-green/5 to-transparent opacity-50" />
            <div className="relative w-full h-full transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>

          {/* Plus Icon Hover */}
          <div className="absolute bottom-24 right-6 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
            <div className="p-4 bg-neon-green text-black rounded-full shadow-[0_0_20px_rgba(0,255,136,0.6)]">
              <Plus size={20} />
            </div>
          </div>

          {/* Info */}
          <div className="p-6 bg-white/5 border-t border-white/10">
            <h3 className="font-archivo text-xl leading-none mb-2 tracking-tight group-hover:text-neon-green transition-colors">
              {product.name}
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                {product.category} COLLECTION
              </span>
              <span className="text-[10px] text-white/30">
                {product.brand}
              </span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass rounded-2xl border border-neon-green overflow-hidden flex flex-col p-8 justify-between">
          <div>
            <h3 className="font-archivo text-2xl text-neon-green mb-1">{product.name}</h3>
            <p className="text-white/40 text-xs mb-4">{product.brand}</p>
            <p className="text-white/60 text-xs mb-8 leading-relaxed italic">
              &quot;{product.description}&quot;
            </p>

            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                  AVAILABLE SIZES
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <span
                      key={i}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] border font-bold",
                        s.stock > 0
                          ? "border-neon-green/40 text-neon-green/80"
                          : "border-white/10 text-white/20 line-through"
                      )}
                    >
                      {s.size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="w-full py-4 bg-neon-green text-black font-archivo text-xs tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
            VIEW DETAILS
            <Plus size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
