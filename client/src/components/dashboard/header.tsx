import { Link } from "wouter";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { theme, setTheme } = useTheme();
  
  const { data: nodeStatus } = useQuery({
    queryKey: ["/api/node-status"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl bitcoin-icon">₿</div>
            <span className="text-xl font-bold text-primary" data-testid="brand-name">TenaciousData</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors" data-testid="nav-dashboard">
              Dashboard
            </Link>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" data-testid="nav-portfolio">
              Portfolio
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" data-testid="nav-node-status">
              Node Status
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors" data-testid="nav-settings">
              Settings
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${nodeStatus?.isOnline ? 'bg-chart-1' : 'bg-destructive'}`}></div>
              <span className="text-muted-foreground">Node:</span>
              <Badge variant={nodeStatus?.isOnline ? "default" : "destructive"} className="text-xs" data-testid="node-status-badge">
                {nodeStatus?.isOnline ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9"
            data-testid="theme-toggle"
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
