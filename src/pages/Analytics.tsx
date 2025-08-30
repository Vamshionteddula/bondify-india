import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target } from 'lucide-react';
import { sampleBonds, formatCurrency } from '@/lib/bondData';

const Analytics = () => {
  const marketAnalytics = {
    totalMarketCap: 125000000000,
    avgYield: 7.85,
    avgLiquidity: 72,
    topSector: 'Banking',
    volatilityIndex: 15.2
  };

  const sectorDistribution = [
    { sector: 'Banking', percentage: 35, color: 'bg-primary' },
    { sector: 'Energy', percentage: 22, color: 'bg-success' },
    { sector: 'Technology', percentage: 18, color: 'bg-info' },
    { sector: 'Steel', percentage: 12, color: 'bg-warning' },
    { sector: 'Automotive', percentage: 8, color: 'bg-destructive' },
    { sector: 'Others', percentage: 5, color: 'bg-muted' }
  ];

  const liquidityTrends = [
    { month: 'Jan', liquidity: 68 },
    { month: 'Feb', liquidity: 72 },
    { month: 'Mar', liquidity: 75 },
    { month: 'Apr', liquidity: 71 },
    { month: 'May', liquidity: 78 },
    { month: 'Jun', liquidity: 82 }
  ];

  const yieldAnalysis = [
    { range: '6-7%', count: 45, percentage: 15 },
    { range: '7-8%', count: 128, percentage: 42 },
    { range: '8-9%', count: 95, percentage: 31 },
    { range: '9-10%', count: 32, percentage: 11 },
    { range: '10%+', count: 5, percentage: 2 }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Market Analytics</h1>
          <p className="text-muted-foreground">Comprehensive bond market insights and trends</p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{formatCurrency(marketAnalytics.totalMarketCap)}</div>
            <div className="text-sm text-muted-foreground">Total Market Cap</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-success/10 w-fit mx-auto mb-4">
              <Target className="w-6 h-6 text-success" />
            </div>
            <div className="text-2xl font-bold">{marketAnalytics.avgYield}%</div>
            <div className="text-sm text-muted-foreground">Average Yield</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-info/10 w-fit mx-auto mb-4">
              <Activity className="w-6 h-6 text-info" />
            </div>
            <div className="text-2xl font-bold">{marketAnalytics.avgLiquidity}%</div>
            <div className="text-sm text-muted-foreground">Avg Liquidity</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-warning/10 w-fit mx-auto mb-4">
              <PieChart className="w-6 h-6 text-warning" />
            </div>
            <div className="text-2xl font-bold">{marketAnalytics.topSector}</div>
            <div className="text-sm text-muted-foreground">Top Sector</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="p-3 rounded-full bg-destructive/10 w-fit mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-destructive" />
            </div>
            <div className="text-2xl font-bold">{marketAnalytics.volatilityIndex}</div>
            <div className="text-sm text-muted-foreground">Volatility Index</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sector Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Sector Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectorDistribution.map((sector, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{sector.sector}</span>
                  <span className="text-sm text-muted-foreground">{sector.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${sector.color}`}
                    style={{ width: `${sector.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Liquidity Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Liquidity Trends (6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liquidityTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{trend.month}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-primary"
                        style={{ width: `${trend.liquidity}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-10 text-right">{trend.liquidity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Yield Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Yield Distribution Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {yieldAnalysis.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{item.range}</Badge>
                    <span className="font-medium">{item.count} bonds</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{item.percentage}%</div>
                    <div className="text-xs text-muted-foreground">of market</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bond Performance Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {sampleBonds.map((bond) => {
                const performanceLevel = bond.changePercent > 1 ? 'high' : bond.changePercent > 0 ? 'medium' : 'low';
                const bgColor = performanceLevel === 'high' ? 'bg-success' : 
                               performanceLevel === 'medium' ? 'bg-warning' : 'bg-destructive';
                
                return (
                  <div 
                    key={bond.id}
                    className={`p-3 rounded-lg ${bgColor} text-white text-center`}
                  >
                    <div className="text-xs font-medium">{bond.issuer.split(' ')[0]}</div>
                    <div className="text-sm font-bold">
                      {bond.changePercent >= 0 ? '+' : ''}{bond.changePercent.toFixed(1)}%
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span>High Performance ({'>'}1%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-warning rounded"></div>
                <span>Moderate (0-1%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded"></div>
                <span>Declining ({'<'}0%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liquidity Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Liquidity Insights</CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time analysis of bond market liquidity across different segments
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-success text-white">
              <div className="text-3xl font-bold mb-2">High</div>
              <div className="text-sm opacity-90">Banking & Financial</div>
              <div className="text-xs opacity-75 mt-1">85% avg liquidity</div>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-primary text-white">
              <div className="text-3xl font-bold mb-2">Medium</div>
              <div className="text-sm opacity-90">Energy & Technology</div>
              <div className="text-xs opacity-75 mt-1">72% avg liquidity</div>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-warning text-white">
              <div className="text-3xl font-bold mb-2">Low</div>
              <div className="text-sm opacity-90">Manufacturing</div>
              <div className="text-xs opacity-75 mt-1">58% avg liquidity</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;