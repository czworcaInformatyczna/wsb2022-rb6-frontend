import { type AppProviderProps } from '@/providers/types';
import { CustomThemeProvider } from '@/providers/CustomTheme';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthProvider';
import { QueryClientProvider } from 'react-query';
import { getQueryClient } from '@/lib/react-query';

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={getQueryClient()}>
          <Box>
            <GlobalStyles
              styles={{
                '::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,.1)',
                  outline: '1px solid slategrey',
                },
                h1: {
                  color: 'grey',
                },
              }}
            />
            <CssBaseline />
            <CustomThemeProvider>{children}</CustomThemeProvider>
          </Box>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
