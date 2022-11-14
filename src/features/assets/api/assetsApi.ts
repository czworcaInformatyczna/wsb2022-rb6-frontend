import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IDataProviderSettings, type IAssets, type IModel, type IStatus } from '../types';

export const useGetStatusOptions = () => {
  const context = useFetch<IStatus[]>(apiUrl.assetsCategory);
  return context;
};

export const useGetModelOptions = () => {
  const context = useFetch<IModel[]>(apiUrl.assetsModel);
  return context;
};

export const useGetAssets = (params: IDataProviderSettings) => {
  const context = useFetch<IAssets[]>(apiUrl.assets, params);
  return context;
};

export const useGetAssetsDataById = <T>(id: number, url: string) => {
  const context = useFetch<T>(url, { id });
  return context;
};

export const useGetAssetFile = <T>(url: string, params: IDataProviderSettings) => {
  const context = useFetch<T>(url, params);
  return context;
};

export const useAddAsset = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useUpdateAsset = <T>() => {
  const context = useUpdate<T>(apiUrl.assetsById);
  return context;
};

export const useDeleteAsset = <Number>() => {
  const context = useDelete<Number>(apiUrl.assetsById, apiUrl.assets);
  return context;
};
