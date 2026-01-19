import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    bg: 'from-gray-100 via-gray-50 to-white',
    primary: 'from-[#7C6FDB] to-[#6B5FCA]',
    primarySolid: '#7C6FDB',
    primaryDark: '#6B5FCA',
    accent: '#7C6FDB',
    shadow: 'primary/20',
    name: 'Light',
    isDark: false
  },
  dark: {
    bg: 'from-[#6B6B85] via-[#5A5A70] to-[#4A4A60]',
    primary: 'from-[#7C6FDB] to-[#6B5FCA]',
    primarySolid: '#7C6FDB',
    primaryDark: '#6B5FCA',
    accent: '#7C6FDB',
    shadow: 'primary/20',
    name: 'Dark',
    isDark: true
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
