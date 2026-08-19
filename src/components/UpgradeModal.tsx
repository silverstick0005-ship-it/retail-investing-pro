import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck, Crown, QrCode, CreditCard, Building2, Copy, CheckCircle2, ArrowRight, ArrowLeft, Lock, BadgePercent, HeartHandshake, PhoneCall } from 'lucide-react';
import { useSubscription } from '../context/SubscriptionContext';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const { setUserTier, isOwner } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<'PRO' | 'PRO_PLUS' | null>(null);
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('MONTHLY');
  const [paymentMethod, setPaymentMethod] = useState<'UPI_QR' | 'DEBIT_CREDIT_CARD'>('UPI_QR');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);
  const [isProcessingCard, setIsProcessingCard] = useState(false);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState<'Visa' | 'Mastercard' | 'RuPay' | 'Amex' | 'Debit/Credit'>('Debit/Credit');

  // OWNER PAYMENT DETAILS (Configured with your Paytm / HDFC UPI)
  const paymentConfig = {
    businessName: 'Retail Investor PRO',
    upiId: '8617793775@pthdfc', // Your verified Paytm / HDFC UPI ID
    accountNumber: '8617793775',
    ifscCode: 'HDFC0000001',
    bankName: 'HDFC Bank / Paytm Payments',
    accountHolder: 'Retail Investor PRO',
    supportEmail: 'silverstick0005@gmail.com',
    supportWhatsApp: '+91 8617793775',
  };

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').substring(0, 16);
    if (digits.startsWith('4')) setCardType('Visa');
    else if (digits.startsWith('5')) setCardType('Mastercard');
    else if (digits.startsWith('6') || digits.startsWith('8')) setCardType('RuPay');
    else if (digits.startsWith('3')) setCardType('Amex');
    else setCardType('Debit/Credit');

    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    setCardNumber(formatted);
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').substring(0, 4);
    if (digits.length >= 3) {
      setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setExpiryDate(digits);
    }
  };

  const handleCardPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 15) {
      alert('Please enter a valid 16-digit debit or credit card number.');
      return;
    }
    if (!cardHolder.trim()) {
      alert('Please enter the name on your card.');
      return;
    }
    if (expiryDate.length < 5) {
      alert('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cvv.length < 3) {
      alert('Please enter your 3-digit CVV / CVC.');
      return;
    }

    setIsProcessingCard(true);
    setTimeout(() => {
      setIsProcessingCard(false);
      setTransactionId(`TXN-CARD-${Math.floor(100000000 + Math.random() * 900000000)}`);
      setIsSuccessSubmitted(true);
    }, 1800);
  };

  // Option B: High-Conversion Sweet Spot Pricing
  const getPrice = (plan: 'PRO' | 'PRO_PLUS') => {
    if (currency === 'INR') {
      if (billingCycle === 'MONTHLY') {
        return plan === 'PRO' 
          ? { amount: '₹99', originalAmount: '₹499', period: '/ month', daily: 'Just ₹3.3/day', discount: '80% OFF' } 
          : { amount: '₹199', originalAmount: '₹999', period: '/ month', daily: 'Just ₹6.6/day', discount: '80% OFF' };
      } else {
        return plan === 'PRO' 
          ? { amount: '₹799', originalAmount: '₹2,999', period: '/ full year (₹66/mo)', daily: 'Just ₹2.2/day', discount: '73% OFF' } 
          : { amount: '₹1,499', originalAmount: '₹5,999', period: '/ full year (₹124/mo)', daily: 'Just ₹4.1/day', discount: '75% OFF' };
      }
    } else {
      if (billingCycle === 'MONTHLY') {
        return plan === 'PRO' 
          ? { amount: '$1.49', originalAmount: '$7.99', period: '/ month', daily: '$0.05/day', discount: '80% OFF' } 
          : { amount: '$2.99', originalAmount: '$14.99', period: '/ month', daily: '$0.10/day', discount: '80% OFF' };
      } else {
        return plan === 'PRO' 
          ? { amount: '$9.99', originalAmount: '$39.99', period: '/ full year', daily: '$0.03/day', discount: '75% OFF' } 
          : { amount: '$19.99', originalAmount: '$79.99', period: '/ full year', daily: '$0.05/day', discount: '75% OFF' };
      }
    }
  };

  const currentPrice = selectedPlan ? getPrice(selectedPlan) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0c0c0c] border border-[#d4af37]/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[94vh] flex flex-col">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#d4af37]/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={() => {
            setSelectedPlan(null);
            setIsSuccessSubmitted(false);
            onClose();
          }}
          className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* VIEW 1: AFFORDABLE PRICING PLANS VIEW */}
        {!selectedPlan && (
          <div className="overflow-y-auto pr-1 space-y-5">
            {/* Modal Header */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 animate-pulse">
                <BadgePercent className="w-4 h-4 text-emerald-400" />
                <span>EARLY-BIRD LAUNCH OFFER • 80% DISCOUNT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-display italic font-bold text-white tracking-tight">
                Institutional Stock Intelligence for Retail Investors
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
                Join our early members with an introductory price — less than the cost of one single trade brokerage!
              </p>

              {/* Toggles: Currency + Billing Cycle */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                {/* Monthly / Annual Toggle */}
                <div className="inline-flex items-center bg-[#181818] border border-white/10 rounded-xl p-1 text-xs font-bold">
                  <button
                    onClick={() => setBillingCycle('MONTHLY')}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      billingCycle === 'MONTHLY' ? 'bg-[#d4af37] text-black shadow' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Monthly (Cancel Anytime)
                  </button>
                  <button
                    onClick={() => setBillingCycle('ANNUAL')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      billingCycle === 'ANNUAL' ? 'bg-[#d4af37] text-black shadow' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>Annual (Save Extra 30%)</span>
                  </button>
                </div>

                {/* INR / USD Currency Toggle */}
                <div className="inline-flex items-center bg-[#181818] border border-white/10 rounded-xl p-1 text-xs font-bold">
                  <button
                    onClick={() => setCurrency('INR')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      currency === 'INR' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🇮🇳 INR (₹) / UPI</span>
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                      currency === 'USD' ? 'bg-white/20 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🇺🇸 USD ($)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Tier Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
              {/* Pro Tier (Super Affordable Entry) */}
              <div className="bg-[#121212] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all group">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-white">Retail Investing PRO</h3>
                    <span className="text-[10px] uppercase font-extrabold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                      {getPrice('PRO').discount}
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="my-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono-code font-extrabold text-white">
                        {getPrice('PRO').amount}
                      </span>
                      <span className="text-sm text-zinc-500 line-through font-mono-code">
                        {getPrice('PRO').originalAmount}
                      </span>
                      <span className="text-xs text-zinc-400">{getPrice('PRO').period}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-semibold mt-1">
                      ⚡ {getPrice('PRO').daily} • Zero financial commitment
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 mb-4">
                    Ideal for individual retail investors looking for DCF Fair Value targets & AI stock picks.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    {[
                      '100% Ad-Free Institutional Workspace',
                      'Full Access to 4+ AI ProPicks Portfolios',
                      'Fair Value Intrinsic Valuation Engine (14 Models)',
                      'Financial Health Scores (1.0 to 5.0 Rating)',
                      'Up to 5 Years Historical Financial Statements',
                      'Monthly Buy / Hold / Avoid Stock Matrix'
                    ].map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-zinc-300">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlan('PRO')}
                  className="mt-6 w-full bg-white/10 hover:bg-[#d4af37] hover:text-black text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Get Started for {getPrice('PRO').amount}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pro+ Tier (Maximum Power & Value) */}
              <div className="bg-[#15130b] border-2 border-[#d4af37] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl relative">
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  RECOMMENDED BY TRADERS
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-[#d4af37]">Retail Investing PRO+</h3>
                    <Sparkles className="w-5 h-5 text-[#d4af37]" />
                  </div>

                  {/* Price Block */}
                  <div className="my-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-mono-code font-extrabold text-[#d4af37]">
                        {getPrice('PRO_PLUS').amount}
                      </span>
                      <span className="text-sm text-zinc-500 line-through font-mono-code">
                        {getPrice('PRO_PLUS').originalAmount}
                      </span>
                      <span className="text-xs text-zinc-400">{getPrice('PRO_PLUS').period}</span>
                    </div>
                    <div className="text-[11px] text-[#d4af37] font-semibold mt-1">
                      ⭐ {getPrice('PRO_PLUS').daily} • Unlimited Institutional Access
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 mb-4">
                    Institutional-grade quantitative arsenal with 10+ years data, custom formulas, and Guru tracking.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    {[
                      'Everything in Pro included',
                      '10+ Years Standardized Financial Statements',
                      'Unlimited CSV & Excel Institutional Exports',
                      'Custom DCF Model Assumptions Sandbox',
                      'SEC 13F Billionaire & Jhunjhunwala Tracker',
                      'WarrenAI Interactive Chat Assistant',
                      'Priority Real-Time NSE / NASDAQ API Data Feeds'
                    ].map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-zinc-200">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlan('PRO_PLUS')}
                  className="mt-6 w-full bg-gradient-to-r from-[#d4af37] to-[#f59e0b] hover:from-[#e5bd43] hover:to-[#fbbf24] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-1.5 transition-all transform hover:scale-[1.02]"
                >
                  <span>Get Pro+ for {getPrice('PRO_PLUS').amount}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TRUST GUARANTEE BANNER */}
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white">100% Risk-Free 7-Day Money Back Guarantee:</span>
                  <span className="text-zinc-400 ml-1">If you don't find high-conviction value, get an instant full refund.</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-zinc-400 shrink-0">
                <span>🔒 SSL 256-Bit Encrypted</span>
                <span>⚡ Instant Activation</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: PAYMENT CHECKOUT SCREEN */}
        {selectedPlan && !isSuccessSubmitted && (
          <div className="overflow-y-auto pr-1 space-y-5 animate-fadeIn">
            {/* Header & Back Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Plan</span>
              </button>

              <div className="text-right">
                <span className="text-xs text-zinc-400">Selected Plan: </span>
                <span className="text-xs font-bold text-[#d4af37]">
                  {selectedPlan === 'PRO_PLUS' ? `PRO+ (${currentPrice?.amount})` : `PRO (${currentPrice?.amount})`}
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-[#121212] p-1.5 rounded-2xl border border-white/5">
              <button
                onClick={() => setPaymentMethod('UPI_QR')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'UPI_QR'
                    ? 'bg-[#d4af37] text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <QrCode className="w-4 h-4 shrink-0" />
                <span className="truncate">UPI / QR Code</span>
              </button>

              <button
                onClick={() => setPaymentMethod('DEBIT_CREDIT_CARD')}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'DEBIT_CREDIT_CARD'
                    ? 'bg-[#d4af37] text-black shadow'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span className="truncate">Debit / Credit Card</span>
              </button>
            </div>

            {/* TAB 1: UPI & QR CODE PAYMENT (Most Trusted in India) */}
            {paymentMethod === 'UPI_QR' && (
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6">
                {/* Visual QR Code in Paytm / HDFC format */}
                <div className="flex flex-col items-center p-3.5 bg-white rounded-3xl shadow-2xl shrink-0 border-4 border-[#00b9f1] relative overflow-hidden">
                  <div className="w-full flex justify-between items-center px-1 mb-1.5 text-[9px] font-extrabold uppercase text-[#002970] tracking-wider">
                    <span>Paytm / HDFC UPI</span>
                    <span className="text-[#00b9f1]">Instant Pay</span>
                  </div>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${paymentConfig.upiId}%26pn=${encodeURIComponent(paymentConfig.businessName)}%26am=${currentPrice?.amount.replace(/\D/g, '')}%26cu=INR`}
                    alt="Scan UPI QR Code"
                    className="w-44 h-44 rounded-xl"
                  />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-extrabold text-[#002970] block uppercase tracking-wider">
                      Scan via GPay / PhonePe / Paytm
                    </span>
                    <span className="text-[9px] font-mono-code font-bold text-zinc-600 block mt-0.5">
                      {paymentConfig.upiId}
                    </span>
                  </div>
                </div>

                {/* UPI Details & Instructions */}
                <div className="flex-1 space-y-3.5 w-full">
                  <div>
                    <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                      <span>Instant UPI Payment</span>
                      <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                        0% Extra Fees
                      </span>
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Scan the QR code with any UPI app (Google Pay, PhonePe, Paytm, BHIM, CRED) or copy the UPI ID below.
                    </p>
                  </div>

                  {/* UPI ID Field */}
                  <div className="bg-black/60 border border-white/10 rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase">Payee UPI ID</div>
                      <div className="text-sm font-mono-code font-bold text-[#d4af37]">
                        {paymentConfig.upiId}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(paymentConfig.upiId, 'upi')}
                      className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      {copiedField === 'upi' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Amount to Pay */}
                  <div className="flex items-center justify-between text-xs py-1 border-t border-white/5">
                    <span className="text-zinc-400">Total Payable Amount:</span>
                    <div className="text-right">
                      <span className="text-base font-bold text-white font-mono-code">
                        {currentPrice?.amount}
                      </span>
                      <span className="text-[10px] text-emerald-400 ml-1.5 font-bold">({currentPrice?.discount})</span>
                    </div>
                  </div>

                  {/* Transaction ID Confirmation Input */}
                  <div className="space-y-2 pt-1 border-t border-white/5">
                    <label className="text-xs text-zinc-300 font-medium">
                      Enter UPI Ref / UTR / Transaction ID (12-digits):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 423910847291"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono-code focus:outline-none focus:border-[#d4af37]"
                      />
                      <button
                        onClick={() => {
                          if (transactionId.trim()) {
                            setIsSuccessSubmitted(true);
                          } else {
                            alert('Please enter your 12-digit UPI Transaction Ref ID after making the payment.');
                          }
                        }}
                        className="bg-[#d4af37] hover:bg-[#e5bd43] text-black font-bold text-xs px-4 py-2 rounded-xl whitespace-nowrap shadow-md shadow-[#d4af37]/20 transition-all"
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: DEBIT CARD & CREDIT CARD CHECKOUT */}
            {paymentMethod === 'DEBIT_CREDIT_CARD' && (
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-5">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column: Visual Card */}
                  <div className="lg:w-5/12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>Debit & Credit Card</span>
                        </h4>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          256-Bit SSL Secure
                        </span>
                      </div>

                      {/* Visual Debit/Credit Card */}
                      <div className="bg-gradient-to-tr from-[#1b1912] via-[#242116] to-[#3a331c] border border-[#d4af37]/40 rounded-2xl p-4 text-white shadow-2xl relative overflow-hidden my-2">
                        <div className="flex justify-between items-center mb-5">
                          <div className="w-8 h-6 bg-[#d4af37]/60 rounded-md border border-[#d4af37] flex items-center justify-center">
                            <div className="w-5 h-3 border border-black/40 rounded-sm"></div>
                          </div>
                          <span className="text-xs font-extrabold uppercase tracking-widest text-[#d4af37] font-mono-code">
                            {cardType}
                          </span>
                        </div>

                        <div className="font-mono-code text-sm sm:text-base tracking-widest text-zinc-100 mb-5 drop-shadow">
                          {cardNumber || '•••• •••• •••• ••••'}
                        </div>

                        <div className="flex justify-between items-end text-xs">
                          <div>
                            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Card Holder</div>
                            <div className="font-medium tracking-wide uppercase text-zinc-200 truncate max-w-[130px]">
                              {cardHolder || 'FULL NAME'}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] uppercase tracking-wider text-zinc-400">Expires</div>
                            <div className="font-mono-code text-zinc-200">
                              {expiryDate || 'MM/YY'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-zinc-400 uppercase font-mono-code">
                        <span className="px-2 py-0.5 bg-white/5 rounded">Visa</span>
                        <span className="px-2 py-0.5 bg-white/5 rounded">Mastercard</span>
                        <span className="px-2 py-0.5 bg-white/5 rounded">RuPay</span>
                        <span className="px-2 py-0.5 bg-white/5 rounded">Amex</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-400 mt-3 border-t border-white/5 pt-2 flex justify-between items-center">
                      <span>Total to charge:</span>
                      <span className="text-base font-bold font-mono-code text-white">
                        {currentPrice?.amount}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Card Payment Form */}
                  <form onSubmit={handleCardPaymentSubmit} className="lg:w-7/12 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma or Alex Turner"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">
                        Card Number (Debit or Credit)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="4532 8921 4820 9182"
                          value={cardNumber}
                          onChange={(e) => formatCardNumber(e.target.value)}
                          maxLength={19}
                          className="w-full bg-black/60 border border-white/15 rounded-xl pl-3 pr-9 py-2 text-xs font-mono-code text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]"
                          required
                        />
                        <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">
                          Expiry Date (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => formatExpiry(e.target.value)}
                          maxLength={5}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono-code text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-300 mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                          maxLength={4}
                          className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono-code text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#d4af37]"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingCard}
                      className="w-full mt-3 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] hover:from-[#e5bd43] hover:to-[#fbbf24] text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-50"
                    >
                      {isProcessingCard ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Authenticating Card with Bank...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Pay {currentPrice?.amount} Now</span>
                        </>
                      )}
                    </button>

                    <div className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Encrypted with bank-grade AES-256 cipher</span>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: PAYMENT CONFIRMATION SUCCESS VIEW */}
        {isSuccessSubmitted && (
          <div className="text-center py-8 px-4 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-display font-bold text-white">
              Payment Successful & Verified!
            </h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto">
              Thank you! Your transaction reference <span className="font-mono-code text-[#d4af37] font-bold">"{transactionId}"</span> has been recorded. Your Pro workspace privileges are active.
            </p>
            <button
              onClick={() => {
                setUserTier(selectedPlan === 'PRO_PLUS' ? 'PRO_PLUS' : 'PRO');
                setSelectedPlan(null);
                setIsSuccessSubmitted(false);
                onClose();
              }}
              className="bg-[#d4af37] hover:bg-[#e5bd43] text-black font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-[#d4af37]/20 transition-all"
            >
              Access Pro Workspace Now
            </button>
          </div>
        )}

        <div className="text-center mt-3 text-[10px] text-zinc-500 uppercase tracking-widest shrink-0">
          Risk-Free Guarantee • Cancel Anytime • Instant Activation
        </div>
      </div>
    </div>
  );
};
