import { useContext } from 'react';
import AuthContext, { type IAuthCtx } from './../../context/AuthProvider';

const useAuth = (): IAuthCtx => {
  return useContext(AuthContext);
};

export default useAuth;
