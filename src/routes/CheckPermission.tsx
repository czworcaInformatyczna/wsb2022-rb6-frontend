import { Navigate, Outlet } from 'react-router-dom';

import { useContext } from 'react';
import { PermissionContext } from 'providers/Permissions/Permission.provider';
import Cookies from 'js-cookie';
import { permissionCookie } from 'providers/AuthProvider';
interface IProps {
  required: string;
}
export const CheckPermission = (props: IProps) => {
  const permissions = useContext(PermissionContext);
  const savedPermissions = Cookies.get(permissionCookie);

  return permissions?.includes(props.required) || savedPermissions?.includes(props.required) ? (
    <Outlet />
  ) : (
    <Navigate to="/PermissionDenied" replace />
  );
};
