import Link from 'next/link';
import { Star, Clock } from 'lucide-react';

interface Trainer {
  _id: string;
  specialties: string[];
  bio?: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  userId: { name: string };
}

export default function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg mb-3">
            {trainer.userId.name.charAt(0)}
          </div>
          <h3 className="font-semibold text-gray-900">{trainer.userId.name}</h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span>{trainer.rating > 0 ? trainer.rating.toFixed(1) : 'Nuevo'}</span>
            {trainer.reviewsCount > 0 && <span>({trainer.reviewsCount})</span>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{trainer.hourlyRate}€</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 justify-end mt-1">
            <Clock size={12} /> / hora
          </p>
        </div>
      </div>

      {trainer.bio && (
        <p className="text-sm text-gray-500 line-clamp-2">{trainer.bio}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {trainer.specialties.slice(0, 3).map(s => (
          <span key={s} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">
            {s}
          </span>
        ))}
      </div>

      <Link
        href={`/trainers/${trainer._id}`}
        className="w-full text-center py-2.5 border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-colors"
      >
        Ver perfil
      </Link>
    </div>
  );
}
