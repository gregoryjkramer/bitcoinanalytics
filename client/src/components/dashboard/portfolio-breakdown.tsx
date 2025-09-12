import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const getCryptoIcon = (symbol: string) => {
  switch (symbol.toUpperCase()) {
    case "BTC":
      return <div className="text-2xl bitcoin-icon">₿</div>;
    case "ETH":
      return <div className="text-2xl ethereum-icon">Ξ</div>;
    case "LTC":
      return <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-black">L</span>
      </div>;
    default:
      return <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
        <span className="text-sm font-bold text-primary-foreground">{symbol[0]}</span>
      </div>;
  }
};

export default function PortfolioBreakdown() {
  const { data: portfolio, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/portfolio"],
    refetchInterval: 60000, // Refetch every minute
  });

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive" data-testid="error-portfolio">
            Failed to load portfolio data. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground" data-testid="portfolio-title">Portfolio Breakdown</h3>
          <Button variant="ghost" size="sm" data-testid="button-view-all-portfolio">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-16 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))
          ) : (
            Array.isArray(portfolio) && portfolio?.map((asset: any) => {
              const change = parseFloat(asset.change24h || "0");
              const isPositive = change >= 0;
              
              return (
                <div 
                  key={asset.symbol} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  data-testid={`portfolio-asset-${asset.symbol.toLowerCase()}`}
                >
                  <div className="flex items-center space-x-3">
                    {getCryptoIcon(asset.symbol)}
                    <div>
                      <p className="font-medium text-foreground">{asset.name}</p>
                      <p className="text-sm text-muted-foreground" data-testid={`asset-amount-${asset.symbol.toLowerCase()}`}>
                        {parseFloat(asset.amount).toFixed(asset.symbol === 'BTC' ? 3 : 2)} {asset.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground" data-testid={`asset-value-${asset.symbol.toLowerCase()}`}>
                      ${parseFloat(asset.value).toLocaleString()}
                    </p>
                    <Badge 
                      variant="secondary"
                      className={`text-sm ${isPositive ? 'text-chart-1' : 'text-chart-2'}`}
                      data-testid={`asset-change-${asset.symbol.toLowerCase()}`}
                    >
                      {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                      {Math.abs(change).toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
