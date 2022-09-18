import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Drawer from './Components/Drawer/drawer';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeMode } from './domain';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = (): JSX.Element => {
  const [mode, setMode] = React.useState<ThemeMode>(ThemeMode.LIGHT);
  const colorMode = React.useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((previousMode) => {
          const darkMode: ThemeMode =
            previousMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
          localStorage.setItem('darkMode', darkMode);
          return darkMode;
        });
      },
    };
  }, []);

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === ThemeMode.LIGHT
          ? {
              // palette values for light mode
              primary: {
                main: '#00a2f5',
              },
              secondary: {
                main: '#f50057',
              },
            }
          : {
              // palette values for dark mode
              primary: {
                main: '#3f51b5',
              },
              secondary: {
                main: '#f50057',
              },
            }),
      },
    });
  }, [mode]);

  React.useEffect(() => {
    const themeMode = localStorage.getItem('darkMode');
    if (themeMode === 'light') {
      setMode(ThemeMode.LIGHT);
    } else {
      setMode(ThemeMode.DARK);
    }
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
          <BrowserRouter>
            <Drawer />
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default App;
