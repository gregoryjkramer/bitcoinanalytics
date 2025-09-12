import { type User, type InsertUser, type BitcoinPrice, type ExchangeRate, type NodeStatus, type PortfolioAsset, type Transaction } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bitcoin price methods
  getLatestBitcoinPrice(): Promise<BitcoinPrice | undefined>;
  storeBitcoinPrice(price: number, currency: string): Promise<BitcoinPrice>;
  
  // Exchange rates methods
  getExchangeRates(): Promise<ExchangeRate[]>;
  updateExchangeRates(rates: Omit<ExchangeRate, 'id' | 'updatedAt'>[]): Promise<ExchangeRate[]>;
  
  // Node status methods
  getNodeStatus(): Promise<NodeStatus | undefined>;
  updateNodeStatus(status: Omit<NodeStatus, 'id' | 'updatedAt'>): Promise<NodeStatus>;
  
  // Portfolio methods
  getPortfolioAssets(userId?: string): Promise<PortfolioAsset[]>;
  updatePortfolioAssets(assets: Omit<PortfolioAsset, 'id'>[]): Promise<PortfolioAsset[]>;
  
  // Transaction methods
  getRecentTransactions(userId?: string, limit?: number): Promise<Transaction[]>;
  addTransaction(transaction: Omit<Transaction, 'id' | 'timestamp'>): Promise<Transaction>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bitcoinPrices: Map<string, BitcoinPrice>;
  private exchangeRates: Map<string, ExchangeRate>;
  private nodeStatus: NodeStatus | undefined;
  private portfolioAssets: Map<string, PortfolioAsset>;
  private transactions: Map<string, Transaction>;

  constructor() {
    this.users = new Map();
    this.bitcoinPrices = new Map();
    this.exchangeRates = new Map();
    this.portfolioAssets = new Map();
    this.transactions = new Map();
    
    // Initialize with mock node status
    this.nodeStatus = {
      id: randomUUID(),
      blockHeight: 818945,
      connections: 12,
      mempoolSize: 1847,
      chainSize: "487.3 GB",
      syncProgress: "100.0",
      isOnline: true,
      updatedAt: new Date(),
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getLatestBitcoinPrice(): Promise<BitcoinPrice | undefined> {
    const prices = Array.from(this.bitcoinPrices.values());
    return prices.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  }

  async storeBitcoinPrice(price: number, currency: string = "USD"): Promise<BitcoinPrice> {
    const id = randomUUID();
    const bitcoinPrice: BitcoinPrice = {
      id,
      price: price.toString(),
      currency,
      timestamp: new Date(),
    };
    this.bitcoinPrices.set(id, bitcoinPrice);
    return bitcoinPrice;
  }

  async getExchangeRates(): Promise<ExchangeRate[]> {
    return Array.from(this.exchangeRates.values());
  }

  async updateExchangeRates(rates: Omit<ExchangeRate, 'id' | 'updatedAt'>[]): Promise<ExchangeRate[]> {
    const updatedRates: ExchangeRate[] = [];
    
    for (const rate of rates) {
      const id = randomUUID();
      const exchangeRate: ExchangeRate = {
        ...rate,
        id,
        updatedAt: new Date(),
      };
      this.exchangeRates.set(id, exchangeRate);
      updatedRates.push(exchangeRate);
    }
    
    return updatedRates;
  }

  async getNodeStatus(): Promise<NodeStatus | undefined> {
    return this.nodeStatus;
  }

  async updateNodeStatus(status: Omit<NodeStatus, 'id' | 'updatedAt'>): Promise<NodeStatus> {
    const updatedStatus: NodeStatus = {
      ...status,
      id: this.nodeStatus?.id || randomUUID(),
      updatedAt: new Date(),
    };
    this.nodeStatus = updatedStatus;
    return updatedStatus;
  }

  async getPortfolioAssets(userId?: string): Promise<PortfolioAsset[]> {
    const assets = Array.from(this.portfolioAssets.values());
    return userId ? assets.filter(asset => asset.userId === userId) : assets;
  }

  async updatePortfolioAssets(assets: Omit<PortfolioAsset, 'id'>[]): Promise<PortfolioAsset[]> {
    const updatedAssets: PortfolioAsset[] = [];
    
    for (const asset of assets) {
      const id = randomUUID();
      const portfolioAsset: PortfolioAsset = {
        ...asset,
        id,
      };
      this.portfolioAssets.set(id, portfolioAsset);
      updatedAssets.push(portfolioAsset);
    }
    
    return updatedAssets;
  }

  async getRecentTransactions(userId?: string, limit: number = 10): Promise<Transaction[]> {
    const transactions = Array.from(this.transactions.values());
    const filtered = userId ? transactions.filter(tx => tx.userId === userId) : transactions;
    return filtered
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async addTransaction(transaction: Omit<Transaction, 'id' | 'timestamp'>): Promise<Transaction> {
    const id = randomUUID();
    const newTransaction: Transaction = {
      ...transaction,
      id,
      timestamp: new Date(),
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }
}

export const storage = new MemStorage();
