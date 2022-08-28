import * as React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Drawer from './Components/drawer';
import { Box } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
   <Box>
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
