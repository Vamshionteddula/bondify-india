import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Shield, Users, Zap, ArrowRight, BarChart3, DollarSign } from 'lucide-react';
import heroImage from '@/assets/hero-bonds.jpg';

const Landing = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Enhanced Liquidity',
      description: 'Revolutionary matching engine connects buyers and sellers for seamless bond trading'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Advanced price discovery with transparent order books and market insights'
    },
    {
      icon: Users,
      title: 'Fractional Ownership',
      description: 'Tokenization enables smaller investors to participate in high-value corporate bonds'
    },
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Built-in KYC verification and SEBI compliance for secure trading'
    }
  ];

  const stats = [
    { label: 'Bonds Listed', value: '500+', icon: BarChart3 },
    { label: 'Daily Volume', value: '₹250Cr+', icon: DollarSign },
    { label: 'Active Traders', value: '10,000+', icon: Users },
    { label: 'Liquidity Score', value: '92%', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Bondify India
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gradient-primary hover:opacity-90">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-tight">
                  Revolutionizing 
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> Corporate Bond </span>
                  Liquidity in India
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Break down barriers in bond markets with our innovative platform. Experience seamless trading, 
                  fractional ownership, and enhanced liquidity for corporate bonds.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-lg px-8">
                    Start Trading Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroImage} 
                  alt="Bond Trading Platform" 
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl transform scale-105"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Solving India's Bond Market Challenges
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform addresses low liquidity, poor price discovery, and high barriers 
              to entry in corporate bond markets through innovative technology solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg bg-gradient-card hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Transform Your Bond Trading Experience?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of investors already benefiting from enhanced liquidity and 
              transparent price discovery in India's corporate bond market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Bondify India
              </div>
              <p className="text-muted-foreground">
                Revolutionizing corporate bond liquidity through innovative technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Trading</div>
                <div>Analytics</div>
                <div>Portfolio</div>
                <div>Tokenization</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>About Us</div>
                <div>Careers</div>
                <div>Press</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-muted-foreground">
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Compliance</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Bondify India. All rights reserved. | SEBI Registered | ISO 27001 Certified</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;