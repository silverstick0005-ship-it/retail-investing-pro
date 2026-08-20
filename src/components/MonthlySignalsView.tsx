import React, { useState } from 'react';
import { useLiveMarket } from '../context/LiveMarketContext';
import { Stock, MonthlySignal } from '../types';
import { Sparkles, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Compass, Filter, ChevronRight } from 'lucide-react';

interface MonthlySignalsViewProps {
  onSelectTicker: (ticker: string) => void;
}

export const MonthlySignalsView: React.FC<MonthlySignalsViewProps> = ({ onSelectTicker }) => {
  const { stocks: allStocksMap } = useLiveMarket();
  const [actionFilter, setActionFilter] = useState<'ALL' | 'BUY' | 'HOLD' | 'AVOID'>('ALL');
  const [marketFilter, setMarketFilter] = useState<'ALL' | 'US' | 'INDIA'>('ALL');

  const stocksList: Stock[] = Object.values(allStocksMap);

  const filteredStocks = stocksList.filter((s) => {
    if (marketFilter !== 'ALL' && s.market !== marketFilter) return false;
    if (actionFilter === 'BUY' && s.monthlySignal.action !== 'STRONG BUY' && s.monthlySignal.action !== 'ACCUMULATE') return false;
    if (actionFilter === 'HOLD' && s.monthlySignal.action !== 'HOLD') return false;
    if (actionFilter === 'AVOID' && s.monthlySignal.action !== 'AVOID / DO NOT BUY' && s.monthlySignal.action !== 'TAKE PROFIT') return false;
    return true;
  });

  const getActionBadgeStyle = (action: MonthlySignal['action']) => {
    switch (action) {
      case 'STRONG BUY':
        return 'bg-emerald-500/20 text-[#10b981] border-emerald-500/40';
      case 'ACCUMULATE':
        return 'bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/40';
      case 'HOLD':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'TAKE PROFIT':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'AVOID / DO NOT BUY':
        return 'bg-rose-500/20 text-[#ef4444] border-rose-500/40';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const buysCount = stocksList.filter(s => s.monthlySignal.action === 'STRONG BUY' || s.monthlySignal.action === 'ACCUMULATE').length;
  const holdsCount = stocksList.filter(s => s.monthlySignal.action === 'HOLD').length;
  const avoidCount = stocksList.filter(s => s.monthlySignal.action === 'AVOID / DO NOT BUY' || s.monthlySignal.action === 'TAKE PROFIT').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
              MONTHLY EQUITY ALLOCATION GUIDE
            </span>
            <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
              MARCH 2026 REBALANCE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-display italic font-bold text-white tracking-tight leading-tight">
            Monthly Investment Tips & Signals
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Algorithmic action signals classifying exactly <strong>which stocks to invest in</strong> (high margin of safety & ROIC), <strong>which to hold</strong>, and <strong>which to sell or avoid</strong> across both Indian (NSE/BSE) and US (NASDAQ/NYSE) markets.
          </p>
        </div>

        {/* Quick Action Matrix Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          <div className="bg-[#080808] border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-400">Stocks to Invest In (Buy / Accumulate)</div>
              <div className="text-2xl font-mono-code font-bold text-white mt-0.5">{buysCount} Equities</div>
              <div className="text-[10px] text-zinc-400 mt-1">High Fair Value Upside + Top Health</div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
          </div>

          <div className="bg-[#080808] border border-amber-500/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-400">Stocks to Hold / Monitor</div>
              <div className="text-2xl font-mono-code font-bold text-white mt-0.5">{holdsCount} Equities</div>
              <div className="text-[10px] text-zinc-400 mt-1">Fairly Valued with Stable Cash Flows</div>
            </div>
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>

          <div className="bg-[#080808] border border-rose-500/20 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-rose-400">Stocks to Sell / Avoid (Do Not Buy)</div>
              <div className="text-2xl font-mono-code font-bold text-white mt-0.5">{avoidCount} Equities</div>
              <div className="text-[10px] text-zinc-400 mt-1">Overvalued or Regulatory/Debt Risks</div>
            </div>
            <XCircle className="w-8 h-8 text-[#ef4444]" />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-white/5">
          {/* Signal Action Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Action:</span>
            {[
              { id: 'ALL', label: 'All Signals' },
              { id: 'BUY', label: '🟢 Buy & Accumulate' },
              { id: 'HOLD', label: '🟡 Hold & Monitor' },
              { id: 'AVOID', label: '🔴 Avoid / Sell' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActionFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  actionFilter === tab.id
                    ? 'bg-[#d4af37] text-black shadow-md'
                    : 'bg-[#0e0e0e] text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Market Region Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-zinc-500">Market:</span>
            {[
              { id: 'ALL', label: 'Global' },
              { id: 'INDIA', label: '🇮🇳 India (NSE/BSE)' },
              { id: 'US', label: '🇺🇸 US (NASDAQ/NYSE)' },
            ].map((mkt) => (
              <button
                key={mkt.id}
                onClick={() => setMarketFilter(mkt.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  marketFilter === mkt.id
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-[#0e0e0e] text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {mkt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Signal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStocks.map((stock) => {
          const sig = stock.monthlySignal;
          const isBuy = sig.action === 'STRONG BUY' || sig.action === 'ACCUMULATE';
          const isAvoid = sig.action === 'AVOID / DO NOT BUY' || sig.action === 'TAKE PROFIT';

          return (
            <div
              key={stock.ticker}
              className={`bg-[#0a0a0a] border rounded-2xl p-6 relative overflow-hidden shadow-xl transition-all hover:border-[#d4af37]/40 flex flex-col justify-between ${
                isBuy
                  ? 'border-emerald-500/30'
                  : isAvoid
                  ? 'border-rose-500/30'
                  : 'border-white/10'
              }`}
            >
              <div>
                {/* Card Top Banner */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white font-mono-code">
                        {stock.ticker}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10">
                        {stock.market === 'INDIA' ? '🇮🇳 NSE/BSE' : '🇺🇸 NASDAQ'}
                      </span>
                      <span className="text-xs text-zinc-400 font-sans truncate max-w-[160px]">
                        {stock.name}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1 font-mono-code">
                      <span className="text-2xl font-bold text-white">
                        {stock.currencySymbol}{stock.price.toFixed(2)}
                      </span>
                      <span className={`text-xs font-bold ${stock.changePercent >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Signal Badge */}
                  <div className="text-right">
                    <span className={`inline-block text-xs font-extrabold px-3 py-1 rounded-lg border uppercase tracking-wider ${getActionBadgeStyle(sig.action)}`}>
                      {sig.action}
                    </span>
                    <div className="text-[10px] text-zinc-400 font-mono-code mt-1">
                      Signal Score: <strong className="text-[#d4af37]">{sig.ratingScore}/10</strong>
                    </div>
                  </div>
                </div>

                {/* Key Price Levels */}
                <div className="grid grid-cols-3 gap-2 my-4 p-3 bg-[#0e0e0e] border border-white/5 rounded-xl text-center font-mono-code">
                  <div>
                    <div className="text-[9px] uppercase text-zinc-400">Target Buy Range</div>
                    <div className="text-xs font-bold text-white mt-0.5">{sig.targetEntryRange}</div>
                  </div>
                  <div className="border-x border-white/10">
                    <div className="text-[9px] uppercase text-zinc-400">Retail Fair Value</div>
                    <div className="text-xs font-bold text-[#d4af37] mt-0.5">{sig.fairValueTarget}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase text-zinc-400">Stop Loss Benchmark</div>
                    <div className="text-xs font-bold text-rose-400 mt-0.5">{sig.stopLoss}</div>
                  </div>
                </div>

                {/* Primary Decision Rationale */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
                      {isBuy ? '💡 Why Invest This Month:' : isAvoid ? '⚠️ Why Avoid / Sell:' : '📋 Holding Assessment:'}
                    </span>
                    <p className="text-zinc-200 mt-0.5 leading-relaxed bg-[#060606] p-3 rounded-lg border border-white/5">
                      {sig.primaryRationale}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 pt-1 text-[11px] text-zinc-400">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span><strong>Key Catalyst / Risk Horizon:</strong> {sig.catalyst} ({sig.riskHorizon} Risk Horizon)</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-[10px] text-zinc-400 font-mono-code">
                  Health: <strong className="text-[#d4af37]">{stock.healthScore.totalScore}/5.0</strong> • Upside: <strong className="text-emerald-400">+{stock.fairValue.upsidePercent.toFixed(1)}%</strong>
                </div>

                <button
                  onClick={() => onSelectTicker(stock.ticker)}
                  className="flex items-center gap-1 text-xs font-bold text-[#d4af37] hover:text-white transition-colors"
                >
                  <span>Inspect 14-Model DCF & 10Y Financials</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
