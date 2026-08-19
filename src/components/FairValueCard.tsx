import React, { useState } from 'react';
import { Stock, ValuationModelItem } from '../types';
import { Sliders, HelpCircle, CheckCircle2, ChevronRight, Calculator, AlertTriangle, ArrowUpRight, ArrowDownRight, RefreshCw, BarChart2 } from 'lucide-react';

interface FairValueCardProps {
  stock: Stock;
}

export const FairValueCard: React.FC<FairValueCardProps> = ({ stock }) => {
  const [showSandbox, setShowSandbox] = useState(false);
  const [discountRate, setDiscountRate] = useState(stock.market === 'INDIA' ? 10.5 : 8.5); // WACC %
  const [revenueGrowth, setRevenueGrowth] = useState(stock.market === 'INDIA' ? 12.0 : 9.0); // %
  const [terminalMultiple, setTerminalMultiple] = useState(20.0); // Exit multiple
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'DCF' | 'Multiples' | 'Fundamental'>('ALL');

  const sym = stock.currencySymbol;

  // Dynamic DCF recalculation sandbox
  const baseDCF = stock.fairValue.models.find(m => m.id === 'm1')?.value || stock.fairValue.consensusValue;
  const baseGrowth = stock.market === 'INDIA' ? 12.0 : 9.0;
  const baseWacc = stock.market === 'INDIA' ? 10.5 : 8.5;
  const customDCF = (baseDCF * (1 + (revenueGrowth - baseGrowth) * 0.04) * (1 - (discountRate - baseWacc) * 0.06) * (terminalMultiple / 20.0));
  const customUpside = ((customDCF - stock.price) / stock.price) * 100;

  const currentUpside = stock.fairValue.upsidePercent;
  const isUndervalued = currentUpside >= 0;

  const filteredModels = activeCategory === 'ALL'
    ? stock.fairValue.models
    : stock.fairValue.models.filter(m => m.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Proprietary Valuation
            </span>
            <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
              {stock.fairValue.modelsCount} Financial Models ({stock.market === 'INDIA' ? 'NSE/BSE' : 'US'})
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-white mt-1">
            Retail Investing Fair Value™
          </h2>
        </div>

        <button
          onClick={() => setShowSandbox(!showSandbox)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            showSandbox
              ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold'
              : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>{showSandbox ? 'Hide DCF Sandbox' : 'Custom DCF Sandbox'}</span>
        </button>
      </div>

      {/* Main Fair Value Valuation Spread Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Consensus Fair Value Block */}
        <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">Model Consensus</span>
              <span className="text-[10px] text-zinc-400">12-14 Models Weighted</span>
            </div>

            <div className="text-3xl sm:text-4xl font-mono-code font-bold text-white tracking-tight">
              {sym}{stock.fairValue.consensusValue.toFixed(2)}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span
                className={`flex items-center font-mono-code font-bold text-xs px-2.5 py-1 rounded-md ${
                  isUndervalued
                    ? 'bg-emerald-500/15 text-[#10b981] border border-emerald-500/30'
                    : 'bg-rose-500/15 text-[#ef4444] border border-rose-500/30'
                }`}
              >
                {isUndervalued ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                {isUndervalued ? '+' : ''}{currentUpside.toFixed(1)}% {isUndervalued ? 'Undervalued' : 'Overvalued'}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Market Price: <strong className="text-white font-mono-code">{sym}{stock.price.toFixed(2)}</strong></span>
            <span className="text-[10px] uppercase font-semibold text-zinc-400">
              Uncertainty: <span className="text-[#d4af37] font-bold">{stock.fairValue.uncertainty}</span>
            </span>
          </div>
        </div>

        {/* Wall Street / Dalal Street Analyst Target Comparison */}
        <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span className="font-semibold uppercase tracking-wider text-[10px]">
                {stock.market === 'INDIA' ? 'Institutional Analyst Consensus' : 'Wall Street Consensus'}
              </span>
              <span className="text-[10px] text-zinc-400">{stock.fairValue.analystCount} Analysts</span>
            </div>

            <div className="text-3xl sm:text-4xl font-mono-code font-bold text-zinc-200 tracking-tight">
              {sym}{stock.fairValue.analystTarget.toFixed(2)}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span
                className={`flex items-center font-mono-code font-bold text-xs px-2.5 py-1 rounded-md ${
                  stock.fairValue.analystUpsidePercent >= 0
                    ? 'bg-emerald-500/15 text-[#10b981] border border-emerald-500/30'
                    : 'bg-rose-500/15 text-[#ef4444] border border-rose-500/30'
                }`}
              >
                {stock.fairValue.analystUpsidePercent >= 0 ? '+' : ''}
                {stock.fairValue.analystUpsidePercent.toFixed(1)}% Analyst Upside
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-400 flex items-center justify-between">
            <span>Consensus Target: <strong className="text-emerald-400">{stock.fairValue.analystUpsidePercent >= 0 ? 'Buy Target' : 'Reduce Target'}</strong></span>
            <span className="text-[10px] text-zinc-400">12M Horizon</span>
          </div>
        </div>

        {/* Valuation Spread Visualizer Bar */}
        <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-[10px] text-zinc-400 mb-2">
            Fair Value Range Spectrum
          </div>

          <div className="space-y-3 my-auto">
            {/* Visual Gauge Bar */}
            <div className="relative pt-6 pb-2">
              <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                <div className="bg-[#ef4444]/60 w-1/4 h-full" title="Overvalued Zone"></div>
                <div className="bg-[#d4af37]/60 w-1/2 h-full" title="Fair Zone"></div>
                <div className="bg-[#10b981]/60 w-1/4 h-full" title="Undervalued Zone"></div>
              </div>

              {/* Current Price Pin */}
              <div
                className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                style={{ left: isUndervalued ? '40%' : '75%' }}
              >
                <span className="text-[9px] font-mono-code font-bold bg-white text-black px-1.5 py-0.5 rounded shadow">
                  {sym}{stock.price.toFixed(0)}
                </span>
                <div className="w-1.5 h-3 bg-white"></div>
              </div>

              {/* Fair Value Pin */}
              <div
                className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                style={{ left: '60%' }}
              >
                <span className="text-[9px] font-mono-code font-bold bg-[#d4af37] text-black px-1.5 py-0.5 rounded shadow">
                  {sym}{stock.fairValue.consensusValue.toFixed(0)} FV
                </span>
                <div className="w-1.5 h-3 bg-[#d4af37]"></div>
              </div>
            </div>

            <div className="flex justify-between text-[10px] font-mono-code text-zinc-400">
              <span>Bear: {sym}{(stock.price * 0.82).toFixed(0)}</span>
              <span className="text-[#d4af37] font-bold">Base: {sym}{stock.fairValue.consensusValue.toFixed(0)}</span>
              <span>Bull: {sym}{(stock.fairValue.consensusValue * 1.2).toFixed(0)}</span>
            </div>
          </div>

          <div className="text-[10px] text-zinc-400 mt-2">
            Models compute intrinsic worth based on historical cash flow reliability.
          </div>
        </div>
      </div>

      {/* Interactive DCF Sandbox (Expands when clicked) */}
      {showSandbox && (
        <div className="bg-[#060606] border border-[#d4af37]/40 rounded-xl p-5 mb-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#d4af37]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Interactive DCF Assumptions Sandbox
              </h3>
            </div>
            <span className="text-[10px] text-zinc-400">Real-Time Recalculation Engine</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Slider 1: WACC Discount Rate */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300">Discount Rate (WACC):</span>
                <span className="font-mono-code font-bold text-[#d4af37]">{discountRate.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="6.0"
                max="16.0"
                step="0.1"
                value={discountRate}
                onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                <span>6.0% (Low Risk)</span>
                <span>16.0% (Emerging Risk)</span>
              </div>
            </div>

            {/* Slider 2: Revenue Growth */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300">5Y Revenue CAGR:</span>
                <span className="font-mono-code font-bold text-[#d4af37]">{revenueGrowth.toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="2.0"
                max="30.0"
                step="0.5"
                value={revenueGrowth}
                onChange={(e) => setRevenueGrowth(parseFloat(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                <span>2.0% (Conservative)</span>
                <span>30.0% (High Growth)</span>
              </div>
            </div>

            {/* Slider 3: Terminal EBITDA Multiple */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-300">Terminal Exit Multiple:</span>
                <span className="font-mono-code font-bold text-[#d4af37]">{terminalMultiple.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="10.0"
                max="35.0"
                step="0.5"
                value={terminalMultiple}
                onChange={(e) => setTerminalMultiple(parseFloat(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-zinc-400 mt-1">
                <span>10.0x (Value)</span>
                <span>35.0x (Premium)</span>
              </div>
            </div>
          </div>

          {/* Sandbox Recalculated Output Result */}
          <div className="mt-5 p-4 bg-[#0d0d0d] border border-white/10 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]">
                Custom DCF Intrinsic Valuation
              </div>
              <div className="text-2xl font-mono-code font-bold text-white mt-0.5">
                {sym}{customDCF.toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`font-mono-code text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  customUpside >= 0
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {customUpside >= 0 ? '+' : ''}{customUpside.toFixed(1)}% Implied Upside
              </span>

              <button
                onClick={() => {
                  setDiscountRate(stock.market === 'INDIA' ? 10.5 : 8.5);
                  setRevenueGrowth(stock.market === 'INDIA' ? 12.0 : 9.0);
                  setTerminalMultiple(20.0);
                }}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 py-1.5 px-2.5 rounded bg-white/5"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Model Breakdown Category Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-4 pb-3 border-t border-white/10">
        <div className="text-xs font-bold uppercase tracking-wider text-zinc-300">
          Underlying Valuation Models Breakdown
        </div>
        <div className="flex gap-1">
          {(['ALL', 'DCF', 'Multiples', 'Fundamental'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#d4af37] text-black'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Models */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Valuation Model</th>
              <th className="py-2.5 px-3">Category</th>
              <th className="py-2.5 px-3">Intrinsic Value</th>
              <th className="py-2.5 px-3">Model Weight</th>
              <th className="py-2.5 px-3 text-right">Implied Upside</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono-code">
            {filteredModels.map((m) => {
              const modelUpside = ((m.value - stock.price) / stock.price) * 100;
              const isModelPos = modelUpside >= 0;
              return (
                <tr key={m.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-sans font-semibold text-zinc-100 text-xs">{m.name}</div>
                    <div className="font-sans text-[10px] text-zinc-400 mt-0.5 line-clamp-1">{m.description}</div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">
                      {m.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white text-sm">
                    {sym}{m.value.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-zinc-400">
                    {m.weight}%
                  </td>
                  <td className={`py-3 px-3 text-right font-bold ${isModelPos ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                    {isModelPos ? '+' : ''}{modelUpside.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
