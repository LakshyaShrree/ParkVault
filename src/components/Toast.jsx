export default function Toast({ message, type = 'error' }) {
  if (!message) return null;
  const color = type === 'error' ? 'bg-error' : type === 'success' ? 'bg-success' : 'bg-accent';
  return (
    <div className={`fixed left-1/2 top-6 z-50 w-[min(400px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl px-4 py-3 text-white shadow-lg ${color}`}>
      <p className="text-sm font-semibold">{message}</p>
    </div>
  );
}
