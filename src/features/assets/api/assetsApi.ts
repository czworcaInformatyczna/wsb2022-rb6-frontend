import { useFetch } from 'lib/react-query';
import { routePath } from 'routes';
import { type IStatus } from '../types';

export const useGetStatusOptions = () => {
  const context = useFetch<IStatus[]>(routePath.assetsCategory);
  return context;
};
