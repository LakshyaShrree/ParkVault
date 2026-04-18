import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext();

const rates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095
};

export function AppProvider({ children }) {
  const [currency, setCurrency] = useState('INR');
  const [country, setCountry] = useState('India');
  const [language, setLanguage] = useState('Tamil');

  const formatPrice = (amount) => {
    const converted = amount * (rates[currency] || 1);
    const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '₹';
    return `${currencySymbol}${converted.toFixed(0)}`;
  };

  const value = useMemo(() => ({
    currency,
    setCurrency,
    country,
    setCountry,
    language,
    setLanguage,
    formatPrice,
    rates
  }), [currency, country, language]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
