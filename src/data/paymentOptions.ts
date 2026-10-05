export type PaymentMethodId = 'robux' | 'wise' | 'crypto';

export type CurrencyCode = 'USD' | 'PKR' | 'AED' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'SAR';

export interface PaymentOption {
  id: PaymentMethodId;
  name: string;
  badge: string;
  tagline: string;
  details: string;
  acceptedCurrencies: string[];
  conversionNote: string;
  instructions: string[];
  icon: string;
  accentColor: string;
}

export interface SupportedCountry {
  code: string;
  name: string;
  flag: string;
  region: string;
  wiseSupported: boolean;
  cryptoSupported: boolean;
  robuxSupported: boolean;
  localCurrency: string;
  notes: string;
}

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: 'wise',
    name: 'Wise Transfer',
    badge: 'Lowest Fees · Bank Direct',
    tagline: 'Direct international bank debit & Wise balance transfers',
    details: 'Send payments at true mid-market exchange rates directly through Wise. Fast bank-to-bank settlement across 160+ countries.',
    acceptedCurrencies: ['USD', 'PKR', 'AED', 'EUR', 'GBP', 'CAD', 'AUD', 'SAR'],
    conversionNote: 'Automatic conversion at mid-market rate without high retail banking markup.',
    instructions: [
      'Select your package or enter your custom quote amount',
      'Provide your Wise email or bank account details',
      'We generate a verified Wise payment link or IBAN/local bank transfer invoice',
      'Instant verification once transfer enters processing'
    ],
    icon: 'Building2',
    accentColor: '#9FE870'
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    badge: 'Instant · Global · 0% Markup',
    tagline: 'USDT, USDC, BTC, ETH, Solana & LTC on high-speed chains',
    details: 'Decentralized, borderless payments with zero cross-border banking delays. Perfect for clients anywhere in the world.',
    acceptedCurrencies: ['USDT (TRC20/BEP20/Polygon)', 'USDC', 'SOL', 'BTC', 'ETH', 'LTC'],
    conversionNote: 'Fixed at 1:1 against USD for stablecoins (USDT/USDC).',
    instructions: [
      'Choose your preferred network (TRC20, Polygon, Arbitrum, or Solana recommended for sub-cent gas fees)',
      'A dedicated deposit address and QR code is supplied',
      'Transfer the exact invoice balance',
      'Order unlocks automatically upon 2 network confirmations'
    ],
    icon: 'Coins',
    accentColor: '#38BDF8'
  },
  {
    id: 'robux',
    name: 'Roblox / Robux',
    badge: 'Creator Friendly · Roblox Asset Transfer',
    tagline: 'Pay using Robux via gamepass, group funds, or asset purchase',
    details: 'Flexible payment option for community owners, game developers, and Roblox studio founders. We accept direct group fund payouts or custom gamepasses.',
    acceptedCurrencies: ['R$ (Robux Group Payout)', 'Roblox Gamepass (Tax Covered)', 'Roblox Gift Cards'],
    conversionNote: 'Standard community rate applied (~1,000 R$ per $3.50–$4.00 USD equivalent or customized based on tax rate).',
    instructions: [
      'Select Robux as payment method during order checkout',
      'Choose either "Group Payout" (0% tax) or "Gamepass" (+30% Roblox marketplace tax factored in)',
      'Our team provides the verified Roblox link or group invite',
      'Order kicked off once Robux transfer is confirmed on Roblox dev hub'
    ],
    icon: 'Gamepad2',
    accentColor: '#E2231A'
  }
];

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rateAgainstUSD: number; name: string; flag: string }> = {
  USD: { symbol: '$', rateAgainstUSD: 1.0, name: 'US Dollar', flag: '🇺🇸' },
  PKR: { symbol: 'Rs', rateAgainstUSD: 279.5, name: 'Pakistani Rupee', flag: '🇵🇰' },
  AED: { symbol: 'AED', rateAgainstUSD: 3.67, name: 'United Arab Emirates Dirham', flag: '🇦🇪' },
  EUR: { symbol: '€', rateAgainstUSD: 0.92, name: 'Euro', flag: '🇪🇺' },
  GBP: { symbol: '£', rateAgainstUSD: 0.79, name: 'British Pound', flag: '🇬🇧' },
  CAD: { symbol: 'CA$', rateAgainstUSD: 1.36, name: 'Canadian Dollar', flag: '🇨🇦' },
  AUD: { symbol: 'AU$', rateAgainstUSD: 1.52, name: 'Australian Dollar', flag: '🇦🇺' },
  SAR: { symbol: 'SAR', rateAgainstUSD: 3.75, name: 'Saudi Riyal', flag: '🇸🇦' },
};

