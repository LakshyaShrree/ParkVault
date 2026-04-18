import { useApp } from '../context/AppContext.jsx';

export default function BookingCard({ booking, onSelect }) {
  const { formatPrice } = useApp();
  return (
    <button
      onClick={() => onSelect(booking)}
      className="w-full rounded-[18px] bg-white px-4 py-4 text-left shadow-sm transition hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-700">{booking.spaceName}</p>
          <p className="mt-1 text-xs text-slate-500">{booking.spaceAddress}</p>
        </div>
        <span className="rounded-2xl bg-slate-100 px-3 py-1 text-xs text-slate-700">{booking.status}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{booking.date}</span>
        <span>{booking.startTime} - {booking.endTime}</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm font-semibold text-slate-900">
        <span>{booking.vehicleNumber}</span>
        <span>{formatPrice(booking.totalAmount)}</span>
      </div>
    </button>
  );
}
