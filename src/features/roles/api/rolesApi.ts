import { type IDataProviderSettings } from 'features/assets';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type TPermissions, type IRoles } from '../types';

export const useGetRoles = (params?: IDataProviderSettings) => {
  const context = useFetch<IRoles>(apiUrl.roles, params);
  return context;
};

export const useGetPermissions = () => {
  const context = useFetch<TPermissions>(apiUrl.permissions);
  return context;
};

export const useDeleteRole = <Number>() => {
  const context = useDelete<Number>(apiUrl.rolesById, apiUrl.roles);
  return context;
};

export const useAddRole = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useUpdateRole = <T>() => {
  const context = useUpdate<T>(apiUrl.rolesById);
  return context;
};

export const useAddUsersToRole = <T>() => {
  const context = useUpdate<T>(apiUrl.addUsersToRole);
  return context;
};

export const useDeleteUserFromRole = <T>() => {
  const context = useUpdate<T>(apiUrl.removeUserFromRole, apiUrl.roles);
  return context;
};
