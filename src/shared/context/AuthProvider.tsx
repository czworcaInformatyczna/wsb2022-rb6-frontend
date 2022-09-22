import { createContext, type SetStateAction, useState, type Dispatch } from 'react';

export interface IAuth {
  email: string | null;
  token: string | null;
}
export interface IAuthCtx {
  auth: IAuth;
  setAuth: Dispatch<SetStateAction<IAuth>>;
}

const useValue = () => {
  const [auth, setAuth] = useState<IAuth>({ email: null, token: null });
  return { auth, setAuth };
};

const AuthContext = createContext<IAuthCtx>({} as ReturnType<typeof useValue>);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  return <AuthContext.Provider value={useValue()}>{children}</AuthContext.Provider>;
};

export default AuthContext;

// ----------------------------------
// import { createContext, type SetStateAction, useState, type Dispatch, useMemo } from 'react';

// export interface IAuth {
//   email: string;
//   token: string;
// }
// export interface IAuthCtx {
//   auth: IAuth | null;
//   setAuth: Dispatch<SetStateAction<IAuth>> | null;
// }

// const AuthContext = createContext<IAuthCtx>({ auth: null, setAuth: null });
// // const AuthContext = createContext<IAuthCtx | undefined>(undefined);

// // const useValue = () => {
// //   const [auth, setAuth] = useState<IAuth>();
// // };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const AuthProvider = ({ children }: any) => {
//   const [auth, setAuth] = useState<IAuth>({ email: '', token: '' });
//   const authState: IAuthCtx = useMemo(() => ({ auth, setAuth }), [auth]);
//   return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;
