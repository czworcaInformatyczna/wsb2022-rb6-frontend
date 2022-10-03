import { AppProvider } from 'providers/AppProvider';
import { AppRoutes } from 'routes';
import { Box, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import CustomTheme from './Components/Theme/customTheme';
import Drawer from './Components/Drawer/drawer';
import { ThemeMode } from './domain';
import { GetColorModeFromLocalStorage, GetColorMode } from './Components/Theme/colorMode';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const App = (): JSX.Element => {
  return (
    <AppProvider>
      <AppRoutes />;
    </AppProvider>
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <Drawer />
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Box>
  );
};

export default App;
