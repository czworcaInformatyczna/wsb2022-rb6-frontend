import { type IDataProviderSettings } from 'features/assets';
import { type IRoles } from 'features/roles/types';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IUsers } from '../types';

export const useGetUsers = (params?: IDataProviderSettings) => {
  const context = useFetch<IUsers>(apiUrl.users, params);
  return context;
};

export const useGetProfile = <T>() => {
  const context = useFetch<T>(apiUrl.profile);
  return context;
};

export const useDeleteUser = <Number>() => {
  const context = useDelete<Number>(apiUrl.usersById, apiUrl.users);
  return context;
};

export const useAddUser = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useUpdateUser = <T>() => {
  const context = useUpdate<T>(apiUrl.usersById);
  return context;
};

export const useChangePassword = <T>() => {
  const context = useUpdate<T>(apiUrl.changePassword);
  return context;
};

export const useUploadAvatar = <T>() => {
  const context = usePost<T>(apiUrl.uploadAvatar);
  return context;
};

export const useForgotPassword = <T>() => {
  const context = usePost<T>(apiUrl.forgotPassword);
  return context;
};

export const useGetRoles = () => {
  const context = useFetch<IRoles>(apiUrl.roles, { per_page: 30 });
  return context;
};
