import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Users, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { sampleBonds, formatCurrency, formatNumber } from '@/lib/bondData';

const Dashboard = () => {
  const marketStats = [
    {
      title: 'Total Market Value',
      value: '₹1,250 Cr',
      change: '+5.2%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Active Bonds',
      value: '547',
      change: '+12',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Daily Volume',
      value: '₹85 Cr',
      change: '+8.7%',
      trend: 'up',
      icon: Activity
    },
    {
      title: 'Active Traders',
      value: '12,456',
      change: '+156',
      trend: 'up',
      icon: Users
    }
  ];

  const topPerformers = sampleBonds.slice(0, 3);
  const recentActivity = sampleBonds.slice(3);

  const getLiquidityColor = (liquidity: string) => {
    switch (liquidity) {
      case 'High': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Low': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRatingColor = (rating: string) => {
    if (rating.startsWith('AAA')) return 'bg-success text-success-foreground';
    if (rating.startsWith('AA')) return 'bg-info text-info-foreground';
    if (rating.startsWith('A')) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Market Dashboard</h1>
          <p className="text-muted-foreground">Real-time corporate bond market overview</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Export Data</Button>
          <Button className="bg-gradient-primary">Add to Watchlist</Button>
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      {isPositive ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-destructive" />
                      )}
                      <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performing Bonds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Top Performing Bonds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((bond) => (
              <div key={bond.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bond.issuer}</span>
                    <Badge className={getRatingColor(bond.rating)}>{bond.rating}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {bond.couponRate}% • {new Date(bond.maturityDate).getFullYear()}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">{formatCurrency(bond.currentPrice)}</div>
                  <div className={`text-sm flex items-center gap-1 ${bond.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {bond.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {bond.changePercent.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-info" />
              Recent Market Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((bond) => (
              <div key={bond.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{bond.issuer}</span>
                    <Badge className={getLiquidityColor(bond.liquidity)}>{bond.liquidity}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Volume: {formatCurrency(bond.volume24h)}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-medium">{bond.yield.toFixed(2)}% Yield</div>
                  {bond.tokenized && (
                    <Badge variant="outline" className="text-xs">Tokenized</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* All Bonds Table */}
      <Card>
        <CardHeader>
          <CardTitle>Available Bonds</CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete list of tradeable corporate bonds
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2">Issuer</th>
                  <th className="text-left py-3 px-2">Coupon</th>
                  <th className="text-left py-3 px-2">Current Price</th>
                  <th className="text-left py-3 px-2">Yield</th>
                  <th className="text-left py-3 px-2">Rating</th>
                  <th className="text-left py-3 px-2">Liquidity</th>
                  <th className="text-left py-3 px-2">Change</th>
                  <th className="text-left py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleBonds.map((bond) => (
                  <tr key={bond.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-2">
                      <div>
                        <div className="font-medium">{bond.issuer}</div>
                        <div className="text-sm text-muted-foreground">{bond.sector}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-medium">{bond.couponRate}%</td>
                    <td className="py-4 px-2 font-medium">{formatCurrency(bond.currentPrice)}</td>
                    <td className="py-4 px-2">{bond.yield.toFixed(2)}%</td>
                    <td className="py-4 px-2">
                      <Badge className={getRatingColor(bond.rating)}>{bond.rating}</Badge>
                    </td>
                    <td className="py-4 px-2">
                      <Badge className={getLiquidityColor(bond.liquidity)}>{bond.liquidity}</Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className={`flex items-center gap-1 ${bond.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {bond.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {bond.changePercent.toFixed(1)}%
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <Button size="sm" variant="outline">Trade</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;