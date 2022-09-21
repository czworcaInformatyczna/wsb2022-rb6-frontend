import { createContext, type SetStateAction, useState, type Dispatch, useMemo } from 'react';

interface IAuth {
  email: string;
  token: string;
}
interface IAuthCtx {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
}

const AuthContext = createContext<IAuthCtx | undefined>(undefined);
// const AuthContext = createContext<{
//   auth: IAuth | undefined;
//   setAuth: Dispatch<SetStateAction<IAuth | undefined>> | Dispatch<SetStateAction<IAuth>>;
// }>({
// auth: {
//   token: '',
//   email: '',
// },
//   setAuth: () => undefined,
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState({
    token: '',
    email: '',
  });
  const authState = useMemo(() => ({ auth, setAuth }), [auth]);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export default AuthContext;
