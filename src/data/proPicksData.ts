import { ProPickStrategy } from '../types';

export const PRO_PICKS_STRATEGIES: ProPickStrategy[] = [
  {
    id: 'tech-titans',
    name: 'Tech Titans AI',
    tagline: 'Outperform the NASDAQ with high-momentum semiconductor and enterprise AI compounders.',
    totalReturn: 1782.4,
    sp500Return: 295.2,
    outperformance: 1487.2,
    winRate: 84.6,
    sharpeRatio: 1.84,
    annualizedReturn: 28.5,
    rebalanceCycle: 'Monthly Algorithm Cycle',
    nextRebalance: '1st of Next Month',
    badge: 'Flagship Strategy',
    description: 'Quantitative algorithm weighting stocks with superior ROIC, accelerating free cash flow margins, and strong R&D reinvestment efficiency.',
    monthlyPerformance: [
      { year: '2020', strategyReturn: 48.2, benchmarkReturn: 18.4 },
      { year: '2021', strategyReturn: 36.5, benchmarkReturn: 26.9 },
      { year: '2022', strategyReturn: -14.2, benchmarkReturn: -18.1 },
      { year: '2023', strategyReturn: 68.4, benchmarkReturn: 24.2 },
      { year: '2024', strategyReturn: 42.1, benchmarkReturn: 23.3 },
      { year: '2025 YTD', strategyReturn: 18.5, benchmarkReturn: 6.8 }
    ],
    holdings: [
      { ticker: 'NVDA', name: 'NVIDIA Corp', weight: 14.5, entryPrice: 85.20, currentPrice: 138.25, gainPercent: 62.3, fairValueUpside: 19.9, healthScore: 4.8, sector: 'Technology' },
      { ticker: 'GOOGL', name: 'Alphabet Inc', weight: 12.0, entryPrice: 132.40, currentPrice: 182.40, gainPercent: 37.8, fairValueUpside: 23.1, healthScore: 4.7, sector: 'Technology' },
      { ticker: 'AAPL', name: 'Apple Inc', weight: 11.5, entryPrice: 178.50, currentPrice: 232.45, gainPercent: 30.2, fairValueUpside: 15.4, healthScore: 4.3, sector: 'Technology' }
    ]
  },
  {
    id: 'bharat-champions',
    name: 'Bharat Growth Champions (NSE/BSE)',
    tagline: 'Top algorithmic Indian compounders across Nifty 50 and high-growth midcaps.',
    totalReturn: 1245.8,
    sp500Return: 280.0,
    outperformance: 965.8,
    winRate: 81.2,
    sharpeRatio: 1.76,
    annualizedReturn: 24.8,
    rebalanceCycle: 'Monthly Algorithm Cycle',
    nextRebalance: '1st of Next Month',
    badge: 'India Dedicated',
    description: 'AI model identifying companies benefiting from Indian domestic consumption, banking credit expansion, and IT export dominance with superior ROE.',
    monthlyPerformance: [
      { year: '2020', strategyReturn: 32.4, benchmarkReturn: 14.9 },
      { year: '2021', strategyReturn: 41.2, benchmarkReturn: 24.1 },
      { year: '2022', strategyReturn: 8.5, benchmarkReturn: 4.3 },
      { year: '2023', strategyReturn: 34.8, benchmarkReturn: 19.4 },
      { year: '2024', strategyReturn: 38.6, benchmarkReturn: 21.2 },
      { year: '2025 YTD', strategyReturn: 14.2, benchmarkReturn: 7.5 }
    ],
    holdings: [
      { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 15.0, entryPrice: 1450.00, currentPrice: 1780.00, gainPercent: 22.8, fairValueUpside: 22.5, healthScore: 4.8, sector: 'Financials' },
      { ticker: 'RELIANCE', name: 'Reliance Industries', weight: 14.0, entryPrice: 1240.00, currentPrice: 1395.50, gainPercent: 12.5, fairValueUpside: 20.4, healthScore: 4.6, sector: 'Energy & Telecom' },
      { ticker: 'TCS', name: 'Tata Consultancy Services', weight: 12.5, entryPrice: 3600.00, currentPrice: 4120.00, gainPercent: 14.4, fairValueUpside: 14.6, healthScore: 4.9, sector: 'Technology' },
      { ticker: 'INFY', name: 'Infosys Limited', weight: 11.0, entryPrice: 1520.00, currentPrice: 1890.00, gainPercent: 24.3, fairValueUpside: 13.8, healthScore: 4.7, sector: 'Technology' }
    ]
  },
  {
    id: 'beat-sp500',
    name: 'Beat the S&P 500 AI',
    tagline: 'High-quality balance sheets with consistent double-digit earnings growth.',
    totalReturn: 1120.5,
    sp500Return: 295.2,
    outperformance: 825.3,
    winRate: 81.0,
    sharpeRatio: 1.62,
    annualizedReturn: 22.1,
    rebalanceCycle: 'Monthly Algorithm Cycle',
    nextRebalance: '1st of Next Month',
    badge: 'Low Volatility Alpha',
    description: 'Systematically screens the S&P 500 universe for companies with high Altman Z-scores and low debt-to-equity ratios.',
    monthlyPerformance: [
      { year: '2020', strategyReturn: 32.1, benchmarkReturn: 18.4 },
      { year: '2021', strategyReturn: 29.4, benchmarkReturn: 26.9 },
      { year: '2022', strategyReturn: -8.5, benchmarkReturn: -18.1 },
      { year: '2023', strategyReturn: 38.2, benchmarkReturn: 24.2 },
      { year: '2024', strategyReturn: 28.6, benchmarkReturn: 23.3 },
      { year: '2025 YTD', strategyReturn: 11.2, benchmarkReturn: 6.8 }
    ],
    holdings: [
      { ticker: 'GOOGL', name: 'Alphabet Inc', weight: 10.5, entryPrice: 138.00, currentPrice: 182.40, gainPercent: 32.2, fairValueUpside: 23.1, healthScore: 4.7, sector: 'Technology' },
      { ticker: 'AAPL', name: 'Apple Inc', weight: 9.5, entryPrice: 182.00, currentPrice: 232.45, gainPercent: 27.7, fairValueUpside: 15.4, healthScore: 4.3, sector: 'Technology' }
    ]
  },
  {
    id: 'top-value',
    name: 'Top Value Stocks',
    tagline: 'Deep value compounders trading at steep discounts to intrinsic Fair Value.',
    totalReturn: 948.6,
    sp500Return: 295.2,
    outperformance: 653.4,
    winRate: 78.4,
    sharpeRatio: 1.45,
    annualizedReturn: 19.8,
    rebalanceCycle: 'Monthly Algorithm Cycle',
    nextRebalance: '1st of Next Month',
    badge: 'Deep Discount',
    description: 'Selects the top decile of stocks with the highest spread between market price and 14-model DCF Fair Value.',
    monthlyPerformance: [
      { year: '2020', strategyReturn: 21.0, benchmarkReturn: 18.4 },
      { year: '2021', strategyReturn: 34.2, benchmarkReturn: 26.9 },
      { year: '2022', strategyReturn: 4.2, benchmarkReturn: -18.1 },
      { year: '2023', strategyReturn: 28.5, benchmarkReturn: 24.2 },
      { year: '2024', strategyReturn: 24.1, benchmarkReturn: 23.3 },
      { year: '2025 YTD', strategyReturn: 9.4, benchmarkReturn: 6.8 }
    ],
    holdings: [
      { ticker: 'GOOGL', name: 'Alphabet Inc', weight: 12.0, entryPrice: 135.00, currentPrice: 182.40, gainPercent: 35.1, fairValueUpside: 23.1, healthScore: 4.7, sector: 'Technology' },
      { ticker: 'HDFCBANK', name: 'HDFC Bank Ltd', weight: 11.5, entryPrice: 1460.00, currentPrice: 1780.00, gainPercent: 21.9, fairValueUpside: 22.5, healthScore: 4.8, sector: 'Financials' }
    ]
  }
];
