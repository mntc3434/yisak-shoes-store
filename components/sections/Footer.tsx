"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Custom SVG Icons for Brands
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
);
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const TwitchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>
);

export default function Footer() {
  return (
    <footer className="relative py-24 px-6 md:px-12 border-t border-white/5 bg-black overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute -bottom-20 -left-20 opacity-[0.02] pointer-events-none select-none">
         <span className="text-[300px] font-archivo leading-none">YISAK</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {/* Brand Info */}
        <div className="flex flex-col gap-8">
           <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 glass rounded-xl border border-white/10 overflow-hidden">
                 <Image src="/logo.jpeg" alt="Yisak" fill className="object-cover" />
              </div>
              <span className="text-2xl font-archivo text-white tracking-tighter">YISAK<span className="text-neon-pink">SHOES</span></span>
           </Link>
           <p className="text-xs text-white/40 font-inter leading-relaxed max-w-[200px]">
              EXCLUSIVE SNEAKER DROPS FOR THE NEXT GEN. STREET-TECH AESTHETICS & PREMIUM PERFORMANCE.
           </p>
           <div className="flex gap-4">
              {[InstagramIcon, TwitchIcon, YoutubeIcon, TwitterIcon].map((Icon, i) => (
                 <button key={i} className="p-3 glass rounded-full border border-white/10 hover:border-neon-green hover:text-neon-green transition-all">
                    <Icon />
                 </button>
              ))}
           </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-6">
           <h4 className="text-[10px] font-archivo tracking-[0.4em] text-white/30 uppercase">DISCOVER</h4>
           <div className="flex flex-col gap-4 text-xs font-bold text-white/60">
              <Link href="#shop" className="hover:text-neon-green flex items-center gap-2 group underline-offset-4 hover:underline">
                 THE COLLECTION <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="#drops" className="hover:text-neon-green flex items-center gap-2 group underline-offset-4 hover:underline">
                 LIMITED DROPS <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="#trending" className="hover:text-neon-green flex items-center gap-2 group underline-offset-4 hover:underline">
                 TIKTOK FEED <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
           </div>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-6">
           <h4 className="text-[10px] font-archivo tracking-[0.4em] text-white/30 uppercase">SUPPORT</h4>
           <div className="flex flex-col gap-4 text-xs font-bold text-white/60">
              <Link href="#" className="hover:text-neon-green underline-offset-4 hover:underline">SHIPPING POLICY</Link>
              <Link href="#" className="hover:text-neon-green underline-offset-4 hover:underline">RETURNS & EXCHANGES</Link>
              <Link href="#" className="hover:text-neon-green underline-offset-4 hover:underline">SIZE GUIDE</Link>
              <Link href="#" className="hover:text-neon-green underline-offset-4 hover:underline">CONTACT US</Link>
           </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-8">
           <h4 className="text-[10px] font-archivo tracking-[0.4em] text-white/30 uppercase">STAY UPDATED</h4>
           <div className="space-y-4">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">JOIN THE CREW FOR EXCLUSIVE EARLY ACCESS.</p>
              <div className="flex gap-2">
                 <input 
                    type="email" 
                    placeholder="EMAIL ADDRESS" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-archivo tracking-widest focus:outline-none focus:border-neon-pink transition-colors" 
                 />
                 <button className="px-6 py-3 bg-white text-black font-archivo text-[10px] tracking-widest rounded-xl hover:bg-neon-pink transition-all">
                    JOIN
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
         <p className="text-[8px] font-archivo tracking-[0.4em] text-white/20 uppercase">© 2026 YISAK SHOES STORE. ALL RIGHTS RESERVED.</p>
         <div className="flex gap-12 text-[8px] font-archivo tracking-[0.4em] text-white/20 uppercase">
            <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-white cursor-pointer">COOKIES</span>
         </div>
         <div className="flex items-center gap-2 px-3 py-1 glass rounded-full border border-white/10">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
            <span className="text-[8px] font-archivo tracking-[0.4em] text-white/50 animate-pulse uppercase">SYSTEMS ONLINE</span>
         </div>
      </div>
    </footer>
  );
}
