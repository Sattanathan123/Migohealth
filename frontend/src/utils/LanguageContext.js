import React, { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('migohealth-language') || 'en';
    } catch (error) {
      console.error('Language storage error:', error);
      return 'en';
    }
  });

  const t = (key) => {
    try {
      const keys = key.split('.');
      let value = translations[language] || translations.en;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    } catch (error) {
      console.error('Translation error:', error, key);
      return key;
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('migohealth-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};