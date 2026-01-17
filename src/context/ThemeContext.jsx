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
  purple: {
    bg: 'from-[#6B6B85] via-[#5A5A70] to-[#4A4A60]',
    primary: 'from-[#7C6FDB] to-[#6B5FCA]',
    primarySolid: '#7C6FDB',
    primaryDark: '#6B5FCA',
    accent: '#7C6FDB',
    shadow: 'primary/20',
    name: 'Purple'
  },
  red: {
    bg: 'from-[#8B5A5A] via-[#7A4949] to-[#6A3838]',
    primary: 'from-[#E74C3C] to-[#C0392B]',
    primarySolid: '#E74C3C',
    primaryDark: '#C0392B',
    accent: '#E74C3C',
    shadow: 'red-500/20',
    name: 'Red'
  },
  green: {
    bg: 'from-[#2C5F4E] via-[#234D3E] to-[#1A3B2E]',
    primary: 'from-[#27AE60] to-[#229954]',
    primarySolid: '#27AE60',
    primaryDark: '#229954',
    accent: '#27AE60',
    shadow: 'green-500/20',
    name: 'Dark Green'
  },
  orange: {
    bg: 'from-[#8B6F47] via-[#7A5E36] to-[#6A4E26]',
    primary: 'from-[#E67E22] to-[#CA6F1E]',
    primarySolid: '#E67E22',
    primaryDark: '#CA6F1E',
    accent: '#E67E22',
    shadow: 'orange-500/20',
    name: 'Orange'
  },
  dark: {
    bg: 'from-[#1a1a1a] via-[#0f0f0f] to-[#000000]',
    primary: 'from-[#404040] to-[#2a2a2a]',
    primarySolid: '#404040',
    primaryDark: '#2a2a2a',
    accent: '#404040',
    shadow: 'gray-700/20',
    name: 'Dark Mode'
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage or default to purple
    const savedTheme = localStorage.getItem('appTheme');
    return savedTheme || 'purple';
  });

  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, currentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
