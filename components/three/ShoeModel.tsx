"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const Hotspot = ({ position, title, description, active, onClick }: any) => {
  return (
    <Html position={position} center distanceFactor={8}>
      <div className="relative group">
        <button
          onClick={onClick}
          className={cn(
            "w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center",
            active
              ? "bg-neon-pink border-white scale-125 shadow-[0_0_20px_rgba(255,51,102,0.9)]"
              : "bg-white/20 border-white/60 hover:bg-neon-green hover:border-white hover:scale-110"
          )}
        >
          <div className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-white" : "bg-white/50")} />
        </button>
        {active && (
          <div className="absolute left-7 top-1/2 -translate-y-1/2 w-52 glass p-4 rounded-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <h4 className="text-xs font-archivo text-neon-green mb-1 tracking-widest uppercase">{title}</h4>
            <p className="text-[10px] text-white/70 leading-snug">{description}</p>
          </div>
        )}
      </div>
    </Html>
  );
};

export const ShoeModel = () => {
  const group = useRef<THREE.Group>(null);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // We load the shoe model directly from a public URL so you don't have to download it locally!
  const { scene } = useGLTF("https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");

  // Gentle floating animation
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.25;
    group.current.position.y = Math.sin(t * 0.8) * 0.06 - 0.2; // Adjusted height for the model
  });

  return (
    <group ref={group} dispose={null} scale={8}>
      {/* 
        This is a pre-made photorealistic shoe model.
        Using the cloned scene to adjust its rotation and shading.
      */}
      <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />

      {/* ===== HOTSPOTS repositioned for this specific model ===== */}
      <Hotspot
        position={[0.1, 0.02, 0.12]}
        title="CUSTOM FIT LACES"
        description="Premium woven laces for a secure and adaptive fit."
        active={activeHotspot === 0}
        onClick={() => setActiveHotspot(activeHotspot === 0 ? null : 0)}
      />
      <Hotspot
        position={[-0.05, -0.05, 0]}
        title="AIR-GLOW SOLE"
        description="Advanced foam compound for 360° impact absorption."
        active={activeHotspot === 1}
        onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
      />
      <Hotspot
        position={[-0.15, 0.05, 0]}
        title="HEEL SUPPORT"
        description="Reinforced heel counter for lateral stability."
        active={activeHotspot === 2}
        onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
      />
    </group>
  );
};

// Preload the model so it displays faster
useGLTF.preload("https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb");
