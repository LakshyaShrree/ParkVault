import { useEffect, useMemo, useState } from 'react';
import { addBooking } from '../../firebase/firestore.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useApp } from '../../context/AppContext.jsx';

export default function BookConfirmModal({ open, close, space, onSuccess, showToast }) {
  const { currentUser, profile } = useAuth();
  const { formatPrice } = useApp();
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [vehicleType, setVehicleType] = useState(space?.vehicleTypes?.[0] || 'car');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (space) {
      setVehicleType(space.vehicleTypes?.[0] || 'car');
    }
  }, [space]);

  const totalHours = useMemo(() => {
    const start = Number(startTime.replace(':', ''));
    const end = Number(endTime.replace(':', ''));
    const hours = Math.max(1, Math.floor((end - start) / 100));
    return hours;
  }, [startTime, endTime]);

  const totalAmount = totalHours * (space?.pricePerHour || 0);

  const handleConfirm = async () => {
    if (!date || !startTime || !endTime || !vehicleNumber) {
      showToast('Please complete all booking fields', 'error');
      return;
    }
    if (!currentUser || !space) return;
    setLoading(true);
    try {
      await addBooking({
        spaceId: space.id,
        spaceName: space.title,
        spaceAddress: space.address,
        userId: currentUser.uid,
        userName: profile?.name || currentUser.email,
        userEmail: currentUser.email,
        date,
        startTime,
        endTime,
        totalHours,
        totalAmount,
        vehicleType,
        vehicleNumber
      });
      showToast('Booking confirmed', 'success');
      onSuccess();
      close();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!open || !space) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
      <div className="w-full rounded-[28px] bg-white p-6 scale-in shadow-2xl">
        <h2 className="text-lg font-semibold text-slate-900">Confirm booking</h2>
        <p className="mt-2 text-sm text-slate-500">{space.title} • {space.address}</p>
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Start time</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">End time</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Vehicle type</label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
              {space.vehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Vehicle number</label>
            <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="MH12AB1234" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
          </div>
        </div>
        <div className="mt-5 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
          <p>Hours: {totalHours}</p>
          <p>Amount: {formatPrice(totalAmount)}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700" onClick={close} disabled={loading}>
            Cancel
          </button>
          <button className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white" onClick={handleConfirm} disabled={loading}>
            {loading ? 'Booking...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
