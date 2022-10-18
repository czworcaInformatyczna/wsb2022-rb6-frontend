import { type ReactNode } from 'react';

export type AppProviderProps = {
  children: ReactNode;
};

export interface ICustomTheme {
  primary: Primary;
  secondary: Secondary;
  background: Background;
  text: Text;
}

type Text = {
  primary: string;
};

type Background = {
  paper: string;
  default: string;
  dark: string;
};

type Secondary = {
  main: string;
};

type Primary = {
  main: string;
  contrastText: string;
};
