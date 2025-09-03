import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { AuthLayout } from './AuthLayout';

export default function Register() {
  const { t } = useTranslation();
  const { signUp, user } = useAuth();
  const { languages } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    locale: 'en'
  });
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }

    setLoading(true);

    const { error } = await signUp(
      formData.email, 
      formData.password, 
      formData.fullName,
      formData.locale
    );
    
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AuthLayout 
      title={t('auth.signUp')}
      subtitle="Join Bondify India today"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t('auth.fullName')}</Label>
          <Input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            required
            placeholder={t('auth.fullName')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            placeholder={t('auth.email')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="locale">{t('common.language')}</Label>
          <Select value={formData.locale} onValueChange={(value) => handleInputChange('locale', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('common.language')} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            placeholder={t('auth.password')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            required
            placeholder={t('auth.confirmPassword')}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('common.loading') : t('auth.signUp')}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/auth/login" className="text-primary hover:underline">
              {t('auth.signInHere')}
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}