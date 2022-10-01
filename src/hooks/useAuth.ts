import { useContext } from 'react';
import AuthContext, { type IAuthCtx } from '@/context/AuthProvider';

export const useAuth = (): IAuthCtx => {
  return useContext(AuthContext);
};
