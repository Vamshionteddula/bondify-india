import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Bondify India
        </Link>
        <LanguageSwitcher />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
          </div>

          <div className="bg-card rounded-lg border shadow-lg p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};