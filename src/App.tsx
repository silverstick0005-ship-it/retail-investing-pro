import React, { useState } from 'react';
import { STOCKS_DATA } from './data/stocksData';
import { MarketRegion } from './types';
import { Navbar } from './components/Navbar';
import { StockHeader } from './components/StockHeader';
import { FairValueCard } from './components/FairValueCard';
import { HealthScoreCard } from './components/HealthScoreCard';
import { ProTipsCard } from './components/ProTipsCard';
import { ProPicksView } from './components/ProPicksView';
import { GuruPortfoliosView } from './components/GuruPortfoliosView';
import { ScreenerView } from './components/ScreenerView';
import { FinancialsView } from './components/FinancialsView';
import { AIAnalystView } from './components/AIAnalystView';
import { WatchlistView } from './components/WatchlistView';
import { MonthlySignalsView } from './components/MonthlySignalsView';
import { UpgradeModal } from './components/UpgradeModal';
import { VideoWalkthroughModal } from './components/VideoWalkthroughModal';
import { Sparkles, ShieldCheck, SlidersHorizontal, TrendingUp, Star, ChevronRight, Award, Zap, Compass, CheckCircle2, PlayCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [marketRegion, setMarketRegion] = useState<MarketRegion>('INDIA');
  const [selectedTicker, setSelectedTicker] = useState<string>('RELIANCE');
  const [watchlist, setWatchlist] = useState<string[]>(['RELIANCE', 'HDFCBANK', 'TCS', 'AAPL', 'NVDA']);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [isVideoTourOpen, setIsVideoTourOpen] = useState<boolean>(false);

  const stock = STOCKS_DATA[selectedTicker] || STOCKS_DATA['RELIANCE'];
  const isBookmarked = watchlist.includes(selectedTicker);

  const toggleBookmark = () => {
    if (isBookmarked) {
      setWatchlist((prev) => prev.filter((t) => t !== selectedTicker));
    } else {
      setWatchlist((prev) => [...prev, selectedTicker]);
    }
  };

  const handleSelectTicker = (ticker: string) => {
    if (STOCKS_DATA[ticker]) {
      setSelectedTicker(ticker);
      setMarketRegion(STOCKS_DATA[ticker].market);
      setActiveTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col font-sans selection:bg-[#d4af37]/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedTicker={selectedTicker}
        setSelectedTicker={(ticker) => {
          if (STOCKS_DATA[ticker]) {
            setSelectedTicker(ticker);
            setMarketRegion(STOCKS_DATA[ticker].market);
          }
          setActiveTab('dashboard');
        }}
        marketRegion={marketRegion}
        setMarketRegion={setMarketRegion}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        onOpenVideoTour={() => setIsVideoTourOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* TAB 1: MAIN DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Stock Master Header */}
            <StockHeader
              stock={stock}
              onOpenAIDeepDive={() => setActiveTab('ai-analyst')}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onSelectTab={setActiveTab}
            />

            {/* Quick Interactive Video Tour Banner */}
            <div className="bg-gradient-to-r from-[#14120a] via-[#0e0e0e] to-[#080808] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                  <PlayCircle className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-sm font-serif-display font-bold text-white">
                    New to Retail Investing PRO? Watch the Interactive Video Tour
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Learn how 14-Model DCF Fair Value, Indian (NSE/BSE) strategies, and Monthly Buy/Sell signals work.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsVideoTourOpen(true)}
                className="bg-[#d4af37] hover:bg-[#e5bd43] text-black px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-md shadow-[#d4af37]/20 transition-transform hover:scale-105 flex items-center gap-1.5"
              >
                <span>Launch Video Tour</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Monthly Signal Action Banner Quick View */}
            <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 shrink-0">
                  <Compass className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
                      Monthly Investment Signal
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${
                      stock.monthlySignal.action === 'STRONG BUY' || stock.monthlySignal.action === 'ACCUMULATE'
                        ? 'bg-emerald-500/20 text-[#10b981] border-emerald-500/40'
                        : stock.monthlySignal.action === 'HOLD'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-rose-500/20 text-[#ef4444] border-rose-500/40'
                    }`}>
                      {stock.monthlySignal.action} ({stock.monthlySignal.ratingScore}/10)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1 max-w-2xl">
                    {stock.monthlySignal.primaryRationale}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('monthly-signals')}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-colors self-start md:self-auto"
              >
                <span>View Full Monthly Buy / Sell Matrix</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </div>

            {/* Fair Value Intrinsic Valuation Engine */}
            <FairValueCard stock={stock} />

            {/* Financial Health Score Breakdown */}
            <HealthScoreCard stock={stock} />

            {/* ProTips (Catalysts vs Risks) */}
            <ProTipsCard stock={stock} />

            {/* ProPicks AI Teaser Banner */}
            <div className="bg-gradient-to-r from-[#12100a] via-[#0d0d0d] to-[#0a0a0a] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-2">
                  <Sparkles className="w-4 h-4 fill-[#d4af37]" />
                  <span>Indian & US AI Portfolios</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif-display font-bold text-white">
                  RetailPicks™ Bharat Growth AI Outperformed by +965%
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                  Discover machine-learning optimized stock portfolios across NSE/BSE Indian leaders and US Tech Titans with monthly rebalancing.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('propicks')}
                className="bg-[#d4af37] hover:bg-[#e5bd43] text-black px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#d4af37]/20 whitespace-nowrap transition-transform hover:scale-105"
              >
                <span>Explore AI Portfolios</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MONTHLY INVESTMENT TIPS & SIGNALS (BUY / SELL / AVOID) */}
        {activeTab === 'monthly-signals' && (
          <div className="animate-fadeIn">
            <MonthlySignalsView onSelectTicker={handleSelectTicker} />
          </div>
        )}

        {/* TAB 3: PROPICKS AI PORTFOLIOS */}
        {activeTab === 'propicks' && (
          <div className="animate-fadeIn">
            <ProPicksView onSelectTicker={handleSelectTicker} />
          </div>
        )}

        {/* TAB 4: FAIR VALUE VALUATION SUITE */}
        {activeTab === 'fairvalue' && (
          <div className="space-y-6 animate-fadeIn">
            <StockHeader
              stock={stock}
              onOpenAIDeepDive={() => setActiveTab('ai-analyst')}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onSelectTab={setActiveTab}
            />
            <FairValueCard stock={stock} />
            <ProTipsCard stock={stock} />
          </div>
        )}

        {/* TAB 5: FINANCIAL HEALTH SCORE */}
        {activeTab === 'health' && (
          <div className="space-y-6 animate-fadeIn">
            <StockHeader
              stock={stock}
              onOpenAIDeepDive={() => setActiveTab('ai-analyst')}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onSelectTab={setActiveTab}
            />
            <HealthScoreCard stock={stock} />
            <FairValueCard stock={stock} />
          </div>
        )}

        {/* TAB 6: 10-YEAR FINANCIAL STATEMENTS */}
        {activeTab === 'financials' && (
          <div className="space-y-6 animate-fadeIn">
            <StockHeader
              stock={stock}
              onOpenAIDeepDive={() => setActiveTab('ai-analyst')}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onSelectTab={setActiveTab}
            />
            <FinancialsView stock={stock} />
          </div>
        )}

        {/* TAB 7: 13F GURUS & BILLIONAIRES */}
        {activeTab === 'gurus' && (
          <div className="animate-fadeIn">
            <GuruPortfoliosView onSelectTicker={handleSelectTicker} />
          </div>
        )}

        {/* TAB 8: ADVANCED SCREENER */}
        {activeTab === 'screener' && (
          <div className="animate-fadeIn">
            <ScreenerView onSelectTicker={handleSelectTicker} />
          </div>
        )}

        {/* TAB 9: AI RESEARCH ASSISTANT (WARRENAI) */}
        {activeTab === 'ai-analyst' && (
          <div className="space-y-6 animate-fadeIn">
            <StockHeader
              stock={stock}
              onOpenAIDeepDive={() => {}}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onSelectTab={setActiveTab}
            />
            <AIAnalystView stock={stock} />
          </div>
        )}

        {/* TAB 10: CUSTOM WATCHLIST & PORTFOLIO */}
        {activeTab === 'watchlist' && (
          <div className="animate-fadeIn">
            <WatchlistView
              watchlist={watchlist}
              onRemoveFromWatchlist={(ticker) => {
                setWatchlist((prev) => prev.filter((t) => t !== ticker));
              }}
              onSelectTicker={handleSelectTicker}
            />
          </div>
        )}
      </main>

      {/* Video Tour Walkthrough Modal */}
      <VideoWalkthroughModal
        isOpen={isVideoTourOpen}
        onClose={() => setIsVideoTourOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />

      {/* Institutional Dark Footer */}
      <footer className="border-t border-white/5 bg-[#040404] py-8 mt-12 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-xs bg-gradient-to-br from-[#d4af37] to-[#aa8a2e] flex items-center justify-center font-serif text-[10px] font-bold text-black">
              R
            </div>
            <span className="font-bold text-white tracking-wider uppercase text-xs">
              Retail<span className="text-[#d4af37]">Investing</span> PRO
            </span>
            <span className="text-zinc-400">| © 2026 Retail Investing Inc.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-zinc-400 uppercase tracking-wider">
            <button onClick={() => setIsVideoTourOpen(true)} className="text-[#d4af37] font-bold hover:underline flex items-center gap-1">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Video Guide</span>
            </button>
            <button onClick={() => setActiveTab('monthly-signals')} className="text-[#d4af37] font-bold hover:underline">Monthly Buy/Sell Tips</button>
            <button onClick={() => setActiveTab('propicks')} className="hover:text-zinc-200">AI ProPicks</button>
            <button onClick={() => setActiveTab('fairvalue')} className="hover:text-zinc-200">Fair Value Models</button>
            <button onClick={() => setActiveTab('gurus')} className="hover:text-zinc-200">13F Guru Tracker</button>
            <button onClick={() => setIsUpgradeModalOpen(true)} className="text-[#d4af37] hover:underline font-bold">
              Membership Plans
            </button>
          </div>

          <div className="text-[10px] text-zinc-400 max-w-xs text-center md:text-right">
            Covering NSE (National Stock Exchange of India), BSE, and US Equities with algorithmic intrinsic valuations.
          </div>
        </div>
      </footer>
    </div>
  );
}
