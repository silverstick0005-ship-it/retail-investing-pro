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
  priceFlashMap: Record<string, 'up' | 'down' | null>;
}

const LiveMarketContext = createContext<LiveMarketContextType | undefined>(undefined);

export const LiveMarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stocks, setStocks] = useState<Record<string, Stock>>(() => {
    // Deep clone initial stocks
    return JSON.parse(JSON.stringify(STOCKS_DATA));
  });
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [lastUpdatedTicker, setLastUpdatedTicker] = useState<string | null>('HDFCBANK');
  const [lastTickTime, setLastTickTime] = useState<string>(() => new Date().toLocaleTimeString());
  const [priceFlashMap, setPriceFlashMap] = useState<Record<string, 'up' | 'down' | null>>({});

  // Function to simulate realistic market price tick across stocks every second
  const tickMarketPrices = useCallback(() => {
    setStocks((prevStocks) => {
      const tickers = Object.keys(prevStocks);
      if (tickers.length === 0) return prevStocks;

      // Pick 2 to 4 active tickers to tick in this 1-second burst
      const numToUpdate = Math.min(tickers.length, Math.floor(Math.random() * 3) + 2);
      const shuffled = [...tickers].sort(() => 0.5 - Math.random());
      const selectedTickers = shuffled.slice(0, numToUpdate);

      const updatedStocks = { ...prevStocks };
      const newFlashMap: Record<string, 'up' | 'down' | null> = {};

      selectedTickers.forEach((targetTicker) => {
        const stock = prevStocks[targetTicker];
        if (!stock) return;

        // Micro tick: ±0.02% to ±0.08%
        const deltaPercent = (Math.random() * 0.16 - 0.08) / 100;
        const rawNewPrice = stock.price * (1 + deltaPercent);
        const isIndian = stock.currency === 'INR';

        // Precision tick rounding (0.05 step for Indian stocks, 0.01 for US)
        const newPrice = isIndian
          ? Math.max(1, Math.round(rawNewPrice * 20) / 20)
          : Math.max(1, Math.round(rawNewPrice * 100) / 100);

        const priceDiff = newPrice - stock.price;
        if (Math.abs(priceDiff) >= 0.01) {
          const newChange = Math.round((stock.change + priceDiff) * 100) / 100;
          const originalBaseline = stock.price - stock.change;
          const newChangePercent = originalBaseline > 0
            ? Math.round(((newPrice - originalBaseline) / originalBaseline) * 10000) / 100
            : stock.changePercent;

          // Dynamically recalculate Fair Value Upside %
          const newUpsidePercent = stock.fairValue && stock.fairValue.consensusValue > 0
            ? Math.round(((stock.fairValue.consensusValue - newPrice) / newPrice) * 10000) / 100
            : stock.fairValue?.upsidePercent || 0;

          const newAnalystUpside = stock.fairValue && stock.fairValue.analystTarget > 0
            ? Math.round(((stock.fairValue.analystTarget - newPrice) / newPrice) * 10000) / 100
            : stock.fairValue?.analystUpsidePercent || 0;

          newFlashMap[targetTicker] = priceDiff > 0 ? 'up' : 'down';

          updatedStocks[targetTicker] = {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
            fairValue: {
              ...stock.fairValue,
              upsidePercent: newUpsidePercent,
              analystUpsidePercent: newAnalystUpside,
            }
          };
        }
      });

      if (selectedTickers.length > 0) {
        setLastUpdatedTicker(selectedTickers[0]);
      }
      setLastTickTime(new Date().toLocaleTimeString());
      setPriceFlashMap((prev) => ({ ...prev, ...newFlashMap }));

      return updatedStocks;
    });
  }, []);

  // Interval timer updating every 1000ms (every second)
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      tickMarketPrices();
    }, 1100); // 1.1s realistic high-frequency stream

    return () => clearInterval(interval);
  }, [isLiveStreaming, tickMarketPrices]);

  const toggleLiveStream = () => {
    setIsLiveStreaming((prev) => !prev);
  };

  const refreshAllPrices = () => {
    tickMarketPrices();
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
        priceFlashMap,
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
