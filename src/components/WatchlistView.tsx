import React, { useState } from 'react';
import { useLiveMarket } from '../context/LiveMarketContext';
import { Stock } from '../types';
import { Bookmark, TrendingUp, Plus, Trash2, ArrowUpRight, ArrowDownRight, ShieldCheck, ChevronRight, Activity } from 'lucide-react';

interface WatchlistViewProps {
  watchlist: string[];
  onRemoveFromWatchlist: (ticker: string) => void;
  onSelectTicker: (ticker: string) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({
  watchlist,
  onRemoveFromWatchlist,
  onSelectTicker
}) => {
  const { stocks: allStocks } = useLiveMarket();
  const [sharesMap, setSharesMap] = useState<Record<string, number>>({
    RELIANCE: 25,
    HDFCBANK: 40,
    TCS: 15,
    AAPL: 20,
    NVDA: 30
  });

  const stocks: Stock[] = watchlist
    .map((t) => allStocks[t])
    .filter(Boolean);

  const avgHealth = stocks.length > 0
    ? (stocks.reduce((acc, s) => acc + s.healthScore.totalScore, 0) / stocks.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                Portfolio Intelligence Tracker
              </span>
              <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
                {stocks.length} Tracked Equities
              </span>
            </div>
            <h1 className="text-3xl font-serif-display italic font-bold text-white mt-1">
              Custom Portfolio & Watchlist
            </h1>
          </div>
        </div>

        {/* Aggregated Portfolio Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#080808] border border-white/5 p-4 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-zinc-400">Tracked Holdings</div>
            <div className="text-2xl font-mono-code font-bold text-white mt-1">
              {stocks.length} Companies
            </div>
            <div className="text-[10px] text-zinc-400 mt-1">Indian (NSE) & US (NASDAQ) Equities</div>
          </div>

          <div className="bg-[#080808] border border-white/5 p-4 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-zinc-400">Mean DCF Intrinsic Upside</div>
            <div className="text-2xl font-mono-code font-bold text-emerald-400 mt-1">
              +{stocks.length > 0 ? (stocks.reduce((acc, s) => acc + s.fairValue.upsidePercent, 0) / stocks.length).toFixed(1) : '0.0'}%
            </div>
            <div className="text-[10px] text-[#d4af37] font-mono-code mt-1">
              Model-backed Margin of Safety
            </div>
          </div>

          <div className="bg-[#080808] border border-white/5 p-4 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-zinc-400">Weighted Financial Health</div>
            <div className="text-2xl font-mono-code font-bold text-white mt-1">
              {avgHealth.toFixed(1)} <span className="text-xs text-zinc-400 font-normal">/ 5.0</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold mt-1">
              Institutional Quality Grade
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Items Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
        {stocks.length === 0 ? (
          <div className="py-12 text-center text-zinc-400">
            <Bookmark className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm">Your watchlist is currently empty.</p>
            <p className="text-xs text-zinc-400 mt-1">Click the bookmark icon on any stock to track it here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider font-mono-code">
                  <th className="py-3 px-4">Company Ticker</th>
                  <th className="py-3 px-3">Market</th>
                  <th className="py-3 px-3 text-right">Shares</th>
                  <th className="py-3 px-3 text-right">Current Price</th>
                  <th className="py-3 px-3 text-right">Total Position</th>
                  <th className="py-3 px-3 text-right">Retail Fair Value</th>
                  <th className="py-3 px-3 text-right">Fair Value Upside</th>
                  <th className="py-3 px-3 text-right">Health Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono-code">
                {stocks.map((stock) => {
                  const qty = sharesMap[stock.ticker] || 10;
                  const holdingVal = stock.price * qty;
                  const isPos = stock.fairValue.upsidePercent >= 0;

                  return (
                    <tr
                      key={stock.ticker}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td
                        onClick={() => onSelectTicker(stock.ticker)}
                        className="py-3.5 px-4 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors">
                            {stock.ticker}
                          </span>
                          <span className="font-sans text-zinc-400 text-xs truncate max-w-[140px]">
                            {stock.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 font-bold">
                          {stock.market === 'INDIA' ? '🇮🇳 NSE' : '🇺🇸 US'}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <input
                          type="number"
                          min="1"
                          max="10000"
                          value={qty}
                          onChange={(e) => {
                            const val = Math.max(1, parseInt(e.target.value) || 1);
                            setSharesMap((prev) => ({ ...prev, [stock.ticker]: val }));
                          }}
                          className="w-16 bg-[#080808] border border-white/10 rounded px-1.5 py-0.5 text-right text-xs text-white focus:outline-none focus:border-[#d4af37]"
                        />
                      </td>

                      <td className="py-3.5 px-3 text-right font-bold text-white">
                        {stock.currencySymbol}{stock.price.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-3 text-right font-bold text-white">
                        {stock.currencySymbol}{holdingVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      <td className="py-3.5 px-3 text-right text-[#d4af37] font-bold">
                        {stock.currencySymbol}{stock.fairValue.consensusValue.toFixed(2)}
                      </td>

                      <td className={`py-3.5 px-3 text-right font-bold ${isPos ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                        {isPos ? '+' : ''}{stock.fairValue.upsidePercent.toFixed(1)}%
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold">
                          {stock.healthScore.totalScore.toFixed(1)}/5.0
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onSelectTicker(stock.ticker)}
                            className="text-xs text-[#d4af37] hover:underline font-bold"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => onRemoveFromWatchlist(stock.ticker)}
                            className="p-1 rounded text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Remove from portfolio"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
