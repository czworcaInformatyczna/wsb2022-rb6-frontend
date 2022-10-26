import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';

export const useGetComponents = <T>() => {
  const context = useFetch<T>(apiUrl.components);
  return context;
};

export const useDeleteComponent = <String>() => {
  const context = useDelete<String>(apiUrl.component, apiUrl.components);
  return context;
};

export const useUpdateComponent = <T>() => {
  const context = useUpdate<T>(apiUrl.component, apiUrl.components);
  return context;
};

export const useAddComponent = <T>() => {
  const context = usePost<T>(apiUrl.components);
  return context;
};
