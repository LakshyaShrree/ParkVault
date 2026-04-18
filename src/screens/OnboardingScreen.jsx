import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const { country, setCountry, language, setLanguage } = useApp();

  useEffect(() => {
    if (!country) {
      setCountry('India');
      setLanguage('Tamil');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-app px-4 py-10 text-white">
      <div className="mx-auto flex max-w-[430px] flex-col gap-8 rounded-[30px] bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[26px] bg-white/20">
              <span className="material-symbols-outlined text-3xl">local_parking</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-200">Welcome to</p>
              <h1 className="text-3xl font-semibold text-white">ParkVault</h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-200">Choose your country and language to get started with smart parking and rentals.</p>
        </div>
        <div className="space-y-4 rounded-[26px] bg-white/15 p-5">
          <label className="block text-sm font-semibold text-slate-100">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-slate-900"
          >
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
          </select>
          <label className="block text-sm font-semibold text-slate-100">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-slate-900"
          >
            <option>Tamil</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <button className="rounded-3xl bg-white px-6 py-4 text-base font-semibold text-primary transition hover:bg-slate-200" onClick={() => navigate('/login')}>
          Continue
        </button>
      </div>
    </div>
  );
}
