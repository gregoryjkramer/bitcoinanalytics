import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { marketDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // CoinGecko API endpoints
  const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";
  
  // Get Bitcoin market data
  app.get("/api/market-data", async (req, res) => {
    try {
      const response = await fetch(`${COINGECKO_API_BASE}/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`);
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.bitcoin) {
        throw new Error("Bitcoin data not found in API response");
      }
      
      const marketData = {
        price: data.bitcoin.usd,
        volume24h: data.bitcoin.usd_24h_vol,
        marketCap: data.bitcoin.usd_market_cap,
        change24h: data.bitcoin.usd_24h_change,
        currency: "USD",
      };
      
      // Validate the data
      const validatedData = marketDataSchema.parse(marketData);
      
      // Store the latest price
      await storage.storeBitcoinPrice(validatedData.price, "USD");
      
      res.json(validatedData);
    } catch (error) {
      console.error("Market data fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch market data", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get Bitcoin price history
  app.get("/api/price-history", async (req, res) => {
    try {
      const days = req.query.days || "30";
      const response = await fetch(`${COINGECKO_API_BASE}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`);
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.prices) {
        throw new Error("Price history data not found in API response");
      }
      
      // Format the data for the frontend
      const priceHistory = data.prices.map(([timestamp, price]: [number, number]) => ({
        timestamp: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: Math.round(price * 100) / 100,
      }));
      
      res.json(priceHistory);
    } catch (error) {
      console.error("Price history fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch price history", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get exchange rates
  app.get("/api/exchange-rates", async (req, res) => {
    try {
      const response = await fetch(`${COINGECKO_API_BASE}/simple/price?ids=bitcoin&vs_currencies=usd,eur,gbp,jpy&include_24hr_change=true`);
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.bitcoin) {
        throw new Error("Bitcoin exchange rate data not found in API response");
      }
      
      const exchangeRates = [
        {
          currency: "USD",
          symbol: "$",
          name: "United States Dollar",
          rate: data.bitcoin.usd.toString(),
          change24h: data.bitcoin.usd_24h_change?.toString() || "0",
        },
        {
          currency: "EUR",
          symbol: "€",
          name: "Euro",
          rate: data.bitcoin.eur.toString(),
          change24h: data.bitcoin.eur_24h_change?.toString() || "0",
        },
        {
          currency: "GBP",
          symbol: "£",
          name: "British Pound",
          rate: data.bitcoin.gbp.toString(),
          change24h: data.bitcoin.gbp_24h_change?.toString() || "0",
        },
        {
          currency: "JPY",
          symbol: "¥",
          name: "Japanese Yen",
          rate: data.bitcoin.jpy.toString(),
          change24h: data.bitcoin.jpy_24h_change?.toString() || "0",
        },
      ];
      
      // Store the exchange rates
      await storage.updateExchangeRates(exchangeRates);
      
      res.json(exchangeRates);
    } catch (error) {
      console.error("Exchange rates fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch exchange rates", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get node status (mock data as specified)
  app.get("/api/node-status", async (req, res) => {
    try {
      const nodeStatus = await storage.getNodeStatus();
      
      if (!nodeStatus) {
        return res.status(404).json({ message: "Node status not found" });
      }
      
      res.json(nodeStatus);
    } catch (error) {
      console.error("Node status fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch node status", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get portfolio assets (mock data for demo)
  app.get("/api/portfolio", async (req, res) => {
    try {
      // For demo purposes, create mock portfolio data
      const mockAssets = [
        {
          symbol: "BTC",
          name: "Bitcoin",
          amount: "0.284",
          currentPrice: "43829.50",
          value: "12459.32",
          change24h: "5.67",
          userId: null,
        },
        {
          symbol: "ETH",
          name: "Ethereum",
          amount: "2.156",
          currentPrice: "2432.45",
          value: "5243.67",
          change24h: "-2.34",
          userId: null,
        },
        {
          symbol: "LTC",
          name: "Litecoin",
          amount: "15.67",
          currentPrice: "73.82",
          value: "1156.43",
          change24h: "0.87",
          userId: null,
        },
      ];
      
      const assets = await storage.updatePortfolioAssets(mockAssets);
      res.json(assets);
    } catch (error) {
      console.error("Portfolio fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch portfolio", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get recent transactions (mock data for demo)
  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      
      // For demo purposes, create mock transaction data
      const mockTransactions = [
        {
          txHash: "a1b2c3d4...7890",
          type: "received",
          amount: "0.0025",
          currency: "BTC",
          usdValue: "109.57",
          status: "confirmed",
          userId: null,
        },
        {
          txHash: "e5f6g7h8...4321",
          type: "sent",
          amount: "0.0156",
          currency: "BTC",
          usdValue: "683.74",
          status: "confirmed",
          userId: null,
        },
        {
          txHash: "i9j0k1l2...6789",
          type: "received",
          amount: "0.0087",
          currency: "BTC",
          usdValue: "381.32",
          status: "pending",
          userId: null,
        },
      ];
      
      // Add transactions to storage
      for (const txData of mockTransactions) {
        await storage.addTransaction(txData);
      }
      
      const transactions = await storage.getRecentTransactions(undefined, limit);
      res.json(transactions);
    } catch (error) {
      console.error("Transactions fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch transactions", 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
