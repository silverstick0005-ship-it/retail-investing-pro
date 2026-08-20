import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Stock } from '../types';
import { STOCKS_DATA } from '../data/stocksData';

interface LiveMarketContextType {
  stocks: Record<string, Stock>;
  isLiveStreaming: boolean;
  setIsLiveStreaming: (live: boolean) => void;
  toggleLiveStream: () => void;
  lastUpdatedTicker: string | null;
  lastTickTime: string;
  refreshAllPrices: () => void;
}

const LiveMarketContext = createContext<LiveMarketContextType | undefined>(undefined);

export const LiveMarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Record<string, Stock>>(() => {
    // Deep clone initial stocks
    return JSON.parse(JSON.stringify(STOCKS_DATA));
  });
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [lastUpdatedTicker, setLastUpdatedTicker] = useState<string | null>('RELIANCE');
  const [lastTickTime, setLastTickTime] = useState<string>(() => new Date().toLocaleTimeString());

  // Function to simulate realistic market price tick
  const tickRandomStock = useCallback(() => {
    setStocks((prevStocks) => {
      const tickers = Object.keys(prevStocks);
      // Pick 1 to 2 random tickers to tick
      const targetTicker = tickers[Math.floor(Math.random() * tickers.length)];
      const stock = prevStocks[targetTicker];
      if (!stock) return prevStocks;

      // Fractional tick: ±0.03% to ±0.15%
      const deltaPercent = (Math.random() * 0.24 - 0.12) / 100;
      const rawNewPrice = stock.price * (1 + deltaPercent);
      const isIndian = stock.currency === 'INR';
      
      // Precision formatting
      const newPrice = isIndian 
        ? Math.round(rawNewPrice * 20) / 20 // 0.05 step for Indian stocks
        : Math.round(rawNewPrice * 100) / 100;

      const priceDiff = newPrice - stock.price;
      if (Math.abs(priceDiff) < 0.01) return prevStocks;

      const newChange = Math.round((stock.change + priceDiff) * 100) / 100;
      const originalBaseline = stock.price - stock.change;
      const newChangePercent = originalBaseline > 0 
        ? Math.round(((newPrice - originalBaseline) / originalBaseline) * 10000) / 100 
        : stock.changePercent;

      // Recalculate dynamic DCF Fair Value Upside %
      const newUpsidePercent = stock.fairValue && stock.fairValue.consensusValue > 0
        ? Math.round(((stock.fairValue.consensusValue - newPrice) / newPrice) * 10000) / 100
        : stock.fairValue?.upsidePercent || 0;

      const newAnalystUpside = stock.fairValue && stock.fairValue.analystTarget > 0
        ? Math.round(((stock.fairValue.analystTarget - newPrice) / newPrice) * 10000) / 100
        : stock.fairValue?.analystUpsidePercent || 0;

      setLastUpdatedTicker(targetTicker);
      setLastTickTime(new Date().toLocaleTimeString());

      return {
        ...prevStocks,
        [targetTicker]: {
          ...stock,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          fairValue: {
            ...stock.fairValue,
            upsidePercent: newUpsidePercent,
            analystUpsidePercent: newAnalystUpside,
          }
        }
      };
    });
  }, []);

  // Interval timer for second-by-second live streaming
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      tickRandomStock();
    }, 2200); // Ticks every 2.2 seconds for realistic exchange action

    return () => clearInterval(interval);
  }, [isLiveStreaming, tickRandomStock]);

  const toggleLiveStream = () => {
    setIsLiveStreaming((prev) => !prev);
  };

  const refreshAllPrices = () => {
    tickRandomStock();
    setLastTickTime(new Date().toLocaleTimeString());
  };

  return (
    <LiveMarketContext.Provider
      value={{
        stocks,
        isLiveStreaming,
        setIsLiveStreaming,
        toggleLiveStream,
        lastUpdatedTicker,
        lastTickTime,
        refreshAllPrices,
      }}
    >
      {children}
    </LiveMarketContext.Provider>
  );
};

export const useLiveMarket = () => {
  const context = useContext(LiveMarketContext);
  if (!context) {
    throw new Error('useLiveMarket must be used within a LiveMarketProvider');
  }
  return context;
};
