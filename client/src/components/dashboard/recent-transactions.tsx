import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Clock, Copy } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function RecentTransactions() {
  const { toast } = useToast();
  const { data: transactions, isLoading, error } = useQuery<any[]>({
    queryKey: ["/api/transactions"],
    refetchInterval: 60000, // Refetch every minute
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied to clipboard",
      description: "Transaction hash copied to clipboard",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "received":
        return <ArrowDown className="w-4 h-4" />;
      case "sent":
        return <ArrowUp className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTransactionColor = (type: string, status: string) => {
    if (status === "pending") return "text-yellow-400 bg-yellow-400/20";
    if (type === "received") return "text-chart-1 bg-chart-1/20";
    return "text-chart-2 bg-chart-2/20";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-chart-1 bg-chart-1/20";
      case "pending":
        return "text-yellow-400 bg-yellow-400/20";
      case "failed":
        return "text-chart-2 bg-chart-2/20";
      default:
        return "text-muted-foreground bg-muted/20";
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive" data-testid="error-transactions">
            Failed to load transaction data. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground" data-testid="transactions-title">Recent Transactions</h3>
          <Button variant="ghost" size="sm" data-testid="button-view-all-transactions">
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Transaction ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-4" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                  </tr>
                ))
              ) : (
                Array.isArray(transactions) && transactions?.map((tx: any) => (
                  <tr 
                    key={tx.id} 
                    className="hover:bg-muted/30 transition-colors"
                    data-testid={`transaction-row-${tx.id}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm text-primary" data-testid={`tx-hash-${tx.id}`}>
                          {tx.txHash}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 text-muted-foreground hover:text-foreground"
                          onClick={() => handleCopyHash(tx.txHash)}
                          data-testid={`copy-hash-${tx.id}`}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getTransactionColor(tx.type, tx.status)}`}
                        data-testid={`tx-type-${tx.id}`}
                      >
                        {getTransactionIcon(tx.type)}
                        <span className="ml-1 capitalize">{tx.type}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <span className="font-semibold text-foreground" data-testid={`tx-amount-${tx.id}`}>
                          {parseFloat(tx.amount).toFixed(4)} {tx.currency}
                        </span>
                        <div className="text-muted-foreground" data-testid={`tx-usd-value-${tx.id}`}>
                          ${parseFloat(tx.usdValue || "0").toFixed(2)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(tx.status)}`}
                        data-testid={`tx-status-${tx.id}`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          tx.status === "pending" ? "animate-pulse" : ""
                        } ${
                          tx.status === "confirmed" 
                            ? "bg-chart-1" 
                            : tx.status === "pending" 
                            ? "bg-yellow-400" 
                            : "bg-chart-2"
                        }`}></div>
                        <span className="capitalize">{tx.status}</span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground" data-testid={`tx-time-${tx.id}`}>
                      {formatTimeAgo(tx.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
