import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IAssets, type IAsset, type IModel, type IStatus } from '../types';

export const useGetStatusOptions = () => {
  const context = useFetch<IStatus[]>(apiUrl.assetsCategory);
  return context;
};

export const useGetModelOptions = () => {
  const context = useFetch<IModel[]>(apiUrl.assetsModel);
  return context;
};

export const useGetAssets = () => {
  const context = useFetch<IAssets[]>(apiUrl.assets);
  return context;
};

export const useGetAssetDetails = (id: number) => {
  const context = useFetch<IAsset>(apiUrl.assetInfo, { id: id });
  return context;
};
