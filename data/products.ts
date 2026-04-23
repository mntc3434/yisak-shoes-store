// Product type matching the Supabase 'products' table schema
export interface SizeStock {
  size: string | number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // e.g. 'Running', 'Casual', 'Sports', 'Formal', 'Street', 'Limited'
  sizes: SizeStock[];
  price: number;
  description?: string;
  image_url?: string;
  is_visible?: boolean;
  created_at?: string;
  updated_at?: string;
}
