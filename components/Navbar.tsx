"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./sections/CartDrawer";

const NavLinks = [
  { name: "SHOP", href: "#shop" },
  { name: "DROPS", href: "#drops" },
  { name: "TRENDING", href: "#trending" },
  { name: "ABOUT", href: "#about" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
          isScrolled ? "py-4 glass border-b border-white/10" : "py-8 bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/20 group-hover:neon-border transition-all">
              <Image
                src="/logo.jpeg"
                alt="Yisak Shoes Store"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold font-archivo tracking-tighter">
              YISAK<span className="text-neon-green">SHOES</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-white/70">
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-archivo tracking-[0.2em] hover:text-neon-green transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="hover:text-neon-green transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button 
              className="relative hover:text-neon-green transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={20} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-neon-pink text-[10px] font-archivo px-1.5 py-0.5 rounded-full text-white shadow-[0_0_10px_rgba(255,51,102,0.5)]"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              className="md:hidden hover:text-neon-green"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl p-8 flex flex-col"
            >
              <div className="flex justify-end">
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={32} className="hover:text-neon-pink transition-colors" />
                </button>
              </div>
              
              <div className="flex flex-col gap-8 mt-12">
                {NavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-archivo hover:text-neon-green transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
                <p className="text-white/50 text-sm">FOLLOW THE TREND</p>
                <div className="flex gap-6">
                  <span className="text-neon-green font-bold">TIKTOK</span>
                  <span className="text-neon-pink font-bold">INSTAGRAM</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
