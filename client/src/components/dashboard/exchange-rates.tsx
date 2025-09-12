import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";

export default function ExchangeRates() {
  const { data: exchangeRates, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/exchange-rates"],
    refetchInterval: 60000, // Refetch every minute
  });

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["/api/exchange-rates"] });
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive" data-testid="error-exchange-rates">
            Failed to load exchange rates. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground" data-testid="exchange-rates-title">Exchange Rates</h3>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleRefresh}
            className="h-8 w-8"
            data-testid="button-refresh-rates"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))
          ) : (
            Array.isArray(exchangeRates) && exchangeRates?.map((rate: any) => {
              const change = parseFloat(rate.change24h || "0");
              const isPositive = change >= 0;
              
              return (
                <div 
                  key={rate.currency} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  data-testid={`exchange-rate-${rate.currency.toLowerCase()}`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{rate.symbol}</span>
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{rate.currency}</p>
                      <p className="text-sm text-muted-foreground">{rate.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground" data-testid={`rate-value-${rate.currency.toLowerCase()}`}>
                      {rate.symbol}{parseFloat(rate.rate).toLocaleString()}
                    </p>
                    <Badge 
                      variant="secondary"
                      className={`text-sm ${isPositive ? 'text-chart-1' : 'text-chart-2'}`}
                      data-testid={`rate-change-${rate.currency.toLowerCase()}`}
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
