import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type ILicenses } from '../types';

export const useGetLicenses = () => {
  const context = useFetch<ILicenses[]>(apiUrl.licenses);
  return context;
};
