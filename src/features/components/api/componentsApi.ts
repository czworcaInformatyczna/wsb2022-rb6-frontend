import { type IDataProviderSettings } from 'features/assets';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IComponents, type IAssetList, type ICategoryList } from '../types';

export const useGetComponents = (params?: IDataProviderSettings) => {
  const context = useFetch<IComponents>(apiUrl.components, params);
  return context;
};

export const useDeleteComponent = <Number>() => {
  const context = useDelete<Number>(apiUrl.component, apiUrl.components);
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

export const useGetComponentCategory = () => {
  const context = useFetch<ICategoryList>(apiUrl.componentCategoryList);
  return context;
};

export const useGetAssets = () => {
  const context = useFetch<IAssetList>(apiUrl.assets);
  return context;
};
