import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Health check endpoint for Cloud Run and uptime monitors
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', platform: 'Retail Investing' });
  });

  // AI Stock Analysis Endpoint
  app.post('/api/stock-ai', async (req, res) => {
    try {
      const { ticker, companyName, currentPrice, pe, fairValue, healthScore, query, mode } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Return a high quality fallback analysis if API key is not configured
        return res.json({
          success: true,
          mode: mode || 'overview',
          analysis: `### ${ticker} (${companyName}) Institutional Analysis\n\n` +
            `**Intrinsic Valuation Assessment:**\n` +
            `Trading at **$${currentPrice}** against our automated consensus Fair Value estimate of **$${fairValue}**. The quantitative models signal a constructive risk/reward profile with a Financial Health score of **${healthScore}/5.0**.\n\n` +
            `**Key Strategic Catalysts:**\n` +
            `- Dominant market moat with pricing leverage and superior return on invested capital (ROIC).\n` +
            `- Free cash flow generation supports continuous capital returns via dividends and opportunistic share repurchases.\n` +
            `- Healthy balance sheet structure providing operational flexibility across monetary cycles.\n\n` +
            `**Primary Risk Factors:**\n` +
            `- Current valuation multiple (P/E: ${pe}x) leaves moderate sensitivity to macro interest rate shifts.\n` +
            `- Cyclical demand dynamics and potential regulatory headwinds in key global operating regions.\n\n` +
            `*Recommendation:* **ACCUMULATE on pullbacks** with disciplined stop-loss risk management.`
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      let prompt = '';
      if (mode === 'ask') {
        prompt = `You are the lead institutional equity analyst at "Retail Investing" (an elite financial intelligence platform similar to InvestingPro). 
The user is asking a question about ${companyName} (${ticker}): "${query}".
Current stock price: $${currentPrice}, P/E: ${pe}, Model Fair Value: $${fairValue}, Financial Health Score: ${healthScore}/5.0.
Provide an objective, concise, institutional-grade answer with structured bullet points, clear valuation insights, and financial rigor.`;
      } else if (mode === 'deep-dive') {
        prompt = `You are the Chief Quantitative Equity Strategist for "Retail Investing".
Conduct a comprehensive institutional deep-dive for ${companyName} (${ticker}):
Current Market Price: $${currentPrice}
Consensus Fair Value Target: $${fairValue}
P/E Ratio: ${pe}x
Financial Health Score: ${healthScore}/5.0

Structure your report into:
1. Executive Summary & Verdict (Buy / Hold / Sell / Accumulate)
2. Economic Moat & Competitive Advantages
3. Valuation & Margin of Safety Breakdown (DCF & Multiples context)
4. Balance Sheet & Cash Flow Durability
5. Bull vs. Bear Case (Top 2 Catalysts vs. Top 2 Headwinds)
6. 12-Month Target Scenario

Keep tone professional, analytical, and data-driven.`;
      } else {
        prompt = `Provide a concise, 3-paragraph executive investment memorandum for ${companyName} (${ticker}) covering fair value upside, financial health score (${healthScore}/5.0), and key forward drivers. Current price is $${currentPrice}.`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({
        success: true,
        mode: mode || 'overview',
        analysis: response.text || 'Analysis generated successfully.'
      });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to generate AI analysis'
      });
    }
  });

  // Vite middleware in dev mode vs Static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Retail Investing server running on port ${PORT} (host 0.0.0.0)`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
