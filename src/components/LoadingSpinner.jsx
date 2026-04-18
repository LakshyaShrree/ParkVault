export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-4">
      <div className="rounded-3xl border-4 border-blue-500 border-t-transparent w-14 h-14 animate-spin" />
    </div>
  );
}
