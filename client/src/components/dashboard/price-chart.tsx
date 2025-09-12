import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";

// Chart.js imports
declare global {
  interface Window {
    Chart: any;
  }
}

export default function PriceChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);

  const { data: priceHistory, isLoading, error } = useQuery({
    queryKey: ["/api/price-history", selectedPeriod],
    queryFn: async () => {
      const response = await fetch(`/api/price-history?days=${selectedPeriod}`);
      if (!response.ok) {
        throw new Error('Failed to fetch price history');
      }
      return response.json();
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  useEffect(() => {
    // Load Chart.js dynamically
    if (!window.Chart) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.async = true;
      script.onload = () => {
        initializeChart();
      };
      document.head.appendChild(script);
    } else {
      initializeChart();
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [priceHistory]);

  const initializeChart = () => {
    if (!chartRef.current || !window.Chart || !priceHistory || !Array.isArray(priceHistory)) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: priceHistory.map((point: any) => point.timestamp),
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: priceHistory.map((point: any) => point.price),
            borderColor: "hsl(217, 91%, 60%)",
            backgroundColor: "hsla(217, 91%, 60%, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "hsl(217, 91%, 60%)",
            pointBorderColor: "hsl(217, 91%, 60%)",
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "hsl(222, 13%, 11%)",
            titleColor: "hsl(213, 31%, 91%)",
            bodyColor: "hsl(213, 31%, 91%)",
            borderColor: "hsl(223, 13%, 15%)",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function (context: any) {
                return "$" + context.raw.toLocaleString();
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false,
            },
            ticks: {
              color: "hsl(215, 16%, 57%)",
              maxTicksLimit: 8,
            },
          },
          y: {
            display: true,
            position: "right" as const,
            grid: {
              color: "hsl(223, 13%, 15%)",
              drawBorder: false,
            },
            ticks: {
              color: "hsl(215, 16%, 57%)",
              callback: function (value: any) {
                return "$" + value.toLocaleString();
              },
            },
          },
        },
        interaction: {
          mode: "nearest" as const,
          axis: "x" as const,
          intersect: false,
        },
      },
    });
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-destructive" data-testid="error-price-chart">
            Failed to load price chart data. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground" data-testid="chart-title">Bitcoin Price History</h3>
            <p className="text-sm text-muted-foreground">Last {selectedPeriod} days</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedPeriod === "30" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("30")}
              data-testid="button-30d"
            >
              30D
            </Button>
            <Button
              variant={selectedPeriod === "7" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("7")}
              data-testid="button-7d"
            >
              7D
            </Button>
            <Button
              variant={selectedPeriod === "1" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("1")}
              data-testid="button-24h"
            >
              24H
            </Button>
          </div>
        </div>
        <div className="h-80">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Skeleton className="w-full h-full" data-testid="skeleton-chart" />
            </div>
          ) : (
            <canvas ref={chartRef} data-testid="price-chart-canvas"></canvas>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
