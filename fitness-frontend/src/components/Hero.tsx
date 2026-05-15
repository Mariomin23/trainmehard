'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Hero() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/trainers?specialty=${encodeURIComponent(query.trim())}`);
    else router.push('/trainers');
  };

  return (
    <section className="relative bg-gray-950 py-28 px-6 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-green-600/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Social proof badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Más de 200 entrenadores certificados
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
          Tu mejor forma<br />
          <span className="text-green-400">empieza aquí</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Conecta con entrenadores personales certificados. Busca, compara y reserva en minutos.
        </p>

        <form
          onSubmit={handleSearch}
          className="bg-white p-2 rounded-2xl shadow-2xl flex items-center max-w-2xl mx-auto focus-within:ring-2 focus-within:ring-green-400/50 transition-all"
        >
          <div className="flex-1 px-4 flex items-center gap-3">
            <Search className="text-gray-400 shrink-0" size={20} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ej: Crossfit, Yoga, Pérdida de peso..."
              className="w-full py-3 outline-none text-gray-700 bg-transparent placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition-colors shrink-0"
          >
            Buscar
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-500 flex-wrap">
          {['Entrenadores certificados', 'Sin suscripción', 'Pago seguro'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
