import { createTheme } from '@mui/material';
import { ThemeMode } from '../../domain';

const CustomTheme = (mode: ThemeMode) => {
  const lightMode = {
    primary: {
      main: '#0A7FB1',
      contrastText: 'rgba(0,0,0,0.87)',
    },
    secondary: {
      main: '#67b3e6',
    },
    background: {
      paper: '#f1f1f1',
      default: '#e0e0e0',
    },
  };

  const darkMode = {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#0A7FB1',
    },
    background: {
      paper: '#121212',
      default: '#2D2D2D',
    },
  };

  return createTheme({
    palette: {
      mode,
      ...(mode === ThemeMode.LIGHT ? lightMode : darkMode),
    },
  });
};

export default CustomTheme;
