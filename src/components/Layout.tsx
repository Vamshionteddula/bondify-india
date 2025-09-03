import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TrendingUp, BarChart3, Wallet, PieChart, User, Bell, Search, Coins, FileText, MessageSquare, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const Layout = () => {
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: t('common.dashboard'), href: '/dashboard', icon: BarChart3 },
    { name: t('common.trading'), href: '/trading', icon: TrendingUp },
    { name: t('common.portfolio'), href: '/portfolio', icon: Wallet },
    { name: t('common.tokenization'), href: '/tokenization', icon: Coins },
    { name: t('common.analytics'), href: '/analytics', icon: PieChart },
    { name: t('common.grievances'), href: '/grievances', icon: FileText },
    { name: t('common.assistant'), href: '/assistant', icon: MessageSquare },
    { name: t('common.documents'), href: '/documents', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bondify India
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            
            <LanguageSwitcher />
            
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {profile?.full_name || user?.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    {t('common.settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('auth.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;