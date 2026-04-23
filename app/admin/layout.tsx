import { createClient } from "@/lib/supabase-server";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, it's the login or setup page, don't show the sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black flex">
      <Sidebar />
      <main className="flex-1 p-8 md:p-12 overflow-y-auto ml-0 md:ml-64">
        {children}
      </main>
    </div>
  );
}
