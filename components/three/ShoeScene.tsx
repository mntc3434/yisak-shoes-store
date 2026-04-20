"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera,
} from "@react-three/drei";
import { ShoeModel } from "./ShoeModel";

export default function ShoeScene() {
  return (
    <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[3, 1, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          shadow-mapSize={[512, 512]} 
          castShadow 
        />
        
        {/* Neon Point Lights for Glow */}
        <pointLight position={[-1, 1, 3]} intensity={2} color="#00ff88" />
        <pointLight position={[2, -1, 3]} intensity={2} color="#ff3366" />
        <pointLight position={[0, 0, -2]} intensity={1} color="#00d4ff" />

        <Suspense fallback={null}>
          <ShoeModel />
          <Environment preset="night" />
        </Suspense>

        <ContactShadows 
          position={[0, -0.8, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2.4} 
          far={0.8} 
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.5} 
        />
      </Canvas>
    </div>
  );
}
