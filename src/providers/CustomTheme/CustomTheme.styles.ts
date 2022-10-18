import { type ICustomTheme } from 'providers/types';

export const lightMode: ICustomTheme = {
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
    dark: '#828282',
  },
  text: {
    primary: '#000000',
  },
};

export const darkMode: ICustomTheme = {
  primary: {
    main: '#3f51b5',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#0A7FB1',
  },
  background: {
    paper: '#121212',
    default: '#2D2D2D',
    dark: '#2C387E',
  },
  text: {
    primary: '#ffffff',
  },
};
