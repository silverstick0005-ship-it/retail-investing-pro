import React, { useState } from 'react';
import { GURU_PORTFOLIOS } from '../data/guruData';
import { GuruPortfolio } from '../types';
import { useLiveMarket } from '../context/LiveMarketContext';
import { Star, TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Layers, FileText, ChevronRight } from 'lucide-react';

interface GuruPortfoliosViewProps {
  onSelectTicker: (ticker: string) => void;
}

export const GuruPortfoliosView: React.FC<GuruPortfoliosViewProps> = ({ onSelectTicker }) => {
  const { stocks: liveStocks } = useLiveMarket();
  const [selectedGuruId, setSelectedGuruId] = useState<string>('warren-buffett');

  const currentGuru = GURU_PORTFOLIOS.find((g) => g.id === selectedGuruId) || GURU_PORTFOLIOS[0];

  const getActivityBadge = (activity: string) => {
    switch (activity) {
      case 'New Buy':
        return 'bg-emerald-500/20 text-[#10b981] border-emerald-500/40';
      case 'Added':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Reduced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'Exited':
        return 'bg-rose-500/20 text-[#ef4444] border-rose-500/40';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
              SEC 13F INSTITUTIONAL FILING TRACKER
            </span>
            <span className="bg-white/10 text-zinc-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              REAL-TIME SYNC
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif-display italic font-bold text-white tracking-tight leading-tight">
            Billionaire & Guru Portfolios
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed">
            Track, mirror, and analyze the quarterly SEC 13F regulatory filings of legendary macro investors, hedge fund titans, and value compounders with full position breakdowns.
          </p>
        </div>

        {/* Guru Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {GURU_PORTFOLIOS.map((guru) => {
            const isSelected = selectedGuruId === guru.id;
            return (
              <button
                key={guru.id}
                onClick={() => setSelectedGuruId(guru.id)}
                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#121212] border-[#d4af37] shadow-xl shadow-[#d4af37]/10'
                    : 'bg-[#080808] border-white/5 hover:border-white/20'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] to-[#f59e0b]"></div>
                )}
                <div className="text-sm font-bold text-white truncate">{guru.investorName}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5 truncate">{guru.fundName}</div>
                <div className="mt-3 flex items-baseline justify-between font-mono-code">
                  <span className="font-bold text-xs text-[#d4af37]">{guru.aum}</span>
                  <span className="text-[9px] text-zinc-500 uppercase">AUM</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Guru Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guru Profile Details */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-semibold">Institutional Profile</span>
                <h2 className="text-2xl font-serif-display font-bold text-white mt-0.5">{currentGuru.investorName}</h2>
                <div className="text-xs text-zinc-400 font-mono-code">{currentGuru.fundName}</div>
              </div>
              <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#d4af37]/30">
                {currentGuru.filingDate}
              </span>
            </div>

            <div className="mt-4">
              <p className="text-xs text-zinc-300 leading-relaxed italic bg-[#0e0e0e] p-3.5 rounded-xl border border-white/5">
                "{currentGuru.strategySummary}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-[#080808] border border-white/5 p-3 rounded-lg">
                <div className="text-[10px] uppercase text-zinc-400 font-semibold">Total Reported AUM</div>
                <div className="text-lg font-mono-code font-bold text-white mt-0.5">{currentGuru.aum}</div>
              </div>
              <div className="bg-[#080808] border border-white/5 p-3 rounded-lg">
                <div className="text-[10px] uppercase text-zinc-400 font-semibold">Top 10 Concentration</div>
                <div className="text-lg font-mono-code font-bold text-[#d4af37] mt-0.5">{currentGuru.topHoldingsPercent}%</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
              Form 13F-HR Source
            </span>
            <span className="text-[10px] text-zinc-500 font-mono-code">Quarterly SEC Benchmark</span>
          </div>
        </div>

        {/* Sector Allocation Breakdown */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-serif-display font-bold text-white">
                Sector Weight Allocation Distribution
              </h3>
              <span className="text-xs text-zinc-400 font-mono-code">Capital Allocation</span>
            </div>

            <div className="space-y-3">
              {currentGuru.sectorDistribution.map((sector) => (
                <div key={sector.sector}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 font-medium">{sector.sector}</span>
                    <span className="font-mono-code font-bold text-[#d4af37]">{sector.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] h-full rounded-full"
                      style={{ width: `${sector.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-400">
            Institutional asset allocation provides structural insight into macroeconomic positioning and defensive hedging.
          </div>
        </div>
      </div>

      {/* Guru Holdings Breakdown Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
          <div>
            <h3 className="text-xl font-serif-display font-bold text-white">
              {currentGuru.investorName}'s Portfolio Holdings
            </h3>
            <p className="text-xs text-zinc-400">
              SEC 13F Verified Equity Disclosures
            </p>
          </div>
          <span className="text-xs text-zinc-400 font-mono-code">
            Click position to inspect fundamentals
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider font-mono-code">
                <th className="py-3 px-4">Ticker / Asset</th>
                <th className="py-3 px-3">Shares Held</th>
                <th className="py-3 px-3 text-right">Market Value</th>
                <th className="py-3 px-3 text-right">% of Portfolio</th>
                <th className="py-3 px-3 text-center">Recent 13F Action</th>
                <th className="py-3 px-3 text-right">Retail Fair Value Upside</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono-code">
              {currentGuru.holdings.map((holding) => (
                <tr
                  key={holding.ticker}
                  onClick={() => onSelectTicker(holding.ticker)}
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors">
                        {holding.ticker}
                      </span>
                      <span className="font-sans text-zinc-400 text-xs truncate max-w-[140px]">
                        {holding.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-zinc-400 font-sans">
                    {holding.shares}
                  </td>
                  <td className="py-3.5 px-3 text-right text-white font-bold">
                    {holding.valueFormatted}
                  </td>
                  <td className="py-3.5 px-3 text-right text-[#d4af37] font-bold">
                    {holding.portfolioPercent.toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getActivityBadge(holding.recentActivity)}`}>
                      {holding.recentActivity}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-[#10b981]">
                    +{((liveStocks[holding.ticker]?.fairValue?.upsidePercent) ?? holding.fairValueUpside).toFixed(1)}%
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="text-zinc-400 group-hover:text-white p-1 rounded hover:bg-white/10">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
