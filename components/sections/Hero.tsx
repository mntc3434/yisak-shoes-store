"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Zap, Clock } from "lucide-react";

// Dynamically import ShoeScene to avoid SSR issues with Three.js
const ShoeScene = dynamic(() => import("../three/ShoeScene"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 border-t-2 border-neon-green rounded-full animate-spin" />
    </div>
  )
});

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full pt-20 overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12">
        {/* Left: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full w-fit">
            <Zap size={14} className="text-neon-green" />
            <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
              Limited Edition Series 01
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-archivo leading-[0.9] tracking-tighter">
            THE NEXT <br />
            <span className="text-neon-green neon-text-green italic">GEN</span> OF <br />
            STREET <span className="text-white">TECH</span>
          </h1>

          <p className="max-w-md text-white/50 font-inter text-lg">
            Experience footwear like never before. Interactive 3D design, 
            neon-glow tech, and exclusive drops for the bold.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <button className="group px-8 py-4 bg-neon-green text-black font-bold tracking-widest rounded-lg flex items-center gap-3 hover:scale-105 transition-all">
              EXPLORE DROPS
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-white/20 glass font-bold tracking-widest rounded-lg hover:bg-white/10 transition-colors">
              VIEW CATALOG
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-1">
              <span className="text-neon-pink font-archivo text-xl">4.9/5</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Rating</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white font-archivo text-xl">12k+</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Sold</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-neon-green font-archivo text-xl">99+</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest">Drops</span>
            </div>
          </div>
        </motion.div>

        {/* Right: 3D Scene */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-full w-full flex items-center justify-center min-h-[500px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neon-green/5 to-transparent rounded-full" />
          <ShoeScene />
        </motion.div>
      </div>

      {/* Side Watermark */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 rotate-90 opacity-5 pointer-events-none">
        <span className="text-[180px] font-archivo leading-none select-none">YISAK</span>
      </div>
    </section>
  );
};

export default Hero;
