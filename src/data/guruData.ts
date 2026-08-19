import { GuruPortfolio } from '../types';

export const GURU_PORTFOLIOS: GuruPortfolio[] = [
  {
    id: 'warren-buffett',
    investorName: 'Warren Buffett',
    fundName: 'Berkshire Hathaway Inc.',
    aum: '$310.5 Billion',
    topHoldingsPercent: 74.2,
    filingDate: 'Q4 SEC 13F Filing',
    strategySummary: 'Value investing legend focusing on enduring economic moats, capital-light compounders, and massive cash float optionality.',
    sectorDistribution: [
      { sector: 'Technology (Apple)', percentage: 32.5 },
      { sector: 'Financials (AmEx, BofA)', percentage: 31.0 },
      { sector: 'Consumer Staples (Coca-Cola, Kraft)', percentage: 14.8 },
      { sector: 'Energy (Occidental, Chevron)', percentage: 13.2 },
      { sector: 'Others & Healthcare', percentage: 8.5 }
    ],
    holdings: [
      { ticker: 'AAPL', name: 'Apple Inc.', shares: '300.0M', valueFormatted: '$69.7 Billion', portfolioPercent: 28.5, recentActivity: 'Reduced', fairValueUpside: 15.4 },
      { ticker: 'AXP', name: 'American Express Co.', shares: '151.6M', valueFormatted: '$41.2 Billion', portfolioPercent: 15.2, recentActivity: 'Unchanged', fairValueUpside: 11.2 },
      { ticker: 'BAC', name: 'Bank of America Corp.', shares: '680.0M', valueFormatted: '$29.5 Billion', portfolioPercent: 11.8, recentActivity: 'Reduced', fairValueUpside: 14.0 },
      { ticker: 'KO', name: 'The Coca-Cola Company', shares: '400.0M', valueFormatted: '$26.8 Billion', portfolioPercent: 9.8, recentActivity: 'Unchanged', fairValueUpside: 8.5 },
      { ticker: 'CVX', name: 'Chevron Corporation', shares: '118.6M', valueFormatted: '$18.4 Billion', portfolioPercent: 6.8, recentActivity: 'Unchanged', fairValueUpside: 18.0 },
      { ticker: 'OXY', name: 'Occidental Petroleum', shares: '255.3M', valueFormatted: '$13.2 Billion', portfolioPercent: 4.8, recentActivity: 'Added', fairValueUpside: 24.5 },
      { ticker: 'MCO', name: 'Moody\'s Corporation', shares: '24.7M', valueFormatted: '$11.5 Billion', portfolioPercent: 4.2, recentActivity: 'Unchanged', fairValueUpside: 9.0 },
      { ticker: 'CB', name: 'Chubb Limited', shares: '27.0M', valueFormatted: '$7.8 Billion', portfolioPercent: 2.8, recentActivity: 'Added', fairValueUpside: 13.4 }
    ]
  },
  {
    id: 'bill-ackman',
    investorName: 'Bill Ackman',
    fundName: 'Pershing Square Capital Management',
    aum: '$14.2 Billion',
    topHoldingsPercent: 92.5,
    filingDate: 'Q4 SEC 13F Filing',
    strategySummary: 'High-conviction concentrated activist investing targeting simple, predictable, free cash flow generative market leaders.',
    sectorDistribution: [
      { sector: 'Consumer Discretionary (Chipotle, Hilton)', percentage: 44.0 },
      { sector: 'Technology (Alphabet)', percentage: 22.5 },
      { sector: 'Real Estate / Industrials', percentage: 18.5 },
      { sector: 'Financials & Brokerage', percentage: 15.0 }
    ],
    holdings: [
      { ticker: 'CMG', name: 'Chipotle Mexican Grill', shares: '36.8M', valueFormatted: '$2.35 Billion', portfolioPercent: 18.2, recentActivity: 'Unchanged', fairValueUpside: 14.8 },
      { ticker: 'QSR', name: 'Restaurant Brands Intl', shares: '23.4M', valueFormatted: '$1.85 Billion', portfolioPercent: 14.5, recentActivity: 'Unchanged', fairValueUpside: 18.2 },
      { ticker: 'HLT', name: 'Hilton Worldwide Holdings', shares: '8.8M', valueFormatted: '$2.15 Billion', portfolioPercent: 16.5, recentActivity: 'Unchanged', fairValueUpside: 12.0 },
      { ticker: 'GOOGL', name: 'Alphabet Inc. Class A', shares: '8.4M', valueFormatted: '$1.53 Billion', portfolioPercent: 12.0, recentActivity: 'Added', fairValueUpside: 23.1 },
      { ticker: 'GOOG', name: 'Alphabet Inc. Class C', shares: '6.2M', valueFormatted: '$1.14 Billion', portfolioPercent: 9.0, recentActivity: 'Added', fairValueUpside: 23.0 },
      { ticker: 'NKE', name: 'NIKE, Inc.', shares: '16.3M', valueFormatted: '$1.42 Billion', portfolioPercent: 11.2, recentActivity: 'New Buy', fairValueUpside: 28.5 },
      { ticker: 'BAM', name: 'Brookfield Asset Management', shares: '12.5M', valueFormatted: '$720 Million', portfolioPercent: 5.8, recentActivity: 'New Buy', fairValueUpside: 17.5 }
    ]
  },
  {
    id: 'michael-burry',
    investorName: 'Michael Burry',
    fundName: 'Scion Asset Management',
    aum: '$185 Million',
    topHoldingsPercent: 68.0,
    filingDate: 'Q4 SEC 13F Filing',
    strategySummary: 'Iconic contrarian value and macroeconomic cycle investor known for finding unloved, deeply undervalued deep-value assets.',
    sectorDistribution: [
      { sector: 'Chinese Internet Tech (Alibaba, Baidu, JD)', percentage: 48.0 },
      { sector: 'Healthcare & Biotech', percentage: 24.0 },
      { sector: 'Financials & Energy', percentage: 28.0 }
    ],
    holdings: [
      { ticker: 'BABA', name: 'Alibaba Group Holding', shares: '200K', valueFormatted: '$19.2 Million', portfolioPercent: 16.5, recentActivity: 'Added', fairValueUpside: 36.0 },
      { ticker: 'JD', name: 'JD.com, Inc.', shares: '500K', valueFormatted: '$17.8 Million', portfolioPercent: 15.2, recentActivity: 'Added', fairValueUpside: 42.0 },
      { ticker: 'BIDU', name: 'Baidu, Inc.', shares: '125K', valueFormatted: '$12.4 Million', portfolioPercent: 10.5, recentActivity: 'Added', fairValueUpside: 38.5 },
      { ticker: 'CVS', name: 'CVS Health Corp', shares: '180K', valueFormatted: '$11.3 Million', portfolioPercent: 9.8, recentActivity: 'New Buy', fairValueUpside: 34.5 },
      { ticker: 'BMY', name: 'Bristol-Myers Squibb', shares: '160K', valueFormatted: '$8.5 Million', portfolioPercent: 7.2, recentActivity: 'New Buy', fairValueUpside: 28.2 }
    ]
  },
  {
    id: 'ray-dalio',
    investorName: 'Ray Dalio',
    fundName: 'Bridgewater Associates',
    aum: '$124.8 Billion',
    topHoldingsPercent: 38.5,
    filingDate: 'Q4 SEC 13F Filing',
    strategySummary: 'Pioneer of the All-Weather and Pure Alpha macroeconomic parity strategies across global equities, commodities, and currencies.',
    sectorDistribution: [
      { sector: 'Consumer Staples (Procter & Gamble, JNJ)', percentage: 28.0 },
      { sector: 'Core Index ETFs (IVV, IEMG, VOO)', percentage: 26.0 },
      { sector: 'Healthcare & Pharmaceuticals', percentage: 22.0 },
      { sector: 'Technology & Megacap', percentage: 24.0 }
    ],
    holdings: [
      { ticker: 'IVV', name: 'iShares Core S&P 500 ETF', shares: '2.1M', valueFormatted: '$1.25 Billion', portfolioPercent: 6.2, recentActivity: 'Unchanged', fairValueUpside: 12.0 },
      { ticker: 'GOOGL', name: 'Alphabet Inc.', shares: '4.8M', valueFormatted: '$875 Million', portfolioPercent: 4.5, recentActivity: 'Added', fairValueUpside: 23.1 },
      { ticker: 'NVDA', name: 'NVIDIA Corporation', shares: '6.2M', valueFormatted: '$857 Million', portfolioPercent: 4.4, recentActivity: 'Added', fairValueUpside: 19.9 },
      { ticker: 'META', name: 'Meta Platforms Inc.', shares: '1.4M', valueFormatted: '$819 Million', portfolioPercent: 4.2, recentActivity: 'Added', fairValueUpside: 14.5 },
      { ticker: 'MSFT', name: 'Microsoft Corporation', shares: '1.8M', valueFormatted: '$753 Million', portfolioPercent: 3.9, recentActivity: 'Added', fairValueUpside: 14.2 },
      { ticker: 'PG', name: 'Procter & Gamble Co.', shares: '4.2M', valueFormatted: '$714 Million', portfolioPercent: 3.7, recentActivity: 'Unchanged', fairValueUpside: 9.5 }
    ]
  }
];
