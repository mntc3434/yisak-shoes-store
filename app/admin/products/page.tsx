"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Eye, EyeOff, Search } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const supabase = createClient();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [supabase]);

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ is_visible: !currentStatus })
      .eq("id", id);
    
    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, is_visible: !currentStatus } : p));
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert("Error deleting product: " + error.message);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-archivo text-white tracking-tighter uppercase">Products</h1>
          <p className="text-white/50 text-sm mt-2">Manage your inventory</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 px-6 py-3 bg-neon-green text-black font-archivo text-xs tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={16} />
          ADD PRODUCT
        </Link>
      </div>

      <div className="glass rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-neon-green transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/70">
            <thead className="text-xs uppercase bg-white/5 text-white/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-archivo tracking-widest">Product</th>
                <th className="px-6 py-4 font-archivo tracking-widest">Category</th>
                <th className="px-6 py-4 font-archivo tracking-widest">Price</th>
                <th className="px-6 py-4 font-archivo tracking-widest">Status</th>
                <th className="px-6 py-4 font-archivo tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/50">Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-white/50">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                        {product.image_url ? (
                          <Image src={product.image_url} alt={product.name} fill unoptimized className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-white/20">No Img</div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white">{product.name}</div>
                        <div className="text-xs text-white/40">{product.brand}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-[10px] bg-white/10 text-white/80 border border-white/20">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono">{product.price} Birr</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleVisibility(product.id, product.is_visible)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-colors ${
                          product.is_visible 
                            ? "bg-neon-green/10 text-neon-green border border-neon-green/30" 
                            : "bg-white/10 text-white/50 border border-white/20"
                        }`}
                      >
                        {product.is_visible ? <Eye size={12} /> : <EyeOff size={12} />}
                        {product.is_visible ? "Visible" : "Hidden"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 glass rounded-lg text-white/70 hover:text-white hover:border-white/30 transition-all"
                        >
                          <Edit2 size={16} />
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 glass rounded-lg text-red-400 hover:text-red-300 hover:border-red-400/30 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
