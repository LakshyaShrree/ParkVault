export default function TierModal({ open, close, onSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/30 px-4 py-6">
      <div className="w-full rounded-t-3xl bg-white p-6 slide-up">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Choose a tier</h2>
          <button className="text-slate-500" onClick={close}>Close</button>
        </div>
        {['basic', 'standard', 'premium'].map((tier) => (
          <button
            key={tier}
            className="mb-3 w-full rounded-2xl border border-slate-200 px-4 py-4 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() => {
              onSelect(tier);
              close();
            }}
          >
            {tier}
          </button>
        ))}
      </div>
    </div>
  );
}
