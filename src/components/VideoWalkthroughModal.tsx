import React, { useState } from 'react';
import { X, Play, Sparkles, CheckCircle2, ChevronRight, Compass, TrendingUp, ShieldCheck, Star, Search, Crown, Layers, ArrowRight } from 'lucide-react';

interface VideoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const VideoWalkthroughModal: React.FC<VideoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  if (!isOpen) return null;

  const slides = [
    {
      id: 'intro',
      title: 'Welcome to Retail Investing PRO',
      badge: 'Platform Overview',
      tagline: 'An institutional-grade intelligence platform modeled after InvestingPro, customized for retail investors.',
      videoPlaceholderColor: 'from-[#d4af37]/20 via-[#18181b] to-[#0a0a0a]',
      icon: Sparkles,
      keyHighlights: [
        'Proprietary 14-Model DCF Fair Value engine with real-time upside tracking.',
        'Algorithmic monthly Buy / Sell / Avoid tips for Indian (NSE) and US (NASDAQ) markets.',
        'RetailPicks™ AI compounder portfolios with audited multi-year backtesting.',
        'WarrenAI conversational financial analyst powered by real balance sheet data.'
      ],
      actionLabel: 'Explore Main Dashboard',
      targetTab: 'dashboard'
    },
    {
      id: 'monthly-signals',
      title: 'Monthly Buy / Sell / Avoid Signals',
      badge: 'Actionable Tips',
      tagline: 'Know exactly which stocks to invest in, which to hold, and which to avoid each month.',
      videoPlaceholderColor: 'from-emerald-500/20 via-[#18181b] to-[#0a0a0a]',
      icon: Compass,
      keyHighlights: [
        '🟢 Strong Buy & Accumulate: Identifies high-margin compounders trading at steep discounts.',
        '🟡 Hold & Monitor: Fairly valued cash-cow businesses to hold without chasing.',
        '🔴 Avoid & Sell: Alerts on overvalued stocks, high debt risks, or regulatory headwinds.',
        'Precise Target Buy Ranges, Retail Fair Value Targets, and Stop-Loss levels.'
      ],
      actionLabel: 'View Monthly Signals',
      targetTab: 'monthly-signals'
    },
    {
      id: 'fair-value',
      title: '14-Model DCF & Fair Value Engine',
      badge: 'Valuation Intelligence',
      tagline: 'See what a stock is truly worth using Wall Street quantitative financial modeling.',
      videoPlaceholderColor: 'from-amber-500/20 via-[#18181b] to-[#0a0a0a]',
      icon: TrendingUp,
      keyHighlights: [
        'Consensus intrinsic valuation combining 5-Year DCF, EBITDA multiples, and P/E spreads.',
        'Interactive Sandbox: Adjust WACC discount rates and revenue CAGR to see live revaluations.',
        'Wall Street vs. Proprietary Model consensus comparisons.',
        'Bear, Base, and Bull intrinsic valuation bands.'
      ],
      actionLabel: 'Inspect Fair Value Models',
      targetTab: 'fairvalue'
    },
    {
      id: 'indian-market',
      title: 'Indian Stock Market (NSE / BSE)',
      badge: 'Dalal Street Coverage',
      tagline: 'Comprehensive fundamental analysis for Indian equities in Rupees (₹).',
      videoPlaceholderColor: 'from-orange-500/20 via-[#18181b] to-[#0a0a0a]',
      icon: Layers,
      keyHighlights: [
        'Live ticker feeds for NIFTY 50 and SENSEX.',
        'Full financial health scores and 10-year statements for Reliance, HDFC Bank, TCS, Infosys, and more.',
        'Bharat Growth Champions AI: Algorithmic Indian equity portfolio outperforming NIFTY 50 by +965%.',
        'Instant market toggle between 🇮🇳 India and 🇺🇸 US equities in the navbar.'
      ],
      actionLabel: 'Switch to Indian Market',
      targetTab: 'dashboard'
    },
    {
      id: 'ai-analyst',
      title: 'WarrenAI Assistant & 13F Guru Tracker',
      badge: 'AI Research & Superinvestors',
      tagline: 'Ask complex valuation questions and mirror billionaire portfolio allocations.',
      videoPlaceholderColor: 'from-purple-500/20 via-[#18181b] to-[#0a0a0a]',
      icon: Star,
      keyHighlights: [
        'Chat with WarrenAI to analyze moat durability, debt safety, and earnings quality.',
        'Track SEC 13F filings of Warren Buffett, Ray Dalio, Michael Burry, and Mohnish Pabrai.',
        'Identify institutional accumulation and quarterly buy/sell moves.',
        'Advanced Screener with 1,000+ metrics to filter high-margin undervalued stocks.'
      ],
      actionLabel: 'Open WarrenAI Assistant',
      targetTab: 'ai-analyst'
    }
  ];

  const current = slides[activeSlide];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0a0a0a] border border-[#d4af37]/40 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#060606]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#d4af37] to-[#aa8a2e] flex items-center justify-center font-serif text-xs font-bold text-black">
              R
            </div>
            <span className="font-serif-display italic font-bold text-white text-base">
              Retail Investing <span className="text-[#d4af37]">PRO Video Walkthrough</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Presentation Stage */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Simulated Animated Video Screen */}
          <div className={`relative w-full h-56 sm:h-64 rounded-xl bg-gradient-to-br ${current.videoPlaceholderColor} border border-white/10 overflow-hidden flex flex-col justify-between p-6 shadow-inner`}>
            {/* Top Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="bg-[#d4af37] text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow">
                {current.badge}
              </span>
              <span className="text-xs font-mono-code text-zinc-400">
                Chapter {activeSlide + 1} / {slides.length}
              </span>
            </div>

            {/* Center Animated Visual Graphic */}
            <div className="flex flex-col items-center justify-center text-center z-10 space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-black/60 border border-[#d4af37]/40 flex items-center justify-center shadow-lg shadow-[#d4af37]/10">
                <Icon className="w-7 h-7 text-[#d4af37] animate-pulse" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-white tracking-tight">
                {current.title}
              </h2>
              <p className="text-xs text-zinc-300 max-w-lg">
                {current.tagline}
              </p>
            </div>

            {/* Video Progress Bar */}
            <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden z-10">
              <div
                className="bg-[#d4af37] h-full transition-all duration-300"
                style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Key Feature Bullet Points */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
              Key Capabilities in this Module:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {current.keyHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e0e0e] border border-white/5 p-3 rounded-xl flex items-start gap-2.5 text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Navigation Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === idx ? 'w-8 bg-[#d4af37]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#060606]">
          <button
            onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
            disabled={activeSlide === 0}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigateTab(current.targetTab);
                onClose();
              }}
              className="bg-[#d4af37] hover:bg-[#e5bd43] text-black text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20 transition-all hover:scale-105"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {activeSlide < slides.length - 1 ? (
              <button
                onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
              >
                Close Tour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
