import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  async function refresh() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    if (data.session) {
      const meta = data.session.user.app_metadata;
      setIsAdmin(meta?.is_admin === true);
    } else {
      setIsAdmin(false);
    }
  }

  useEffect(() => {
    // Carga inicial
    (async () => {
      await refresh();
      setLoading(false);
    })();

    // Suscripción a cambios de auth (evita deadlock envolviendo en IIFE)
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      (async () => {
        setSession(newSession);
        if (newSession) {
          setIsAdmin(newSession.user.app_metadata?.is_admin === true);
        } else {
          setIsAdmin(false);
        }
      })();
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(username: string, password: string) {
    const usernameKey = username.trim().toLowerCase().replace(/\s+/g, '');
    const email = `${usernameKey}@reformasnyn.admin`;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }

  const value: AuthContextValue = {
    session,
    user: session?.user ?? null,
    isAdmin,
    loading,
    signIn,
    signOut,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
