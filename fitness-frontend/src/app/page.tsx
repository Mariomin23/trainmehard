import Link from 'next/link';
import { Search, Shield, Zap, Star } from 'lucide-react';
import Hero from '@/components/Hero';

const SPECIALTIES = ['Musculación', 'Pérdida de Peso', 'Yoga', 'Crossfit', 'Running', 'Pilates', 'Boxeo', 'Nutrición'];

const STEPS = [
  { icon: Search, title: 'Busca', desc: 'Filtra por especialidad, precio y disponibilidad.' },
  { icon: Star, title: 'Compara', desc: 'Revisa perfiles, valoraciones y tarifas.' },
  { icon: Zap, title: 'Contacta', desc: 'Paga una sesión inicial y empieza hoy.' },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">¿Cómo funciona?</h2>
          <p className="text-gray-500 mb-12">Sin suscripciones. Sin compromisos.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center relative">
                  <Icon className="text-green-600" size={24} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 text-center">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Especialidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPECIALTIES.map(cat => (
              <Link
                key={cat}
                href={`/trainers?specialty=${encodeURIComponent(cat)}`}
                className="bg-white rounded-2xl p-5 text-center hover:bg-green-50 hover:border-green-200 border border-gray-100 transition-all group"
              >
                <span className="font-medium text-gray-700 group-hover:text-green-700 transition-colors">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 px-6 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield size={40} className="mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Pago 100% seguro</h2>
          <p className="text-green-100 max-w-xl mx-auto mb-8">
            Procesamos los pagos con Stripe. Tu dinero está protegido hasta que confirmes que la sesión fue perfecta.
          </p>
          <Link href="/register" className="inline-block px-8 py-3 bg-white text-green-700 font-semibold rounded-full hover:bg-green-50 transition-colors">
            Empezar gratis
          </Link>
        </div>
      </section>
    </main>
  );
}
