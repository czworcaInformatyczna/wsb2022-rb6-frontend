import {
  GetColorMode,
  CustomTheme,
  GetColorModeFromLocalStorage,
  ThemeMode,
  ColorModeContext,
} from '@/providers/CustomTheme';
import { type AppProviderProps } from '@/providers/types';
import { ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

export const CustomThemeProvider = ({ children }: AppProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.LIGHT);
  const colorMode = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((previousMode) => {
          return GetColorMode(previousMode);
        });
      },
    };
  }, []);

  const theme = useMemo(() => CustomTheme(mode), [mode]);

  useEffect(() => {
    setMode(GetColorModeFromLocalStorage());
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
