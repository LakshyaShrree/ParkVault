import { useApp } from '../../context/AppContext.jsx';

export default function CurrencyModal({ open, close }) {
  const { currency, setCurrency } = useApp();
  if (!open) return null;
  const options = ['INR', 'USD', 'EUR', 'GBP'];
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/30 px-4 py-6">
      <div className="w-full rounded-t-3xl bg-white p-6 slide-up">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Choose currency</h2>
          <button className="text-slate-500" onClick={close}>Close</button>
        </div>
        <div className="space-y-3">
          {options.map((item) => (
            <button
              key={item}
              className={`w-full rounded-2xl border px-4 py-4 text-left text-sm font-semibold ${currency === item ? 'border-primary text-primary' : 'border-slate-200 text-slate-700'}`}
              onClick={() => {
                setCurrency(item);
                close();
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
