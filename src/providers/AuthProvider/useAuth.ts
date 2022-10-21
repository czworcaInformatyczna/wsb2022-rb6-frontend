import { useContext } from 'react';
import { type IAuthCtx, AuthContext } from 'providers/AuthProvider';

export const useAuth = (): IAuthCtx => {
  return useContext(AuthContext);
};
