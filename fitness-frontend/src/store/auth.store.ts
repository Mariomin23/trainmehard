'use client';
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'PROFESSIONAL' | 'ADMIN';
}

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  setAuth: (token, user) => {
    localStorage.setItem('tmh_token', token);
    localStorage.setItem('tmh_user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('tmh_token');
    localStorage.removeItem('tmh_user');
    set({ token: null, user: null });
  },
  hydrate: () => {
    const token = localStorage.getItem('tmh_token');
    const raw = localStorage.getItem('tmh_user');
    if (token && raw) set({ token, user: JSON.parse(raw) });
  },
}));
