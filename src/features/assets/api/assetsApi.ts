import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IStatus } from '../types';

export const useGetStatusOptions = () => {
  const context = useFetch<IStatus[]>(apiUrl.assetsCategory);
  return context;
};
