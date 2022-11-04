import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IStatistics } from 'features/dashboard';

export const useGetStatistics = () => {
  const context = useFetch<IStatistics>(apiUrl.statistics);
  return context;
};
