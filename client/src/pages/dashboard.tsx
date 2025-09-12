import Header from "@/components/dashboard/header";
import StatsCards from "@/components/dashboard/stats-cards";
import PriceChart from "@/components/dashboard/price-chart";
import ExchangeRates from "@/components/dashboard/exchange-rates";
import NodeStatus from "@/components/dashboard/node-status";
import PortfolioBreakdown from "@/components/dashboard/portfolio-breakdown";
import RecentTransactions from "@/components/dashboard/recent-transactions";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-6">
        <StatsCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <ExchangeRates />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <NodeStatus />
          <PortfolioBreakdown />
        </div>

        <RecentTransactions />
      </main>
    </div>
  );
}
