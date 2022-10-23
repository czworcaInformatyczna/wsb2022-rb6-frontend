/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type AxiosError, type AxiosResponse } from 'axios';
import { QueryClient, useMutation, useQuery, type QueryFunctionContext } from 'react-query';
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

const useGenericMutation = <T>(
  func: (data: T) => Promise<AxiosResponse<T>>,
  url: string,
  params?: object,
) => {
  return useMutation<AxiosResponse, AxiosError, T>(func, {
    onMutate: async () => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      return previousData;
    },

    onSettled: async () => {
      await queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const usePost = <T>(url: string, params?: object) => {
  return useGenericMutation<T>(async (data) => await apiClient.post(url, data), url, params);
};

export const useDelete = <T>(url: string, params?: object) => {
  return useGenericMutation<T>(async (id) => await apiClient.delete(`${url}/${id}`), url, params);
};

export const useUpdate = <T>(url: string, params?: object) => {
  return useGenericMutation<T>(async (data) => await apiClient.patch<T>(url, data), url, params);
};
