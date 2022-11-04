import { useFetch, usePost } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IManufacturer, type ICategory } from '../types';

export const useAddModel = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useGetManufacturer = () => {
  const context = useFetch<IManufacturer[]>(apiUrl.manufacturerList);
  return context;
};

export const useGetCategory = () => {
  const context = useFetch<ICategory[]>(apiUrl.categoryList);
  return context;
};
