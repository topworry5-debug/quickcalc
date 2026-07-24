"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "USD", name: "United States Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س", flag: "🇸🇦" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "$", flag: "🇳🇿" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "$", flag: "🇭🇰" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£", flag: "🇪🇬" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", flag: "🇶🇦" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", flag: "🇧🇭" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع.", flag: "🇴🇲" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", flag: "🇱🇰" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
];

// Offline/fallback exchange rates relative to USD in case API fails
const FALLBACK_RATES_TO_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  PKR: 278.5,
  INR: 83.5,
  AED: 3.67,
  SAR: 3.75,
  CAD: 1.37,
  AUD: 1.51,
  JPY: 157.8,
  CNY: 7.25,
  CHF: 0.89,
  NZD: 1.63,
  SGD: 1.35,
  HKD: 7.81,
  SEK: 10.5,
  NOK: 10.6,
  DKK: 6.87,
  TRY: 32.5,
  RUB: 88.0,
  BRL: 5.4,
  ZAR: 18.2,
  MXN: 18.4,
  IDR: 16400,
  MYR: 4.71,
  PHP: 58.7,
  THB: 36.6,
  VND: 25400,
  KRW: 1380,
  EGP: 47.8,
  NGN: 1500,
  KWD: 0.31,
  QAR: 3.64,
  BHD: 0.38,
  OMR: 0.38,
  LKR: 305.0,
  BDT: 117.5,
  PLN: 4.02,
};

