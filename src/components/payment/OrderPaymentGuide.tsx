import React, { useState } from 'react';
import { 
  Building2, 
  Coins, 
  Gamepad2, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard,
  RefreshCw,
  Search,
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { 
  PAYMENT_METHODS, 
  SUPPORTED_COUNTRIES, 
  CURRENCY_RATES, 
  CurrencyCode, 
  PaymentMethodId,
  convertUSD
} from '../../data/paymentOptions';
import { 
  WiseLogo, 
  RobloxLogo, 
  RobuxCoinLogo, 
  CryptoLogo, 
  TetherLogo, 
  SolanaLogo 
} from '../icons/BrandLogos';
import { sound } from '../../utils/soundEffects';

interface OrderPaymentGuideProps {
  onStartOrder?: (method: PaymentMethodId, currency: CurrencyCode) => void;
}

export const OrderPaymentGuide: React.FC<OrderPaymentGuideProps> = ({ onStartOrder }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('wise');
  const [countrySearch, setCountrySearch] = useState('');
  const [demoAmount, setDemoAmount] = useState<number>(25);

  const filteredCountries = SUPPORTED_COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.localCurrency.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.region.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const activeMethodObj = PAYMENT_METHODS.find(m => m.id === selectedMethod) || PAYMENT_METHODS[0];

  return (
    <div className="space-y-10">
      {/* Top Banner & Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#00173d]/90 via-[#00122e]/90 to-[#000a1c]/95 border border-blue-500/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 font-mono text-xs uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-blue-300" />
            <span>Order Through Global Channels</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-ui font-extrabold text-white tracking-tight">
            Order Through Wise, Crypto &amp; Robux
          </h3>

          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            We provide verified, flexible order rails so creators, founders, and studios anywhere in the world can build with Skope. Pay seamlessly in your local currency like <strong>PKR</strong>, <strong>USD</strong>, <strong>AED</strong>, or use decentralized crypto and Roblox assets.
          </p>

          {/* Quick Currency Selector Pills */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1 mr-2">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              Supported Currencies:
            </span>
            {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map(curr => {
              const info = CURRENCY_RATES[curr];
              const isSelected = selectedCurrency === curr;
              return (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400 scale-105'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  <span>{info.flag}</span>
                  <span>{curr}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 Core Order Through Options Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PAYMENT_METHODS.map(method => {
          const isSelected = selectedMethod === method.id;
          const isWise = method.id === 'wise';
          const isCrypto = method.id === 'crypto';
          const isRobux = method.id === 'robux';

          return (
            <div
              key={method.id}
              onClick={() => {
                sound.playClick();
                setSelectedMethod(method.id);
              }}
              className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 relative flex flex-col justify-between group ${
                isSelected
                  ? isWise
                    ? 'bg-gradient-to-b from-[#0a2717] via-[#05190e] to-[#020e07] border-2 border-[#9FE870] shadow-2xl shadow-[#9FE870]/20 scale-[1.02]'
                    : isCrypto
                    ? 'bg-gradient-to-b from-[#082245] via-[#05142b] to-[#020b17] border-2 border-sky-400 shadow-2xl shadow-sky-500/25 scale-[1.02]'
                    : 'bg-gradient-to-b from-[#082a4d] via-[#05182e] to-[#020d1a] border-2 border-[#38BDF8] shadow-2xl shadow-sky-500/30 scale-[1.02]'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Authentic Brand Emblem Badge */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 transition-all shadow-lg ${
                    isWise
                      ? 'bg-[#163300]/90 border border-[#9FE870]/40 text-[#9FE870] shadow-[#9FE870]/15'
                      : isCrypto
                      ? 'bg-[#0b1c38]/90 border border-sky-400/40 text-sky-400 shadow-sky-500/20'
                      : 'bg-[#03254c]/90 border border-[#38BDF8]/50 text-white shadow-sky-500/25'
                  }`}>
                    {isWise && <WiseLogo className="w-8 h-8" />}
                    {isCrypto && <CryptoLogo className="w-8 h-8" />}
                    {isRobux && <RobloxLogo className="w-8 h-8" />}
                  </div>

                  <span className={`text-[10px] font-sans uppercase px-3 py-1 rounded-full font-extrabold tracking-wider border shadow-sm ${
                    isWise
                      ? 'bg-[#9FE870]/15 text-[#9FE870] border-[#9FE870]/40'
                      : isCrypto
                      ? 'bg-sky-500/15 text-sky-300 border-sky-400/40'
                      : 'bg-[#0284C7]/20 text-[#38BDF8] border-[#38BDF8]/40'
                  }`}>
                    {method.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-xl sm:text-2xl font-sans font-black text-white">
                    {method.name}
                  </h4>
                  {isRobux && (
                    <div title="Robux accepted" className="inline-flex">
                      <RobuxCoinLogo className="w-5 h-5 animate-pulse" />
                    </div>
                  )}
                  {isCrypto && (
                    <div className="flex items-center gap-1">
                      <TetherLogo className="w-4 h-4" />
                      <SolanaLogo className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <p className={`text-xs font-sans font-semibold mb-3 ${
                  isWise ? 'text-[#b9f298]' : isCrypto ? 'text-sky-200' : 'text-sky-200'
                }`}>
                  {method.tagline}
                </p>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {method.details}
                </p>

                <div className="p-3 rounded-2xl bg-black/50 border border-white/10 space-y-1.5 mb-4">
                  <div className="text-[10px] font-sans uppercase font-bold text-zinc-400">Accepted Currencies &amp; Assets:</div>
                  <div className="text-xs text-zinc-200 font-medium flex flex-wrap gap-1.5">
                    {method.acceptedCurrencies.map((c, idx) => (
                      <span key={idx} className={`px-2 py-0.5 rounded-lg text-[11px] font-bold border ${
                        isWise
                          ? 'bg-[#9FE870]/10 text-[#c8f7ad] border-[#9FE870]/20'
                          : isCrypto
                          ? 'bg-sky-500/10 text-sky-200 border-sky-400/20'
                          : 'bg-sky-500/15 text-sky-200 border-sky-400/30'
                      }`}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-zinc-400">
                  {isSelected ? '✓ Active Channel' : 'Click to View Guide'}
                </span>
                <span className={`text-xs font-bold flex items-center gap-1 ${
                  isWise ? 'text-[#9FE870]' : isCrypto ? 'text-sky-400' : 'text-[#38BDF8]'
                }`}>
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Method Execution Details & Currency Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Step-by-Step Instructions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5">
              {activeMethodObj.id === 'wise' && <WiseLogo className="w-5 h-5" />}
              {activeMethodObj.id === 'crypto' && <CryptoLogo className="w-5 h-5" />}
              {activeMethodObj.id === 'robux' && <RobloxLogo className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-sans uppercase tracking-wider text-zinc-400 font-bold block">
                Official Rail Protocol
              </span>
              <span className="text-lg font-sans font-black text-white">
                How to Order Through {activeMethodObj.name}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {activeMethodObj.instructions.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-blue-400/30">
                  {idx + 1}
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-400/20 text-xs text-blue-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Settlement Guarantee: </span>
              {activeMethodObj.conversionNote} All milestone deliverables are backed by official Discord server ticketing and direct dev communication.
            </div>
          </div>
        </div>

        {/* Live Currency & Rate Converter Box */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-[#001738]/80 to-[#000d20]/80 border border-blue-400/30 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-blue-300 font-semibold tracking-wider flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              Live Price Converter
            </span>
            <span className="text-[11px] font-mono text-zinc-400">
              USD → {selectedCurrency}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                Sample USD Quote / Budget
              </label>
              <div className="flex items-center gap-2">
                {[6, 12, 25, 60].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDemoAmount(amt)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      demoAmount === amt 
                        ? 'bg-blue-600 text-white font-bold' 
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-1">
              <div className="text-[10px] font-mono uppercase text-zinc-500">Converted Amount:</div>
              <div className="text-2xl font-ui font-black text-white flex items-center gap-2">
                <span>{convertUSD(demoAmount, selectedCurrency)}</span>
                <span className="text-xs font-normal text-zinc-400">({selectedCurrency})</span>
              </div>
              {selectedMethod === 'robux' && (
                <div className="text-xs text-amber-300 font-mono pt-1">
                  ≈ {Math.round(demoAmount * 285).toLocaleString()} R$ (Robux equivalent)
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onStartOrder && onStartOrder(selectedMethod, selectedCurrency)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order via {activeMethodObj.name} ({selectedCurrency})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Supported Countries Directory (Vetted list excluding Israel) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Worldwide Coverage &amp; Wise Rails</span>
            </div>
            <h4 className="text-xl font-ui font-bold text-white">
              Supported Regions &amp; Country Details
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Available across North America, Europe, South Asia, Middle East, and Southeast Asia.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Pakistan, UAE, USA..."
              value={countrySearch}
              onChange={e => setCountrySearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCountries.map(country => (
            <div 
              key={country.code}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{country.flag}</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{country.name}</h5>
                    <span className="text-[10px] font-mono text-zinc-500">{country.region}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-sans">
                  {country.wiseSupported && (
                    <span className="px-2 py-0.5 rounded-md bg-[#163300] text-[#9FE870] border border-[#9FE870]/30 font-bold flex items-center gap-1">
                      <WiseLogo className="w-3 h-3" />
                      Wise
                    </span>
                  )}
                  {country.cryptoSupported && (
                    <span className="px-2 py-0.5 rounded-md bg-[#0b1c38] text-sky-300 border border-sky-400/30 font-bold flex items-center gap-1">
                      <CryptoLogo className="w-3 h-3" />
                      Crypto
                    </span>
                  )}
                  {country.robuxSupported && (
                    <span className="px-2 py-0.5 rounded-md bg-[#03254c] text-sky-200 border border-[#38BDF8]/40 font-bold flex items-center gap-1">
                      <RobloxLogo className="w-3 h-3" />
                      R$
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-zinc-300 leading-snug">
                {country.notes}
              </div>

              <div className="text-[10px] font-mono text-blue-300/80 pt-1">
                Local Rail: {country.localCurrency}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
