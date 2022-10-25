/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type AxiosError, type AxiosResponse } from 'axios';
import { QueryClient, useMutation, useQuery, type QueryFunctionContext } from 'react-query';
import { convertUrl } from 'utils';
import { apiClient } from './axios';
const queryClient = new QueryClient();
export const getQueryClient = () => queryClient;

type QueryKey = [string, object | undefined];
interface IUpdateMutation {
  body: Object;
  id: string;
}

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
  getUrl: string,
  params?: object,
) => {
  return useMutation<AxiosResponse, AxiosError, T>(func, {
    onMutate: async () => {
      await queryClient.cancelQueries([getUrl!, params]);

      const previousData = queryClient.getQueryData([getUrl!, params]);

      return previousData;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([getUrl!, params]);
    },
  });
};

export const usePost = <T>(url: string, params?: object) => {
  return useGenericMutation<T>(async (data) => await apiClient.post(url, data), url, params);
};

export const useDelete = <String>(url: string, getUrl?: string, params?: object) => {
  return useGenericMutation<String>(
    async (id) => await apiClient.delete(convertUrl(url, { id })),
    getUrl ?? url,
    params,
  );
};

export const useUpdate = (url: string, getUrl?: string, params?: object) => {
  return useGenericMutation<IUpdateMutation>(
    async (data: IUpdateMutation) =>
      await apiClient.patch<IUpdateMutation>(convertUrl(url, { id: data.id }), data.body),
    getUrl ?? url,
    params,
  );
};
