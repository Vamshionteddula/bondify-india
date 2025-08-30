import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Coins, Layers, Users, DollarSign, ArrowRight, Shield, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/bondData';

const Tokenization = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedBond, setSelectedBond] = useState(null);

  // Sample bond for tokenization demo
  const demoIssuer = 'HDFC Bank Ltd';
  const demoBond = {
    id: 'HDFC-2027-TOKEN',
    issuer: demoIssuer,
    faceValue: 1000000,
    couponRate: 8.25,
    maturityDate: '2027-12-15',
    rating: 'AAA',
    minInvestment: 10000,
    currentPrice: 1020000,
    totalTokens: 1000,
    availableTokens: 750,
    tokenValue: 1020,
    investors: 245
  };

  const calculatedTokens = investmentAmount ? Math.floor(Number(investmentAmount) / demoBond.tokenValue) : 0;
  const calculatedValue = calculatedTokens * demoBond.tokenValue;

  const benefits = [
    {
      icon: DollarSign,
      title: 'Lower Entry Barrier',
      description: 'Start investing with just ₹10,000 instead of ₹10 lakh minimum'
    },
    {
      icon: Layers,
      title: 'Fractional Ownership',
      description: 'Own a percentage of high-value bonds through blockchain tokens'
    },
    {
      icon: Users,
      title: 'Enhanced Liquidity',
      description: 'Trade tokens 24/7 with a larger pool of investors'
    },
    {
      icon: Shield,
      title: 'Transparent Settlement',
      description: 'Blockchain-based ownership with instant settlement'
    }
  ];

  const investmentSteps = [
    {
      step: 1,
      title: 'Choose Investment Amount',
      description: 'Select how much you want to invest in the tokenized bond'
    },
    {
      step: 2,
      title: 'Token Calculation',
      description: 'System calculates number of tokens based on current price'
    },
    {
      step: 3,
      title: 'KYC Verification',
      description: 'Complete identity verification for regulatory compliance'
    },
    {
      step: 4,
      title: 'Token Issuance',
      description: 'Receive digital tokens representing your bond ownership'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Bond Tokenization</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Break down barriers to bond investing through blockchain-powered fractional ownership. 
          Own a piece of high-value corporate bonds with minimal investment.
        </p>
      </div>

      {/* Demo Section */}
      <Card className="bg-gradient-hero text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Coins className="w-6 h-6" />
            Live Tokenization Demo
          </CardTitle>
          <p className="text-white/90">
            See how ₹10 lakh {demoIssuer} bond can be divided into 1,000 tradeable tokens
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-3xl font-bold">{formatCurrency(demoBond.faceValue)}</div>
              <div className="text-sm opacity-90">Original Bond Value</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-3xl font-bold">{demoBond.totalTokens}</div>
              <div className="text-sm opacity-90">Total Tokens</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <div className="text-3xl font-bold">{formatCurrency(demoBond.tokenValue)}</div>
              <div className="text-sm opacity-90">Price per Token</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Tokens Sold</span>
              <span>{demoBond.totalTokens - demoBond.availableTokens} / {demoBond.totalTokens}</span>
            </div>
            <Progress 
              value={((demoBond.totalTokens - demoBond.availableTokens) / demoBond.totalTokens) * 100} 
              className="h-3"
            />
            <div className="flex justify-between text-sm">
              <span>{demoBond.investors} Active Investors</span>
              <span>{demoBond.availableTokens} Tokens Available</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Investment Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Tokenization Calculator
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Calculate how many tokens you can purchase with your investment
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="investment">Investment Amount (₹)</Label>
                <Input
                  id="investment"
                  type="number"
                  placeholder="Enter amount (min ₹10,000)"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  min="10000"
                />
              </div>

              {investmentAmount && Number(investmentAmount) >= 10000 && (
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium">Investment Summary</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">{calculatedTokens}</div>
                      <div className="text-sm text-muted-foreground">Tokens</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-success">{formatCurrency(calculatedValue)}</div>
                      <div className="text-sm text-muted-foreground">Total Value</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ownership Percentage:</span>
                      <span className="font-medium">{((calculatedTokens / demoBond.totalTokens) * 100).toFixed(3)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Coupon Income:</span>
                      <span className="font-medium text-success">
                        {formatCurrency((calculatedValue * demoBond.couponRate) / 100)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining Amount:</span>
                      <span className="text-muted-foreground">
                        {formatCurrency(Number(investmentAmount) - calculatedValue)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary" size="lg">
                    Proceed to KYC Verification
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}

              {investmentAmount && Number(investmentAmount) < 10000 && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">
                    Minimum investment amount is ₹10,000 for tokenized bonds.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Investment Process */}
        <Card>
          <CardHeader>
            <CardTitle>How Tokenization Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {investmentSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {step.step}
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Benefits of Bond Tokenization</h2>
          <p className="text-muted-foreground">
            Democratizing access to corporate bond investments through innovative technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Regulatory Compliance */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Regulatory Compliance & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Badge className="mb-2 bg-success text-success-foreground">SEBI Approved</Badge>
              <div className="text-sm text-muted-foreground">
                Compliant with Indian securities regulations
              </div>
            </div>
            <div className="text-center">
              <Badge className="mb-2 bg-info text-info-foreground">KYC Verified</Badge>
              <div className="text-sm text-muted-foreground">
                Mandatory identity verification for all investors
              </div>
            </div>
            <div className="text-center">
              <Badge className="mb-2 bg-primary text-primary-foreground">Blockchain Secured</Badge>
              <div className="text-sm text-muted-foreground">
                Transparent ownership records on distributed ledger
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tokenization;