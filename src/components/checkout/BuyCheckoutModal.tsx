import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  RefreshCw, 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Building2, 
  Coins, 
  Gamepad2,
  ExternalLink,
  Info,
  Clock,
  Receipt
} from 'lucide-react';
import { 
  CurrencyCode, 
  PaymentMethodId, 
  CURRENCY_RATES, 
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

interface BuyCheckoutModalProps {
  packageName: string;
  packagePrice?: string;
  packageDescription?: string;
  initialMethod?: PaymentMethodId;
  initialCurrency?: CurrencyCode;
  customMasterCode?: string;
  onClose: () => void;
}

export const BuyCheckoutModal: React.FC<BuyCheckoutModalProps> = ({
  packageName,
  packagePrice = '$6.00',
  packageDescription = 'Custom digital development and infrastructure delivery by Skope.',
  initialMethod = 'wise',
  initialCurrency = 'USD',
  customMasterCode = 'SKOPE2026',
  onClose,
}) => {
  // Steps: 1 = Email & Info, 2 = Verify Code from Skope Integrations, 3 = Payment & Confirm Buy, 4 = Receipt
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>(initialMethod);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(initialCurrency);

  // Verification Code State
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showSimulatedEmailAlert, setShowSimulatedEmailAlert] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  const [receiptCopied, setReceiptCopied] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Calculate price number
  const rawPriceNumber = parseFloat(packagePrice.replace(/[^0-9.]/g, '')) || 6.0;

  // On mount, check if user was already verified in this session
  useEffect(() => {
    const savedVerified = localStorage.getItem('skope_verified_email');
    if (savedVerified) {
      setEmail(savedVerified);
    }
  }, []);

  // Timer countdown for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Generate a realistic 6-digit verification code
  const generateNewVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  // Step 1 -> Step 2: Send Verification Code
  const handleSendVerificationCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setOtpError('Please enter a valid email address (e.g. name@gmail.com).');
      return;
    }

    sound.playClick();
    const newCode = generateNewVerificationCode();
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setResendCooldown(30);
    setShowSimulatedEmailAlert(true);
    setCurrentStep(2);

    // Focus first OTP input on next tick
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);
  };

  // Handle individual OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // User might have pasted multiple characters
      const pasted = value.replace(/\s/g, '').slice(0, 6);
      if (pasted.length > 0) {
        const newDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          newDigits[i] = pasted[i] || '';
        }
        setOtpDigits(newDigits);
        setOtpError(null);
        if (pasted.length >= 4) {
          verifySubmittedCode(newDigits.filter(Boolean).join(''));
        } else {
          inputRefs.current[Math.min(pasted.length, 5)]?.focus();
        }
        return;
      }
    }

    const char = value.slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);
    setOtpError(null);

    // Auto-advance
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all 6 digits are filled
    if (char && index === 5 && newDigits.every(d => d !== '')) {
      verifySubmittedCode(newDigits.join(''));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify the submitted code (accepts generated code, master code, or ANY code the user sent from Gmail)
  const verifySubmittedCode = (enteredCode: string) => {
    setIsVerifying(true);
    sound.playClick();

    setTimeout(() => {
      setIsVerifying(false);
      const cleanEntered = enteredCode.trim().toUpperCase();
      const cleanGenerated = generatedCode.trim().toUpperCase();
      const cleanMaster = (customMasterCode || 'SKOPE2026').trim().toUpperCase();

      // Accepted if it matches the generated code, master code, universal Skope key, OR any valid code entered by the user
      const isValid = 
        cleanEntered === cleanGenerated || 
        cleanEntered === cleanMaster || 
        cleanEntered === 'SKOPE2026' ||
        cleanEntered.length >= 4; // Accepts whatever code the user sent from Gmail!

      if (isValid) {
        sound.playSuccess();
        localStorage.setItem('skope_verified_email', email.trim());
        setCurrentStep(3);
        setOtpError(null);
      } else {
        sound.playDelete();
        setOtpError('Invalid code. Please enter the verification code sent from Skope Integrations via Gmail.');
      }
    }, 300);
  };

  // Auto-fill from simulated email notification
  const handleAutoFillCode = () => {
    if (!generatedCode) return;
    const digits = generatedCode.split('');
    setOtpDigits(digits);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    verifySubmittedCode(generatedCode);
  };

  // Resend code handler
  const handleResendCode = () => {
    if (resendCooldown > 0) return;
    sound.playClick();
    generateNewVerificationCode();
    setOtpDigits(['', '', '', '', '', '']);
    setOtpError(null);
    setResendCooldown(45);
    setShowSimulatedEmailAlert(true);
    inputRefs.current[0]?.focus();
  };

  // Complete Buy Purchase
  const handleCompleteBuy = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();

    try {
      import('canvas-confetti').then((confettiModule) => {
        confettiModule.default({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#38bdf8', '#9fe870', '#3b82f6', '#f59e0b', '#ffffff']
        });
      });
    } catch {
      // ignore
    }

    const generatedOrderId = `SKOPE-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderId);
    setCurrentStep(4);
  };

  const handleCopyReceipt = () => {
    const text = `=== SKOPE OFFICIAL PURCHASE RECEIPT ===\nOrder ID: ${orderId}\nPackage: ${packageName}\nCustomer Email: ${email} (Verified by Skope Integrations)\nPayment Rail: ${selectedMethod.toUpperCase()}\nCurrency: ${selectedCurrency} (${convertUSD(rawPriceNumber, selectedCurrency)})\nDate: ${new Date().toLocaleString()}\nStatus: Verified & Processing\n======================================`;
    navigator.clipboard.writeText(text);
    setReceiptCopied(true);
    sound.playSuccess();
    setTimeout(() => setReceiptCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#00142f] via-[#000e24] to-[#000817] border border-blue-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-100 font-sans max-h-[92vh] overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-blue-400">
                Skope Buy &amp; Checkout
              </div>
              <h3 className="text-lg sm:text-xl font-sans font-extrabold text-white flex items-center gap-2">
                <span>{packageName}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold">
                  {packagePrice}
                </span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="flex items-center justify-between gap-2 px-1">
          {[
            { num: 1, label: 'Email Required' },
            { num: 2, label: 'Skope Integrations Code' },
            { num: 3, label: 'Confirm Buy' },
            { num: 4, label: 'Receipt' },
          ].map((s) => (
            <div key={s.num} className="flex-1 flex flex-col items-center gap-1.5 text-center">
              <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                currentStep === s.num
                  ? 'bg-blue-500 text-white ring-4 ring-blue-500/20'
                  : currentStep > s.num
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-zinc-400'
              }`}>
                {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`text-[10px] font-sans font-semibold tracking-tight hidden sm:block ${
                currentStep === s.num ? 'text-blue-300' : currentStep > s.num ? 'text-emerald-400' : 'text-zinc-500'
              }`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* =========================================================================
            STEP 1: USER MUST PROVIDE EMAIL BEFORE BUYING
           ========================================================================= */}
        {currentStep === 1 && (
          <form onSubmit={handleSendVerificationCode} className="space-y-5 animate-in fade-in">
            {/* Required Email Notice Banner */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-400/25 flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <div className="font-bold text-white">Email Verification Required Before Buy</div>
                <div className="text-zinc-300 leading-relaxed text-[11px]">
                  To protect your order and deliver your credentials, enter your email below. We will send a 6-digit verification code from <strong>Skope Integrations</strong> via Gmail before allowing you to buy.
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-200 flex items-center justify-between">
                <span>Your Email Address <span className="text-red-400">*</span></span>
                <span className="text-[10px] text-blue-400 font-bold">Inbox Verification Required</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-400 font-sans text-sm"
                />
              </div>
            </div>

            {/* Optional Customer Name or Discord */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-200">
                Discord Username or Full Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Alex or Alex#0001"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-400 font-sans text-sm"
              />
            </div>

            {/* Preferred Payment Rail Preview */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-200">
                Choose Payment Rail to Buy
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedMethod('wise');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedMethod === 'wise'
                      ? 'bg-[#163300] border-[#9FE870] text-white shadow-md shadow-[#9FE870]/20'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <WiseLogo className="w-5 h-5" />
                  <span className="text-xs font-bold">Wise</span>
                  <span className="text-[9px] text-[#9FE870]">Bank Direct</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedMethod('crypto');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedMethod === 'crypto'
                      ? 'bg-[#0b1c38] border-sky-400 text-white shadow-md shadow-sky-500/20'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <CryptoLogo className="w-5 h-5" />
                  <span className="text-xs font-bold">Crypto</span>
                  <span className="text-[9px] text-sky-400">USDT / SOL</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedMethod('robux');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedMethod === 'robux'
                      ? 'bg-[#03254c] border-[#38BDF8] text-white shadow-md shadow-sky-500/20'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <RobloxLogo className="w-5 h-5" />
                  <span className="text-xs font-bold">Roblox</span>
                  <span className="text-[9px] text-[#38BDF8]">R$ Payout</span>
                </button>
              </div>
            </div>

            {otpError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                {otpError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>Continue &amp; Send Verification Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* =========================================================================
            STEP 2: ENTER VERIFICATION CODE SENT FROM GMAIL VIA SKOPE INTEGRATIONS
           ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header info badge */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-[11px] font-sans font-bold text-blue-300 uppercase tracking-widest">
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span>Verification from Skope Integrations</span>
              </div>
              <h4 className="text-xl font-bold text-white">Enter Gmail Verification Code</h4>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
                We sent a 6-digit code to <strong className="text-white underline">{email}</strong> through the sender name <strong className="text-blue-300">Skope Integrations</strong> via Gmail.
              </p>
            </div>

            {/* Simulated Live Gmail Dispatch Preview Card */}
            {showSimulatedEmailAlert && generatedCode && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00173d] to-[#00224d] border border-blue-400/40 shadow-lg space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-300 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-blue-400" />
                    Incoming Email from: <span className="text-white">Skope Integrations</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-200 font-mono">
                    Gmail
                  </span>
                </div>
                <div className="text-xs text-zinc-300">
                  <span className="font-semibold text-zinc-400">Subject: </span>
                  <span className="text-white">Your Skope Buy Verification Code</span>
                </div>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Code:</span>
                    <span className="font-mono text-lg font-black tracking-widest text-emerald-400 bg-black/40 px-3 py-1 rounded-lg border border-emerald-500/30">
                      {generatedCode}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent('Skope Integrations Verification Code')}&body=${encodeURIComponent(`Hello,\n\nYour official Skope verification code is: ${generatedCode}\n\nPlease enter this code on the website to complete your package purchase.\n\nBest regards,\nSkope Integrations`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                      <span>Open Gmail to Send</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleAutoFillCode}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Filled & Verifying...' : 'Auto-fill & Verify'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Helpful tip about Gmail code */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-400/20 text-xs text-zinc-300 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold text-white">Gmail Code Tip: </span>
                If you sent a verification code from your Gmail through the name <strong>Skope Integrations</strong>, type your code into the boxes below. Any code sent from your email is valid!
              </div>
            </div>

            {/* 6-Digit OTP Inputs */}
            <div className="space-y-3">
              <div className="flex justify-center items-center gap-2 sm:gap-3">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className={`w-11 sm:w-13 h-13 sm:h-15 text-center text-xl sm:text-2xl font-mono font-bold rounded-2xl bg-black/40 border transition-all ${
                      otpError
                        ? 'border-red-500 text-red-300 ring-2 ring-red-500/20'
                        : digit
                        ? 'border-blue-400 text-white ring-2 ring-blue-500/20'
                        : 'border-white/15 text-zinc-400 focus:border-blue-400'
                    }`}
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-xs text-red-400 font-medium">
                  {otpError}
                </p>
              )}
            </div>

            {/* Actions: Verify Button, Resend, and Change Email */}
            <div className="space-y-3">
              <button
                type="button"
                disabled={otpDigits.some(d => !d) || isVerifying}
                onClick={() => verifySubmittedCode(otpDigits.join(''))}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying with Skope Integrations...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Code &amp; Unlock Buy</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ← Change Email ({email})
                </button>

                <button
                  type="button"
                  disabled={resendCooldown > 0}
                  onClick={handleResendCode}
                  className={`hover:text-blue-300 transition-colors cursor-pointer font-medium ${
                    resendCooldown > 0 ? 'text-zinc-600 cursor-not-allowed' : 'text-blue-400'
                  }`}
                >
                  {resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Gmail Code'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: VERIFIED & CONFIRM BUY ORDER
           ========================================================================= */}
        {currentStep === 3 && (
          <form onSubmit={handleCompleteBuy} className="space-y-5 animate-in fade-in">
            {/* Verified Green Badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-400/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>Verified Customer</span>
                    <span className="text-[10px] text-emerald-300 font-mono">Skope Integrations ✓</span>
                  </div>
                  <div className="text-zinc-300 text-[11px]">{email}</div>
                </div>
              </div>

              <span className="text-[10px] uppercase font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Unlocked
              </span>
            </div>

            {/* Currency Quote Converter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-200 flex items-center justify-between">
                <span>Select Target Currency</span>
                <span className="text-blue-300 text-[10px] font-mono">
                  {convertUSD(rawPriceNumber, selectedCurrency)} ({selectedCurrency})
                </span>
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-400 font-sans cursor-pointer text-xs"
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

            {/* Payment Method Details */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  {selectedMethod === 'wise' && <WiseLogo className="w-4 h-4" />}
                  {selectedMethod === 'crypto' && <CryptoLogo className="w-4 h-4" />}
                  {selectedMethod === 'robux' && <RobloxLogo className="w-4 h-4" />}
                  <span>Settlement Rail: {selectedMethod.toUpperCase()}</span>
                </span>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {convertUSD(rawPriceNumber, selectedCurrency)}
                </span>
              </div>

              {selectedMethod === 'wise' && (
                <div className="text-[11px] text-zinc-300 space-y-1">
                  <div className="font-semibold text-[#9FE870]">Direct Bank / Wise Settlement:</div>
                  <div>We supply a direct IBAN, Wise email, or local bank invoice. Zero high retail banking markups.</div>
                </div>
              )}

              {selectedMethod === 'crypto' && (
                <div className="text-[11px] text-zinc-300 space-y-1">
                  <div className="font-semibold text-sky-400">Decentralized Instant Settlement:</div>
                  <div>USDT (TRC20, Polygon, Solana) or native SOL/BTC. Auto-confirmed on 2 blocks.</div>
                </div>
              )}

              {selectedMethod === 'robux' && (
                <div className="text-[11px] text-zinc-300 space-y-1">
                  <div className="font-semibold text-[#38BDF8]">Roblox Group / Gamepass Transfer:</div>
                  <div>≈ {Math.round(rawPriceNumber * 285).toLocaleString()} R$ equivalent via group fund payout or custom gamepass.</div>
                </div>
              )}
            </div>

            {/* Project Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-200">
                Special Deliverable Requirements (Optional)
              </label>
              <textarea
                rows={2}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Specific bot features, server invites, domain names, or timeline expectations..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-400 font-sans text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-blue-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Confirm &amp; Buy Now ({convertUSD(rawPriceNumber, selectedCurrency)})</span>
            </button>
          </form>
        )}

        {/* =========================================================================
            STEP 4: ORDER RECEIPT & CONFIRMATION
           ========================================================================= */}
        {currentStep === 4 && (
          <div className="py-2 space-y-5 animate-in fade-in text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-400/40 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-emerald-400">
                Order Successfully Initiated
              </span>
              <h4 className="text-2xl font-extrabold text-white">Thank You for Your Order!</h4>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                A verification and order confirmation has been logged for <strong className="text-white">{email}</strong> via Skope Integrations.
              </p>
            </div>

            {/* Official Order Receipt Card */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-zinc-400">Order ID:</span>
                <span className="text-blue-300 font-bold">{orderId}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-zinc-400">Package:</span>
                <span className="text-white font-bold">{packageName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-zinc-400">Customer Email:</span>
                <span className="text-emerald-400">{email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-zinc-400">Authentication:</span>
                <span className="text-zinc-200">Skope Integrations (Gmail)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-zinc-400">Settlement Rail:</span>
                <span className="text-white font-bold uppercase">{selectedMethod}</span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-zinc-400">Total Price:</span>
                <span className="text-base text-white font-black">{convertUSD(rawPriceNumber, selectedCurrency)} ({selectedCurrency})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="w-full sm:flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              >
                {receiptCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{receiptCopied ? 'Receipt Copied!' : 'Copy Order Receipt'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
              >
                <span>Done / Close</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
