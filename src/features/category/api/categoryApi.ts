import { type IDataProviderSettings } from 'features/assets';
import { useDeleteByUrl, useFetch, usePost } from 'lib/react-query';
import { apiUrl } from 'routes';

export const useAddCategory = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useGetCategories = <T>(params: IDataProviderSettings) => {
  const context = useFetch<T>(apiUrl.allCategories, params);
  return context;
};

export const useDeleteCategories = <Number>() => {
  const context = useDeleteByUrl<Number>(apiUrl.deleteCategory, apiUrl.allCategories);
  return context;
};
