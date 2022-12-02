import { type IModelList } from 'features/model/types';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { convertUrl } from 'utils';
import { type IDataProviderSettings, type IAssets, type IStatus } from '../types';

export const useGetStatusOptions = () => {
  const context = useFetch<IStatus[]>(apiUrl.assetsCategory);
  return context;
};

export const useGetModelOptions = () => {
  const context = useFetch<IModelList>(apiUrl.assetsModel);
  return context;
};

export const useGetAssets = (params: IDataProviderSettings, enable: boolean = true) => {
  const context = useFetch<IAssets[]>(apiUrl.assets, params, enable);
  return context;
};

export const useGetAssetsDataById = <T>(id: number, url: string, enable: boolean = true) => {
  const context = useFetch<T>(url, { id }, enable);
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

export const useDeleteAssetFile = <Number>() => {
  const context = useDelete<Number>(apiUrl.assetFilesById, apiUrl.assetFiles);
  return context;
};

export const useGetAssetMaintenances = <T>(url: string, params: IDataProviderSettings) => {
  const context = useFetch<T>(url, params);
  return context;
};

export const useAddAssetMaintenances = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useGetImage = <T>(id: number) => {
  const context = useFetch<T>(convertUrl(apiUrl.assetImage, { id }));
  return context;
};
