import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Gem, 
  Crown,
  Star,
  Briefcase,
  Layers,
  TrendingUp,
  DollarSign,
  Building2,
  Coins,
  Gamepad2,
  Globe2
} from 'lucide-react';
import { SkopePackageItem } from '../../context/SkopeSettings';
import { CURRENCY_RATES, PAYMENT_METHODS } from '../../data/paymentOptions';
import { 
  WiseLogo, 
  RobloxLogo, 
  RobuxCoinLogo, 
  CryptoLogo 
} from '../icons/BrandLogos';

interface PackagesSectionProps {
  packages: SkopePackageItem[];
  onContactClick?: (packageName: string, packagePrice?: string, packageDesc?: string) => void;
  onNavigateToServices?: () => void;
}

export const PackagesPage: React.FC<PackagesSectionProps> = ({ 
  packages, 
  onContactClick,
  onNavigateToServices
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'business' | 'core'>('all');

  const businessPackages = packages.filter(p => p.category === 'business');
  const corePackages = packages.filter(p => p.category !== 'business');

  const filteredPackages = activeFilter === 'all'
    ? packages
    : activeFilter === 'business'
    ? businessPackages
    : corePackages;

  return (
    <section className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-white/10 pb-8 text-center sm:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-sans font-bold text-blue-400 mb-2 uppercase tracking-wider">
            <span>Official Skope Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Transparent Packages &amp; Commercial Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
            Skope Packages &amp; Pricing
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            From entry starter packages to turnkey commercial business setups. Predictable, accessible pricing to build, automate, and grow.
          </p>
        </div>
      </div>

      {/* Filter Tabs: All, Business Solutions, Starter & Core Tiers */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Packages ({packages.length})
          </button>

          <button
            onClick={() => setActiveFilter('business')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === 'business'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-300" />
            <span>Business Packages ({businessPackages.length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('core')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeFilter === 'core'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Core &amp; Bot Tiers ({corePackages.length})</span>
          </button>
        </div>

        <div className="text-xs text-zinc-300 font-sans font-medium">
          Showing <span className="text-white font-bold">{filteredPackages.length}</span> active solutions
        </div>
      </div>

      {/* Pricing Cards Grid - Driven by live settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => {
          const isBusiness = pkg.category === 'business';
          return (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                pkg.flagship
                  ? 'bg-gradient-to-b from-blue-900/50 via-blue-950/70 to-[#001026] border-2 border-blue-400 shadow-2xl shadow-blue-900/50 ring-1 ring-blue-300/40'
                  : pkg.popular
                  ? 'bg-blue-950/45 border-2 border-blue-400/80 shadow-xl shadow-blue-950/50'
                  : isBusiness
                  ? 'bg-gradient-to-b from-[#00163b]/70 to-[#000d24]/90 border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg'
                  : 'bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              {/* Top Pill */}
              {(pkg.popular || pkg.flagship || isBusiness) && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-sans text-[10px] uppercase font-bold tracking-widest shadow-lg flex items-center gap-1.5 whitespace-nowrap ${
                  pkg.flagship 
                    ? 'bg-blue-500 shadow-blue-500/50' 
                    : isBusiness 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-cyan-500/30'
                    : 'bg-blue-600 shadow-blue-600/50'
                }`}>
                  {pkg.flagship ? (
                    <Crown className="w-3 h-3 text-yellow-300" />
                  ) : isBusiness ? (
                    <Briefcase className="w-3 h-3 text-cyan-200" />
                  ) : (
                    <Star className="w-3 h-3" />
                  )}
                  <span>
                    {pkg.flagship 
                      ? 'Flagship Tier' 
                      : isBusiness 
                      ? 'Commercial Business Tier' 
                      : 'Most Popular'}
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-sans uppercase tracking-wider font-bold ${
                    isBusiness ? 'text-cyan-300' : 'text-blue-300'
                  }`}>
                    {pkg.badge}
                  </span>
                  <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                    {isBusiness ? 'Business' : 'Skope'}
                  </span>
                </div>

                <h3 className="text-2xl font-sans font-extrabold text-white flex items-center gap-2">
                  <span>{pkg.name}</span>
                  {pkg.flagship && <Gem className="w-5 h-5 text-blue-400" />}
                </h3>

                <div className="mt-4 mb-4 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-sans font-black text-white tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-zinc-400">
                    / {pkg.period}
                  </span>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed min-h-[40px]">
                  {pkg.description}
                </p>

                {/* Features Checklist */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-zinc-400">
                    What's included:
                  </div>
                  <ul className="space-y-2.5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200 leading-normal">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isBusiness ? 'text-cyan-400' : 'text-blue-400'
                        }`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => onContactClick && onContactClick(pkg.name, pkg.price, pkg.description)}
                  className={`w-full py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    pkg.flagship
                      ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/40 hover:shadow-blue-400/50'
                      : pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30'
                      : isBusiness
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                  <span>Buy {pkg.name} · {pkg.price}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Through Options & Currencies Ribbon */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#001738]/90 via-[#001026]/90 to-[#000d1e]/90 border border-blue-400/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Trio of official logos */}
          <div className="flex items-center -space-x-2 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#163300] border border-[#9FE870]/40 flex items-center justify-center p-2 shadow-md">
              <WiseLogo className="w-6 h-6" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0b1c38] border border-sky-400/40 flex items-center justify-center p-2 shadow-md">
              <CryptoLogo className="w-6 h-6" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#03254c] border border-[#38BDF8]/40 flex items-center justify-center p-2 shadow-md">
              <RobloxLogo className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-sans uppercase font-extrabold tracking-wider">
              <span className="text-white">Order Through:</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#9FE870]/15 text-[#9FE870] border border-[#9FE870]/30 text-[10px] flex items-center gap-1 font-bold">
                Wise
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30 text-[10px] flex items-center gap-1 font-bold">
                Crypto (USDT / SOL)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0284C7]/20 text-[#38BDF8] border border-[#38BDF8]/30 text-[10px] flex items-center gap-1 font-bold">
                Roblox / Robux <RobuxCoinLogo className="w-3 h-3" />
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-1.5">
              Supported currencies include <strong>PKR</strong>, <strong>USD</strong>, <strong>AED</strong>, <strong>EUR</strong>, <strong>GBP</strong>, <strong>CAD</strong>, <strong>AUD</strong> &amp; <strong>SAR</strong> with fast bank-direct settlement or instant crypto deposit.
            </p>
          </div>
        </div>

        {onNavigateToServices && (
          <button
            onClick={onNavigateToServices}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-blue-600/30"
          >
            <span>View Payment Rails</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Enterprise & Custom Inquiries Banner */}
      <div className="rounded-3xl p-8 bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-sans font-bold text-blue-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Need Something Unique or Custom?</span>
          </div>
          <h4 className="text-xl font-bold text-white">Custom Engineering &amp; Tailored Scopes</h4>
          <p className="text-xs text-zinc-400 max-w-xl">
            Have a custom business workflow, private bot network, or specific budget? We craft bespoke scopes tailored to your timeline.
          </p>
        </div>

        <button
          onClick={() => onContactClick && onContactClick('Custom Enterprise Scope')}
          className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase border border-white/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Request Custom Scope</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
