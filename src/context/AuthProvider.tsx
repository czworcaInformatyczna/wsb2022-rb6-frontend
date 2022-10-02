import { createContext, type SetStateAction, useState, type Dispatch } from 'react';

export interface IAuth {
  email: string | null;
  token: string | null;
}
export interface IAuthCtx {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
}

const useAuthContextValue = () => {
  const [auth, setAuth] = useState<IAuth>({ email: null, token: null });
  return { auth, setAuth };
};

const AuthContext = createContext<IAuthCtx>({} as ReturnType<typeof useAuthContextValue>);

export const AuthProvider = ({ children }: any) => {
  return <AuthContext.Provider value={useAuthContextValue()}>{children}</AuthContext.Provider>;
};

export default AuthContext;