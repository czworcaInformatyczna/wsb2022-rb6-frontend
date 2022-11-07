import { type IDataProviderSettings } from 'features/assets';
import { useFetch } from 'lib/react-query';
import { apiUrl } from 'routes';
import { type ILicenseManufacturer, type ILicenseCategory, type ILicenses } from '../types';

export const useGetLicenses = (params: IDataProviderSettings) => {
  const context = useFetch<ILicenses[]>(apiUrl.licenses, params);
  return context;
};

export const useGetCategoryOptions = () => {
  const context = useFetch<ILicenseCategory[]>(apiUrl.licensesCategory);
  return context;
};

export const useGetManufacturerOptions = () => {
  const context = useFetch<ILicenseManufacturer[]>(apiUrl.licensesManufacturers);
  return context;
};
