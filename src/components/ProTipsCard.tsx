import React from 'react';
import { Stock } from '../types';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Info } from 'lucide-react';

interface ProTipsCardProps {
  stock: Stock;
}

export const ProTipsCard: React.FC<ProTipsCardProps> = ({ stock }) => {
  const bulls = stock.proTips.filter(t => t.type === 'bull');
  const bears = stock.proTips.filter(t => t.type === 'bear');

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Automated Synthesis
            </span>
            <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
              RetailTips™
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-white mt-1">
            Executive Catalysts & Risks
          </h2>
        </div>

        <div className="text-xs text-zinc-400 font-mono-code hidden sm:block">
          <span className="text-emerald-400 font-bold">{bulls.length} Bullish</span> • <span className="text-rose-400 font-bold">{bears.length} Cautions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bullish Catalysts */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#10b981] pb-2 border-b border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>Bullish Drivers & Moat Catalysts</span>
          </div>

          <div className="space-y-2.5">
            {bulls.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#0e0e0e] border-l-2 border-[#10b981] border-y border-r border-white/5 p-3.5 rounded-r-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-xs font-bold text-white tracking-tight">{tip.title}</h4>
                  <span className="text-[9px] uppercase font-mono-code font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                    {tip.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bearish Risks & Cautions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ef4444] pb-2 border-b border-rose-500/20">
            <AlertTriangle className="w-4 h-4" />
            <span>Key Risk Factors & Valuation Checks</span>
          </div>

          <div className="space-y-2.5">
            {bears.map((tip) => (
              <div
                key={tip.id}
                className="bg-[#0e0e0e] border-l-2 border-[#ef4444] border-y border-r border-white/5 p-3.5 rounded-r-xl hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-xs font-bold text-white tracking-tight">{tip.title}</h4>
                  <span className="text-[9px] uppercase font-mono-code font-bold px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 whitespace-nowrap">
                    {tip.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
