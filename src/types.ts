export type MarketRegion = 'US' | 'INDIA';

export interface MonthlySignal {
  action: 'STRONG BUY' | 'ACCUMULATE' | 'HOLD' | 'TAKE PROFIT' | 'AVOID / DO NOT BUY';
  ratingScore: number; // 1 to 10
  targetEntryRange: string;
  fairValueTarget: string;
  stopLoss: string;
  primaryRationale: string;
  catalyst: string;
  riskHorizon: 'Low' | 'Medium' | 'High';
}

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  market: MarketRegion;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  pe: number;
  forwardPE: number;
  eps: number;
  dividendYield: number;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  volume: string;
  avgVolume: string;
  description: string;
  exchange: string;
  currency: string;
  currencySymbol: string;
  monthlySignal: MonthlySignal;
  fairValue: FairValueData;
  healthScore: HealthScoreData;
  proTips: ProTip[];
  financials: HistoricalFinancials;
}

export interface ValuationModelItem {
  id: string;
  name: string;
  category: 'DCF' | 'Multiples' | 'Asset & Dividend' | 'Fundamental';
  value: number;
  weight: number;
  description: string;
}

export interface FairValueData {
  consensusValue: number;
  upsidePercent: number;
  uncertainty: 'Low' | 'Medium' | 'High';
  analystTarget: number;
  analystUpsidePercent: number;
  analystCount: number;
  modelsCount: number;
  models: ValuationModelItem[];
}

export interface HealthPillar {
  name: string;
  score: number;
  maxScore: number;
  status: 'Great' | 'Good' | 'Average' | 'Weak';
  keyMetrics: { label: string; value: string; benchmark: string; status: 'positive' | 'neutral' | 'negative' }[];
}

export interface HealthScoreData {
  totalScore: number;
  status: 'Great' | 'Good' | 'Fair' | 'Weak';
  percentileRank: number;
  pillars: {
    profitability: HealthPillar;
    growth: HealthPillar;
    cashFlow: HealthPillar;
    momentum: HealthPillar;
    relativeValue: HealthPillar;
  };
}

export interface ProTip {
  id: string;
  type: 'bull' | 'bear' | 'neutral';
  title: string;
  description: string;
  badge: string;
}

export interface HistoricalFinancials {
  years: string[];
  revenue: number[]; // in Billions USD
  grossProfit: number[];
  operatingIncome: number[];
  netIncome: number[];
  freeCashFlow: number[];
  totalCash: number[];
  totalDebt: number[];
  roic: number[]; // percentage
  operatingMargin: number[]; // percentage
  sharesOutstanding: number[]; // Billions
}

export interface ProPickStrategy {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  totalReturn: number; // e.g. 1782%
  sp500Return: number; // e.g. 295%
  outperformance: number;
  winRate: number;
  annualizedReturn: number;
  sharpeRatio: number;
  rebalanceCycle: string;
  nextRebalance: string;
  holdings: {
    ticker: string;
    name: string;
    sector: string;
    weight: number;
    entryPrice: number;
    currentPrice: number;
    gainPercent: number;
    fairValueUpside: number;
    healthScore: number;
  }[];
  monthlyPerformance: {
    year: string;
    strategyReturn: number;
    benchmarkReturn: number;
  }[];
}

export interface GuruHolding {
  ticker: string;
  name: string;
  shares: string;
  valueFormatted: string;
  portfolioPercent: number;
  recentActivity: 'New Buy' | 'Added' | 'Unchanged' | 'Reduced' | 'Exited';
  fairValueUpside: number;
}

export interface GuruPortfolio {
  id: string;
  investorName: string;
  fundName: string;
  aum: string;
  topHoldingsPercent: number;
  filingDate: string;
  avatarUrl?: string;
  strategySummary: string;
  holdings: GuruHolding[];
  sectorDistribution: { sector: string; percentage: number }[];
}

export interface WatchlistItem {
  ticker: string;
  shares: number;
  avgBuyPrice: number;
  addedAt: string;
}
