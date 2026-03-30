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

// ===== AUTH CONTEXT PROVIDER =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
    error: null,
  });

  // Handle Supabase Auth State Changes
  useEffect(() => {
    import('@/lib/supabase').then(({ isMockMode }) => {
      if (isMockMode) {
        setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
        return;
      }

      // Initial Session Check
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            firstname: session.user.user_metadata.firstname || 'User',
            lastname: session.user.user_metadata.lastname || '',
            type: session.user.user_metadata.type || 'client',
            createdAt: session.user.created_at,
          };
          setState({ user: userData, isLoggedIn: true, isLoading: false, error: null });
        } else {
          setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
        }
      });

      // Listen for changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || '',
            firstname: session.user.user_metadata.firstname || 'User',
            lastname: session.user.user_metadata.lastname || '',
            type: session.user.user_metadata.type || 'client',
            createdAt: session.user.created_at,
          };
          setState({ user: userData, isLoggedIn: true, isLoading: false, error: null });
        } else {
          setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
  }, []);

  const register = useCallback(async (user: Omit<User, 'id' | 'createdAt'>, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await supabase.auth.signUp({
        email: user.email,
        password: password,
        options: {
          data: {
            firstname: user.firstname,
            lastname: user.lastname,
            type: user.type,
          }
        }
      });
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          firstname: updates.firstname,
          lastname: updates.lastname,
          type: updates.type,
        }
      });
      
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Profile update failed',
      }));
      throw error;
    }
  }, []);

  const isLoggedIn = useCallback(() => state.isLoggedIn, [state.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        updateProfile,
        isLoggedIn,
      }}
    >
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
