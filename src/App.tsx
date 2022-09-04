import * as React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Drawer from './Components/Drawer/drawer';
import { Box, CssBaseline, GlobalStyles } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          let darkMode:'light' | 'dark' = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem("darkMode", darkMode);
          return darkMode;
        })
      }
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
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
      }),
    [mode],
  );
  
    
  React.useEffect(() => {
    const themeMode = localStorage.getItem("darkMode")
    if(themeMode==="light"){
      setMode("light")
    }
    else{
      setMode("dark")
    }
  },[]);

  return (
    
   <Box>
    <GlobalStyles
        styles={{
          h1: { color: 'grey' },
          '::-webkit-scrollbar': {
            width: '0.4em',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey',
          },
        }}
      />
    <CssBaseline/>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Drawer/>
      </BrowserRouter>
      </ThemeProvider>
      </ColorModeContext.Provider>
  </Box>

  )
}
export default App;
