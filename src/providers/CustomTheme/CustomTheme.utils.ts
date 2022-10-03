import { ThemeMode } from './';
import { createContext } from 'react';

export const GetColorMode = (previousMode: ThemeMode) => {
  const mode: ThemeMode = previousMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
  localStorage.setItem('mode', mode);
  return mode;
};

export const GetColorModeFromLocalStorage = () => {
  // TODO create a localStorage service for localstorage calls
  const themeMode = localStorage.getItem('mode');
  return themeMode === 'light' ? ThemeMode.LIGHT : ThemeMode.DARK;
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
