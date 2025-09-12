import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bitcoinPrices = pgTable("bitcoin_prices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const exchangeRates = pgTable("exchange_rates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currency: text("currency").notNull(),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  rate: decimal("rate", { precision: 12, scale: 2 }).notNull(),
  change24h: decimal("change24h", { precision: 8, scale: 4 }),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const nodeStatus = pgTable("node_status", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blockHeight: integer("block_height").notNull(),
  connections: integer("connections").notNull(),
  mempoolSize: integer("mempool_size").notNull(),
  chainSize: text("chain_size").notNull(),
  syncProgress: decimal("sync_progress", { precision: 5, scale: 2 }).notNull(),
  isOnline: boolean("is_online").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const portfolioAssets = pgTable("portfolio_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  currentPrice: decimal("current_price", { precision: 12, scale: 2 }).notNull(),
  value: decimal("value", { precision: 12, scale: 2 }).notNull(),
  change24h: decimal("change24h", { precision: 8, scale: 4 }),
  userId: varchar("user_id").references(() => users.id),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  txHash: text("tx_hash").notNull(),
  type: text("type").notNull(), // 'sent' | 'received' | 'pending'
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  currency: text("currency").notNull(),
  usdValue: decimal("usd_value", { precision: 12, scale: 2 }),
  status: text("status").notNull(), // 'confirmed' | 'pending' | 'failed'
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  userId: varchar("user_id").references(() => users.id),
});

// Market data schema
export const marketDataSchema = z.object({
  price: z.number(),
  volume24h: z.number(),
  marketCap: z.number(),
  change24h: z.number(),
  currency: z.string().default("USD"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBitcoinPriceSchema = createInsertSchema(bitcoinPrices).omit({
  id: true,
  timestamp: true,
});

export const insertExchangeRateSchema = createInsertSchema(exchangeRates).omit({
  id: true,
  updatedAt: true,
});

export const insertNodeStatusSchema = createInsertSchema(nodeStatus).omit({
  id: true,
  updatedAt: true,
});

export const insertPortfolioAssetSchema = createInsertSchema(portfolioAssets).omit({
  id: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type BitcoinPrice = typeof bitcoinPrices.$inferSelect;
export type ExchangeRate = typeof exchangeRates.$inferSelect;
export type NodeStatus = typeof nodeStatus.$inferSelect;
export type PortfolioAsset = typeof portfolioAssets.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type MarketData = z.infer<typeof marketDataSchema>;
