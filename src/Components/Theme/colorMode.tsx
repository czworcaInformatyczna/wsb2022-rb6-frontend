import { ThemeMode } from '../../domain';

export const GetColorMode = (previousMode: ThemeMode) => {
  const mode: ThemeMode = previousMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
  localStorage.setItem('mode', mode);
  return mode;
};

export const GetColorModeFromLocalStorage = () => {
  const themeMode = localStorage.getItem('mode');
  return themeMode === 'light' ? ThemeMode.LIGHT : ThemeMode.DARK;
};
