"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SizeStock {
  size: string | number;
  stock: number;
}

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    category: initialData?.category || "Street",
    price: initialData?.price || "",
    description: initialData?.description || "",
    image_url: initialData?.image_url || "",
    is_visible: initialData !== undefined ? initialData.is_visible : true,
  });

  const [sizes, setSizes] = useState<SizeStock[]>(
    initialData?.sizes || [{ size: "", stock: 0 }]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSizeChange = (index: number, field: keyof SizeStock, value: string) => {
    const newSizes = [...sizes];
    newSizes[index] = { 
      ...newSizes[index], 
      [field]: field === 'stock' ? parseInt(value) || 0 : value 
    };
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, { size: "", stock: 0 }]);
  };

  const removeSize = (index: number) => {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Filter out empty sizes
    const validSizes = sizes.filter(s => s.size !== "");

    if (validSizes.length === 0) {
      setError("Please add at least one valid size.");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      price: parseFloat(formData.price as string) || 0,
      sizes: validSizes,
    };

    let result;

    if (initialData?.id) {
      // Update
      result = await supabase
        .from("products")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", initialData.id);
    } else {
      // Insert
      result = await supabase
        .from("products")
        .insert([payload]);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else {
      router.push("/admin/products");
      router.refresh();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 glass rounded-full text-white/50 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-archivo text-white tracking-tighter uppercase">
            {initialData ? "Edit Product" : "New Product"}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Info */}
          <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
            <h2 className="font-archivo text-neon-green tracking-widest uppercase text-sm border-b border-white/10 pb-2">Basic Info</h2>
            
            <div>
              <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-neon-green focus:outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Brand</label>
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-neon-green focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-neon-green focus:outline-none transition-colors appearance-none">
                  <option value="Street">Street</option>
                  <option value="Running">Running</option>
                  <option value="Limited">Limited</option>
                  <option value="Casual">Casual</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Price (Birr)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-neon-green focus:outline-none transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-neon-green focus:outline-none transition-colors" />
            </div>
          </div>

          {/* Media & Inventory */}
          <div className="space-y-8">
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
              <h2 className="font-archivo text-neon-green tracking-widest uppercase text-sm border-b border-white/10 pb-2">Media & Status</h2>
              
              <div>
                <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Image URL</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-neon-green focus:outline-none transition-colors" placeholder="/products/example.png or https://..." />
                {formData.image_url && (
                  <div className="mt-4 w-full h-40 relative rounded-xl border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={formData.image_url} alt="Preview" className="object-contain w-full h-full p-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" name="is_visible" id="is_visible" checked={formData.is_visible} onChange={handleChange} className="w-5 h-5 accent-neon-green bg-white/5 border-white/10 rounded" />
                <label htmlFor="is_visible" className="text-sm text-white">Visible on public store</label>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h2 className="font-archivo text-neon-green tracking-widest uppercase text-sm">Sizes & Stock</h2>
                <button type="button" onClick={addSize} className="text-neon-green hover:text-white transition-colors">
                  <Plus size={18} />
                </button>
              </div>

              {sizes.map((s, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-[10px] font-archivo text-white/50 mb-1 uppercase">Size</label>
                    <input type="text" value={s.size} onChange={(e) => handleSizeChange(index, "size", e.target.value)} placeholder="e.g. 40" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-archivo text-white/50 mb-1 uppercase">Stock</label>
                    <input type="number" value={s.stock} onChange={(e) => handleSizeChange(index, "stock", e.target.value)} min="0" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none" />
                  </div>
                  <button type="button" onClick={() => removeSize(index)} disabled={sizes.length === 1} className="p-2.5 mb-0.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-neon-green text-black font-archivo text-sm tracking-[0.2em] rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "SAVING..." : (initialData ? "UPDATE PRODUCT" : "CREATE PRODUCT")}
          </button>
        </div>
      </form>
    </div>
  );
}
