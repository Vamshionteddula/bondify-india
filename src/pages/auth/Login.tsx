import React, { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { AuthLayout } from './AuthLayout';

export default function Login() {
  const { t } = useTranslation();
  const { signIn, user } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (!error) {
      // Navigation will be handled by auth state change
    }
    
    setLoading(false);
  };

  return (
    <AuthLayout 
      title={t('auth.signIn')}
      subtitle={t('common.welcome')}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder={t('auth.email')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={t('auth.password')}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('common.loading') : t('auth.signIn')}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t('auth.dontHaveAccount')}{' '}
            <Link to="/auth/register" className="text-primary hover:underline">
              {t('auth.signUpHere')}
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}