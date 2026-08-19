import React, { useState } from 'react';
import { Stock } from '../types';
import { PieChart, TrendingUp, DollarSign, Download, BarChart3, Layers, Check } from 'lucide-react';

interface FinancialsViewProps {
  stock: Stock;
}

export const FinancialsView: React.FC<FinancialsViewProps> = ({ stock }) => {
  const [statementTab, setStatementTab] = useState<'income' | 'balance' | 'cashflow' | 'ratios'>('income');

  const financials = stock.financials;

  const exportCSV = () => {
    let rows = [
      ['Metric', ...financials.years],
      ['Revenue ($B)', ...financials.revenue],
      ['Gross Profit ($B)', ...financials.grossProfit],
      ['Operating Income ($B)', ...financials.operatingIncome],
      ['Net Income ($B)', ...financials.netIncome],
      ['Free Cash Flow ($B)', ...financials.freeCashFlow],
      ['Total Cash ($B)', ...financials.totalCash],
      ['Total Debt ($B)', ...financials.totalDebt],
      ['ROIC (%)', ...financials.roic],
      ['Operating Margin (%)', ...financials.operatingMargin]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${stock.ticker}_10Y_Financials_RetailInvesting.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">
                Institutional Financial Statements
              </span>
              <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
                10+ Years Standardized
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-white mt-1">
              {stock.name} ({stock.ticker}) Historical Financials
            </h2>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-semibold transition-all self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-[#d4af37]" />
            <span>Export to Excel / CSV</span>
          </button>
        </div>

        {/* Financial Statement Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1">
          {[
            { id: 'income', label: 'Income Statement' },
            { id: 'balance', label: 'Balance Sheet' },
            { id: 'cashflow', label: 'Cash Flow' },
            { id: 'ratios', label: 'Key Financial Ratios & Margins' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatementTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                statementTab === tab.id
                  ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20'
                  : 'bg-[#080808] text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Growth Visualization Bar Chart */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h3 className="text-lg font-serif-display font-bold text-white">
            Historical Revenue & Free Cash Flow Trajectory ($ Billions)
          </h3>
          <div className="flex items-center gap-4 text-xs font-mono-code">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-3 h-3 rounded-sm bg-[#d4af37]"></span>
              Revenue
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-3 h-3 rounded-sm bg-[#10b981]"></span>
              Free Cash Flow
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 font-mono-code">
          {financials.years.map((year, idx) => {
            const rev = financials.revenue[idx];
            const fcf = financials.freeCashFlow[idx];
            const maxRev = Math.max(...financials.revenue);
            return (
              <div key={year} className="bg-[#080808] border border-white/5 p-4 rounded-xl flex flex-col justify-end h-64 relative">
                <div className="space-y-2 h-full flex flex-col justify-end">
                  {/* Revenue Bar */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-[#d4af37] text-right">${rev}B</div>
                    <div
                      className="bg-gradient-to-t from-[#aa8a2e] to-[#d4af37] rounded-t-md transition-all duration-500"
                      style={{ height: `${(rev / maxRev) * 120}px` }}
                    ></div>
                  </div>

                  {/* FCF Bar */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-[#10b981] text-right">${fcf}B</div>
                    <div
                      className="bg-gradient-to-t from-emerald-700 to-[#10b981] rounded-t-md transition-all duration-500"
                      style={{ height: `${Math.max(10, (fcf / maxRev) * 120)}px` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 text-center font-sans font-bold text-xs text-white">
                  {year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabular Financial Data Grid */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider font-mono-code">
                <th className="py-3 px-4 font-bold text-white">Metric (in USD Billions)</th>
                {financials.years.map((y) => (
                  <th key={y} className="py-3 px-3 text-right">{y}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono-code">
              {statementTab === 'income' && (
                <>
                  <tr className="hover:bg-white/5 font-semibold text-white">
                    <td className="py-3 px-4 font-sans">Total Revenue</td>
                    {financials.revenue.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right font-bold text-[#d4af37]">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans text-zinc-300">Gross Profit</td>
                    {financials.grossProfit.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-zinc-200">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans text-zinc-300">Operating Income (EBIT)</td>
                    {financials.operatingIncome.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-zinc-200">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5 font-bold text-white bg-white/[0.02]">
                    <td className="py-3 px-4 font-sans">Net Income (GAAP)</td>
                    {financials.netIncome.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-emerald-400">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                </>
              )}

              {statementTab === 'balance' && (
                <>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans font-semibold text-white">Cash & Short-Term Assets</td>
                    {financials.totalCash.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-emerald-400 font-bold">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans text-zinc-300">Total Long-Term Debt</td>
                    {financials.totalDebt.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-rose-400">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans text-zinc-300">Diluted Shares Outstanding (B)</td>
                    {financials.sharesOutstanding.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-zinc-200">{v.toFixed(2)}B</td>
                    ))}
                  </tr>
                </>
              )}

              {statementTab === 'cashflow' && (
                <>
                  <tr className="hover:bg-white/5 font-semibold text-white bg-white/[0.02]">
                    <td className="py-3 px-4 font-sans">Free Cash Flow (FCF)</td>
                    {financials.freeCashFlow.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-[#10b981] font-bold">${v.toFixed(1)}B</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans text-zinc-300">FCF Margin (%)</td>
                    {financials.freeCashFlow.map((fcf, i) => {
                      const margin = (fcf / financials.revenue[i]) * 100;
                      return (
                        <td key={i} className="py-3 px-3 text-right text-zinc-200">{margin.toFixed(1)}%</td>
                      );
                    })}
                  </tr>
                </>
              )}

              {statementTab === 'ratios' && (
                <>
                  <tr className="hover:bg-white/5 font-semibold text-white">
                    <td className="py-3 px-4 font-sans">Return on Invested Capital (ROIC)</td>
                    {financials.roic.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-[#d4af37] font-bold">{v.toFixed(1)}%</td>
                    ))}
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="py-3 px-4 font-sans text-zinc-300">Operating Profit Margin</td>
                    {financials.operatingMargin.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-right text-zinc-200">{v.toFixed(1)}%</td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
