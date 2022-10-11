import { type ILogin } from 'features/login';
import { type AppProviderProps } from 'providers/types';
import { createContext, type SetStateAction, type Dispatch } from 'react';
import { useAuthContextValue } from 'providers/AuthProvider';

export const tokenCookie = 'inven_app_token';
export const emailCookie = 'inven_app_email';
export interface IAuth {
  email: string | null;
  token: string | null;
}
export interface IAuthCtx {
  auth: IAuth;
  handleLogin: (userData: ILogin, setLoading: Dispatch<SetStateAction<boolean>>) => Promise<void>;
  handleLogout: () => void;
  setAuth: Dispatch<SetStateAction<IAuth>>;
}

export const AuthContext = createContext<IAuthCtx>({} as ReturnType<typeof useAuthContextValue>);

export const AuthProvider = ({ children }: AppProviderProps) => {
  return <AuthContext.Provider value={useAuthContextValue()}>{children}</AuthContext.Provider>;
};
