import React, { useState } from 'react';
import { Crown, Sparkles, Lock, ArrowRight, ShieldCheck, CheckCircle2, KeyRound } from 'lucide-react';
import { useSubscription, OWNER_EMAIL } from '../context/SubscriptionContext';

interface PaywallOverlayProps {
  title?: string;
  description?: string;
  onOpenUpgradeModal: () => void;
  children: React.ReactNode;
  featureKey: 'pro-picks' | 'guru' | 'signals' | 'ai-deep-dive' | 'unlimited-search' | 'dcf-models';
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
  title = 'Institutional Pro Access Required',
  description = 'Unlock 14-Model DCF Fair Values, ProPicks AI outperforming strategies (+1,782%), and monthly buy/sell signals.',
  onOpenUpgradeModal,
  children,
  featureKey,
}) => {
  const { hasAccessTo, isOwner, userTier, unlockWithCode, loginAsOwner } = useSubscription();
  const [accessCode, setAccessCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeError, setCodeError] = useState('');

  // If user is Owner or has active Pro subscription, render full unblocked children
  if (hasAccessTo(featureKey)) {
    return <>{children}</>;
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAsOwner(accessCode) || unlockWithCode(accessCode)) {
      setCodeError('');
      setShowCodeInput(false);
    } else {
      setCodeError('Invalid access code or UPI ref ID.');
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30">
      {/* Blurred & Gated Content Background */}
      <div className="pointer-events-none filter blur-md select-none opacity-40 max-h-[480px] overflow-hidden">
        {children}
      </div>

      {/* Floating Institutional Glass Paywall Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm">
        <div className="max-w-md w-full bg-gradient-to-b from-[#16140d] via-[#100f0a] to-[#080808] border border-[#d4af37]/50 rounded-3xl p-6 text-center shadow-2xl shadow-black/90 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#f59e0b] text-black flex items-center justify-center mx-auto shadow-lg shadow-[#d4af37]/30">
            <Crown className="w-7 h-7 fill-black" />
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/15 px-2.5 py-1 rounded-full border border-[#d4af37]/30">
              Exclusive Pro Feature
            </span>
            <h3 className="text-xl font-serif-display font-bold text-white mt-2.5">
              {title}
            </h3>
            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Value Bullet Points */}
          <div className="bg-black/60 border border-white/10 rounded-2xl p-3.5 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>14 Intrinsic DCF & Multiples Valuation Models</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Verified ProPicks AI +1,782% Alpha Portfolios</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>NSE & NASDAQ Monthly Buy / Sell Rating Matrix</span>
            </div>
          </div>

          {/* Pricing CTA Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={onOpenUpgradeModal}
              className="w-full bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#e5bd43] hover:from-[#e5bd43] hover:to-[#fbbf24] text-black font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-[#d4af37]/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Unlock Instant Access for ₹99/mo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
              <button
                onClick={() => setShowCodeInput(!showCodeInput)}
                className="hover:text-[#d4af37] flex items-center gap-1 transition-colors underline"
              >
                <KeyRound className="w-3 h-3" />
                <span>Have an Owner PIN or UPI Ref ID?</span>
              </button>

              <span className="text-zinc-500">Scan & Pay via Paytm/HDFC QR</span>
            </div>

            {/* Access Code Input */}
            {showCodeInput && (
              <form onSubmit={handleCodeSubmit} className="pt-2 flex gap-2">
                <input
                  type="password"
                  placeholder="Enter Owner PIN (8617793775) or UPI ID"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="flex-1 bg-black/80 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white font-mono-code focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  type="submit"
                  className="bg-[#d4af37] hover:bg-[#e5bd43] text-black font-bold text-xs px-3 py-1.5 rounded-xl whitespace-nowrap"
                >
                  Activate
                </button>
              </form>
            )}

            {codeError && <div className="text-[10px] text-rose-400">{codeError}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
