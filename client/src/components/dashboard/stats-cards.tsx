import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, TrendingUp, Globe, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { MarketData } from "@shared/schema";

export default function StatsCards() {
  const { data: marketData, isLoading, error } = useQuery<MarketData>({
    queryKey: ["/api/market-data"],
    refetchInterval: 60000, // Refetch every minute
  });

  const { data: portfolio } = useQuery<any[]>({
    queryKey: ["/api/portfolio"],
    refetchInterval: 60000,
  });

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="col-span-full">
          <CardContent className="pt-6">
            <p className="text-sm text-destructive" data-testid="error-market-data">
              Failed to load market data. Please check your connection.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const portfolioValue = Array.isArray(portfolio) ? portfolio.reduce((total: number, asset: any) => total + parseFloat(asset.value || "0"), 0) : 0;
  const portfolioChange = Array.isArray(portfolio) && portfolio[0]?.change24h ? parseFloat(portfolio[0].change24h) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="hover:bg-card/80 transition-colors">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bitcoin Price</p>
              <div className="flex items-center space-x-2 mt-1">
                {isLoading ? (
                  <Skeleton className="h-8 w-32" data-testid="skeleton-btc-price" />
                ) : (
                  <span className="text-2xl font-bold text-foreground" data-testid="btc-price">
                    ${marketData?.price.toLocaleString() || "0"}
                  </span>
                )}
                {marketData?.change24h && (
                  <Badge variant="secondary" className={`text-sm ${marketData.change24h > 0 ? 'text-chart-1' : 'text-chart-2'}`} data-testid="btc-price-change">
                    {marketData.change24h > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(marketData.change24h).toFixed(2)}%
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-3xl bitcoin-icon">₿</div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:bg-card/80 transition-colors">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">24h Volume</p>
              <div className="flex items-center space-x-2 mt-1">
                {isLoading ? (
                  <Skeleton className="h-8 w-24" data-testid="skeleton-volume" />
                ) : (
                  <span className="text-2xl font-bold text-foreground" data-testid="btc-volume">
                    ${marketData ? (marketData.volume24h / 1e9).toFixed(1) + "B" : "0"}
                  </span>
                )}
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:bg-card/80 transition-colors">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
              <div className="flex items-center space-x-2 mt-1">
                {isLoading ? (
                  <Skeleton className="h-8 w-28" data-testid="skeleton-market-cap" />
                ) : (
                  <span className="text-2xl font-bold text-foreground" data-testid="btc-market-cap">
                    ${marketData ? (marketData.marketCap / 1e9).toFixed(1) + "B" : "0"}
                  </span>
                )}
              </div>
            </div>
            <Globe className="h-8 w-8 text-chart-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:bg-card/80 transition-colors">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Portfolio Value</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-2xl font-bold text-foreground" data-testid="portfolio-value">
                  ${portfolioValue.toLocaleString()}
                </span>
                {portfolioChange !== 0 && (
                  <Badge variant="secondary" className={`text-sm ${portfolioChange > 0 ? 'text-chart-1' : 'text-chart-2'}`} data-testid="portfolio-change">
                    {portfolioChange > 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(portfolioChange).toFixed(2)}%
                  </Badge>
                )}
              </div>
            </div>
            <Wallet className="h-8 w-8 text-chart-4" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
