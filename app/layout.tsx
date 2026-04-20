import type { Metadata } from "next";
import { Inter, Archivo_Black } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Yisak Shoes Store | Premium Boys' Footwear",
  description: "Exclusive sneaker collection for boys. Interactive 3D shoe viewer, limited drops, and trending street styles.",
  keywords: ["shoes", "boys shoes", "sneakers", "streetwear", "Yisak Shoes", "3D interactive"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="antialiased selection:bg-neon-green selection:text-black">
        <CartProvider>
          <div className="noise-bg" />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
