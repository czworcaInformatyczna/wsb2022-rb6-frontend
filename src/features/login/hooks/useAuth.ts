import { useContext } from 'react';
import AuthContext, { type IAuthCtx } from '../../../providers/Auth/AuthProvider';

export const useAuth = (): IAuthCtx => {
  return useContext(AuthContext);
};
