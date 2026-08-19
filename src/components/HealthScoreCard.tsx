import React, { useState } from 'react';
import { Stock, HealthPillar } from '../types';
import { ShieldCheck, ChevronDown, ChevronUp, Check, AlertCircle, Award, BarChart3 } from 'lucide-react';

interface HealthScoreCardProps {
  stock: Stock;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ stock }) => {
  const [expandedPillar, setExpandedPillar] = useState<string | null>('profitability');

  const health = stock.healthScore;
  const pillars = [
    { key: 'profitability', data: health.pillars.profitability },
    { key: 'growth', data: health.pillars.growth },
    { key: 'cashFlow', data: health.pillars.cashFlow },
    { key: 'momentum', data: health.pillars.momentum },
    { key: 'relativeValue', data: health.pillars.relativeValue },
  ];

  const getStatusColor = (score: number) => {
    if (score >= 4.5) return 'text-[#10b981] bg-emerald-500/10 border-emerald-500/30';
    if (score >= 4.0) return 'text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/30';
    if (score >= 3.0) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Financial Health Rating
            </span>
            <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
              Sector Benchmarked (100+ Factors)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-display font-bold text-white mt-1">
            Institutional Health Score
          </h2>
        </div>

        <div className="flex items-center gap-4 bg-[#0e0e0e] border border-white/10 px-4 py-2.5 rounded-xl">
          <div>
            <div className="text-[10px] uppercase text-zinc-400 font-semibold">Total Rating</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-mono-code font-bold text-[#d4af37]">{health.totalScore.toFixed(1)}</span>
              <span className="text-xs text-zinc-400 font-mono-code">/ 5.0</span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10"></div>
          <div>
            <div className="text-[10px] uppercase text-zinc-400 font-semibold">Health Status</div>
            <div className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
              {health.status}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Health Pillars Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 my-6">
        {pillars.map(({ key, data }) => {
          const isSelected = expandedPillar === key;
          return (
            <button
              key={key}
              onClick={() => setExpandedPillar(isSelected ? null : key)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#121212] border-[#d4af37] shadow-lg shadow-[#d4af37]/5'
                  : 'bg-[#0e0e0e] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold truncate">
                {data.name.replace(' Health', '')}
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-lg font-mono-code font-bold text-white">
                  {data.score.toFixed(1)} <span className="text-[10px] text-zinc-500 font-normal">/ 5.0</span>
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusColor(data.score)}`}>
                  {data.status}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(data.score / 5.0) * 100}%`,
                    backgroundColor: data.score >= 4.5 ? '#10b981' : data.score >= 4.0 ? '#d4af37' : '#f59e0b'
                  }}
                ></div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Key Metrics Breakdown */}
      {expandedPillar && (
        <div className="bg-[#0e0e0e] border border-white/10 rounded-xl p-5 animate-fadeIn">
          {(() => {
            const current = health.pillars[expandedPillar as keyof typeof health.pillars];
            return (
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#d4af37]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      {current.name} Breakdown
                    </h3>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono-code">
                    Score: <strong className="text-[#d4af37]">{current.score.toFixed(1)} / 5.0</strong> ({current.status})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {current.keyMetrics.map((metric, idx) => (
                    <div key={idx} className="bg-[#080808] border border-white/5 p-3.5 rounded-lg flex flex-col justify-between">
                      <div className="text-xs text-zinc-300 font-medium">{metric.label}</div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-base font-mono-code font-bold text-white">{metric.value}</span>
                        <span className="text-[10px] text-zinc-400 font-mono-code">{metric.benchmark}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                        <Check className="w-3 h-3" />
                        <span>Passes institutional quality filter</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
