'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

interface Props {
  children: React.ReactNode;
  role?: 'USER' | 'PROFESSIONAL' | 'ADMIN';
}

export default function AuthGuard({ children, role }: Props) {
  const { user, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (user === null) return;
    const token = localStorage.getItem('tmh_token');
    if (!token) { router.push('/login'); return; }
    if (role && user.role !== role && user.role !== 'ADMIN') router.push('/');
  }, [user, role, router]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('tmh_token') : null;
  if (!token) return null;

  return <>{children}</>;
}
