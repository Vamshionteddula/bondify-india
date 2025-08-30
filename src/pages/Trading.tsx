import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Volume2, Clock, DollarSign } from 'lucide-react';
import { sampleBonds, formatCurrency, formatNumber } from '@/lib/bondData';

const Trading = () => {
  const [selectedBond, setSelectedBond] = useState(sampleBonds[0]);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  // Mock order book data
  const buyOrders = [
    { price: 1018000, quantity: 50, total: 50900000 },
    { price: 1017000, quantity: 75, total: 76275000 },
    { price: 1016000, quantity: 100, total: 101600000 },
    { price: 1015000, quantity: 25, total: 25375000 },
    { price: 1014000, quantity: 150, total: 152100000 },
  ];

  const sellOrders = [
    { price: 1022000, quantity: 30, total: 30660000 },
    { price: 1023000, quantity: 45, total: 46035000 },
    { price: 1024000, quantity: 60, total: 61440000 },
    { price: 1025000, quantity: 85, total: 87125000 },
    { price: 1026000, quantity: 40, total: 41040000 },
  ];

  const recentTrades = [
    { price: 1020000, quantity: 25, time: '14:35:22', type: 'buy' },
    { price: 1019500, quantity: 50, time: '14:34:18', type: 'sell' },
    { price: 1020500, quantity: 30, time: '14:33:45', type: 'buy' },
    { price: 1019000, quantity: 75, time: '14:32:10', type: 'sell' },
    { price: 1021000, quantity: 20, time: '14:31:55', type: 'buy' },
  ];

  const handlePlaceOrder = () => {
    // Mock order placement
    console.log('Placing order:', { orderType, quantity, price, bond: selectedBond.id });
    // In real implementation, this would call an API
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bond Trading</h1>
          <p className="text-muted-foreground">Professional bond trading interface</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Bond Selection */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Select Bond</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleBonds.map((bond) => (
                <div
                  key={bond.id}
                  onClick={() => setSelectedBond(bond)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedBond.id === bond.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{bond.issuer}</span>
                      <Badge variant="outline">{bond.rating}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {bond.couponRate}% • {new Date(bond.maturityDate).getFullYear()}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{formatCurrency(bond.currentPrice)}</span>
                      <span className={`text-xs ${bond.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {bond.changePercent >= 0 ? '+' : ''}{bond.changePercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Area */}
        <div className="lg:col-span-6">
          {/* Bond Details */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedBond.issuer}</CardTitle>
                  <p className="text-muted-foreground">{selectedBond.sector} • {selectedBond.id}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatCurrency(selectedBond.currentPrice)}</div>
                  <div className={`flex items-center gap-1 ${selectedBond.changePercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {selectedBond.changePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {selectedBond.changePercent >= 0 ? '+' : ''}{selectedBond.changePercent.toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Coupon Rate</div>
                  <div className="font-medium">{selectedBond.couponRate}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Yield</div>
                  <div className="font-medium">{selectedBond.yield.toFixed(2)}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Maturity</div>
                  <div className="font-medium">{new Date(selectedBond.maturityDate).getFullYear()}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">24h Volume</div>
                  <div className="font-medium">{formatCurrency(selectedBond.volume24h)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Book */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Order Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Buy Orders */}
                <div>
                  <h4 className="font-medium text-success mb-3">Buy Orders</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                      <div>Price</div>
                      <div>Quantity</div>
                      <div>Total</div>
                    </div>
                    {buyOrders.map((order, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-success font-medium">{formatCurrency(order.price)}</div>
                        <div>{order.quantity}</div>
                        <div>{formatCurrency(order.total)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sell Orders */}
                <div>
                  <h4 className="font-medium text-destructive mb-3">Sell Orders</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                      <div>Price</div>
                      <div>Quantity</div>
                      <div>Total</div>
                    </div>
                    {sellOrders.map((order, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-destructive font-medium">{formatCurrency(order.price)}</div>
                        <div>{order.quantity}</div>
                        <div>{formatCurrency(order.total)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={orderType} onValueChange={(value) => setOrderType(value as 'buy' | 'sell')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="buy" className="text-success">Buy</TabsTrigger>
                  <TabsTrigger value="sell" className="text-destructive">Sell</TabsTrigger>
                </TabsList>

                <TabsContent value="buy" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="buy-quantity">Quantity</Label>
                    <Input
                      id="buy-quantity"
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="buy-price">Price</Label>
                    <Input
                      id="buy-price"
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Order Type</Label>
                    <Select defaultValue="limit">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="market">Market Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {quantity && price && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="font-medium">{formatCurrency(Number(quantity) * Number(price))}</div>
                    </div>
                  )}

                  <Button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-success hover:bg-success/90"
                    disabled={!quantity || !price}
                  >
                    Place Buy Order
                  </Button>
                </TabsContent>

                <TabsContent value="sell" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="sell-quantity">Quantity</Label>
                    <Input
                      id="sell-quantity"
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sell-price">Price</Label>
                    <Input
                      id="sell-price"
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Order Type</Label>
                    <Select defaultValue="limit">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limit">Limit Order</SelectItem>
                        <SelectItem value="market">Market Order</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {quantity && price && (
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="font-medium">{formatCurrency(Number(quantity) * Number(price))}</div>
                    </div>
                  )}

                  <Button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-destructive hover:bg-destructive/90"
                    disabled={!quantity || !price}
                  >
                    Place Sell Order
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Recent Trades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-2">
                  <div>Price</div>
                  <div>Qty</div>
                  <div>Time</div>
                </div>
                {recentTrades.map((trade, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                    <div className={`font-medium ${trade.type === 'buy' ? 'text-success' : 'text-destructive'}`}>
                      {formatCurrency(trade.price)}
                    </div>
                    <div>{trade.quantity}</div>
                    <div className="text-muted-foreground">{trade.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Trading;