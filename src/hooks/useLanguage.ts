import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

const fontMap = {
  en: 'Inter, system-ui, sans-serif',
  hi: '"Noto Sans Devanagari", system-ui, sans-serif',
  te: '"Noto Sans Telugu", system-ui, sans-serif',
};

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const { profile, updateProfile } = useAuth();

  const changeLanguage = async (language: 'en' | 'hi' | 'te') => {
    // Change i18n language
    await i18n.changeLanguage(language);
    
    // Update font family
    document.documentElement.style.fontFamily = fontMap[language];
    
    // Update user profile if logged in
    if (profile && profile.locale !== language) {
      await updateProfile({ locale: language });
    }
    
    // Store in localStorage
    localStorage.setItem('language', language);
  };

  useEffect(() => {
    // Set initial font based on current language
    const currentLang = i18n.language as 'en' | 'hi' | 'te';
    if (fontMap[currentLang]) {
      document.documentElement.style.fontFamily = fontMap[currentLang];
    }
  }, [i18n.language]);

  useEffect(() => {
    // Sync with user profile language
    if (profile?.locale && profile.locale !== i18n.language) {
      changeLanguage(profile.locale);
    }
  }, [profile?.locale]);

  return {
    currentLanguage: i18n.language as 'en' | 'hi' | 'te',
    changeLanguage,
    languages: [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    ] as const,
  };
};