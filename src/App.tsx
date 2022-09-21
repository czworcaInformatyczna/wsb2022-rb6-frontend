import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import { Login } from './Components/Login/Login';
// import AppRoutes from './Components/routes';
import { ThemeMode } from './domain';
import Drawer from './Components/Drawer/drawer';

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
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* <AppRoutes /> */}
              <Route path="login" element={<Login />} />
              <Route path="main" element={<Drawer />} />
              {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default App;
