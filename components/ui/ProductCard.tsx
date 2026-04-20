"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

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
          {product.isNew && (
            <div className="absolute top-4 left-4 z-10 bg-neon-green text-black px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              NEW DROP
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
                src={product.image}
                alt={product.name}
                fill
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
              <div className="flex gap-1">
                {product.colors.map((color, i) => (
                  <div key={i} className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] glass rounded-2xl border border-neon-green overflow-hidden flex flex-col p-8 justify-between">
          <div>
            <h3 className="font-archivo text-2xl text-neon-green mb-4">{product.name}</h3>
            <p className="text-white/60 text-xs mb-8 leading-relaxed italic">
              "{product.description}"
            </p>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">TECH SPECS</span>
              <ul className="space-y-2">
                {product.tech.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-white/80">
                    <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
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
