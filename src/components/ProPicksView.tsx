import React, { useState } from 'react';
import { PRO_PICKS_STRATEGIES } from '../data/proPicksData';
import { ProPickStrategy } from '../types';
import { Sparkles, TrendingUp, Award, Calendar, CheckCircle2, ArrowUpRight, BarChart2, ShieldCheck, Flame, ChevronRight } from 'lucide-react';

interface ProPicksViewProps {
  onSelectTicker: (ticker: string) => void;
}

export const ProPicksView: React.FC<ProPicksViewProps> = ({ onSelectTicker }) => {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>('tech-titans');

  const currentStrategy = PRO_PICKS_STRATEGIES.find((s) => s.id === selectedStrategyId) || PRO_PICKS_STRATEGIES[0];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#d4af37]/15 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-[#d4af37]" />
              AI QUANTITATIVE EQUITY STRATEGIES
            </span>
            <span className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              PRO ACCESS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-display italic font-bold text-white tracking-tight leading-tight">
            RetailPicks™ AI Portfolios
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Proprietary machine learning models analyzing 25+ years of fundamental data, cash flow durability, and quantitative momentum. Monthly rebalanced portfolios outperforming standard indices by up to 1,480% alpha.
          </p>
        </div>

        {/* Strategy Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {PRO_PICKS_STRATEGIES.map((strategy) => {
            const isSelected = selectedStrategyId === strategy.id;
            return (
              <button
                key={strategy.id}
                onClick={() => setSelectedStrategyId(strategy.id)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#121212] border-[#d4af37] shadow-xl shadow-[#d4af37]/10'
                    : 'bg-[#080808] border-white/5 hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#f59e0b]"></div>
                )}
                <div className="text-xs font-bold text-white truncate">{strategy.name}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{strategy.tagline}</div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-mono-code font-bold text-sm text-[#10b981]">
                    +{strategy.totalReturn}%
                  </span>
                  <span className="text-[9px] uppercase font-bold text-zinc-500">Total Return</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Strategy Performance Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Performance Showcase */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-serif-display font-bold text-white">
                  {currentStrategy.name} Performance Track Record
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">{currentStrategy.description}</p>
              </div>

              <span className="bg-[#10b981]/15 text-[#10b981] font-mono-code font-bold text-xs px-3 py-1.5 rounded-lg border border-[#10b981]/30 self-start sm:self-auto">
                {currentStrategy.badge}
              </span>
            </div>

            {/* Backtested Return Comparison Visual */}
            <div className="my-6">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Cumulative Performance vs S&P 500 Benchmark
              </div>

              <div className="space-y-4 bg-[#070707] border border-white/5 p-4 rounded-xl">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      {currentStrategy.name} Strategy
                    </span>
                    <span className="font-mono-code font-bold text-[#10b981] text-sm">
                      +{currentStrategy.totalReturn}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#d4af37] via-[#f59e0b] to-[#10b981] h-full rounded-full"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-zinc-400">S&P 500 Index Benchmark</span>
                    <span className="font-mono-code text-zinc-300 text-sm">
                      +{currentStrategy.sp500Return}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-zinc-500 h-full rounded-full"
                      style={{ width: `${(currentStrategy.sp500Return / currentStrategy.totalReturn) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Net Alpha Generation:</span>
                  <span className="font-mono-code font-bold text-[#d4af37]">
                    +{currentStrategy.outperformance.toFixed(1)}% Excess Return
                  </span>
                </div>
              </div>
            </div>

            {/* Annual Matrix */}
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Historical Annual Return Matrix
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {currentStrategy.monthlyPerformance.map((p) => {
                const isPos = p.strategyReturn >= 0;
                return (
                  <div key={p.year} className="bg-[#0e0e0e] border border-white/5 p-2.5 rounded-lg text-center font-mono-code">
                    <div className="text-[10px] text-zinc-400 font-sans">{p.year}</div>
                    <div className={`text-xs font-bold mt-1 ${isPos ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {isPos ? '+' : ''}{p.strategyReturn}%
                    </div>
                    <div className="text-[9px] text-zinc-400 mt-0.5">S&P: {p.benchmarkReturn}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Strategy Alpha Metrics Box */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-lg font-serif-display font-bold text-white pb-3 border-b border-white/10">
              Quantitative Rigor
            </h3>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 bg-[#0e0e0e] border border-white/5 rounded-xl">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-zinc-400">Win Rate vs Market</div>
                  <div className="text-xl font-mono-code font-bold text-white mt-0.5">{currentStrategy.winRate}%</div>
                </div>
                <Award className="w-6 h-6 text-[#d4af37]" />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0e0e0e] border border-white/5 rounded-xl">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-zinc-400">Annualized Compound Return</div>
                  <div className="text-xl font-mono-code font-bold text-[#10b981] mt-0.5">+{currentStrategy.annualizedReturn}% / yr</div>
                </div>
                <TrendingUp className="w-6 h-6 text-[#10b981]" />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0e0e0e] border border-white/5 rounded-xl">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-zinc-400">Sharpe Ratio (Risk-Adjusted)</div>
                  <div className="text-xl font-mono-code font-bold text-[#d4af37] mt-0.5">{currentStrategy.sharpeRatio}</div>
                </div>
                <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#0e0e0e] border border-white/5 rounded-xl">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-zinc-400">Next Scheduled Rebalance</div>
                  <div className="text-xs font-mono-code font-bold text-white mt-0.5">{currentStrategy.nextRebalance}</div>
                </div>
                <Calendar className="w-6 h-6 text-zinc-400" />
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-xl text-[11px] text-zinc-300 leading-relaxed">
            <span className="text-[#d4af37] font-bold">Monthly Strategy Execution:</span> Holdings are mathematically weighted and updated on the first market day of each month.
          </div>
        </div>
      </div>

      {/* Current Active Holdings Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
          <div>
            <h3 className="text-xl font-serif-display font-bold text-white">
              Current Active {currentStrategy.name} Holdings
            </h3>
            <p className="text-xs text-zinc-400">
              {currentStrategy.holdings.length} Positions Selected by Quantitative Factor Screen
            </p>
          </div>
          <span className="text-xs text-zinc-400 font-mono-code">
            Click any stock to inspect full fundamentals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider font-mono-code">
                <th className="py-3 px-4">Ticker / Company</th>
                <th className="py-3 px-3">Sector</th>
                <th className="py-3 px-3 text-right">Portfolio Weight</th>
                <th className="py-3 px-3 text-right">Entry Price</th>
                <th className="py-3 px-3 text-right">Current Price</th>
                <th className="py-3 px-3 text-right">Gain Since Addition</th>
                <th className="py-3 px-3 text-right">Fair Value Upside</th>
                <th className="py-3 px-3 text-right">Health Score</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono-code">
              {currentStrategy.holdings.map((h) => {
                const isGainPos = h.gainPercent >= 0;
                return (
                  <tr
                    key={h.ticker}
                    onClick={() => onSelectTicker(h.ticker)}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors">
                          {h.ticker}
                        </span>
                        <span className="font-sans text-zinc-400 text-xs truncate max-w-[140px]">
                          {h.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-sans text-zinc-400">
                      {h.sector}
                    </td>
                    <td className="py-3.5 px-3 text-right text-zinc-200">
                      {h.weight.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right text-zinc-400">
                      ${h.entryPrice.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-right text-white font-bold">
                      ${h.currentPrice.toFixed(2)}
                    </td>
                    <td className={`py-3.5 px-3 text-right font-bold ${isGainPos ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {isGainPos ? '+' : ''}{h.gainPercent.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right text-[#d4af37] font-bold">
                      +{h.fairValueUpside.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold">
                        {h.healthScore.toFixed(1)}/5.0
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-zinc-400 group-hover:text-white p-1 rounded hover:bg-white/10">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
