"use client";

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const { data } = await supabase.auth.getUser();
      if (data?.user && !data.user.confirmed_at) {
        setError("Setup initiated! Please confirm your email or check your Supabase dashboard to manually confirm this user before logging in.");
        setLoading(false);
      } else {
        router.push('/admin/dashboard');
        router.refresh();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="glass p-8 rounded-2xl w-full max-w-md border border-white/10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-archivo text-neon-green tracking-tighter">ADMIN SETUP</h1>
          <p className="text-white/50 text-sm mt-2">Create your initial admin account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSetup} className="space-y-4">
          <div>
            <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-archivo text-white/50 mb-2 uppercase tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-green transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-neon-green text-black font-archivo text-xs tracking-[0.3em] rounded-xl flex items-center justify-center mt-6 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "CREATING..." : "CREATE ADMIN"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/admin/login" className="text-white/30 text-xs hover:text-white transition-colors">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
