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

const STORAGE_KEY = 'soukna_users';
const SESSION_KEY = 'soukna_session';

function getUsers(): Record<string, { user: User; password: string }> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, { user: User; password: string }>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function getSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

// ===== AUTH CONTEXT PROVIDER =====
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
    error: null,
  });

  // Restore session on mount
  useEffect(() => {
    const sessionUser = getSession();
    if (sessionUser) {
      setState({ user: sessionUser, isLoggedIn: true, isLoading: false, error: null });
    } else {
      setState({ user: null, isLoggedIn: false, isLoading: false, error: null });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    await new Promise(r => setTimeout(r, 800)); // Simulate network delay

    const users = getUsers();
    const entry = users[email.toLowerCase()];

    if (!entry || entry.password !== password) {
      setState(prev => ({ ...prev, isLoading: false, error: 'Email ou mot de passe incorrect.' }));
      throw new Error('Email ou mot de passe incorrect.');
    }

    saveSession(entry.user);
    setState({ user: entry.user, isLoggedIn: true, isLoading: false, error: null });
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
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
            full_name: `${user.firstname} ${user.lastname}`,
            firstname: user.firstname,
            lastname: user.lastname,
            type: user.type,
          }
        }
      });
      if (error) throw error;
      setState(prev => ({ ...prev, isLoading: false, error: null }));
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
    setState(prev => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, ...updates };
      saveSession(updated);
      // Also update in users store
      const users = getUsers();
      if (users[updated.email.toLowerCase()]) {
        users[updated.email.toLowerCase()].user = updated;
        saveUsers(users);
      }
      return { ...prev, user: updated };
    });
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