// Explicitly vetted list of supported countries featuring Wise, Crypto, and Robux (Strictly excluding Israel)
export const SUPPORTED_COUNTRIES: SupportedCountry[] = [
  {
    code: 'PK',
    name: 'Pakistan',
    flag: '🇵🇰',
    region: 'South Asia',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'PKR (Raast / Nayapay / Sadapay via Wise)',
    notes: 'Direct transfers via Wise to Pakistani bank accounts, Raast ID, Sadapay & Nayapay.'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Middle East',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'AED (UAE Dirham)',
    notes: 'Fast local AED bank transfers through Wise, licensed crypto rails & Robux gamepasses.'
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'North America',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'USD',
    notes: 'ACH, Wire, Wise, crypto and Roblox USD payouts.'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'GBP (British Pound)',
    notes: 'Instant UK Faster Payments via Wise, crypto and Robux.'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'North America',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'CAD (Canadian Dollar)',
    notes: 'Interac & Wise transfers, crypto, and Robux accepted.'
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    region: 'Middle East',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'SAR (Saudi Riyal)',
    notes: 'Smooth cross-border settlement with Wise to SAR IBANs and crypto.'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'EUR (Euro)',
    notes: 'SEPA instant payments through Wise, crypto and Roblox assets.'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'EUR (Euro)',
    notes: 'SEPA transfers via Wise, Ethereum/Polygon, and Robux.'
  },
  {
    code: 'TR',
    name: 'Türkiye',
    flag: '🇹🇷',
    region: 'Europe / Middle East',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'TRY / USD',
    notes: 'High crypto adoption, Wise cross-border transfers and Robux.'
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Southeast Asia',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'MYR / USD',
    notes: 'DuitNow & Wise account settlement, crypto and Robux.'
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    region: 'Southeast Asia',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'IDR / USD',
    notes: 'Wise local e-wallet & bank payout, USDT and Robux group funds.'
  },
  {
    code: 'EG',
    name: 'Egypt',
    flag: '🇪🇬',
    region: 'North Africa',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'EGP / USD',
    notes: 'Wise international transfers, crypto stablecoins, and Robux.'
  },
  {
    code: 'QA',
    name: 'Qatar',
    flag: '🇶🇦',
    region: 'Middle East',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'QAR / USD',
    notes: 'Wise cross-border bank transfer, crypto and Robux.'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    wiseSupported: true,
    cryptoSupported: true,
    robuxSupported: true,
    localCurrency: 'AUD (Australian Dollar)',
    notes: 'PayID & Wise direct transfers, crypto rails, and Robux.'
  }
];

export function convertUSD(amountUsd: number, targetCurrency: CurrencyCode): string {
  const currency = CURRENCY_RATES[targetCurrency];
  if (!currency) return `$${amountUsd.toFixed(2)}`;
  
  const converted = amountUsd * currency.rateAgainstUSD;
  
  if (targetCurrency === 'PKR') {
    return `${currency.symbol} ${Math.round(converted).toLocaleString()}`;
  }
  if (targetCurrency === 'AED' || targetCurrency === 'SAR') {
    return `${converted.toFixed(2)} ${currency.symbol}`;
  }
  return `${currency.symbol}${converted.toFixed(2)}`;
}
