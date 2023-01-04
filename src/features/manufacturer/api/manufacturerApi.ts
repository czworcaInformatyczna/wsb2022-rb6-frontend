import { type IDataProviderSettings } from 'features/assets';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type IManufacturer } from '../types';

export const useAddManufacturer = <T>(url: string) => {
  const context = usePost<T>(url);
  return context;
};

export const useGetManufacturers = () => {
  const context = useFetch<IManufacturer>(apiUrl.manufacturerList);
  return context;
};

export const useGetMaintenancePag = <T>(params: IDataProviderSettings) => {
  const context = useFetch<T>(apiUrl.manufacturerList, params);
  return context;
};

export const useDeleteManufacturers = <Number>() => {
  const context = useDelete<Number>(apiUrl.manufacturerById, apiUrl.manufacturerList);
  return context;
};

export const useUpdateManufacturer = <T>() => {
  const context = useUpdate<T>(apiUrl.manufacturerById);
  return context;
};
