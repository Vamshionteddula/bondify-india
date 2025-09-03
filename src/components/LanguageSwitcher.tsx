import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Globe className="w-4 h-4 mr-2" />
          {languages.find(lang => lang.code === currentLanguage)?.nativeName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={currentLanguage === language.code ? 'bg-accent' : ''}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="ml-2 text-muted-foreground">({language.name})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};