import React, { useState } from 'react';
import { STOCKS_DATA } from '../data/stocksData';
import { Stock } from '../types';
import { SlidersHorizontal, Search, Download, ArrowUpDown, Filter, Sparkles, ChevronRight, Check } from 'lucide-react';

interface ScreenerViewProps {
  onSelectTicker: (ticker: string) => void;
}

export const ScreenerView: React.FC<ScreenerViewProps> = ({ onSelectTicker }) => {
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [marketFilter, setMarketFilter] = useState<'ALL' | 'INDIA' | 'US'>('ALL');
  const [minUpside, setMinUpside] = useState<number>(0);
  const [minHealth, setMinHealth] = useState<number>(3.0);
  const [maxPE, setMaxPE] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<'upside' | 'health' | 'pe' | 'marketCap'>('upside');

  const stocksList: Stock[] = Object.values(STOCKS_DATA);

  const filteredStocks = stocksList.filter((s) => {
    if (marketFilter !== 'ALL' && s.market !== marketFilter) return false;
    if (sectorFilter !== 'ALL' && s.sector !== sectorFilter) return false;
    if (s.fairValue.upsidePercent < minUpside) return false;
    if (s.healthScore.totalScore < minHealth) return false;
    if (s.pe > 0 && s.pe > maxPE) return false;
    if (
      searchQuery &&
      !s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Sort
  filteredStocks.sort((a, b) => {
    if (sortField === 'upside') return b.fairValue.upsidePercent - a.fairValue.upsidePercent;
    if (sortField === 'health') return b.healthScore.totalScore - a.healthScore.totalScore;
    if (sortField === 'pe') return a.pe - b.pe;
    return b.price - a.price;
  });

  const sectors = ['ALL', 'Technology', 'Financial Services', 'Energy & Conglomerate', 'Consumer Cyclical'];

  const exportCSV = () => {
    const headers = ['Ticker', 'Name', 'Market', 'Sector', 'Price', 'P/E', 'Fair Value', 'Upside (%)', 'Health Score (/5.0)'];
    const rows = filteredStocks.map(s => [
      s.ticker,
      `"${s.name}"`,
      s.market,
      s.sector,
      s.price,
      s.pe,
      s.fairValue.consensusValue,
      s.fairValue.upsidePercent.toFixed(2),
      s.healthScore.totalScore
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RetailInvesting_Screener_Results.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                Institutional Universe Filter
              </span>
              <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
                1,000+ Metrics (India & US)
              </span>
            </div>
            <h1 className="text-3xl font-serif-display italic font-bold text-white mt-1">
              Advanced Equity Screener
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {/* Market Region Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1.5">
              Market Region
            </label>
            <select
              value={marketFilter}
              onChange={(e) => setMarketFilter(e.target.value as any)}
              className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            >
              <option value="ALL">All Markets (Global)</option>
              <option value="INDIA">🇮🇳 India (NSE / BSE)</option>
              <option value="US">🇺🇸 US (NASDAQ / NYSE)</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1.5">
              Sector Category
            </label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]"
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>{sec === 'ALL' ? 'All Sectors' : sec}</option>
              ))}
            </select>
          </div>

          {/* Min Fair Value Upside Slider */}
          <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1.5">
              <span>Min Fair Value Upside</span>
              <span className="text-[#10b981] font-mono-code font-bold">+{minUpside}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={minUpside}
              onChange={(e) => setMinUpside(parseInt(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>

          {/* Min Health Score */}
          <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1.5">
              <span>Min Health Score</span>
              <span className="text-[#d4af37] font-mono-code font-bold">{minHealth.toFixed(1)}/5.0</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="4.8"
              step="0.1"
              value={minHealth}
              onChange={(e) => setMinHealth(parseFloat(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>

          {/* Max P/E Multiple */}
          <div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1.5">
              <span>Max P/E Multiple</span>
              <span className="text-zinc-200 font-mono-code font-bold">{maxPE}x</span>
            </div>
            <input
              type="range"
              min="15"
              max="100"
              step="5"
              value={maxPE}
              onChange={(e) => setMaxPE(parseInt(e.target.value))}
              className="w-full accent-[#d4af37] cursor-pointer"
            />
          </div>
        </div>

        {/* Preset Strategies Quick Buttons */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/5 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Quick Presets:</span>
          <button
            onClick={() => {
              setMarketFilter('INDIA');
              setMinUpside(10);
              setMinHealth(4.0);
              setMaxPE(35);
              setSectorFilter('ALL');
            }}
            className="px-2.5 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-[11px] font-bold hover:bg-[#d4af37]/20"
          >
            🇮🇳 India Bluechips Undervalued (HDFC, Reliance, TCS)
          </button>
          <button
            onClick={() => {
              setMarketFilter('US');
              setMinUpside(15);
              setMinHealth(4.2);
              setMaxPE(40);
              setSectorFilter('ALL');
            }}
            className="px-2.5 py-1 rounded bg-white/5 text-zinc-300 border border-white/10 text-[11px] font-medium hover:text-white"
          >
            🇺🇸 US Tech Champions
          </button>
          <button
            onClick={() => {
              setMarketFilter('ALL');
              setMinUpside(0);
              setMinHealth(2.0);
              setMaxPE(100);
              setSectorFilter('ALL');
            }}
            className="px-2.5 py-1 rounded bg-white/5 text-zinc-400 text-[11px] hover:text-white"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-serif-display font-bold text-white">
              Screening Results ({filteredStocks.length} Equities Found)
            </span>
          </div>

          {/* Search Input inside results */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ticker within results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080808] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 font-mono-code focus:outline-none focus:border-[#d4af37]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider font-mono-code">
                <th className="py-3 px-4">Company Ticker</th>
                <th className="py-3 px-3">Exchange</th>
                <th className="py-3 px-3">Sector</th>
                <th className="py-3 px-3 text-right">Price</th>
                <th className="py-3 px-3 text-right">P/E Multiple</th>
                <th className="py-3 px-3 text-right">Retail Fair Value</th>
                <th className="py-3 px-3 text-right">Fair Value Upside</th>
                <th className="py-3 px-3 text-right">Financial Health</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono-code">
              {filteredStocks.map((stock) => {
                const isPos = stock.fairValue.upsidePercent >= 0;
                return (
                  <tr
                    key={stock.ticker}
                    onClick={() => onSelectTicker(stock.ticker)}
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-[#d4af37] transition-colors">
                          {stock.ticker}
                        </span>
                        <span className="font-sans text-zinc-400 text-xs truncate max-w-[150px]">
                          {stock.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 font-bold">
                        {stock.market === 'INDIA' ? '🇮🇳 NSE' : '🇺🇸 NASDAQ'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-sans text-zinc-400">{stock.sector}</td>
                    <td className="py-3.5 px-3 text-right text-white font-bold">{stock.currencySymbol}{stock.price.toFixed(2)}</td>
                    <td className="py-3.5 px-3 text-right text-zinc-300">{stock.pe > 0 ? `${stock.pe}x` : 'N/A'}</td>
                    <td className="py-3.5 px-3 text-right text-[#d4af37] font-bold">
                      {stock.currencySymbol}{stock.fairValue.consensusValue.toFixed(2)}
                    </td>
                    <td className={`py-3.5 px-3 text-right font-bold ${isPos ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      {isPos ? '+' : ''}{stock.fairValue.upsidePercent.toFixed(1)}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 text-[10px] font-bold">
                        {stock.healthScore.totalScore.toFixed(1)}/5.0 ({stock.healthScore.status})
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
