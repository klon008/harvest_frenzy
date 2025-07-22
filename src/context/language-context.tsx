"use client";

import { createContext, useState, ReactNode } from 'react';
import { en } from '@/locales/en';
import { ru } from '@/locales/ru';

export type Language = 'en' | 'ru';

export const translations = { en, ru };

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: typeof en;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    t: en,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');
    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
