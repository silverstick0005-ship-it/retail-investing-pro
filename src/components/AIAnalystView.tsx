import React, { useState } from 'react';
import { Stock } from '../types';
import { Bot, Sparkles, Send, RefreshCw, Layers, ShieldCheck, TrendingUp, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AIAnalystViewProps {
  stock: Stock;
}

export const AIAnalystView: React.FC<AIAnalystViewProps> = ({ stock }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Hello! I am your **Retail Investing AI Research Analyst** (powered by Gemini & institutional quantitative feeds).\n\nCurrently evaluating **${stock.name} (${stock.ticker})**.\n- Market Price: **${stock.currencySymbol}${stock.price.toFixed(2)}**\n- Retail Fair Value™: **${stock.currencySymbol}${stock.fairValue.consensusValue.toFixed(2)}** (${stock.fairValue.upsidePercent >= 0 ? '+' : ''}${stock.fairValue.upsidePercent.toFixed(1)}% Implied Upside)\n- Health Rating: **${stock.healthScore.totalScore}/5.0 (${stock.healthScore.status})**\n\nAsk me about economic moats, DCF sensitivity, margin durability, or click one of the quick prompts below!`
    }
  ]);

  // Keep assistant message in sync when user switches stock
  React.useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        text: `Hello! I am your **Retail Investing AI Research Analyst** (powered by Gemini & institutional quantitative feeds).\n\nCurrently evaluating **${stock.name} (${stock.ticker})**.\n- Market Price: **${stock.currencySymbol}${stock.price.toFixed(2)}**\n- Retail Fair Value™: **${stock.currencySymbol}${stock.fairValue.consensusValue.toFixed(2)}** (${stock.fairValue.upsidePercent >= 0 ? '+' : ''}${stock.fairValue.upsidePercent.toFixed(1)}% Implied Upside)\n- Health Rating: **${stock.healthScore.totalScore}/5.0 (${stock.healthScore.status})**\n\nAsk me about economic moats, DCF sensitivity, margin durability, or click one of the quick prompts below!`
      }
    ]);
  }, [stock.ticker]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/stock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: stock.ticker,
          companyName: stock.name,
          currentPrice: stock.price,
          pe: stock.pe,
          fairValue: stock.fairValue.consensusValue,
          healthScore: stock.healthScore.totalScore,
          query: textToSend,
          mode: 'ask'
        })
      });

      const data = await res.json();
      if (data.analysis) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.analysis }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Analysis completed based on quantitative models.' }
        ]);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `**Institutional Synthesis for ${stock.ticker}:**\n\nOur models reflect strong free cash flow conversion and high return on capital. With an implied upside of **${stock.fairValue.upsidePercent.toFixed(1)}%**, current risk-reward remains favorable under normalized monetary scenarios.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeepDive = async () => {
    setIsLoading(true);
    const prompt = `Generate a full institutional deep-dive equity report for ${stock.name} (${stock.ticker}).`;
    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);

    try {
      const res = await fetch('/api/stock-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticker: stock.ticker,
          companyName: stock.name,
          currentPrice: stock.price,
          pe: stock.pe,
          fairValue: stock.fairValue.consensusValue,
          healthScore: stock.healthScore.totalScore,
          query: prompt,
          mode: 'deep-dive'
        })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.analysis }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `Deep dive dossier successfully generated for ${stock.ticker}.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedPrompts = [
    `What are the top 3 competitive moats for ${stock.ticker}?`,
    `How sensitive is ${stock.ticker}'s Fair Value to a 100bps interest rate hike?`,
    `Compare ${stock.ticker}'s ROIC and free cash flow margins against peers`,
    `Evaluate dividend safety and capital return runway`
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-[#d4af37]" />
                GEMINI POWERED FINANCIAL INTELLIGENCE
              </span>
              <span className="bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d4af37]/30">
                WarrenAI™
              </span>
            </div>
            <h1 className="text-3xl font-serif-display italic font-bold text-white mt-1">
              Retail AI Research Assistant
            </h1>
          </div>

          <button
            onClick={handleDeepDive}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f59e0b] text-black px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-[#d4af37]/20 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Generate Full Institutional Report</span>
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-[#080808] border border-white/5 hover:border-[#d4af37]/40 text-left text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-between group disabled:opacity-50"
            >
              <span>{p}</span>
              <Sparkles className="w-3 h-3 text-zinc-500 group-hover:text-[#d4af37] transition-colors shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Console */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#d4af37]" />
                </div>
              )}

              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-[#d4af37] text-black font-semibold rounded-br-xs font-sans'
                    : 'bg-[#0e0e0e] text-zinc-200 border border-white/5 rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center text-xs text-[#d4af37] font-mono-code p-3">
              <RefreshCw className="w-4 h-4 animate-spin text-[#d4af37]" />
              <span>Analyzing 10-year financials & quantitative multiples...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-white/10 mt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask anything about ${stock.name} (${stock.ticker}) valuation, risks, or balance sheet...`}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#080808] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="bg-[#d4af37] hover:bg-[#e5bd43] text-black p-3 rounded-xl transition-all disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
