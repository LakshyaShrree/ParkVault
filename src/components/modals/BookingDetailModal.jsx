import { cancelBooking } from '../../firebase/firestore.js';
import { useState } from 'react';

export default function BookingDetailModal({ booking, open, close, refresh, showToast }) {
  const [loading, setLoading] = useState(false);
  if (!open || !booking) return null;

  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelBooking(booking.id, booking.spaceId);
      showToast('Booking cancelled', 'success');
      refresh();
      close();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/30 px-4 py-6">
      <div className="w-full rounded-t-3xl bg-white p-6 slide-up">
        <button className="mb-4 text-slate-500" onClick={close}>Back</button>
        <p className="text-lg font-semibold text-slate-900">{booking.spaceName}</p>
        <p className="mt-2 text-sm text-slate-500">{booking.spaceAddress}</p>
        <div className="mt-4 space-y-3 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
          <p><span className="font-semibold">Date:</span> {booking.date}</p>
          <p><span className="font-semibold">Time:</span> {booking.startTime} - {booking.endTime}</p>
          <p><span className="font-semibold">Vehicle:</span> {booking.vehicleType} • {booking.vehicleNumber}</p>
          <p><span className="font-semibold">Status:</span> {booking.status}</p>
        </div>
        <div className="mt-5 rounded-3xl bg-slate-50 p-4 text-center text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Show this at parking</p>
          <div className="mt-4 inline-flex h-32 w-full items-center justify-center rounded-3xl bg-white text-xs text-slate-400 shadow-sm">
            QR code placeholder
          </div>
        </div>
        {booking.status !== 'cancelled' && booking.status !== 'completed' && (
          <button className="mt-6 w-full rounded-2xl bg-error px-4 py-3 text-sm font-semibold text-white" onClick={handleCancel} disabled={loading}>
            {loading ? 'Cancelling...' : 'Cancel booking'}
          </button>
        )}
      </div>
    </div>
  );
}
