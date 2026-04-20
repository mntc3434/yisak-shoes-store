"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bell, Zap } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const NextDrop = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 7, hours: 12, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        return prev; // Simplified for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="drops" className="relative py-32 overflow-hidden border-y border-white/5 bg-black">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-pink/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left: Product Preview */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="relative group"
        >
          <div className="absolute -inset-4 bg-neon-pink/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative glass h-[500px] rounded-3xl border border-white/10 flex items-center justify-center p-12 overflow-hidden">
             <div className="absolute top-8 left-8 flex items-center gap-2">
                <Zap size={16} className="text-neon-pink" />
                <span className="text-[10px] font-archivo tracking-widest text-white/50 uppercase">ULTRA LIMITED DROP</span>
             </div>
             
             {/* We'll use the Nebula G1 as a placeholder for the drop */}
             <div className="relative w-full h-full transform -rotate-12 group-hover:scale-110 transition-transform duration-700">
                <Image
                  src="/products/nebula-g1.png"
                  alt="Next Drop"
                  fill
                  className="object-contain"
                />
             </div>
          </div>
        </motion.div>

        {/* Right: Countdown & CTA */}
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-8xl font-archivo leading-none tracking-tighter">
              BEYOND <br />
              <span className="text-neon-pink neon-text-pink italic">LIMITS</span>
            </h2>
            <p className="text-white/40 font-inter text-lg max-w-md">
              The Yisak 'Void' Edition. Only 500 pairs worldwide. 
              Be ready for the most exclusive drop of 2026.
            </p>
          </div>

          {/* Timer Grid */}
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HRS", value: timeLeft.hours },
              { label: "MIN", value: timeLeft.minutes },
              { label: "SEC", value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label} className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square glass rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                   <span className="text-3xl md:text-5xl font-archivo text-white">
                      {unit.value.toString().padStart(2, '0')}
                   </span>
                </div>
                <span className="text-[10px] font-archivo tracking-[0.3em] text-white/30">{unit.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="flex-1 py-6 bg-white text-black font-archivo text-xs tracking-[0.2em] rounded-xl hover:bg-neon-pink hover:text-white transition-all flex items-center justify-center gap-3">
              NOTIFY ME <Bell size={16} />
            </button>
            <button className="flex-1 py-6 glass border border-white/10 text-white font-archivo text-xs tracking-[0.2em] rounded-xl hover:border-white/40 transition-colors">
              VIEW SPECS
            </button>
          </div>
        </div>
      </div>

      {/* Background Text Loop */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-5 translate-y-1/2">
        <div className="text-[150px] font-archivo whitespace-nowrap animate-pulse">
           LIMTED DROP LIMITED DROP LIMITED DROP LIMITED DROP
        </div>
      </div>
    </section>
  );
};
