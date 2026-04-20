"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ruler, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const SIZES = ["US 3", "US 4", "US 5", "US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"];

export const SizeSelector = ({ onSelect }: { onSelect: (size: string) => void }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [footLength, setFootLength] = useState("");
  const [bestFit, setBestFit] = useState<string | null>(null);

  const calculateBestFit = () => {
    const length = parseFloat(footLength);
    if (!isNaN(length) && length > 20) {
      const suggested = `US ${Math.round(length / 2 - 5)}`; // Mock formula
      setBestFit(suggested);
      setSelectedSize(suggested);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-archivo tracking-[0.3em] text-white/50">SELECT SIZE</h4>
        <button 
           className="text-[10px] font-bold text-neon-green flex items-center gap-2 group hover:neon-text-green transition-all"
           onClick={() => setFootLength("")}
        >
           <Ruler size={12} />
           SIZE GUIDE
        </button>
      </div>

      {/* Size Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {SIZES.map((size) => (
          <button
            key={size}
            onClick={() => {
              setSelectedSize(size);
              onSelect(size);
            }}
            className={cn(
              "h-14 rounded-xl border font-archivo text-sm transition-all focus:outline-none",
              selectedSize === size 
                ? "bg-neon-green text-black border-white shadow-[0_0_15px_rgba(0,255,136,0.3)]" 
                : "glass border-white/10 text-white/60 hover:border-white/30 hover:text-white",
              bestFit === size && selectedSize !== size && "border-neon-pink text-neon-pink"
            )}
          >
            {size.replace("US ", "")}
          </button>
        ))}
      </div>

      {/* Best Fit Tool */}
      <div className="p-6 glass rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-neon-green/10 rounded-full text-neon-green">
              <Info size={20} />
           </div>
           <div>
              <p className="text-xs font-bold text-white">FIND YOUR BEST FIT</p>
              <p className="text-[10px] text-white/40">Enter your foot length in cm for a suggestion.</p>
           </div>
        </div>

        <div className="flex gap-4">
           <input 
              type="number" 
              placeholder="e.g. 25.5"
              value={footLength}
              onChange={(e) => setFootLength(e.target.value)}
              className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors"
           />
           <button 
              onClick={calculateBestFit}
              className="px-6 py-3 bg-white text-black font-archivo text-[10px] tracking-widest rounded-xl hover:bg-neon-green transition-colors"
           >
              CALCULATE
           </button>
        </div>

        <AnimatePresence>
          {bestFit && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex items-center gap-3 p-3 bg-neon-green text-black rounded-lg text-[10px] font-bold"
            >
               <Check size={14} />
               WE SUGGEST {bestFit} FOR THE BEST PERFORMANCE.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
