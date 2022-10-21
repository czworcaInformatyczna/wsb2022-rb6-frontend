import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IAssets, type IModel, type IStatus } from '../types';

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

export const useGetAssetsDataById = <T>(id: number, url: string) => {
  const context = useFetch<T>(url, { id });
  return context;
};
