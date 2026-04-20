export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Street" | "Running" | "Limited";
  image: string;
  description: string;
  tech: string[];
  colors: string[];
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "ys-nebula-g1",
    name: "YISAK NEBULA G1",
    price: 4500,
    category: "Limited",
    image: "/products/nebula-g1.png",
    description: "The peak of street-tech. Featuring holographic panels and AirGlow™ soles.",
    tech: ["AirGlow™ Sole", "Carbon Fiber Plate", "Auto-Lace Ready"],
    colors: ["#00ff88", "#000000", "#ffffff"],
    isNew: true,
  },
  {
    id: "ys-pulse-v2",
    name: "YISAK PULSE V2",
    price: 4800,
    category: "Running",
    image: "/products/pulse-v2.png",
    description: "Built for speed and comfort. Optimized for active boys who never stop.",
    tech: ["Responsive Foam", "Breathable Mesh", "GripTech™ Outsole"],
    colors: ["#ff3366", "#1a1a1a", "#ffffff"],
  },
  {
    id: "ys-storm-x",
    name: "YISAK STORM X",
    price: 5000,
    category: "Street",
    image: "/products/storm-x.png",
    description: "Aggressive styling meets ultimate durability. The storm is coming.",
    tech: ["Water-Resistant Upper", "Reinforced Heel", "Reflective Patterns"],
    colors: ["#00d4ff", "#000000"],
    isNew: true,
  },
  {
    id: "ys-phantom-pro",
    name: "YISAK PHANTOM PRO",
    price: 5500,
    category: "Limited",
    image: "/products/phantom-pro.png",
    description: "Stealth mode engaged. The most exclusive drop in the lineup.",
    tech: ["Phantom Knit", "Zero-G Cushioning", "Signed Edition"],
    colors: ["#222222", "#000000"],
  },
];
