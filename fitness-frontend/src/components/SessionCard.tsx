interface Session {
  _id: string;
  sessionDate: string;
  durationMinutes: number;
  price: number;
  status: string;
  paymentStatus: string;
  trainerId?: { specialties: string[]; hourlyRate: number };
  userId?: { name: string; email: string };
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-50 text-yellow-700',
  CONFIRMED: 'bg-blue-50 text-blue-700',
  COMPLETED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-700',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada',
};

export default function SessionCard({ session, onConfirm }: { session: Session; onConfirm?: (id: string) => void }) {
  const date = new Date(session.sessionDate);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-900">
            {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
          <p className="text-sm text-gray-500">
            {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} · {session.durationMinutes} min
          </p>
          {session.userId && (
            <p className="text-sm text-gray-600 mt-1 font-medium">{session.userId.name}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[session.status] || 'bg-gray-50 text-gray-600'}`}>
          {STATUS_LABELS[session.status] || session.status}
        </span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <span className="text-sm text-gray-500">Total pagado</span>
        <span className="font-bold text-gray-900">{session.price}€</span>
      </div>

      {onConfirm && session.status === 'PENDING' && (
        <button
          onClick={() => onConfirm(session._id)}
          className="w-full py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Confirmar sesión
        </button>
      )}
    </div>
  );
}