export default function CurrencyConverterWidget() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("PKR");
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Fetch exchange rates
  const fetchRates = useCallback(async (base: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      if (!res.ok) throw new Error("Failed to fetch rates from exchange rate API.");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        // Format last updated date/time
        const date = data.time_last_update_utc 
          ? new Date(data.time_last_update_utc) 
          : new Date();
        setLastUpdated(date.toUTCString());
        setUsingFallback(false);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve live exchange rates. Showing reliable fallback estimates.");
      // Derive fallback rates relative to the selected 'base'
      const baseToUSD = FALLBACK_RATES_TO_USD[base] || 1;
      const derivedRates: Record<string, number> = {};
      Object.keys(FALLBACK_RATES_TO_USD).forEach((key) => {
        // base -> USD -> target
        derivedRates[key] = FALLBACK_RATES_TO_USD[key] / baseToUSD;
      });
      setRates(derivedRates);
      setLastUpdated(new Date().toUTCString() + " (Offline Fallback)");
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch rates whenever fromCurrency changes
  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency, fetchRates]);

  // Clean and parse input amount
  const numericAmount = useMemo(() => {
    const val = parseFloat(amount);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [amount]);

  // Handle amount change with validation
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setAmount("");
      return;
    }
    // Prevent negative signs or exponent notations in simple validation
    if (val.includes("-")) return;
    setAmount(val);
  };

  // Convert
  const rate = useMemo(() => {
    if (!rates) return null;
    return rates[toCurrency] || null;
  }, [rates, toCurrency]);

  const convertedValue = useMemo(() => {
    if (rate === null) return 0;
    return numericAmount * rate;
  }, [numericAmount, rate]);

  // Get reverse rate
  const reverseRate = useMemo(() => {
    if (rate === null || rate === 0) return 0;
    return 1 / rate;
  }, [rate]);

  // Get active currency objects
  const fromObj = useMemo(() => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === fromCurrency) || SUPPORTED_CURRENCIES[0];
  }, [fromCurrency]);

  const toObj = useMemo(() => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === toCurrency) || SUPPORTED_CURRENCIES[1];
  }, [toCurrency]);

  // Swap currencies
  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  // Format currency helpers
  const formatCurrency = (val: number, symbol: string, code: string) => {
    return `${symbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })} ${code}`;
  };

  // Share text builder
  const shareText = useMemo(() => {
    if (rate === null) return "";
    const cleanAmount = numericAmount.toLocaleString(undefined, { maximumFractionDigits: 2 });
    const cleanConverted = convertedValue.toLocaleString(undefined, { maximumFractionDigits: 2 });
    const cleanRate = rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    return `${cleanAmount} ${fromCurrency} = ${cleanConverted} ${toCurrency} (rate: 1 ${fromCurrency} = ${cleanRate} ${toCurrency}) - converted at quickcalc.cloud/tools/currency-converter`;
  }, [numericAmount, convertedValue, fromCurrency, toCurrency, rate]);

  const handleCopy = () => {
    if (!shareText) return;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
      
      {/* Loading Skeleton */}
      {loading && !rates && (
        <div className="space-y-6 animate-pulse">
          <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl"></div>
            <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl"></div>
          </div>
          <div className="h-24 bg-zinc-100 dark:bg-zinc-800 rounded-2xl"></div>
        </div>
      )}

      {/* Main Form Content */}
      {(!loading || rates) && (
        <div className="space-y-6">
          
          {/* Error Message banner */}
          {error && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl text-amber-800 dark:text-amber-300 text-sm flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="font-semibold">Notice</p>
                <p className="opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Rate status / Last updated */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${usingFallback ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`}></span>
              <span>{usingFallback ? "Using Fallback Rates" : "Live Exchange Rates Connected"}</span>
            </div>
            {lastUpdated && <span>Updated: {lastUpdated}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Amount input */}
            <div className="md:col-span-4 space-y-2">
              <label htmlFor="amount-input" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Amount
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400 font-medium pointer-events-none">
                  {fromObj.symbol}
                </span>
                <input
                  id="amount-input"
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="w-full pl-9 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* From currency dropdown */}
            <div className="md:col-span-3 space-y-2">
              <label htmlFor="from-currency" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                From
              </label>
              <select
                id="from-currency"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent cursor-pointer transition"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center pb-1">
              <button
                type="button"
                onClick={handleSwap}
                aria-label="Swap currencies"
                className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              >
                <span className="text-xl leading-none">⇄</span>
              </button>
            </div>

            {/* To currency dropdown */}
            <div className="md:col-span-4 space-y-2">
              <label htmlFor="to-currency" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                To
              </label>
              <select
                id="to-currency"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent cursor-pointer transition"
              >
                {SUPPORTED_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Quickselect amounts */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
              Common Amounts ({fromObj.code})
            </span>
            <div className="flex flex-wrap gap-2">
              {[10, 50, 100, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                    numericAmount === amt
                      ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border-transparent"
                  }`}
                >
                  {fromObj.symbol}
                  {amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Display Area */}
          <div className="p-6 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-blue-500/5 dark:from-emerald-500/10 dark:to-blue-500/10 rounded-2xl border border-emerald-500/10 dark:border-emerald-500/20 space-y-4">
            <div>
              <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 block mb-1">
                Converted Amount
              </span>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {formatCurrency(convertedValue, toObj.symbol, toObj.code)}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {numericAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })} {fromObj.code} = {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toObj.code}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 text-sm">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Exchange Rate (From &rarr; To)</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  1 {fromObj.code} = {rate ? rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 }) : "—"} {toObj.code}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">Reverse Rate (To &rarr; From)</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  1 {toObj.code} = {reverseRate ? reverseRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 }) : "—"} {fromObj.code}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3 px-4 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                <span>{copied ? "✅ Copied to Clipboard!" : "📋 Copy Shareable Result"}</span>
              </button>
              <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 mt-2 italic">
                Includes natural link attribution to share with colleagues and clients.
              </p>
            </div>

          </div>

          {/* Rate History Context / Comparison Range Tables */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                Rate Comparison & Quick Reference Tables
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Instantly check popular amounts for fast remittances, travel budgeting, and trade settlements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Table A: From -> To */}
              <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-xs font-bold border-b border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {fromObj.flag} {fromObj.code} to {toObj.code}
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-xs">
                  {[1, 5, 10, 50, 100, 500, 1000].map((amt) => (
                    <div key={amt} className="flex justify-between px-3 py-2">
                      <span className="font-medium text-zinc-500">{amt} {fromObj.code}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {toObj.symbol}
                        {rate ? (amt * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table B: To -> From */}
              <div className="border border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-50 dark:bg-zinc-950 px-3 py-2 text-xs font-bold border-b border-zinc-100 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {toObj.flag} {toObj.code} to {fromObj.code}
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-xs">
                  {[1, 5, 10, 50, 100, 500, 1000].map((amt) => (
                    <div key={amt} className="flex justify-between px-3 py-2">
                      <span className="font-medium text-zinc-500">{amt} {toObj.code}</span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">
                        {fromObj.symbol}
                        {reverseRate ? (amt * reverseRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
