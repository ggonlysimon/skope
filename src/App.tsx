/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Silk from './components/Silk';
import { FeaturesSection } from './components/pages/FeaturesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PackagesPage } from './components/pages/PackagesPage';
import { PillNav } from './components/navigation/PillNav';
import { SecretDashboard } from './components/admin/SecretDashboard';
import { BuyCheckoutModal } from './components/checkout/BuyCheckoutModal';
import { PaymentMethodId, CurrencyCode, CURRENCY_RATES, PAYMENT_METHODS } from './data/paymentOptions';
import { 
  loadSkopeSettings, 
  saveSkopeSettings, 
  SkopeAppSettings 
} from './context/SkopeSettings';
import { sound } from './utils/soundEffects';
import { 
  WiseLogo, 
  RobloxLogo, 
  RobuxCoinLogo, 
  CryptoLogo, 
  TetherLogo, 
  SolanaLogo 
} from './components/icons/BrandLogos';
import { 
  ArrowRight, 
  Sparkles, 
  Globe, 
  Bot, 
  Smartphone, 
  Brain, 
  TrendingUp, 
  CheckCircle2, 
  X,
  Send,
  Building2,
  Coins,
  Gamepad2,
  Megaphone
} from 'lucide-react';

type PageType = 'canvas' | 'packages' | 'features' | 'services' | 'about';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('canvas');
  const [settings, setSettings] = useState<SkopeAppSettings>(loadSkopeSettings);
  const [showSecretDashboard, setShowSecretDashboard] = useState<boolean>(false);
  const [contactModalPackage, setContactModalPackage] = useState<string | null>(null);
  const [activeBuyPackage, setActiveBuyPackage] = useState<{
    name: string;
    price?: string;
    description?: string;
  } | null>(null);
  const [selectedOrderMethod, setSelectedOrderMethod] = useState<PaymentMethodId>('wise');
  const [selectedOrderCurrency, setSelectedOrderCurrency] = useState<CurrencyCode>('USD');
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(() => {
    const saved = localStorage.getItem('skope_user_rating');
    return saved ? parseInt(saved, 10) : 5;
  });
  const [hasRated, setHasRated] = useState<boolean>(() => {
    return !!localStorage.getItem('skope_user_rating');
  });

  const handleRatingChange = (newVal: number) => {
    setUserRating(newVal);
    if (newVal > 0) {
      sound.playSuccess();
      localStorage.setItem('skope_user_rating', String(newVal));
      setHasRated(true);
    } else {
      localStorage.removeItem('skope_user_rating');
      setHasRated(false);
    }
  };

  const navigateTo = (page: PageType) => {
    sound.playClick();
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', href: 'canvas', onClick: () => navigateTo('canvas') },
    { label: 'Packages', href: 'packages', onClick: () => navigateTo('packages') },
    { label: 'Features', href: 'features', onClick: () => navigateTo('features') },
    { label: 'Services', href: 'services', onClick: () => navigateTo('services') },
    { label: 'About', href: 'about', onClick: () => navigateTo('about') },
  ];

  const handleOpenBuyModal = (pkgName: string, pkgPrice?: string, pkgDesc?: string, method?: PaymentMethodId, currency?: CurrencyCode) => {
    sound.playClick();
    let price = pkgPrice;
    let desc = pkgDesc;
    if (!price) {
      const found = settings.packages.find(p => p.name.toLowerCase() === pkgName.toLowerCase() || p.id.toLowerCase() === pkgName.toLowerCase());
      if (found) {
        price = found.price;
        desc = found.description;
      }
    }
    setActiveBuyPackage({
      name: pkgName,
      price: price || '$6.00',
      description: desc || 'Custom development and infrastructure solutions by Skope.'
    });
    if (method) setSelectedOrderMethod(method);
    if (currency) setSelectedOrderCurrency(currency);
  };

  const handleOpenContact = (pkgName: string, method?: PaymentMethodId, currency?: CurrencyCode) => {
    handleOpenBuyModal(pkgName, undefined, undefined, method, currency);
  };

  const handleStartOrderFromGuide = (method: PaymentMethodId, currency: CurrencyCode) => {
    handleOpenBuyModal('Growth Tier / Custom Order', '$9.00', 'Full custom delivery with verified settlement rail.', method, currency);
  };

  const handleSaveSettings = (newSettings: SkopeAppSettings) => {
    setSettings(newSettings);
    saveSkopeSettings(newSettings);
  };

  const triggerSecretEntrance = () => {
    sound.playTerminalBeep();
    setShowSecretDashboard(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#001026] text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-white">
      {/* 100% Fixed Full-bleed Blue Silk Shader Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Silk
          speed={activePage === 'canvas' ? 5 : 2.5}
          scale={1}
          color="#1E40AF"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Subtle Dark Scrim on content pages for high text readability */}
      {activePage !== 'canvas' && (
        <div className="fixed inset-0 z-0 bg-[#000814]/75 backdrop-blur-[2px] pointer-events-none transition-opacity duration-300" />
      )}

      {/* Sticky/Floating Header Navigation with React Bits PillNav */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-10 py-4 flex items-center justify-between border-b border-white/10 bg-[#000d1e]/85 backdrop-blur-md">
        {/* Brand: Skope + Motto */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('canvas')}
            className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-white hover:text-blue-300 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>{settings.brandName}</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[10px] font-sans font-bold uppercase tracking-widest text-blue-300">
            <span>{settings.motto}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* React Bits PillNav Component */}
          <PillNav
            items={navItems}
            activeHref={activePage}
            onItemSelect={(href) => navigateTo(href as PageType)}
            baseColor="#000e24"
            pillColor="rgba(255, 255, 255, 0.05)"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#94a3b8"
            ease="power3.easeOut"
          />
        </div>
      </header>

      {/* Live Announcement Banner if activated by admin */}
      {settings.announcement?.enabled && settings.announcement?.text && (
        <div className="relative z-20 w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 px-4 py-2.5 text-center text-xs font-sans font-bold text-white shadow-lg flex items-center justify-center gap-3">
          <Megaphone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>{settings.announcement.text}</span>
          {settings.announcement.linkText && (
            <button
              onClick={() => navigateTo('packages')}
              className="ml-2 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors text-[10px] font-extrabold uppercase tracking-wider cursor-pointer"
            >
              {settings.announcement.linkText}
            </button>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 w-full min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* VIEW 1: HOME (Hero Canvas View) */}
        {activePage === 'canvas' && (
          <div key="page-home" className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center animate-page-fade-in">
            <div className="max-w-4xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 backdrop-blur-md border border-blue-400/30 text-xs font-sans font-bold tracking-widest text-blue-300 uppercase shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Development &amp; Digital Services Brand</span>
              </div>

              {/* Massive Title */}
              <h1 className="text-7xl sm:text-9xl font-sans font-extrabold tracking-tight text-white drop-shadow-2xl">
                {settings.heroHeadline}
              </h1>

              {/* Motto */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 text-sm sm:text-lg font-sans tracking-[0.25em] text-blue-200 uppercase font-extrabold drop-shadow">
                <span>{settings.motto}</span>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed pt-2 font-normal">
                {settings.heroSubheadline}
              </p>

              {/* Direct Page Jump Buttons */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigateTo('packages')}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide transition-all shadow-xl shadow-blue-600/40 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('features')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 font-semibold text-xs tracking-wide transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>What Skope Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('services')}
                  className="px-6 py-3.5 rounded-xl bg-black/40 hover:bg-black/60 text-zinc-300 hover:text-white backdrop-blur-md border border-white/15 font-semibold text-xs tracking-wide transition-all cursor-pointer"
                >
                  <span>Services Catalog</span>
                </button>
              </div>

              {/* Quick Feature Tickers */}
              <div className="pt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-200/90 font-sans font-semibold">
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-blue-400" /> Web &amp; Apps</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5"><Bot className="w-3.5 h-3.5 text-blue-400" /> Discord Bots</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-blue-400" /> Android Apps</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-blue-400" /> Agentic AI</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Member Growth</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PACKAGES */}
        {activePage === 'packages' && (
          <div key="page-packages" className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-page-fade-in w-full">
            <PackagesPage 
              packages={settings.packages} 
              onContactClick={(name, price, desc) => handleOpenBuyModal(name, price, desc)} 
              onNavigateToServices={() => navigateTo('services')}
            />
          </div>
        )}

        {/* VIEW 3: FEATURES (Contains the secret tiny grey dot on Custom Development) */}
        {activePage === 'features' && (
          <div key="page-features" className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-page-fade-in w-full">
            <FeaturesSection 
              offerings={settings.offerings}
              onSelectPackage={() => navigateTo('packages')} 
              onSecretTrigger={triggerSecretEntrance}
            />
          </div>
        )}

        {/* VIEW 4: SERVICES (Contains the secret tiny grey dot on Custom Development) */}
        {activePage === 'services' && (
          <div key="page-services" className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-page-fade-in w-full">
            <ServicesPage 
              onSecretTrigger={triggerSecretEntrance}
              userRating={userRating}
              onRatingChange={handleRatingChange}
              hasRated={hasRated}
              onStartOrder={(method, currency) => handleOpenBuyModal('Growth Tier / Custom Service', '$9.00', undefined, method, currency)}
            />
          </div>
        )}

        {/* VIEW 5: ABOUT (Contains the secret tiny grey dot on Custom Development) */}
        {activePage === 'about' && (
          <div key="page-about" className="max-w-7xl mx-auto px-6 sm:px-12 py-12 animate-page-fade-in w-full">
            <AboutPage onSecretTrigger={triggerSecretEntrance} />
          </div>
        )}

        {/* Global Page Footer */}
        <footer className="w-full border-t border-white/10 px-6 sm:px-12 py-6 bg-[#000a18]/70 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-sans font-extrabold text-sm text-white select-none">
              {settings.brandName}
            </span>
            <span className="text-zinc-600 select-none">·</span>
            <span className="font-sans font-bold text-blue-300 uppercase tracking-wider">{settings.motto}</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('canvas')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => navigateTo('packages')} className="hover:text-white transition-colors cursor-pointer">
              Packages
            </button>
            <button onClick={() => navigateTo('features')} className="hover:text-white transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => navigateTo('services')} className="hover:text-white transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors cursor-pointer">
              About
            </button>
          </div>
        </footer>
      </main>

      {/* Secret Dashboard Modal */}
      {showSecretDashboard && (
        <SecretDashboard
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowSecretDashboard(false)}
        />
      )}

      {/* Buy & Checkout Modal with Email and Skope Integrations Gmail Verification */}
      {activeBuyPackage && (
        <BuyCheckoutModal
          packageName={activeBuyPackage.name}
          packagePrice={activeBuyPackage.price}
          packageDescription={activeBuyPackage.description}
          initialMethod={selectedOrderMethod}
          initialCurrency={selectedOrderCurrency}
          customMasterCode={settings.verificationSettings?.customMasterCode || 'SKOPE2026'}
          onClose={() => setActiveBuyPackage(null)}
        />
      )}

      {/* Package Inquiry Dialog Modal (Secondary/Custom quote fallback) */}
      {contactModalPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#001026] border border-blue-400/30 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] font-sans font-bold text-blue-400 uppercase tracking-wider">
                  Package Inquiry
                </div>
                <h3 className="text-2xl font-sans font-bold text-white">
                  {contactModalPackage}
                </h3>
              </div>
              <button
                onClick={() => setContactModalPackage(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inquirySent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-400/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-sans font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-zinc-300 max-w-xs mx-auto">
                  Our development team will reach out directly to review your stack and launch your project timeline.
                </p>
                <button
                  onClick={() => setContactModalPackage(null)}
                  className="mt-4 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-500 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sound.playSuccess();
                  try {
                    import('canvas-confetti').then((confettiModule) => {
                      confettiModule.default({
                        particleCount: 60,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#3b82f6', '#10b981', '#38bdf8', '#f59e0b']
                      });
                    });
                  } catch {
                    // ignore
                  }
                  setInquirySent(true);
                }}
                className="space-y-4 text-xs font-sans max-h-[75vh] overflow-y-auto pr-1"
              >
                {/* Preferred Payment Rail Selection */}
                <div className="space-y-2">
                  <label className="text-blue-300 font-sans uppercase text-[11px] font-bold block">
                    1. Preferred Order Through Rail
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedOrderMethod('wise');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        selectedOrderMethod === 'wise'
                          ? 'bg-gradient-to-b from-[#143d12] to-[#0a2009] border-[#9FE870] text-white shadow-lg shadow-[#9FE870]/25 ring-1 ring-[#9FE870]/50'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-1.5">
                        <WiseLogo className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-xs text-white">Wise</span>
                      <span className="text-[9px] font-sans font-extrabold text-[#9FE870]">Bank Direct</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedOrderMethod('crypto');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        selectedOrderMethod === 'crypto'
                          ? 'bg-gradient-to-b from-[#0e335f] to-[#081d37] border-sky-400 text-white shadow-lg shadow-sky-500/25 ring-1 ring-sky-400/50'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-1.5">
                        <CryptoLogo className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-xs text-white">Crypto</span>
                      <span className="text-[9px] font-sans font-extrabold text-sky-400">USDT · SOL</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedOrderMethod('robux');
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        selectedOrderMethod === 'robux'
                          ? 'bg-gradient-to-b from-[#0e3b66] to-[#061e38] border-[#38BDF8] text-white shadow-lg shadow-sky-500/30 ring-1 ring-[#38BDF8]/60'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-1.5">
                        <RobloxLogo className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-xs text-white flex items-center gap-1">
                        Roblox <RobuxCoinLogo className="w-3 h-3" />
                      </span>
                      <span className="text-[9px] font-sans font-extrabold text-[#38BDF8]">R$ Payout</span>
                    </button>
                  </div>
                </div>

                {/* Preferred Currency */}
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium flex items-center justify-between">
                    <span>Target Currency Quote</span>
                    <span className="font-sans font-bold text-blue-300 text-[10px]">{selectedOrderCurrency} Selected</span>
                  </label>
                  <select
                    value={selectedOrderCurrency}
                    onChange={(e) => setSelectedOrderCurrency(e.target.value as CurrencyCode)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400 font-sans cursor-pointer"
                  >
                    <option value="USD" className="bg-[#001026] text-white">USD - US Dollar ($)</option>
                    <option value="PKR" className="bg-[#001026] text-white">PKR - Pakistani Rupee (Rs / Raast / Sadapay)</option>
                    <option value="AED" className="bg-[#001026] text-white">AED - UAE Dirham (AED)</option>
                    <option value="EUR" className="bg-[#001026] text-white">EUR - Euro (€)</option>
                    <option value="GBP" className="bg-[#001026] text-white">GBP - British Pound (£)</option>
                    <option value="CAD" className="bg-[#001026] text-white">CAD - Canadian Dollar (CA$)</option>
                    <option value="AUD" className="bg-[#001026] text-white">AUD - Australian Dollar (AU$)</option>
                    <option value="SAR" className="bg-[#001026] text-white">SAR - Saudi Riyal (SAR)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Your Name or Discord Handle</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex or Alex#0001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400 font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Project Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you want Skope to build or automate..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400 font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request (via {selectedOrderMethod.toUpperCase()} · {selectedOrderCurrency})</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
