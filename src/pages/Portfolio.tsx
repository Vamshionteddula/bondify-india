import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Wallet, PieChart, Coins, Share2, Download } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/bondData';

const Portfolio = () => {
  const [selectedView, setSelectedView] = useState('overview');

  // Mock portfolio data
  const portfolioSummary = {
    totalValue: 2850000,
    totalInvested: 2750000,
    totalGains: 100000,
    gainsPercent: 3.64,
    bondCount: 5,
    tokenizedValue: 450000,
    liquidityScore: 78
  };

  const holdings = [
    {
      id: 'HDFC-2027',
      issuer: 'HDFC Bank Ltd',
      quantity: 2,
      avgPrice: 1015000,
      currentPrice: 1020000,
      totalValue: 2040000,
      gains: 10000,
      gainsPercent: 0.49,
      couponRate: 8.25,
      nextCoupon: '2024-06-15',
      tokenized: true,
      tokenUnits: 204
    },
    {
      id: 'ICIC-2025',
      issuer: 'ICICI Bank Ltd',
      quantity: 1,
      avgPrice: 1005000,
      currentPrice: 1008000,
      totalValue: 1008000,
      gains: 3000,
      gainsPercent: 0.30,
      couponRate: 7.65,
      nextCoupon: '2024-05-30',
      tokenized: true,
      tokenUnits: 100.8
    },
    {
      id: 'RELI-2026',
      issuer: 'Reliance Industries',
      quantity: 1,
      avgPrice: 1000000,
      currentPrice: 998000,
      totalValue: 998000,
      gains: -2000,
      gainsPercent: -0.20,
      couponRate: 7.80,
      nextCoupon: '2024-09-20',
      tokenized: false,
      tokenUnits: 0
    }
  ];

  const tokenizedAssets = [
    {
      bondId: 'HDFC-2027',
      issuer: 'HDFC Bank Ltd',
      totalTokens: 1000,
      ownedTokens: 204,
      tokenValue: 1020,
      totalValue: 208080,
      tradeable: true
    },
    {
      bondId: 'ICIC-2025',
      issuer: 'ICICI Bank Ltd',
      totalTokens: 1000,
      ownedTokens: 100.8,
      tokenValue: 1008,
      totalValue: 101606,
      tradeable: true
    },
    {
      bondId: 'TATA-2028',
      issuer: 'Tata Steel Ltd',
      totalTokens: 1000,
      ownedTokens: 50.5,
      tokenValue: 1035,
      totalValue: 52267,
      tradeable: false
    }
  ];

  const recentTransactions = [
    {
      id: '1',
      type: 'buy',
      bond: 'HDFC-2027',
      quantity: 1,
      price: 1018000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'sell',
      bond: 'RELI-2026',
      quantity: 0.5,
      price: 999000,
      date: '2024-01-12',
      status: 'completed'
    },
    {
      id: '3',
      type: 'token_buy',
      bond: 'ICIC-2025',
      quantity: 25.8,
      price: 26006,
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Manage your bond investments and tokenized assets</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-primary">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioSummary.totalValue)}</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">
                    +{portfolioSummary.gainsPercent.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Gains</p>
                <p className="text-2xl font-bold text-success">{formatCurrency(portfolioSummary.totalGains)}</p>
                <p className="text-sm text-muted-foreground">
                  Invested: {formatCurrency(portfolioSummary.totalInvested)}
                </p>
              </div>
              <div className="p-3 rounded-full bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Tokenized Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioSummary.tokenizedValue)}</p>
                <p className="text-sm text-muted-foreground">
                  {((portfolioSummary.tokenizedValue / portfolioSummary.totalValue) * 100).toFixed(1)}% of portfolio
                </p>
              </div>
              <div className="p-3 rounded-full bg-info/10">
                <Coins className="w-6 h-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Liquidity Score</p>
                <p className="text-2xl font-bold">{portfolioSummary.liquidityScore}/100</p>
                <Progress value={portfolioSummary.liquidityScore} className="w-full h-2" />
              </div>
              <div className="p-3 rounded-full bg-accent/10">
                <PieChart className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList>
          <TabsTrigger value="overview">Holdings Overview</TabsTrigger>
          <TabsTrigger value="tokenized">Tokenized Assets</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bond Holdings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your current bond portfolio with real-time valuations
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2">Bond</th>
                      <th className="text-left py-3 px-2">Quantity</th>
                      <th className="text-left py-3 px-2">Avg Price</th>
                      <th className="text-left py-3 px-2">Current Price</th>
                      <th className="text-left py-3 px-2">Total Value</th>
                      <th className="text-left py-3 px-2">Gains/Loss</th>
                      <th className="text-left py-3 px-2">Next Coupon</th>
                      <th className="text-left py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((holding) => (
                      <tr key={holding.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-4 px-2">
                          <div>
                            <div className="font-medium">{holding.issuer}</div>
                            <div className="text-sm text-muted-foreground">{holding.couponRate}% Coupon</div>
                          </div>
                        </td>
                        <td className="py-4 px-2 font-medium">{holding.quantity}</td>
                        <td className="py-4 px-2">{formatCurrency(holding.avgPrice)}</td>
                        <td className="py-4 px-2 font-medium">{formatCurrency(holding.currentPrice)}</td>
                        <td className="py-4 px-2 font-medium">{formatCurrency(holding.totalValue)}</td>
                        <td className="py-4 px-2">
                          <div className={`${holding.gains >= 0 ? 'text-success' : 'text-destructive'}`}>
                            {formatCurrency(holding.gains)}
                            <br />
                            <span className="text-sm">
                              ({holding.gains >= 0 ? '+' : ''}{holding.gainsPercent.toFixed(2)}%)
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-sm">{holding.nextCoupon}</td>
                        <td className="py-4 px-2">
                          {holding.tokenized ? (
                            <Badge className="bg-info text-info-foreground">Tokenized</Badge>
                          ) : (
                            <Badge variant="outline">Traditional</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokenized" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5" />
                Tokenized Bond Assets
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your fractional bond ownership through tokenization
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {tokenizedAssets.map((asset) => (
                <div key={asset.bondId} className="p-6 rounded-lg border border-border bg-gradient-card">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{asset.issuer}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Bond ID: {asset.bondId}</span>
                        <span>Token Value: {formatCurrency(asset.tokenValue)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{asset.ownedTokens}</div>
                        <div className="text-sm text-muted-foreground">Tokens Owned</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{formatCurrency(asset.totalValue)}</div>
                        <div className="text-sm text-muted-foreground">Total Value</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Ownership Percentage</span>
                      <span className="text-sm font-medium">
                        {((asset.ownedTokens / asset.totalTokens) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={(asset.ownedTokens / asset.totalTokens) * 100} className="h-2" />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button size="sm" variant="outline" disabled={!asset.tradeable}>
                      Trade Tokens
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your trading history and transaction details
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'buy' ? 'bg-success/10' : 
                        transaction.type === 'sell' ? 'bg-destructive/10' : 'bg-info/10'
                      }`}>
                        {transaction.type === 'buy' ? (
                          <TrendingUp className="w-4 h-4 text-success" />
                        ) : transaction.type === 'sell' ? (
                          <TrendingDown className="w-4 h-4 text-destructive" />
                        ) : (
                          <Coins className="w-4 h-4 text-info" />
                        )}
                      </div>
                      
                      <div>
                        <div className="font-medium">
                          {transaction.type === 'buy' ? 'Bought' : 
                           transaction.type === 'sell' ? 'Sold' : 'Token Purchase'} {transaction.bond}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Quantity: {transaction.quantity} • {transaction.date}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(transaction.price)}</div>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Portfolio;