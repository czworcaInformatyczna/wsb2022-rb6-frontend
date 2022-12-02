/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type AxiosError, type AxiosResponse } from 'axios';
import { QueryClient, useMutation, useQuery, type QueryFunctionContext } from 'react-query';
import { convertUrl } from 'utils';
import { apiClient } from './axios';
const queryClient = new QueryClient();
export const getQueryClient = () => queryClient;

type QueryKey = [string, object | undefined];
interface IUpdateMutation<T> {
  body: T;
  id: string;
}

interface IFetchMutation<T> {
  body: T;
}

export const handleFetch = async <T>({ queryKey }: QueryFunctionContext<QueryKey>): Promise<T> => {
  const [url, params] = queryKey;
  const response = await apiClient.get(url, { params });
  return response.data;
};

export const useFetch = <T>(url: string | null, params?: object, enable?: boolean) => {
  const queryContext = useQuery<T, Error, T, QueryKey>(
    [url!, params],
    async ({ queryKey, meta }) => await handleFetch({ queryKey, meta }),
    { enabled: enable },
  );
  return queryContext;
};

const useGenericMutation = <T>(func: (data: T) => Promise<AxiosResponse<T>>, getUrl: string) => {
  return useMutation<AxiosResponse, AxiosError, T>(func, {
    onMutate: async () => {
      await queryClient.cancelQueries([getUrl!]);

      const previousData = queryClient.getQueryData([getUrl!]);

      return previousData;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([getUrl!]);
    },
  });
};

export const usePost = <T>(url: string) => {
  return useGenericMutation<T>(async (data) => await apiClient.post(url, data), url);
};

export const useDelete = <T>(url: string, getUrl?: string) => {
  return useGenericMutation<T>(
    async (id: T) => await apiClient.delete(convertUrl(url, { id })),
    getUrl ?? url,
  );
};

export const useFetchMutation = <T>(url: string) => {
  return useGenericMutation<IFetchMutation<T>>(
    async (data: IFetchMutation<T>) => await apiClient.get<IFetchMutation<T>>(url, data.body),
    url,
  );
};

export const useUpdate = <T>(url: string, getUrl?: string) => {
  return useGenericMutation<IUpdateMutation<T>>(
    async (data: IUpdateMutation<T>) =>
      await apiClient.patch<IUpdateMutation<T>>(convertUrl(url, { id: data.id }), data.body),
    getUrl ?? url,
  );
};
