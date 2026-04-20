"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Play, MessageCircle, Share2, MoreHorizontal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TikTokPosts = [
  { id: 1, image: "/tiktok/cover-1.png", likes: "124.5k", music: "Yisak Beats - Original" },
  { id: 2, image: "/tiktok/cover-2.png", likes: "89.2k", music: "Street Soul - LoFi" },
  { id: 3, image: "/tiktok/cover-3.png", likes: "245.0k", music: "Night Drive - Techno" },
  { id: 4, image: "/tiktok/cover-4.png", likes: "56.7k", music: "Yisak x DJ - Mix" },
];

const TikTokCard = ({ post }: { post: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative aspect-[9/16] glass rounded-3xl border border-white/10 overflow-hidden group cursor-pointer"
      onClick={() => window.open("https://www.tiktok.com/@yisakshoesstore", "_blank")}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 z-10" />
      
      {/* Thumbnail */}
      <div className="relative w-full h-full">
         <div className="absolute inset-0 bg-neon-green/5 animate-pulse" />
         <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700">
            <Image
              src={post.image}
              alt="TikTok Post"
              fill
              className="object-cover"
            />
         </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute inset-x-4 bottom-6 z-20 flex flex-col gap-3">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full border border-neon-green p-0.5 bg-black">
              <div className="w-full h-full relative rounded-full overflow-hidden">
                 <Image src="/logo.jpeg" alt="Avatar" fill className="object-cover" />
              </div>
           </div>
           <span className="text-xs font-bold text-white tracking-widest uppercase">@yisakshoesstore</span>
        </div>
        
        <p className="text-[10px] text-white/70 line-clamp-2 leading-tight">
           Unboxing the new Nebula G1! The most limited drop of the year. 👟🔥 #yisakshoes #streetwear 
        </p>
        
        <div className="flex items-center gap-4 text-white/50">
           <div className="flex items-center gap-1.5">
              <Play size={10} className="fill-white/50" />
              <span className="text-[8px] font-bold uppercase tracking-widest">{post.likes}</span>
           </div>
           <div className="flex items-center gap-1.5 overflow-hidden w-24">
              <div className="flex items-center gap-2 animate-scroll-text whitespace-nowrap">
                 <span className="text-[8px] uppercase tracking-widest">♫ {post.music}</span>
                 <span className="text-[8px] uppercase tracking-widest">♫ {post.music}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Right Action Icons Overlay */}
      <div className="absolute right-4 bottom-1/4 z-20 flex flex-col gap-6 text-white text-opacity-80">
         <div className="flex flex-col items-center gap-1">
            <div className="p-3 glass rounded-full bg-white/5 hover:bg-neon-pink transition-colors">
               <Heart size={20} className="fill-current" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest">124k</span>
         </div>
         <div className="flex flex-col items-center gap-1">
            <div className="p-3 glass rounded-full bg-white/5 hover:bg-neon-blue transition-colors">
               <MessageCircle size={20} className="fill-current" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest">4.5k</span>
         </div>
         <div className="flex flex-col items-center gap-1">
            <div className="p-3 glass rounded-full bg-white/5 hover:bg-neon-green transition-colors">
               <Share2 size={20} className="fill-current" />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest">80k</span>
         </div>
         <div className="p-3">
            <MoreHorizontal size={20} />
         </div>
      </div>

      {/* Play Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
         <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
            <Play size={32} className="text-white fill-white ml-1" />
         </div>
      </div>
    </motion.div>
  );
};

export const TikTokTrending = () => {
  return (
    <section id="trending" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-16">
         <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-6 bg-black border border-white/10 px-4 py-2 rounded-xl">
               <div className="w-8 h-8 relative rounded-lg overflow-hidden border border-neon-green">
                  <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs font-archivo text-white tracking-widest">YISAK SHOES</span>
                  <span className="text-[8px] font-bold text-white/50 tracking-widest">@YISAKSHOESSTORE</span>
               </div>
            </div>
            <h2 className="text-4xl md:text-7xl font-archivo leading-none tracking-tighter">
               TRENDING ON <br />
               <span className="text-neon-blue italic">TIKTOK</span>
            </h2>
         </div>
         
         <a href="https://www.tiktok.com/@yisakshoesstore" target="_blank" rel="noopener noreferrer" className="px-10 py-5 glass border border-white/10 text-xs font-archivo tracking-[0.3em] rounded-2xl hover:border-neon-blue transition-all flex items-center gap-4 group cursor-pointer">
            FOLLOW US
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
         </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {TikTokPosts.map((post) => (
            <TikTokCard key={post.id} post={post} />
         ))}
      </div>
    </section>
  );
};

// Next.js config for the custom animation in layout-text
// (Add to globals.css)
