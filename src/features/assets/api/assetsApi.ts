import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IAssets, type IAsset, type IModel, type IStatus, type IAssetDetails } from '../types';

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
  const context = useFetch<IAssetDetails>(apiUrl.assetInfo, { id: id });
  return context;
};

export const useGetAssetDetailsEdit = (id: number) => {
  const context = useFetch<IAsset>(apiUrl.assetInfoEdit, { id: id });
  return context;
};

export const useGetAssetImage = (id: number) => {
  const context = useFetch<{ image: string }>(apiUrl.assetImage, { id: id });
  return context;
};

export const useGetAssetQRCode = (id: number) => {
  const context = useFetch<{ qrCode: string }>(apiUrl.assetQRCode, { id: id });
  return context;
};
