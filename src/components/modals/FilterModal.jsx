import { useState } from 'react';

const tiers = ['basic', 'standard', 'premium'];
const vehicleTypes = ['two-wheeler', 'car', 'suv', 'van'];

export default function FilterModal({ isOpen, close, onApply, initial }) {
  const [tier, setTier] = useState(initial.tier || '');
  const [vehicleType, setVehicleType] = useState(initial.vehicleType || '');
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice || '');

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/30 px-4 py-6">
      <div className="w-full rounded-t-3xl bg-white p-6 slide-up">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Filter spaces</h2>
          <button className="text-slate-500" onClick={close}>Close</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Tier</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
              <option value="">Any tier</option>
              {tiers.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Vehicle type</label>
            <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
              <option value="">Any vehicle</option>
              {vehicleTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Max price (INR)</label>
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Enter price" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
          </div>
        </div>
        <button
          className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-white transition hover:bg-blue-600"
          onClick={() => onApply({ tier, vehicleType, maxPrice: maxPrice ? Number(maxPrice) : undefined })}
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
