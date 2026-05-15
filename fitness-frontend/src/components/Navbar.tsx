'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LogOut, LayoutDashboard, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

export default function Navbar() {
  const { user, logout, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => { hydrate(); }, [hydrate]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <Link href="/" className="text-2xl font-black tracking-tight">
        <span className="text-gray-900">TrainMe</span><span className="text-green-500">Hard</span>
      </Link>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
        <Link href="/trainers" className="hover:text-green-600 transition-colors">
          Encontrar Entrenador
        </Link>

        {user ? (
          <>
            <Link
              href={user.role === 'TRAINER' ? '/dashboard/trainer' : '/dashboard'}
              className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
            >
              <LayoutDashboard size={16} />
              {user.name.split(' ')[0]}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} /> Salir
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-green-600 transition-colors">
              Iniciar Sesión
            </Link>
            <Link href="/register" className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-400 transition-colors">
              Regístrate
            </Link>
          </>
        )}
      </div>

      <button className="md:hidden text-gray-600">
        <Menu size={24} />
      </button>
    </nav>
  );
}
