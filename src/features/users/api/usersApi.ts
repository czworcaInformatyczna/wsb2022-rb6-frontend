import { type IDataProviderSettings } from 'features/assets';
import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IUsers } from '../types';

export const useGetUsers = (params?: IDataProviderSettings) => {
  const context = useFetch<IUsers>(apiUrl.users, params);
  return context;
};
