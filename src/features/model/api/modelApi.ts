import { type IDataProviderSettings } from 'features/assets';
import { useDelete, useFetch, usePost } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IManufacturer, type ICategory, type IModelList } from '../types';

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

export const useGetModels = (params: IDataProviderSettings) => {
  const context = useFetch<IModelList>(apiUrl.models, params);
  return context;
};

export const useDeleteModel = <Number>() => {
  const context = useDelete<Number>(apiUrl.assetsById, apiUrl.models);
  return context;
};
