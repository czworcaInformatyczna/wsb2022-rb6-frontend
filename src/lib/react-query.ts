/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QueryClient, useQuery, type QueryFunctionContext } from 'react-query';
import { apiClient } from './axios';
const queryClient = new QueryClient();
export const getQueryClient = () => queryClient;

type QueryKey = [string, object | undefined];

export const handleFetch = async <T>({ queryKey }: QueryFunctionContext<QueryKey>): Promise<T> => {
  const [url, params] = queryKey;
  const response = await apiClient.get(url, params);
  return response.data;
};

export const useFetch = <T>(url: string | null, params?: object) => {
  const queryContext = useQuery<T, Error, T, QueryKey>(
    [url!, params],
    async ({ queryKey, meta }) => await handleFetch({ queryKey, meta }),
  );
  return queryContext;
};
