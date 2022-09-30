import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import 'App.css';
import CustomTheme from 'Components/Theme/customTheme';
import { ThemeMode } from 'domain';
import { GetColorModeFromLocalStorage, GetColorMode } from 'components/Theme/CustomTheme.utils';
import AppRoutes from 'Components/routes';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = (): JSX.Element => {
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.LIGHT);
  const colorMode = React.useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((previousMode) => {
          return GetColorMode(previousMode);
        });
      },
    };
  }, []);

  const theme = React.useMemo(() => CustomTheme(mode), [mode]);

  React.useEffect(() => {
    setMode(GetColorModeFromLocalStorage());
  }, []);

  return (
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
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default App;
