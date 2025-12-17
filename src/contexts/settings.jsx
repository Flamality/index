import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const changeLanguage = useCallback((newLang) => {
    setLanguage(newLang);
  }, []);

  const settings = useMemo(() => ({
    theme,
    language,
    toggleTheme,
    changeLanguage,
  }), [theme, language, toggleTheme, changeLanguage]);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
