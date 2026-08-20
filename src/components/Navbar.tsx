import React, { useState } from 'react';
import { POPULAR_US_TICKERS, POPULAR_INDIA_TICKERS } from '../data/stocksData';
import { MarketRegion, Stock } from '../types';
import { useSubscription, OWNER_EMAIL } from '../context/SubscriptionContext';
import { useLiveMarket } from '../context/LiveMarketContext';
import { Search, Sparkles, TrendingUp, ShieldCheck, Crown, Layers, PieChart, Star, Compass, Globe, PlayCircle, UserCheck, ShieldAlert, KeyRound, Activity, Pause, Play } from 'lucide-react';

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
  const { userTier, isOwner, isPro, setUserTier, logoutToGuest, loginAsOwner } = useSubscription();
  const { stocks, isLiveStreaming, toggleLiveStream, lastTickTime } = useLiveMarket();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTierMenuOpen, setIsTierMenuOpen] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);

  const currentPopularTickers = marketRegion === 'INDIA' ? POPULAR_INDIA_TICKERS : POPULAR_US_TICKERS;

  const filteredTickers: Stock[] = (Object.values(stocks) as Stock[]).filter(
    (s: Stock) =>
      s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const marqueeItems = [
    { ticker: 'NIFTY 50', price: '24,852.10', change: '+0.64%', isPos: true },
    { ticker: 'SENSEX', price: '81,424.30', change: '+0.58%', isPos: true },
    { ticker: 'RELIANCE', price: `₹${stocks['RELIANCE']?.price.toFixed(2) || '1,315.00'}`, change: `${stocks['RELIANCE']?.change >= 0 ? '+' : ''}${stocks['RELIANCE']?.changePercent.toFixed(2)}%`, isPos: (stocks['RELIANCE']?.change || 0) >= 0 },
    { ticker: 'HDFCBANK', price: `₹${stocks['HDFCBANK']?.price.toFixed(2) || '1,745.00'}`, change: `${stocks['HDFCBANK']?.change >= 0 ? '+' : ''}${stocks['HDFCBANK']?.changePercent.toFixed(2)}%`, isPos: (stocks['HDFCBANK']?.change || 0) >= 0 },
    { ticker: 'NVDA', price: `$${stocks['NVDA']?.price.toFixed(2) || '136.50'}`, change: `${stocks['NVDA']?.change >= 0 ? '+' : ''}${stocks['NVDA']?.changePercent.toFixed(2)}%`, isPos: (stocks['NVDA']?.change || 0) >= 0 },
    { ticker: 'TCS', price: `₹${stocks['TCS']?.price.toFixed(2) || '3,980.00'}`, change: `${stocks['TCS']?.change >= 0 ? '+' : ''}${stocks['TCS']?.changePercent.toFixed(2)}%`, isPos: (stocks['TCS']?.change || 0) >= 0 },
    { ticker: 'AAPL', price: `$${stocks['AAPL']?.price.toFixed(2) || '230.50'}`, change: `${stocks['AAPL']?.change >= 0 ? '+' : ''}${stocks['AAPL']?.changePercent.toFixed(2)}%`, isPos: (stocks['AAPL']?.change || 0) >= 0 },
    { ticker: 'GOOGL', price: `$${stocks['GOOGL']?.price.toFixed(2) || '180.20'}`, change: `${stocks['GOOGL']?.change >= 0 ? '+' : ''}${stocks['GOOGL']?.changePercent.toFixed(2)}%`, isPos: (stocks['GOOGL']?.change || 0) >= 0 },
    { ticker: 'S&P 500', price: '5,864.20', change: '+0.42%', isPos: true },
    { ticker: 'NASDAQ', price: '18,485.60', change: '+0.81%', isPos: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
      {/* Real-Time Live Ticker Marquee */}
      <div className="bg-[#090909] border-b border-white/5 py-1.5 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 whitespace-nowrap text-[11px] font-mono-code">
          <button
            onClick={toggleLiveStream}
            className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded transition-colors"
            title="Click to pause or resume live ticks"
          >
            <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-emerald-500 animate-ping' : 'bg-zinc-500'}`}></span>
            <span>{isLiveStreaming ? 'LIVE STREAM (2s)' : 'STREAM PAUSED'}</span>
            {isLiveStreaming ? <Pause className="w-2.5 h-2.5 ml-0.5 text-zinc-400" /> : <Play className="w-2.5 h-2.5 ml-0.5 text-emerald-400" />}
          </button>
          {marqueeItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (stocks[item.ticker]) {
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
                  Retail<span className="text-[#d4af37]">Investor</span>
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

          {/* Right Action Menu: Owner VIP Badge / Upgrade to Pro */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenVideoTour}
              className="bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/30 font-bold text-xs px-3 py-2 rounded-xl hidden sm:flex items-center gap-1.5 transition-colors"
              title="Watch interactive app tour & video explanation"
            >
              <PlayCircle className="w-4 h-4 text-[#d4af37]" />
              <span>Video Tour</span>
            </button>

            {/* If Owner: Show VIP Lifetime Owner Badge + Switcher */}
            {isOwner ? (
              <div className="relative">
                <button
                  onClick={() => setIsTierMenuOpen(!isTierMenuOpen)}
                  className="bg-gradient-to-r from-[#d4af37]/20 via-[#f59e0b]/20 to-[#d4af37]/10 border border-[#d4af37]/50 text-[#d4af37] font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm hover:border-[#d4af37] transition-all"
                >
                  <Crown className="w-3.5 h-3.5 fill-[#d4af37]" />
                  <span className="font-mono-code text-[11px]">Owner / VIP (Free)</span>
                </button>

                {/* Owner Tier Dropdown */}
                {isTierMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#101010] border border-[#d4af37]/40 rounded-2xl p-3 shadow-2xl z-50 space-y-2 text-xs">
                    <div className="border-b border-white/10 pb-2">
                      <div className="font-bold text-white flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Owner VIP Account</span>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono-code truncate">{OWNER_EMAIL}</div>
                      <div className="text-[10px] text-emerald-400 font-bold mt-1">✓ Unlimited Lifetime Free Access</div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] uppercase font-bold text-zinc-500">Test Customer Experience:</div>
                      <button
                        onClick={() => {
                          logoutToGuest();
                          setIsTierMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-zinc-300 hover:bg-white/10 hover:text-white flex items-center justify-between"
                      >
                        <span>Switch to Guest (Paywalled)</span>
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                      <button
                        onClick={() => {
                          setUserTier('FOUNDER_OWNER');
                          setIsTierMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-[#d4af37] font-bold bg-[#d4af37]/10 flex items-center justify-between"
                      >
                        <span>Founder Mode (100% Free)</span>
                        <UserCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : isPro ? (
              <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 fill-emerald-400" />
                <span>PRO Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={onOpenUpgradeModal}
                  className="bg-gradient-to-r from-[#d4af37] to-[#f59e0b] hover:from-[#e5bd43] hover:to-[#fbbf24] text-black font-extrabold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-[#d4af37]/20 transition-transform hover:scale-105"
                >
                  <Crown className="w-3.5 h-3.5 fill-black" />
                  <span>Unlock Pro (₹99)</span>
                </button>

                {/* Discrete Owner Unlock Button */}
                <button
                  onClick={() => setShowPinModal(true)}
                  className="p-2 rounded-xl text-zinc-500 hover:text-[#d4af37] hover:bg-white/5 transition-colors"
                  title="Owner / Admin Login"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Secret Owner Unlock PIN Modal */}
        {showPinModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#121212] border border-[#d4af37]/50 rounded-2xl p-5 max-w-xs w-full text-center space-y-3 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center mx-auto">
                <Crown className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Founder Passcode</h4>
              <p className="text-[11px] text-zinc-400">Enter your confidential founder passcode to unlock VIP access on this device.</p>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (loginAsOwner(adminPin)) {
                    setShowPinModal(false);
                    setAdminPin('');
                  } else {
                    alert('Invalid passcode.');
                  }
                }}
                className="space-y-2.5"
              >
                <input
                  type="password"
                  placeholder="Enter Secret Passcode"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="w-full bg-black/70 border border-white/20 rounded-xl px-3 py-2 text-xs text-white text-center font-mono-code focus:outline-none focus:border-[#d4af37]"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPinModal(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-zinc-400 text-xs py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#d4af37] hover:bg-[#e5bd43] text-black font-bold text-xs py-2 rounded-xl"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
