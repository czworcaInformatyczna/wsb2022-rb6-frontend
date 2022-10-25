import { useDelete, useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';

export const useGetComponents = <T>() => {
  const context = useFetch<T>(apiUrl.getAllComponents);
  return context;
};

export const useDeleteComponents = <T>() => {
  const context = useDelete<T>(apiUrl.component, apiUrl.getAllComponents);

  return context;
};
