import { type IDataProviderSettings } from 'features/assets';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IManufacturer, type IAssetCategory, type IModelList } from '../types';

export const useAddModel = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useGetManufacturer = () => {
  const context = useFetch<IManufacturer>(apiUrl.manufacturerList, { per_page: 30 });
  return context;
};

export const useGetCategory = () => {
  const context = useFetch<IAssetCategory>(apiUrl.categoryList, { per_page: 30 });
  return context;
};

export const useGetModels = (params: IDataProviderSettings) => {
  const context = useFetch<IModelList>(apiUrl.models, params);
  return context;
};

export const useDeleteModel = <Number>() => {
  const context = useDelete<Number>(apiUrl.modelsById, apiUrl.models);
  return context;
};

export const useUpdateModel = <T>() => {
  const context = useUpdate<T>(apiUrl.modelsById);
  return context;
};
