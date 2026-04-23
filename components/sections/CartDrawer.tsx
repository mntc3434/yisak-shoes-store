"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[110] w-full max-w-md h-full glass border-l border-white/10 flex flex-col"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag className="text-neon-green" />
                <h2 className="text-2xl font-archivo tracking-tighter">YOUR BAG</h2>
                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-bold">
                  {totalItems} ITEMS
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6 opacity-30">
                  <ShoppingBag size={80} />
                  <p className="font-archivo text-xl">YOUR BAG IS EMPTY</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group">
                    <div className="relative w-24 h-24 glass rounded-xl border border-white/10 flex-shrink-0 p-2">
                      <Image src={item.image_url ?? ""} alt={item.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                         <div className="flex justify-between">
                            <h3 className="font-archivo text-sm text-neon-green">{item.name}</h3>
                            <button 
                               onClick={() => removeFromCart(item.id, item.selectedSize)}
                               className="text-white/20 hover:text-neon-pink transition-colors"
                            >
                               <Trash2 size={16} />
                            </button>
                         </div>
                         <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">
                            SIZE: {item.selectedSize} • {item.category}
                         </p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                         <div className="flex items-center gap-3 bg-white/5 rounded-lg border border-white/10 px-2">
                            <button 
                               onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                               className="p-1 hover:text-neon-green"
                            >
                               <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                               onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                               className="p-1 hover:text-neon-green"
                            >
                               <Plus size={14} />
                            </button>
                         </div>
                         <span className="font-archivo text-lg">{item.price * item.quantity} Birr</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/10 glass">
                <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-white/50 text-xs">
                      <span>SUBTOTAL</span>
                      <span className="text-white">{totalPrice} Birr</span>
                   </div>
                   <div className="flex justify-between text-white/50 text-xs">
                      <span>STREET-SHIPPING</span>
                      <span className="text-neon-green">FREE</span>
                   </div>
                   <div className="flex justify-between text-xl font-archivo border-t border-white/5 pt-4">
                      <span>TOTAL</span>
                      <span className="text-neon-green neon-text-green">{totalPrice} Birr</span>
                   </div>
                </div>
                
                <button className="w-full py-6 bg-neon-green text-black font-archivo text-xs tracking-[0.3em] rounded-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition-all">
                   INSTANT CHECKOUT
                   <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
