import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, AuthState } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'createdAt'>, password: string) => Promise<void>;
  updateProfile: (user: Partial<User>) => Promise<void>;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: map Supabase user → app User type
function mapSupabaseUser(sbUser: any): User {
  const meta = sbUser.user_metadata || {};
  return {
    id: sbUser.id,
    email: sbUser.email ?? '',
    firstname: meta.firstname ?? meta.full_name?.split(' ')[0] ?? '',
    lastname: meta.lastname ?? meta.full_name?.split(' ').slice(1).join(' ') ?? '',
    phone: meta.phone,
    type: (meta.type as 'client' | 'artisan') ?? 'client',
    avatar: meta.avatar_url,
    bio: meta.bio,
    createdAt: sbUser.created_at,
  };
}

// ===== AUTH CONTEXT PROVIDER =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
    error: null,
  });

  // Restore Supabase session on mount + listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setState({
          user: mapSupabaseUser(session.user),
          isLoggedIn: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
      }
    });

    // Subscribe to auth changes (login/logout from another tab, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setState({
          user: mapSupabaseUser(session.user),
          isLoggedIn: true,
          isLoading: false,
          error: null,
        });
      } else {
        setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── LOGIN ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Utilisateur introuvable.');
      setState({
        user: mapSupabaseUser(data.user),
        isLoggedIn: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Connexion échouée.';
      setState(prev => ({ ...prev, isLoading: false, error: msg }));
      throw error;
    }
  }, []);

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
  }, []);

  // ── REGISTER ──────────────────────────────────────────────────────────────
  const register = useCallback(async (user: Omit<User, 'id' | 'createdAt'>, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { error } = await supabase.auth.signUp({
        email: user.email,
        password,
        options: {
          data: {
            full_name: `${user.firstname} ${user.lastname}`,
            firstname: user.firstname,
            lastname: user.lastname,
            type: user.type,
            phone: user.phone,
          },
        },
      });
      if (error) throw error;
      setState(prev => ({ ...prev, isLoading: false, error: null }));
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Inscription échouée.';
      setState(prev => ({ ...prev, isLoading: false, error: msg }));
      throw error;
    }
  }, []);

  // ── UPDATE PROFILE ────────────────────────────────────────────────────────
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    try {
      const { error } = await supabase.auth.updateUser({ data: updates });
      if (error) throw error;
      setState(prev => {
        if (!prev.user) return prev;
        return { ...prev, user: { ...prev.user, ...updates } };
      });
    } catch (error) {
      console.error('updateProfile failed:', error);
      throw error;
    }
  }, []);

  const isLoggedIn = useCallback(() => state.isLoggedIn, [state.isLoggedIn]);

  return (
    <AuthContext.Provider value={{ state, login, logout, register, updateProfile, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// ===== USE AUTH HOOK =====
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
