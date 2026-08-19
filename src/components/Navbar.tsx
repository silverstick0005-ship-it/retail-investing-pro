import React, { useState } from 'react';
import { POPULAR_US_TICKERS, POPULAR_INDIA_TICKERS, STOCKS_DATA } from '../data/stocksData';
import { MarketRegion } from '../types';
import { Search, Sparkles, TrendingUp, ShieldCheck, Crown, Layers, PieChart, Star, Compass, Globe, PlayCircle } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTicker: string;
  setSelectedTicker: (ticker: string) => void;
  marketRegion: MarketRegion;
  setMarketRegion: (region: MarketRegion) => void;
  onOpenUpgradeModal: () => void;
  onOpenVideoTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedTicker,
  setSelectedTicker,
  marketRegion,
  setMarketRegion,
  onOpenUpgradeModal,
  onOpenVideoTour,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currentPopularTickers = marketRegion === 'INDIA' ? POPULAR_INDIA_TICKERS : POPULAR_US_TICKERS;

  const filteredTickers = Object.values(STOCKS_DATA).filter(
    (s) =>
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const marqueeItems = [
    { ticker: 'NIFTY 50', price: '24,852.10', change: '+0.64%', isPos: true },
    { ticker: 'SENSEX', price: '81,424.30', change: '+0.58%', isPos: true },
    { ticker: 'S&P 500', price: '5,864.20', change: '+0.42%', isPos: true },
    { ticker: 'NASDAQ', price: '18,485.60', change: '+0.81%', isPos: true },
    { ticker: 'RELIANCE', price: '₹1,395.50', change: '+1.34%', isPos: true },
    { ticker: 'HDFCBANK', price: '₹1,780.00', change: '+0.80%', isPos: true },
    { ticker: 'NVDA', price: '$138.25', change: '+3.07%', isPos: true },
    { ticker: 'TCS', price: '₹4,120.00', change: '+0.79%', isPos: true },
    { ticker: 'AAPL', price: '$232.45', change: '+1.25%', isPos: true },
    { ticker: 'GOOGL', price: '$182.40', change: '+1.08%', isPos: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      {/* Real-Time Live Ticker Marquee */}
      <div className="bg-[#090909] border-b border-white/5 py-1.5 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap text-[11px] font-mono-code">
          <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE MARKETS:
          </span>
          {marqueeItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (STOCKS_DATA[item.ticker]) {
                  setSelectedTicker(item.ticker);
                }
              }}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-zinc-400 font-semibold">{item.ticker}</span>
              <span className="text-zinc-200">{item.price}</span>
              <span className={item.isPos ? 'text-[#10b981]' : 'text-[#ef4444]'}>
                {item.change}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4af37] via-[#f59e0b] to-[#aa8a2e] flex items-center justify-center font-serif text-sm font-bold text-black shadow-lg shadow-[#d4af37]/20">
                R
              </div>
              <div>
                <span className="text-lg font-serif-display font-bold tracking-tight text-white">
                  Retail<span className="text-[#d4af37]">Investing</span>
                </span>
                <span className="ml-1.5 bg-[#d4af37]/15 text-[#d4af37] text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded border border-[#d4af37]/30 tracking-wider">
                  PRO
                </span>
              </div>
            </button>

            {/* Market Switcher: US vs India */}
            <div className="hidden sm:flex items-center bg-[#0e0e0e] border border-white/10 rounded-xl p-1 ml-2 text-xs font-bold">
              <button
                onClick={() => {
                  setMarketRegion('INDIA');
                  if (!['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'TATAMOTORS', 'PAYTM'].includes(selectedTicker)) {
                    setSelectedTicker('RELIANCE');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  marketRegion === 'INDIA'
                    ? 'bg-[#d4af37] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>🇮🇳</span>
                <span>India (NSE/BSE)</span>
              </button>
              <button
                onClick={() => {
                  setMarketRegion('US');
                  if (['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'TATAMOTORS', 'PAYTM'].includes(selectedTicker)) {
                    setSelectedTicker('AAPL');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                  marketRegion === 'US'
                    ? 'bg-[#d4af37] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>🇺🇸</span>
                <span>US (NASDAQ/NYSE)</span>
              </button>
            </div>
          </div>

          {/* Search Autocomplete Bar */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={marketRegion === 'INDIA' ? "Search Indian stocks (e.g. RELIANCE, TCS, HDFC Bank, INFY)..." : "Search US stocks (e.g. AAPL, NVDA, GOOGL, TSLA)..."}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-[#0e0e0e] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 font-mono-code focus:outline-none focus:border-[#d4af37] transition-colors"
              />
            </div>

            {/* Autocomplete Dropdown */}
            {isSearchOpen && searchQuery && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#0c0c0c] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5">
                {filteredTickers.length > 0 ? (
                  filteredTickers.map((s) => (
                    <button
                      key={s.ticker}
                      onClick={() => {
                        setSelectedTicker(s.ticker);
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white font-mono-code">{s.ticker}</span>
                        <span className="text-xs text-zinc-400 truncate max-w-[200px]">{s.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono-code">({s.market === 'INDIA' ? 'NSE' : 'NASDAQ'})</span>
                      </div>
                      <div className="text-right font-mono-code">
                        <div className="text-xs font-bold text-white">{s.currencySymbol}{s.price.toFixed(2)}</div>
                        <div className="text-[10px] text-[#d4af37]">Fair Value: {s.currencySymbol}{s.fairValue.consensusValue.toFixed(2)}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-xs text-zinc-500">No matching equities found</div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Menu: Video Tour & Upgrade to Pro */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenVideoTour}
              className="bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/30 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              title="Watch interactive app tour & video explanation"
            >
              <PlayCircle className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">Video Tour</span>
            </button>

            <button
              onClick={onOpenUpgradeModal}
              className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] hover:from-[#e5bd43] hover:to-[#fbbf24] text-black font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20 transition-transform hover:scale-105"
            >
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>Unlock Pro+</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-2 border-t border-white/5 pt-2 text-xs no-scrollbar">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Layers },
            { id: 'monthly-signals', label: '🎯 Monthly Buy / Sell Tips', icon: Compass, highlight: true },
            { id: 'propicks', label: 'RetailPicks™ AI', icon: Sparkles },
            { id: 'fairvalue', label: 'Fair Value DCF', icon: TrendingUp },
            { id: 'health', label: 'Financial Health', icon: ShieldCheck },
            { id: 'financials', label: '10Y Statements', icon: PieChart },
            { id: 'gurus', label: '13F Guru Tracker', icon: Star },
            { id: 'screener', label: 'Screener', icon: Search },
            { id: 'ai-analyst', label: 'WarrenAI Assistant', icon: Sparkles },
            { id: 'watchlist', label: 'Watchlist', icon: Crown },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-white/10 text-white font-bold border border-white/20'
                    : tab.highlight
                    ? 'bg-[#d4af37]/15 text-[#d4af37] font-bold border border-[#d4af37]/30 hover:bg-[#d4af37]/25'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive || tab.highlight ? 'text-[#d4af37]' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
