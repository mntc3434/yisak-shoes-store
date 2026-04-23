"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };
    fetchUser();
  }, [supabase]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const updates: any = { email };
    if (password) {
      updates.password = password;
    }

    const { error } = await supabase.auth.updateUser(updates);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Settings updated successfully! Check your email if you changed it.' });
      setPassword(""); // Clear password field
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-archivo text-white tracking-tighter uppercase">Settings</h1>
        <p className="text-white/50 text-sm mt-2">Manage your admin account credentials</p>
      </div>

      <div className="glass p-8 rounded-2xl border border-white/10">
        {message && (
          <div className={`p-4 rounded-xl mb-6 text-sm ${message.type === 'success' ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
            />
            <p className="text-white/30 text-xs mt-2">Updating your email will require verification.</p>
          </div>

          <div>
            <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-neon-green text-black font-archivo text-xs tracking-[0.3em] rounded-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? "SAVING..." : "SAVE CHANGES"}
          </button>
        </form>
      </div>
    </div>
  );
}
