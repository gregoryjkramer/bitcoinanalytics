import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { NodeStatus } from "@shared/schema";

export default function NodeStatus() {
  const { data: nodeStatus, isLoading, error } = useQuery<NodeStatus>({
    queryKey: ["/api/node-status"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive" data-testid="error-node-status">
            Failed to load node status. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground" data-testid="node-status-title">Bitcoin Node Status</h3>
          {isLoading ? (
            <Skeleton className="w-20 h-6 rounded-full" />
          ) : (
            <Badge 
              variant={nodeStatus?.isOnline ? "default" : "destructive"} 
              className="text-xs"
              data-testid="node-connection-badge"
            >
              <div className={`w-2 h-2 rounded-full mr-1.5 ${nodeStatus?.isOnline ? 'bg-chart-1' : 'bg-destructive'}`}></div>
              {nodeStatus?.isOnline ? "Connected" : "Disconnected"}
            </Badge>
          )}
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg" data-testid="node-block-height">
                <span className="text-sm text-muted-foreground">Block Height</span>
                <span className="font-semibold text-foreground">{nodeStatus?.blockHeight.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg" data-testid="node-connections">
                <span className="text-sm text-muted-foreground">Connections</span>
                <span className="font-semibold text-foreground">{nodeStatus?.connections}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg" data-testid="node-mempool">
                <span className="text-sm text-muted-foreground">Mempool Size</span>
                <span className="font-semibold text-foreground">{nodeStatus?.mempoolSize} tx</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg" data-testid="node-chain-size">
                <span className="text-sm text-muted-foreground">Chain Size</span>
                <span className="font-semibold text-foreground">{nodeStatus?.chainSize}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg" data-testid="node-sync-progress">
                <span className="text-sm text-muted-foreground">Sync Progress</span>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={parseFloat(nodeStatus?.syncProgress?.toString() || "0")} 
                    className="w-20 h-2"
                  />
                  <span className="text-sm font-semibold text-chart-1">{nodeStatus?.syncProgress}%</span>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
