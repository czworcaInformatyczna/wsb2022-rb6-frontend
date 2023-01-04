import Cookies from 'js-cookie';
import { permissionCookie, useAuth } from 'providers/AuthProvider';
import { type AppProviderProps } from 'providers/types';
import { createContext, useEffect } from 'react';
import { useGetSelfPermissions } from './permissionApi';

export const PermissionContext = createContext<string[] | undefined>([]);

export const PermissionProvider = ({ children }: AppProviderProps) => {
  const { auth } = useAuth();

  const { data: permissions } = useGetSelfPermissions(auth.email ? true : false);
  useEffect(() => {
    if (permissions) Cookies.set(permissionCookie, permissions.toString());
  });
  return <PermissionContext.Provider value={permissions}>{children}</PermissionContext.Provider>;
};
