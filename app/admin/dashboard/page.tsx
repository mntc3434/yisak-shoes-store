import { createClient } from "@/lib/supabase-server";
import { Package, Eye, EyeOff, LayoutGrid } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Fetch all products to calculate stats
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    return <div className="text-red-500">Error loading dashboard stats: {error.message}</div>;
  }

  const totalProducts = products?.length || 0;
  const visibleProducts = products?.filter((p) => p.is_visible).length || 0;
  const hiddenProducts = totalProducts - visibleProducts;

  // Calculate products by category
  const categoryCounts = products?.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const statCards = [
    { title: "Total Products", value: totalProducts, icon: Package, color: "text-white" },
    { title: "Visible", value: visibleProducts, icon: Eye, color: "text-neon-green" },
    { title: "Hidden", value: hiddenProducts, icon: EyeOff, color: "text-neon-pink" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-archivo text-white tracking-tighter uppercase">Dashboard</h1>
        <p className="text-white/50 text-sm mt-2">Overview of your store inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-archivo text-white/50 tracking-widest uppercase mb-2">{stat.title}</p>
                <p className={`text-4xl font-archivo ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`p-4 rounded-full bg-white/5 ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <LayoutGrid className="text-neon-green" size={20} />
            <h2 className="text-lg font-archivo text-white tracking-widest uppercase">By Category</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(categoryCounts || {}).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-sm text-white/80 font-archivo tracking-wider">{category}</span>
                <span className="text-neon-green font-bold">{count as React.ReactNode}</span>
              </div>
            ))}
            {Object.keys(categoryCounts || {}).length === 0 && (
              <p className="text-white/30 text-sm text-center py-4">No categories found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
