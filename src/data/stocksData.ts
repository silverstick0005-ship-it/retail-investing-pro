import { Stock } from '../types';

export const STOCKS_DATA: Record<string, Stock> = {
  // ===================== US MARKET =====================
  AAPL: {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    market: 'US',
    price: 232.45,
    change: 2.88,
    changePercent: 1.25,
    marketCap: '$3.54 Trillion',
    pe: 34.2,
    forwardPE: 28.5,
    eps: 6.79,
    dividendYield: 0.44,
    beta: 1.08,
    fiftyTwoWeekHigh: 237.23,
    fiftyTwoWeekLow: 164.08,
    volume: '54.2M',
    avgVolume: '48.9M',
    exchange: 'NASDAQ',
    currency: 'USD',
    currencySymbol: '$',
    monthlySignal: {
      action: 'ACCUMULATE',
      ratingScore: 8.5,
      targetEntryRange: '$225 - $232',
      fairValueTarget: '$268.30',
      stopLoss: '$210.00',
      primaryRationale: 'Expanding Services high-margin stream (74% gross margin) and continuous $100B+ annual buyback support.',
      catalyst: 'Apple Intelligence upgrade cycle across 1.4B active iPhones.',
      riskHorizon: 'Low'
    },
    description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories, and sells a variety of related services globally.',
    fairValue: {
      consensusValue: 268.30,
      upsidePercent: 15.42,
      uncertainty: 'Low',
      analystTarget: 248.50,
      analystUpsidePercent: 6.90,
      analystCount: 42,
      modelsCount: 14,
      models: [
        { id: 'm1', name: '5Y DCF (Terminal Growth 3.5%)', category: 'DCF', value: 274.20, weight: 15, description: 'Discounted Free Cash Flow using 8.2% WACC and long-term GDP terminal rate.' },
        { id: 'm2', name: '5Y DCF (EBITDA Exit 22x)', category: 'DCF', value: 282.50, weight: 15, description: 'DCF projecting operating cash flow with enterprise exit multiple.' },
        { id: 'm3', name: '10Y DCF Levered Cash Flow', category: 'DCF', value: 265.10, weight: 15, description: 'Extended 10-year stage horizon capturing Apple Intelligence services monetization.' },
        { id: 'm4', name: 'EV / Forward EBITDA Multiple', category: 'Multiples', value: 259.80, weight: 10, description: 'Benchmarked against premium megacap ecosystem peers (MSFT, GOOGL).' },
        { id: 'm5', name: 'Price / Earnings to Growth (PEG)', category: 'Multiples', value: 245.00, weight: 10, description: 'Adjusted for double-digit EPS expansion.' },
        { id: 'm6', name: 'EV / Free Cash Flow (FCF)', category: 'Multiples', value: 271.40, weight: 10, description: 'Capitalization of $108B annual free cash flow generation.' },
        { id: 'm7', name: 'Dividend Discount Model (DDM)', category: 'Asset & Dividend', value: 240.20, weight: 5, description: 'Dividend growth model factoring steady 5-7% annual dividend hike.' },
        { id: 'm8', name: 'Earnings Power Value (EPV)', category: 'Fundamental', value: 251.00, weight: 10, description: 'Greenwald sustainable current cash generation capacity.' },
        { id: 'm9', name: 'Finbox Quantitative Consensus', category: 'Fundamental', value: 270.80, weight: 10, description: 'Multi-variable institutional econometric aggregation.' }
      ]
    },
    healthScore: {
      totalScore: 4.3,
      status: 'Great',
      percentileRank: 92,
      pillars: {
        profitability: {
          name: 'Profitability Health',
          score: 4.8,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Return on Equity (ROE)', value: '147.2%', benchmark: 'Tech Avg: 24.5%', status: 'positive' },
            { label: 'Operating Margin', value: '31.2%', benchmark: 'Tech Avg: 18.0%', status: 'positive' },
            { label: 'Gross Margin', value: '46.2%', benchmark: 'Hardware Avg: 35.1%', status: 'positive' },
            { label: 'ROIC (Invested Capital)', value: '56.4%', benchmark: 'Sector Avg: 14.2%', status: 'positive' }
          ]
        },
        growth: {
          name: 'Growth Health',
          score: 3.9,
          maxScore: 5.0,
          status: 'Good',
          keyMetrics: [
            { label: '3Y Revenue CAGR', value: '+6.8%', benchmark: 'Megacap Avg: 8.2%', status: 'neutral' },
            { label: 'Services Growth YoY', value: '+13.4%', benchmark: 'Sector Avg: 9.1%', status: 'positive' },
            { label: '3Y EPS Growth CAGR', value: '+11.5%', benchmark: 'S&P 500: 7.8%', status: 'positive' }
          ]
        },
        cashFlow: {
          name: 'Cash Flow Health',
          score: 4.9,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Free Cash Flow (TTM)', value: '$108.8 Billion', benchmark: 'Top 1% Global', status: 'positive' },
            { label: 'FCF / Net Income Conversion', value: '112%', benchmark: 'Target > 90%', status: 'positive' },
            { label: 'Cash Flow / Total Debt', value: '1.05x', benchmark: 'Safe > 0.4x', status: 'positive' }
          ]
        },
        momentum: {
          name: 'Price Momentum',
          score: 4.1,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'RSI (14-Day)', value: '58.4', benchmark: 'Neutral Bullish (40-70)', status: 'positive' },
            { label: 'Price vs 200-DMA', value: '+14.2%', benchmark: 'Above Long-Term Trend', status: 'positive' },
            { label: 'Beta (3Y)', value: '1.08', benchmark: 'Market Correlated', status: 'neutral' }
          ]
        },
        relativeValue: {
          name: 'Relative Valuation',
          score: 3.6,
          maxScore: 5.0,
          status: 'Good',
          keyMetrics: [
            { label: 'Trailing P/E', value: '34.2x', benchmark: '5Y Avg: 28.9x', status: 'neutral' },
            { label: 'Forward EV/EBITDA', value: '23.8x', benchmark: 'Tech Avg: 21.2x', status: 'neutral' },
            { label: 'FCF Yield', value: '3.1%', benchmark: 'Megacap Avg: 2.8%', status: 'positive' }
          ]
        }
      }
    },
    proTips: [
      { id: 'pt1', type: 'bull', title: 'High Return on Invested Capital (ROIC)', description: 'Generates an outstanding 56.4% ROIC, evidencing a deep economic moat in ecosystem retention.', badge: 'Moat Strength' },
      { id: 'pt2', type: 'bull', title: 'Consistent Capital Return Machine', description: 'Has repurchased over $650 Billion in shares over the past decade while growing dividends 12 consecutive years.', badge: 'Shareholder Yield' },
      { id: 'pt3', type: 'bull', title: 'High Margin Services Expansion', description: 'Services segment now accounts for ~25% of net revenues at 74% gross margins, mitigating hardware upgrade cyclicality.', badge: 'Margin Expansion' },
      { id: 'pt4', type: 'bear', title: 'Valuation Trades at Premium to Historic Range', description: 'Current P/E of 34.2x is elevated relative to its 5-year historical average of 28.9x.', badge: 'Valuation Multiple' },
      { id: 'pt5', type: 'bear', title: 'Geopolitical & Regulatory Scrutiny', description: 'Subject to EU Digital Markets Act compliance and DOJ antitrust inquiries on App Store revenue shares.', badge: 'Regulatory' }
    ],
    financials: {
      years: ['2020', '2021', '2022', '2023', '2024', '2025 (TTM)'],
      revenue: [274.5, 365.8, 394.3, 383.3, 391.0, 408.2],
      grossProfit: [104.9, 152.8, 170.8, 169.1, 180.7, 188.5],
      operatingIncome: [66.3, 108.9, 119.4, 114.3, 123.2, 128.4],
      netIncome: [57.4, 94.7, 99.8, 97.0, 93.7, 101.4],
      freeCashFlow: [73.4, 93.0, 111.4, 99.6, 108.8, 114.0],
      totalCash: [90.9, 62.6, 48.3, 61.6, 65.2, 68.4],
      totalDebt: [112.4, 124.7, 120.1, 111.1, 106.6, 98.2],
      roic: [38.2, 49.5, 58.1, 54.2, 56.4, 58.0],
      operatingMargin: [24.1, 29.8, 30.3, 29.8, 31.5, 31.8],
      sharesOutstanding: [17.5, 16.7, 16.0, 15.6, 15.2, 14.9]
    }
  },

  NVDA: {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    industry: 'Semiconductors & AI Hardware',
    market: 'US',
    price: 138.25,
    change: 4.12,
    changePercent: 3.07,
    marketCap: '$3.38 Trillion',
    pe: 48.6,
    forwardPE: 32.4,
    eps: 2.84,
    dividendYield: 0.03,
    beta: 1.68,
    fiftyTwoWeekHigh: 153.13,
    fiftyTwoWeekLow: 45.42,
    volume: '88.5M',
    avgVolume: '92.1M',
    exchange: 'NASDAQ',
    currency: 'USD',
    currencySymbol: '$',
    monthlySignal: {
      action: 'STRONG BUY',
      ratingScore: 9.4,
      targetEntryRange: '$130 - $138',
      fairValueTarget: '$165.80',
      stopLoss: '$118.00',
      primaryRationale: 'Triple-digit datacenter revenue growth, Blackwell GPU transition sold out for next 12 months, and 75% gross margins.',
      catalyst: 'Hyperscaler AI capex commitments surging above $220B in 2025/2026.',
      riskHorizon: 'Medium'
    },
    description: 'NVIDIA Corporation provides graphics, computing and networking solutions. Its GPU architectures power modern artificial intelligence training, accelerated computing, and enterprise datacenters.',
    fairValue: {
      consensusValue: 165.80,
      upsidePercent: 19.93,
      uncertainty: 'Medium',
      analystTarget: 172.00,
      analystUpsidePercent: 24.41,
      analystCount: 58,
      modelsCount: 14,
      models: [
        { id: 'm1', name: '5Y DCF (Terminal Growth 4.0%)', category: 'DCF', value: 178.40, weight: 20, description: 'Projects AI enterprise hyperscaler capex growth at 9.0% WACC.' },
        { id: 'm2', name: '5Y DCF (EBITDA Exit 26x)', category: 'DCF', value: 172.10, weight: 20, description: 'Reflects sustained dominance in Blackwell & Rubin GPU architectures.' },
        { id: 'm3', name: 'EV / Forward Revenue Multiple', category: 'Multiples', value: 154.50, weight: 15, description: 'Sector benchmark multiple of 18.5x FY26 consensus revenue.' },
        { id: 'm4', name: 'Price / Earnings to Growth (PEG)', category: 'Multiples', value: 182.00, weight: 15, description: 'PEG of 0.95x reflecting 50%+ EPS acceleration.' }
      ]
    },
    healthScore: {
      totalScore: 4.8,
      status: 'Great',
      percentileRank: 98,
      pillars: {
        profitability: {
          name: 'Profitability Health',
          score: 5.0,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Gross Margin', value: '75.2%', benchmark: 'Semis Avg: 52.0%', status: 'positive' },
            { label: 'Operating Margin', value: '62.1%', benchmark: 'Semis Avg: 22.4%', status: 'positive' }
          ]
        },
        growth: {
          name: 'Growth Health',
          score: 5.0,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Revenue Growth YoY', value: '+122.4%', benchmark: 'S&P 500: +5.2%', status: 'positive' }
          ]
        },
        cashFlow: {
          name: 'Cash Flow Health',
          score: 4.9,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Free Cash Flow (TTM)', value: '$60.8 Billion', benchmark: 'Surged 350% YoY', status: 'positive' }
          ]
        },
        momentum: {
          name: 'Price Momentum',
          score: 4.6,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: '1Y Price Return', value: '+184%', benchmark: 'Market Leader', status: 'positive' }
          ]
        },
        relativeValue: {
          name: 'Relative Valuation',
          score: 4.1,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Forward P/E', value: '32.4x', benchmark: 'PEG < 1.0 indicates value', status: 'positive' }
          ]
        }
      }
    },
    proTips: [
      { id: 'nv1', type: 'bull', title: 'Unmatched Software Moat with CUDA', description: 'Over 5 million developers anchored to the CUDA ecosystem creating immense switching costs for enterprise AI.', badge: 'CUDA Ecosystem' },
      { id: 'nv2', type: 'bull', title: 'Explosive Gross Margin Expansion', description: 'Gross margins at 75%+ driven by full-stack AI supercomputer systems.', badge: 'Pricing Power' }
    ],
    financials: {
      years: ['2020', '2021', '2022', '2023', '2024', '2025 (TTM)'],
      revenue: [10.9, 16.7, 26.9, 27.0, 60.9, 126.0],
      grossProfit: [6.8, 10.4, 17.5, 15.4, 44.3, 94.8],
      operatingIncome: [2.8, 4.5, 10.0, 4.2, 32.9, 78.4],
      netIncome: [2.8, 4.3, 9.7, 4.4, 29.8, 68.2],
      freeCashFlow: [4.8, 4.7, 8.1, 3.8, 27.0, 60.8],
      totalCash: [11.5, 11.5, 13.3, 25.9, 34.8, 38.5],
      totalDebt: [7.0, 11.0, 11.9, 11.0, 10.4, 9.8],
      roic: [18.4, 22.1, 34.5, 12.8, 58.2, 88.4],
      operatingMargin: [25.7, 26.9, 37.2, 15.6, 54.0, 62.2],
      sharesOutstanding: [25.0, 25.1, 24.9, 24.8, 24.6, 24.5]
    }
  },

  GOOGL: {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    industry: 'Internet Content & Search',
    market: 'US',
    price: 182.40,
    change: 1.95,
    changePercent: 1.08,
    marketCap: '$2.24 Trillion',
    pe: 22.4,
    forwardPE: 18.9,
    eps: 8.14,
    dividendYield: 0.44,
    beta: 1.05,
    fiftyTwoWeekHigh: 193.31,
    fiftyTwoWeekLow: 130.67,
    volume: '28.1M',
    avgVolume: '26.4M',
    exchange: 'NASDAQ',
    currency: 'USD',
    currencySymbol: '$',
    monthlySignal: {
      action: 'STRONG BUY',
      ratingScore: 9.6,
      targetEntryRange: '$175 - $185',
      fairValueTarget: '$224.50',
      stopLoss: '$162.00',
      primaryRationale: 'Deepest valuation discount in Magnificent 7 (Forward P/E 18.9x) with accelerating Google Cloud profitability and $70B buybacks.',
      catalyst: 'Custom TPU v6 scaling & Gemini multimodal enterprise integrations.',
      riskHorizon: 'Low'
    },
    description: 'Alphabet Inc. provides search, advertising, cloud platform (Google Cloud), YouTube, operating systems (Android), and Other Bets breakthroughs.',
    fairValue: {
      consensusValue: 224.50,
      upsidePercent: 23.08,
      uncertainty: 'Low',
      analystTarget: 215.00,
      analystUpsidePercent: 17.87,
      analystCount: 48,
      modelsCount: 14,
      models: [
        { id: 'm1', name: '5Y DCF (Terminal Growth 3.0%)', category: 'DCF', value: 231.00, weight: 25, description: 'Discounted cash flow modeling Google Cloud profitability surge.' },
        { id: 'm2', name: 'P/E Relative to Megacap Peer Group', category: 'Multiples', value: 228.00, weight: 25, description: 'Applies normalized 24x forward multiple vs current 18.9x discount.' }
      ]
    },
    healthScore: {
      totalScore: 4.7,
      status: 'Great',
      percentileRank: 97,
      pillars: {
        profitability: { name: 'Profitability Health', score: 4.8, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Operating Margin', value: '32.4%', benchmark: 'Sector Avg: 16%', status: 'positive' }] },
        growth: { name: 'Growth Health', score: 4.6, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Google Cloud Growth YoY', value: '+35.0%', benchmark: 'Industry Top', status: 'positive' }] },
        cashFlow: { name: 'Cash Flow Health', score: 5.0, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Free Cash Flow', value: '$73.2 Billion', benchmark: 'Net Cash Leader', status: 'positive' }] },
        momentum: { name: 'Price Momentum', score: 4.1, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: '50-DMA', value: '$176.50', benchmark: 'Above Trend', status: 'positive' }] },
        relativeValue: { name: 'Relative Valuation', score: 4.8, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Forward P/E', value: '18.9x', benchmark: 'Lowest in Mag 7', status: 'positive' }] }
      }
    },
    proTips: [
      { id: 'gg1', type: 'bull', title: 'Lowest P/E in the Magnificent 7', description: 'Trading at only 18.9x forward earnings despite 30%+ Google Cloud operating income expansion.', badge: 'Deep Value' }
    ],
    financials: {
      years: ['2020', '2021', '2022', '2023', '2024', '2025 (TTM)'],
      revenue: [182.5, 257.6, 282.8, 307.4, 350.0, 372.4],
      grossProfit: [97.8, 146.7, 156.6, 174.5, 202.1, 216.5],
      operatingIncome: [41.3, 78.7, 74.8, 84.3, 110.2, 120.8],
      netIncome: [40.3, 76.0, 60.0, 73.8, 96.5, 104.2],
      freeCashFlow: [42.8, 67.0, 60.0, 69.5, 73.2, 79.0],
      totalCash: [136.7, 139.6, 113.8, 110.9, 100.8, 106.0],
      totalDebt: [28.4, 28.5, 29.8, 28.9, 27.5, 26.0],
      roic: [20.4, 31.8, 24.5, 27.8, 32.4, 34.0],
      operatingMargin: [22.6, 30.6, 26.5, 27.4, 31.5, 32.4],
      sharesOutstanding: [13.7, 13.5, 13.0, 12.6, 12.3, 12.1]
    }
  },

  TSLA: {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Cyclical',
    industry: 'Auto Manufacturers & Energy',
    market: 'US',
    price: 245.80,
    change: -2.15,
    changePercent: -0.87,
    marketCap: '$785.4 Billion',
    pe: 92.4,
    forwardPE: 68.2,
    eps: 2.66,
    dividendYield: 0.0,
    beta: 2.34,
    fiftyTwoWeekHigh: 271.00,
    fiftyTwoWeekLow: 138.80,
    volume: '62.8M',
    avgVolume: '74.2M',
    exchange: 'NASDAQ',
    currency: 'USD',
    currencySymbol: '$',
    monthlySignal: {
      action: 'AVOID / DO NOT BUY',
      ratingScore: 4.2,
      targetEntryRange: '$180 - $195',
      fairValueTarget: '$218.40',
      stopLoss: '$220.00',
      primaryRationale: 'Valuation multiple (P/E 92x) leaves zero margin of safety amid compressed auto gross margins (14.6%) and aggressive China EV price wars.',
      catalyst: 'Robotaxi regulatory approvals and commercial scale pushed into 2026+.',
      riskHorizon: 'High'
    },
    description: 'Tesla, Inc. designs, manufactures, and sells electric vehicles, energy storage systems, and autonomous driving robotics.',
    fairValue: {
      consensusValue: 218.40,
      upsidePercent: -11.15,
      uncertainty: 'High',
      analystTarget: 235.00,
      analystUpsidePercent: -4.39,
      analystCount: 45,
      modelsCount: 12,
      models: [
        { id: 'm1', name: '10Y DCF Robotaxi & FSD Scenario', category: 'DCF', value: 260.00, weight: 30, description: 'Pricing in high-margin autonomous software licensing.' },
        { id: 'm2', name: '5Y DCF Auto Baseline (12% margin)', category: 'DCF', value: 185.00, weight: 30, description: 'Core EV hardware deliveries at normalized automotive multiples.' }
      ]
    },
    healthScore: {
      totalScore: 3.8,
      status: 'Fair',
      percentileRank: 68,
      pillars: {
        profitability: { name: 'Profitability Health', score: 3.5, maxScore: 5.0, status: 'Average', keyMetrics: [{ label: 'Automotive Gross Margin', value: '14.6%', benchmark: 'Compressed', status: 'neutral' }] },
        growth: { name: 'Growth Health', score: 3.7, maxScore: 5.0, status: 'Good', keyMetrics: [{ label: 'Energy Storage YoY', value: '+125%', benchmark: 'High growth', status: 'positive' }] },
        cashFlow: { name: 'Cash Flow Health', score: 4.5, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Total Cash', value: '$33.6 Billion', benchmark: 'Zero liquidity risk', status: 'positive' }] },
        momentum: { name: 'Price Momentum', score: 4.2, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: '3M Rebound', value: '+42%', benchmark: 'High retail momentum', status: 'positive' }] },
        relativeValue: { name: 'Relative Valuation', score: 2.8, maxScore: 5.0, status: 'Weak', keyMetrics: [{ label: 'Trailing P/E', value: '92.4x', benchmark: 'Expensive', status: 'negative' }] }
      }
    },
    proTips: [
      { id: 'ts3', type: 'bear', title: 'Trading 11% Above Consensus Fair Value', description: 'Quantitative models suggest stock is overvalued on near-term fundamentals without robotaxi scale.', badge: 'Premium Price' }
    ],
    financials: {
      years: ['2020', '2021', '2022', '2023', '2024', '2025 (TTM)'],
      revenue: [31.5, 53.8, 81.5, 96.8, 97.7, 102.4],
      grossProfit: [6.6, 13.6, 20.9, 18.0, 18.0, 19.1],
      operatingIncome: [2.0, 6.5, 13.7, 8.9, 8.2, 8.9],
      netIncome: [0.7, 5.5, 12.6, 15.0, 7.1, 8.4],
      freeCashFlow: [2.8, 5.0, 7.6, 4.4, 3.6, 4.8],
      totalCash: [19.4, 17.7, 22.2, 29.1, 33.6, 35.0],
      totalDebt: [11.7, 6.8, 3.1, 5.2, 7.8, 7.2],
      roic: [4.8, 14.5, 24.1, 14.2, 8.4, 9.8],
      operatingMargin: [6.3, 12.1, 16.8, 9.2, 8.4, 8.7],
      sharesOutstanding: [3.0, 3.1, 3.2, 3.2, 3.2, 3.2]
    }
  },

  // ===================== INDIAN MARKET (NSE / BSE / NIFTY 50) =====================
  RELIANCE: {
    ticker: 'RELIANCE',
    name: 'Reliance Industries Limited',
    sector: 'Energy & Conglomerate',
    industry: 'Oil to Chemicals, Retail & Telecom (Jio)',
    market: 'INDIA',
    price: 1395.50,
    change: 18.40,
    changePercent: 1.34,
    marketCap: '₹18.88 Lakh Crore ($228B)',
    pe: 26.8,
    forwardPE: 21.4,
    eps: 52.07,
    dividendYield: 0.72,
    beta: 0.94,
    fiftyTwoWeekHigh: 1608.80,
    fiftyTwoWeekLow: 1210.00,
    volume: '8.4M',
    avgVolume: '7.8M',
    exchange: 'NSE',
    currency: 'INR',
    currencySymbol: '₹',
    monthlySignal: {
      action: 'STRONG BUY',
      ratingScore: 9.5,
      targetEntryRange: '₹1,360 - ₹1,400',
      fairValueTarget: '₹1,680.00',
      stopLoss: '₹1,260.00',
      primaryRationale: 'Dual growth engine of Jio 5G tariff hikes (ARPU expansion) and Reliance Retail store footprint scale-up, backed by robust O2C cash flows.',
      catalyst: 'Anticipated IPO value unlocking for Jio & Reliance Retail in 2025/2026.',
      riskHorizon: 'Low'
    },
    description: 'Reliance Industries Limited is India’s largest conglomerate by market cap, operating across hydrocarbon exploration, petrochemicals, telecommunications (Jio with 490M+ subscribers), retail, and new clean energy giga-factories.',
    fairValue: {
      consensusValue: 1680.00,
      upsidePercent: 20.39,
      uncertainty: 'Low',
      analystTarget: 1620.00,
      analystUpsidePercent: 16.09,
      analystCount: 38,
      modelsCount: 12,
      models: [
        { id: 'm1', name: 'Sum-of-the-Parts (SOTP) Valuation', category: 'Fundamental', value: 1720.00, weight: 35, description: 'Jio (₹38/sh) + Retail (₹42/sh) + O2C Core (₹28/sh) + New Energy.' },
        { id: 'm2', name: '5Y DCF (Terminal Growth 5.5% INR)', category: 'DCF', value: 1665.00, weight: 30, description: 'WACC 10.5% tailored for Indian sovereign yield curve.' },
        { id: 'm3', name: 'EV / Forward EBITDA Multiple (14.5x)', category: 'Multiples', value: 1640.00, weight: 20, description: 'Blended consumer tech and petrochemical exit multiple.' },
        { id: 'm4', name: 'Finbox Quantitative Model', category: 'Fundamental', value: 1695.00, weight: 15, description: 'Consensus quantitative fair value.' }
      ]
    },
    healthScore: {
      totalScore: 4.6,
      status: 'Great',
      percentileRank: 96,
      pillars: {
        profitability: {
          name: 'Profitability Health',
          score: 4.6,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'EBITDA Margin', value: '18.4%', benchmark: 'Conglomerate Top', status: 'positive' },
            { label: 'Jio Telecom ARPU', value: '₹195/mo', benchmark: 'Growing +8% YoY', status: 'positive' },
            { label: 'Return on Equity (ROE)', value: '12.8%', benchmark: 'Nifty 50 Avg: 13.5%', status: 'neutral' }
          ]
        },
        growth: {
          name: 'Growth Health',
          score: 4.8,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Reliance Retail Revenue YoY', value: '+18.2%', benchmark: 'India Consumer Boom', status: 'positive' },
            { label: '5G Data Traffic Share', value: '62% in India', benchmark: 'Market Leader', status: 'positive' }
          ]
        },
        cashFlow: {
          name: 'Cash Flow Health',
          score: 4.5,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Annual Operating Cash Flow', value: '₹1.52 Lakh Crore', benchmark: 'Highest in India', status: 'positive' },
            { label: 'Net Debt / EBITDA', value: '0.65x', benchmark: 'Comfortably Below 1.5x Limit', status: 'positive' }
          ]
        },
        momentum: {
          name: 'Price Momentum',
          score: 4.2,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Price vs 200-DMA', value: '+7.4%', benchmark: 'Healthy Support Base', status: 'positive' }
          ]
        },
        relativeValue: {
          name: 'Relative Valuation',
          score: 4.5,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Forward P/E', value: '21.4x', benchmark: 'Below 5Y Average of 25.8x', status: 'positive' }
          ]
        }
      }
    },
    proTips: [
      { id: 'rel1', type: 'bull', title: 'Unrivaled Indian Consumer Duopoly in Telecom & Retail', description: 'Jio commands 490M+ subscribers and Reliance Retail operates 18,800+ stores across 7,000+ towns.', badge: 'Consumer Moat' },
      { id: 'rel2', type: 'bull', title: 'Value Unlocking via Jio & Retail IPOs', description: 'Street estimates prospective separate public listings will unlock significant conglomerate discount value.', badge: 'IPO Catalyst' },
      { id: 'rel3', type: 'bear', title: 'High Capex in New Green Energy Giga-Complexes', description: 'Substantial capital expenditure in Jamnagar solar, electrolyzers, and battery manufacturing.', badge: 'Capex Heavy' }
    ],
    financials: {
      years: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25 (E)', 'FY26 (E)'],
      revenue: [540.0, 792.0, 974.0, 1000.0, 1085.0, 1190.0],
      grossProfit: [180.0, 245.0, 298.0, 315.0, 345.0, 385.0],
      operatingIncome: [80.5, 110.4, 142.1, 154.2, 172.0, 195.0],
      netIncome: [53.7, 67.8, 73.6, 79.0, 88.5, 101.0],
      freeCashFlow: [26.0, 38.0, 48.0, 56.0, 68.0, 82.0],
      totalCash: [254.0, 241.0, 225.0, 260.0, 280.0, 305.0],
      totalDebt: [251.0, 266.0, 314.0, 290.0, 265.0, 240.0],
      roic: [7.8, 9.4, 10.8, 11.5, 12.8, 14.2],
      operatingMargin: [14.9, 13.9, 14.6, 15.4, 15.8, 16.4],
      sharesOutstanding: [6.76, 6.76, 6.76, 6.76, 6.76, 6.76]
    }
  },

  TCS: {
    ticker: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Technology',
    industry: 'IT Services & Consulting',
    market: 'INDIA',
    price: 4120.00,
    change: 32.50,
    changePercent: 0.79,
    marketCap: '₹14.91 Lakh Crore ($180B)',
    pe: 29.5,
    forwardPE: 25.2,
    eps: 139.66,
    dividendYield: 2.15,
    beta: 0.72,
    fiftyTwoWeekHigh: 4585.00,
    fiftyTwoWeekLow: 3450.00,
    volume: '2.1M',
    avgVolume: '1.9M',
    exchange: 'NSE',
    currency: 'INR',
    currencySymbol: '₹',
    monthlySignal: {
      action: 'ACCUMULATE',
      ratingScore: 8.8,
      targetEntryRange: '₹3,950 - ₹4,100',
      fairValueTarget: '₹4,720.00',
      stopLoss: '₹3,750.00',
      primaryRationale: 'Pristine zero-debt balance sheet, industry-leading 24.5% EBIT margins, and highest dividend return payout in Indian IT.',
      catalyst: 'Rebound in BFSI discretionary cloud transformation and generative AI pipeline deals ($1.5B+ pipeline).',
      riskHorizon: 'Low'
    },
    description: 'Tata Consultancy Services is India’s premier IT services, consulting, and business solutions organization, employing over 600,000 consultants globally.',
    fairValue: {
      consensusValue: 4720.00,
      upsidePercent: 14.56,
      uncertainty: 'Low',
      analystTarget: 4600.00,
      analystUpsidePercent: 11.65,
      analystCount: 42,
      modelsCount: 14,
      models: [
        { id: 'm1', name: '5Y DCF Free Cash Flow', category: 'DCF', value: 4780.00, weight: 30, description: 'Assumes 11.5% USD revenue CAGR and 100% FCF conversion.' },
        { id: 'm2', name: 'P/E Relative Multiple (28x Forward)', category: 'Multiples', value: 4680.00, weight: 35, description: 'Historic 5-year average multiple.' },
        { id: 'm3', name: 'Dividend Discount Model (DDM)', category: 'Asset & Dividend', value: 4650.00, weight: 35, description: '85%+ net income payout ratio.' }
      ]
    },
    healthScore: {
      totalScore: 4.9,
      status: 'Great',
      percentileRank: 99,
      pillars: {
        profitability: {
          name: 'Profitability Health',
          score: 5.0,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'EBIT Margin', value: '24.6%', benchmark: 'Global IT Peer #1', status: 'positive' },
            { label: 'Return on Equity (ROE)', value: '51.2%', benchmark: 'Top 1% Global Tech', status: 'positive' }
          ]
        },
        growth: {
          name: 'Growth Health',
          score: 4.2,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Order Book TCV', value: '$12.2 Billion / Qtr', benchmark: 'Record High', status: 'positive' }
          ]
        },
        cashFlow: {
          name: 'Cash Flow Health',
          score: 5.0,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Net Debt', value: '₹0 (Zero Debt)', benchmark: 'Fortress Treasury', status: 'positive' },
            { label: 'Free Cash Flow / Net Profit', value: '104%', benchmark: 'Exceptional Conversion', status: 'positive' }
          ]
        },
        momentum: {
          name: 'Price Momentum',
          score: 4.2,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Beta', value: '0.72', benchmark: 'Defensive Anchor', status: 'positive' }
          ]
        },
        relativeValue: {
          name: 'Relative Valuation',
          score: 4.3,
          maxScore: 5.0,
          status: 'Great',
          keyMetrics: [
            { label: 'Dividend Yield', value: '2.15%', benchmark: 'Safe Cash Compounder', status: 'positive' }
          ]
        }
      }
    },
    proTips: [
      { id: 'tcs1', type: 'bull', title: 'Pristine Zero-Debt Balance Sheet', description: 'Generates ₹45,000+ Crore annual operating cash flow with zero long-term debt.', badge: 'AAA Quality' },
      { id: 'tcs2', type: 'bull', title: 'Generous 85%+ Shareholder Payout Policy', description: 'Returns virtually all free cash flow to investors via dividends and periodic share buybacks.', badge: 'Shareholder Yield' }
    ],
    financials: {
      years: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25 (E)', 'FY26 (E)'],
      revenue: [164.1, 191.7, 225.4, 240.8, 262.0, 288.0],
      grossProfit: [67.8, 79.5, 93.2, 99.4, 108.5, 120.0],
      operatingIncome: [42.4, 48.5, 54.2, 59.3, 64.8, 72.0],
      netIncome: [32.4, 38.3, 42.1, 46.0, 50.8, 56.5],
      freeCashFlow: [38.0, 39.5, 41.2, 44.8, 49.5, 55.0],
      totalCash: [38.5, 52.0, 50.5, 48.0, 52.0, 56.0],
      totalDebt: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      roic: [48.2, 54.1, 58.5, 61.2, 63.5, 66.0],
      operatingMargin: [25.8, 25.3, 24.1, 24.6, 24.7, 25.0],
      sharesOutstanding: [3.66, 3.66, 3.66, 3.66, 3.66, 3.66]
    }
  },

  HDFCBANK: {
    ticker: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    sector: 'Financial Services',
    industry: 'Private Banking & Wealth Management',
    market: 'INDIA',
    price: 1780.00,
    change: 14.20,
    changePercent: 0.80,
    marketCap: '₹13.52 Lakh Crore ($163B)',
    pe: 19.2,
    forwardPE: 16.5,
    eps: 92.70,
    dividendYield: 1.15,
    beta: 0.88,
    fiftyTwoWeekHigh: 1820.00,
    fiftyTwoWeekLow: 1363.55,
    volume: '14.2M',
    avgVolume: '16.5M',
    exchange: 'NSE',
    currency: 'INR',
    currencySymbol: '₹',
    monthlySignal: {
      action: 'STRONG BUY',
      ratingScore: 9.7,
      targetEntryRange: '₹1,720 - ₹1,780',
      fairValueTarget: '₹2,180.00',
      stopLoss: '₹1,580.00',
      primaryRationale: 'Post-merger credit-deposit ratio normalizing, loan book growth stabilizing above 15% YoY, and valuation at 10-year low P/B of 2.4x.',
      catalyst: 'Deposit repricing cycle peaking and margin expansion across 8,800+ branch network.',
      riskHorizon: 'Low'
    },
    description: 'HDFC Bank is India’s largest private sector bank following its historic mega-merger with HDFC Ltd., commanding over 22% of total national credit and mortgage disbursements.',
    fairValue: {
      consensusValue: 2180.00,
      upsidePercent: 22.47,
      uncertainty: 'Low',
      analystTarget: 2100.00,
      analystUpsidePercent: 17.98,
      analystCount: 46,
      modelsCount: 12,
      models: [
        { id: 'm1', name: 'Price to Book Value (P/B 2.9x)', category: 'Multiples', value: 2240.00, weight: 40, description: 'Normalized historic valuation multiple.' },
        { id: 'm2', name: 'Excess Return Capital Model', category: 'Fundamental', value: 2150.00, weight: 35, description: '17% sustainable ROE framework.' },
        { id: 'm3', name: 'Dividend Discount Model (DDM)', category: 'Asset & Dividend', value: 2120.00, weight: 25, description: 'Banking capital payout model.' }
      ]
    },
    healthScore: {
      totalScore: 4.8,
      status: 'Great',
      percentileRank: 98,
      pillars: {
        profitability: { name: 'Profitability Health', score: 4.8, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Return on Assets (ROA)', value: '1.95%', benchmark: 'India Banking Benchmark', status: 'positive' }] },
        growth: { name: 'Growth Health', score: 4.7, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Advances Growth YoY', value: '+16.5%', benchmark: 'Strong Retail & SME', status: 'positive' }] },
        cashFlow: { name: 'Cash Flow Health', score: 4.9, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Gross NPA (Bad Loans)', value: '1.24%', benchmark: 'Best-in-Class Asset Quality', status: 'positive' }] },
        momentum: { name: 'Price Momentum', score: 4.3, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Price vs 200-DMA', value: '+11.2%', benchmark: 'Multi-month breakout', status: 'positive' }] },
        relativeValue: { name: 'Relative Valuation', score: 4.9, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Price / Book', value: '2.42x', benchmark: '10-Year Valuation Low', status: 'positive' }] }
      }
    },
    proTips: [
      { id: 'hdfc1', type: 'bull', title: '10-Year Low Valuation Entry Point', description: 'Trading at only 2.42x book value compared to its 10-year historical average of 3.6x.', badge: 'Generational Value' },
      { id: 'hdfc2', type: 'bull', title: 'Unshakable Asset Quality & Low NPAs', description: 'Net NPA below 0.35% with high 74% provision coverage ratio.', badge: 'Fortress Bank' }
    ],
    financials: {
      years: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25 (E)', 'FY26 (E)'],
      revenue: [146.0, 157.0, 192.0, 285.0, 335.0, 388.0],
      grossProfit: [55.0, 65.0, 78.0, 122.0, 142.0, 168.0],
      operatingIncome: [57.3, 64.0, 70.4, 98.5, 118.0, 140.0],
      netIncome: [31.1, 36.9, 44.1, 60.8, 72.5, 85.0],
      freeCashFlow: [28.0, 32.0, 40.0, 54.0, 65.0, 78.0],
      totalCash: [119.0, 152.0, 193.0, 240.0, 275.0, 310.0],
      totalDebt: [135.0, 184.0, 206.0, 350.0, 380.0, 410.0],
      roic: [16.4, 16.9, 17.1, 16.2, 16.8, 17.5],
      operatingMargin: [39.2, 40.7, 36.6, 34.5, 35.2, 36.0],
      sharesOutstanding: [5.51, 5.54, 5.58, 7.60, 7.60, 7.60]
    }
  },

  INFY: {
    ticker: 'INFY',
    name: 'Infosys Limited',
    sector: 'Technology',
    industry: 'IT Consulting & Enterprise Cloud',
    market: 'INDIA',
    price: 1890.00,
    change: 18.50,
    changePercent: 0.99,
    marketCap: '₹7.84 Lakh Crore ($94B)',
    pe: 28.2,
    forwardPE: 23.5,
    eps: 67.02,
    dividendYield: 2.38,
    beta: 0.85,
    fiftyTwoWeekHigh: 1990.00,
    fiftyTwoWeekLow: 1358.35,
    volume: '4.8M',
    avgVolume: '5.2M',
    exchange: 'NSE',
    currency: 'INR',
    currencySymbol: '₹',
    monthlySignal: {
      action: 'ACCUMULATE',
      ratingScore: 8.6,
      targetEntryRange: '₹1,820 - ₹1,890',
      fairValueTarget: '₹2,150.00',
      stopLoss: '₹1,710.00',
      primaryRationale: 'Large deal wins ($4.5B/quarter) and strong generative AI Topaz platform scaling with 21.5% EBIT margins.',
      catalyst: 'US enterprise IT spending budget unlocking in banking and telecom.',
      riskHorizon: 'Low'
    },
    description: 'Infosys Limited is a global leader in next-generation digital services and consulting, providing Topaz AI and Cobalt cloud platforms.',
    fairValue: {
      consensusValue: 2150.00,
      upsidePercent: 13.76,
      uncertainty: 'Low',
      analystTarget: 2080.00,
      analystUpsidePercent: 10.05,
      analystCount: 40,
      modelsCount: 12,
      models: [
        { id: 'm1', name: '5Y DCF Growth Exit', category: 'DCF', value: 2180.00, weight: 35, description: '10.5% WACC.' },
        { id: 'm2', name: 'P/E Relative Multiple', category: 'Multiples', value: 2120.00, weight: 35, description: '25x forward multiple.' }
      ]
    },
    healthScore: {
      totalScore: 4.7,
      status: 'Great',
      percentileRank: 97,
      pillars: {
        profitability: { name: 'Profitability Health', score: 4.7, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Operating Margin', value: '21.5%', benchmark: 'High Quality', status: 'positive' }] },
        growth: { name: 'Growth Health', score: 4.4, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Constant Currency Growth', value: '+7.2%', benchmark: 'Improving', status: 'positive' }] },
        cashFlow: { name: 'Cash Flow Health', score: 4.9, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Zero Debt Status', value: 'Net Cash ₹32,000 Cr', benchmark: 'Zero Debt', status: 'positive' }] },
        momentum: { name: 'Price Momentum', score: 4.4, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: '52W Range', value: 'Near Highs', benchmark: 'Bullish Continuation', status: 'positive' }] },
        relativeValue: { name: 'Relative Valuation', score: 4.2, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Dividend Yield', value: '2.38%', benchmark: 'Solid Yield', status: 'positive' }] }
      }
    },
    proTips: [
      { id: 'inf1', type: 'bull', title: 'Topaz Generative AI Deal Acceleration', description: 'Over 300 active enterprise generative AI implementations driving client wallet share.', badge: 'AI Topaz' }
    ],
    financials: {
      years: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25 (E)', 'FY26 (E)'],
      revenue: [100.4, 121.6, 146.7, 153.6, 168.0, 185.0],
      grossProfit: [35.2, 40.5, 46.2, 47.8, 52.5, 58.0],
      operatingIncome: [24.6, 28.0, 30.9, 31.7, 35.2, 39.5],
      netIncome: [19.3, 22.1, 24.0, 26.2, 29.0, 32.8],
      freeCashFlow: [22.0, 23.5, 25.1, 28.0, 31.0, 35.0],
      totalCash: [27.0, 37.0, 31.5, 34.0, 38.0, 42.0],
      totalDebt: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      roic: [32.5, 36.8, 38.2, 39.5, 41.0, 43.5],
      operatingMargin: [24.5, 23.0, 21.1, 20.6, 21.0, 21.4],
      sharesOutstanding: [4.24, 4.21, 4.15, 4.14, 4.14, 4.14]
    }
  },

  TATAMOTORS: {
    ticker: 'TATAMOTORS',
    name: 'Tata Motors Limited',
    sector: 'Consumer Cyclical',
    industry: 'Automotive & Commercial Vehicles',
    market: 'INDIA',
    price: 980.00,
    change: -12.40,
    changePercent: -1.25,
    marketCap: '₹3.60 Lakh Crore ($43B)',
    pe: 10.4,
    forwardPE: 8.8,
    eps: 94.20,
    dividendYield: 0.82,
    beta: 1.42,
    fiftyTwoWeekHigh: 1179.00,
    fiftyTwoWeekLow: 680.00,
    volume: '6.2M',
    avgVolume: '8.1M',
    exchange: 'NSE',
    currency: 'INR',
    currencySymbol: '₹',
    monthlySignal: {
      action: 'HOLD',
      ratingScore: 7.2,
      targetEntryRange: '₹880 - ₹940',
      fairValueTarget: '₹1,080.00',
      stopLoss: '₹850.00',
      primaryRationale: 'JLR (Jaguar Land Rover) net debt reduction achieved, but near-term European luxury auto demand softening and UK plant transition.',
      catalyst: 'Demerger of Commercial Vehicles and Passenger EV entities in late 2025.',
      riskHorizon: 'Medium'
    },
    description: 'Tata Motors is a leading global automobile manufacturer producing passenger cars, commercial heavy trucks, electric vehicles, and Jaguar Land Rover luxury SUVs.',
    fairValue: {
      consensusValue: 1080.00,
      upsidePercent: 10.20,
      uncertainty: 'Medium',
      analystTarget: 1120.00,
      analystUpsidePercent: 14.28,
      analystCount: 32,
      modelsCount: 10,
      models: [
        { id: 'm1', name: 'SOTP Demerger Value (PV + CV + JLR)', category: 'Fundamental', value: 1120.00, weight: 40, description: 'Sum of parts.' },
        { id: 'm2', name: 'EV / EBITDA Multiple (5.5x)', category: 'Multiples', value: 1040.00, weight: 60, description: 'Cyclical auto multiple.' }
      ]
    },
    healthScore: {
      totalScore: 4.1,
      status: 'Good',
      percentileRank: 84,
      pillars: {
        profitability: { name: 'Profitability Health', score: 4.2, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'Jio / JLR EBIT Margin', value: '8.5%', benchmark: 'Turnaround Success', status: 'positive' }] },
        growth: { name: 'Growth Health', score: 4.3, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'India EV Market Share', value: '68%', benchmark: 'Dominant Leader', status: 'positive' }] },
        cashFlow: { name: 'Cash Flow Health', score: 4.1, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'JLR Net Cash Goal', value: 'Net Cash £1.0B by FY25', benchmark: 'Deleveraging', status: 'positive' }] },
        momentum: { name: 'Price Momentum', score: 3.8, maxScore: 5.0, status: 'Good', keyMetrics: [{ label: 'Consolidating', value: 'Pullback from ₹1,179', benchmark: 'Rangebound', status: 'neutral' }] },
        relativeValue: { name: 'Relative Valuation', score: 4.5, maxScore: 5.0, status: 'Great', keyMetrics: [{ label: 'P/E Multiple', value: '10.4x', benchmark: 'Single digit forward', status: 'positive' }] }
      }
    },
    proTips: [
      { id: 'tat1', type: 'bull', title: '68% Market Share in Indian Electric Vehicles', description: 'Nexon EV and Punch EV establish near-monopoly dominance in affordable Indian electrification.', badge: 'EV Leadership' },
      { id: 'tat2', type: 'bear', title: 'European Auto Demand Slowdown', description: 'JLR order backlog normalizing in UK and Eurozone amid macro headwinds.', badge: 'Cyclicality' }
    ],
    financials: {
      years: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25 (E)', 'FY26 (E)'],
      revenue: [249.8, 278.4, 345.9, 437.9, 465.0, 498.0],
      grossProfit: [85.0, 94.0, 118.0, 155.0, 168.0, 182.0],
      operatingIncome: [-2.5, 3.2, 18.5, 38.5, 42.0, 46.5],
      netIncome: [-13.4, -11.4, 2.7, 31.8, 36.5, 41.0],
      freeCashFlow: [-12.0, -8.5, 14.2, 28.5, 32.0, 36.0],
      totalCash: [48.0, 40.5, 45.0, 52.0, 58.0, 65.0],
      totalDebt: [142.0, 140.0, 125.0, 85.0, 60.0, 42.0],
      roic: [-3.2, 1.8, 9.4, 18.5, 20.1, 22.0],
      operatingMargin: [-1.0, 1.1, 5.3, 8.8, 9.0, 9.3],
      sharesOutstanding: [3.82, 3.82, 3.82, 3.82, 3.82, 3.82]
    }
  },

  PAYTM: {
    ticker: 'PAYTM',
    name: 'One97 Communications (Paytm)',
    sector: 'Financial Technology',
    industry: 'Digital Payments & Lending',
    market: 'INDIA',
    price: 685.00,
    change: -18.20,
    changePercent: -2.58,
    marketCap: '₹43,500 Crore ($5.2B)',
    pe: -38.5,
    forwardPE: -28.0,
    eps: -17.80,
    dividendYield: 0.0,
    beta: 1.85,
    fiftyTwoWeekHigh: 998.00,
    fiftyTwoWeekLow: 310.00,
    volume: '5.8M',
    avgVolume: '6.2M',
    exchange: 'NSE',
    currency: 'INR',
    currencySymbol: '₹',
    monthlySignal: {
      action: 'AVOID / DO NOT BUY',
      ratingScore: 3.4,
      targetEntryRange: '₹450 - ₹520',
      fairValueTarget: '₹540.00',
      stopLoss: '₹620.00',
      primaryRationale: 'Regulatory RBI clampdown on Paytm Payments Bank disrupted merchant UPI float, continuous net GAAP losses, and fierce competition from PhonePe and Google Pay.',
      catalyst: 'Payment aggregator licensing and cost restructuring taking extended quarters to reflect in GAAP bottom line.',
      riskHorizon: 'High'
    },
    description: 'One97 Communications operates Paytm, an Indian digital financial services platform providing UPI merchant soundboxes, QR payments, and loan distribution.',
    fairValue: {
      consensusValue: 540.00,
      upsidePercent: -21.17,
      uncertainty: 'High',
      analystTarget: 610.00,
      analystUpsidePercent: -10.95,
      analystCount: 18,
      modelsCount: 8,
      models: [
        { id: 'm1', name: 'Price / Sales Multiple (3.2x)', category: 'Multiples', value: 520.00, weight: 50, description: 'Benchmarked against global fintech peers.' },
        { id: 'm2', name: 'Discounted Cash Flow (High Discount Rate 14%)', category: 'DCF', value: 560.00, weight: 50, description: 'Factoring regulatory risk premium.' }
      ]
    },
    healthScore: {
      totalScore: 2.8,
      status: 'Weak',
      percentileRank: 32,
      pillars: {
        profitability: { name: 'Profitability Health', score: 2.2, maxScore: 5.0, status: 'Weak', keyMetrics: [{ label: 'Net Profit Margin', value: '-18.5%', benchmark: 'GAAP Unprofitable', status: 'negative' }] },
        growth: { name: 'Growth Health', score: 3.2, maxScore: 5.0, status: 'Average', keyMetrics: [{ label: 'Merchant Subscription Devices', value: '1.08 Crore', benchmark: 'Soundbox Moat', status: 'positive' }] },
        cashFlow: { name: 'Cash Flow Health', score: 3.8, maxScore: 5.0, status: 'Good', keyMetrics: [{ label: 'Cash Reserves', value: '₹7,800 Crore', benchmark: 'Sufficient Runway', status: 'positive' }] },
        momentum: { name: 'Price Momentum', score: 2.6, maxScore: 5.0, status: 'Weak', keyMetrics: [{ label: 'Down -68% from IPO', value: '₹685 vs ₹2,150 IPO', benchmark: 'Underperforming', status: 'negative' }] },
        relativeValue: { name: 'Relative Valuation', score: 2.2, maxScore: 5.0, status: 'Weak', keyMetrics: [{ label: 'GAAP P/E', value: 'Negative (Losses)', benchmark: 'No EPS Support', status: 'negative' }] }
      }
    },
    proTips: [
      { id: 'pay1', type: 'bear', title: 'Trading 21% Above Fair Value Consensus', description: 'Quantitative models indicate price exceeds underlying cash flow generation without banking license restoration.', badge: 'Overpriced' },
      { id: 'pay2', type: 'bear', title: 'Severe Regulatory Scrutiny', description: 'RBI restrictions on payments bank unit required merchant migration to third-party bank escrows.', badge: 'Regulatory' }
    ],
    financials: {
      years: ['FY21', 'FY22', 'FY23', 'FY24', 'FY25 (E)', 'FY26 (E)'],
      revenue: [28.0, 49.7, 79.9, 99.7, 78.0, 92.0],
      grossProfit: [8.5, 16.5, 32.0, 44.0, 34.0, 42.0],
      operatingIncome: [-17.0, -24.0, -21.0, -14.5, -16.0, -8.0],
      netIncome: [-17.0, -23.9, -17.7, -14.2, -18.0, -9.5],
      freeCashFlow: [-15.0, -18.5, -12.0, -8.0, -11.0, -4.0],
      totalCash: [92.0, 90.0, 83.0, 81.0, 78.0, 75.0],
      totalDebt: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      roic: [-18.5, -22.4, -14.2, -9.8, -12.5, -6.0],
      operatingMargin: [-60.7, -48.3, -26.3, -14.5, -20.5, -8.7],
      sharesOutstanding: [0.60, 0.65, 0.63, 0.63, 0.63, 0.63]
    }
  }
};

export const POPULAR_US_TICKERS = ['AAPL', 'NVDA', 'MSFT', 'GOOGL', 'TSLA'];
export const POPULAR_INDIA_TICKERS = ['RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'TATAMOTORS', 'PAYTM'];
export const POPULAR_TICKERS = [...POPULAR_US_TICKERS, ...POPULAR_INDIA_TICKERS];
