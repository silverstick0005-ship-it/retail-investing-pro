import React from 'react';
import { Stock } from '../types';
import { Bookmark, Sparkles, TrendingUp, TrendingDown, ArrowUpRight, ShieldCheck, Share2, Info, Building2, Compass, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface StockHeaderProps {
  stock: Stock;
  onOpenAIDeepDive: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onSelectTab: (tab: string) => void;
}

export const StockHeader: React.FC<StockHeaderProps> = ({
  stock,
  onOpenAIDeepDive,
  isBookmarked,
  onToggleBookmark,
  onSelectTab
}) => {
  const isPos = stock.change >= 0;
  const fiftyTwoWeekPct = Math.min(
    100,
    Math.max(
      0,
      ((stock.price - stock.fiftyTwoWeekLow) / (stock.fiftyTwoWeekHigh - stock.fiftyTwoWeekLow)) * 100
    )
  );

  const sig = stock.monthlySignal;
  const isBuy = sig.action === 'STRONG BUY' || sig.action === 'ACCUMULATE';
  const isAvoid = sig.action === 'AVOID / DO NOT BUY' || sig.action === 'TAKE PROFIT';

  const getSignalBadgeColor = () => {
    if (sig.action === 'STRONG BUY') return 'bg-emerald-500/20 text-[#10b981] border-emerald-500/40';
    if (sig.action === 'ACCUMULATE') return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/40';
    if (sig.action === 'HOLD') return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    return 'bg-rose-500/20 text-[#ef4444] border-rose-500/40';
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-2xl">
      {/* Background Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Company Info & Ticker */}
        <div>
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            <span className="bg-[#d4af37]/15 text-[#d4af37] text-xs font-mono-code font-bold px-2.5 py-1 rounded border border-[#d4af37]/30">
              {stock.exchange}: {stock.ticker}
            </span>
            <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-zinc-500" />
              {stock.sector} • {stock.industry}
            </span>
            {/* Monthly Signal Quick Chip */}
            <button
              onClick={() => onSelectTab('monthly-signals')}
              className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 transition-transform hover:scale-105 ${getSignalBadgeColor()}`}
              title="Click to view Monthly Action Strategy"
            >
              <Compass className="w-3 h-3" />
              <span>Monthly Signal: {sig.action} ({sig.ratingScore}/10)</span>
            </button>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif-display italic font-bold text-white tracking-tight">
            {stock.name}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1.5 line-clamp-2 leading-relaxed">
            {stock.description}
          </p>
        </div>

        {/* Live Price & Valuation Summary Badges */}
        <div className="flex flex-wrap items-end lg:items-end gap-6 bg-[#060606] border border-white/5 p-4 rounded-xl">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold mb-1">
              Current Market Price
            </div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl sm:text-4xl font-mono-code font-bold text-white tracking-tight">
                {stock.currencySymbol}{stock.price.toFixed(2)}
              </span>
              <span
                className={`flex items-center font-mono-code font-bold text-sm sm:text-base ${
                  isPos ? 'text-[#10b981]' : 'text-[#ef4444]'
                }`}
              >
                {isPos ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {isPos ? '+' : ''}{stock.change.toFixed(2)} ({isPos ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
              <span>Real-Time {stock.market === 'INDIA' ? 'NSE / BSE Feed' : 'US Market Feed'}</span>
              <span>•</span>
              <span className="text-[#d4af37] font-semibold">{stock.currency}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleBookmark}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isBookmarked
                  ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]'
                  : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
              title="Add to Watchlist"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#d4af37]' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Watchlist'}</span>
            </button>

            <button
              onClick={onOpenAIDeepDive}
              className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] hover:from-[#e5bd43] hover:to-[#fbbf24] text-black px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-[#d4af37]/20 flex items-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>AI Deep Dive</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-6 pt-6 border-t border-white/10">
        <div className="bg-[#0e0e0e] border border-white/5 p-3 rounded-lg">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Market Cap</div>
          <div className="text-sm font-mono-code font-bold text-zinc-100 mt-0.5">{stock.marketCap}</div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/5 p-3 rounded-lg">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">P/E Ratio (TTM)</div>
          <div className="text-sm font-mono-code font-bold text-zinc-100 mt-0.5">{stock.pe > 0 ? `${stock.pe}x` : 'N/A (Loss)'}</div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/5 p-3 rounded-lg">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Forward P/E</div>
          <div className="text-sm font-mono-code font-bold text-zinc-100 mt-0.5">{stock.forwardPE > 0 ? `${stock.forwardPE}x` : 'N/A'}</div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/5 p-3 rounded-lg">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">EPS (Diluted)</div>
          <div className="text-sm font-mono-code font-bold text-zinc-100 mt-0.5">{stock.currencySymbol}{stock.eps.toFixed(2)}</div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/5 p-3 rounded-lg">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">Div Yield (TTM)</div>
          <div className="text-sm font-mono-code font-bold text-[#10b981] mt-0.5">{stock.dividendYield > 0 ? `${stock.dividendYield}%` : 'None'}</div>
        </div>

        <div className="bg-[#0e0e0e] border border-white/5 p-3 rounded-lg">
          <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold">52W Range</div>
          <div className="text-[11px] font-mono-code text-zinc-300 mt-0.5">
            {stock.currencySymbol}{stock.fiftyTwoWeekLow.toFixed(0)} - {stock.currencySymbol}{stock.fiftyTwoWeekHigh.toFixed(0)}
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-[#d4af37] h-full rounded-full" style={{ width: `${fiftyTwoWeekPct}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
