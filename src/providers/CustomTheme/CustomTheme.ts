import { createTheme } from '@mui/material';
import { lightMode, darkMode } from 'providers/CustomTheme';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export const CustomTheme = (mode: ThemeMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === ThemeMode.LIGHT ? lightMode : darkMode),
    },
  });
};
