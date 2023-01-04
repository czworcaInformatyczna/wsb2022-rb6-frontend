import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type Statistics } from 'features/dashboard';

export const useGetStatistics = () => {
  const context = useFetch<Statistics>(apiUrl.statistics);
  return context;
};
