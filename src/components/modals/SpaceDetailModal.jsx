import { useEffect, useState } from 'react';
import { getSpaceById } from '../../firebase/firestore.js';

export default function SpaceDetailModal({ space, open, close, onBook }) {
  const [spaceDetails, setSpaceDetails] = useState(space);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!space) return;
      setLoading(true);
      const details = await getSpaceById(space.id);
      setSpaceDetails(details);
      setLoading(false);
    }
    load();
  }, [space]);

  if (!open || !spaceDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/30 px-4 py-6">
      <div className="w-full rounded-t-3xl bg-white p-6 slide-up">
        <button className="mb-4 text-slate-500" onClick={close}>Back</button>
        {loading ? (
          <p className="text-center text-slate-500">Loading details...</p>
        ) : (
          <>
            <div className="rounded-3xl bg-slate-100 p-4">
              <p className="text-base font-semibold text-slate-900">{spaceDetails.title}</p>
              <p className="mt-2 text-sm text-slate-600">{spaceDetails.address}</p>
              <p className="mt-3 text-sm text-slate-500">{spaceDetails.area} • {spaceDetails.vehicleTypes.join(', ')}</p>
              <p className="mt-2 text-sm text-slate-500">Height limit: {spaceDetails.maxHeight} ft</p>
              <p className="mt-2 text-sm text-slate-500">Rating: {spaceDetails.rating?.toFixed(1) || '4.0'} | Slots: {spaceDetails.availableSlots}</p>
            </div>
            <div className="mt-5 space-y-3">
              <p className="text-sm text-slate-500">{spaceDetails.description || 'Secure parking available with flexible hours.'}</p>
            </div>
            <button
              className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-white transition hover:bg-blue-600"
              onClick={() => onBook(spaceDetails)}
              disabled={spaceDetails.availableSlots <= 0}
            >
              {spaceDetails.availableSlots <= 0 ? 'Fully Booked' : 'Book now'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
