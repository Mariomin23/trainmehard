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
    <section className="bg-green-50 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          Encuentra tu Entrenador Ideal<br />
          en <span className="text-green-600">Minutos</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Busca por especialidad, compara precios y paga una única vez para contactar con tu entrenador perfecto.
        </p>

        <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-lg flex items-center max-w-2xl mx-auto border border-gray-100 focus-within:ring-2 focus-within:ring-green-500 transition-all">
          <div className="flex-1 px-4 flex items-center gap-3">
            <Search className="text-gray-400 shrink-0" size={20} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ej: Crossfit, Yoga, Pérdida de peso..."
              className="w-full py-3 outline-none text-gray-700 bg-transparent"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors shrink-0">
            Buscar
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-400 flex-wrap">
          {['Entrenadores Certificados', 'Pago Único', 'Resultados Reales'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
