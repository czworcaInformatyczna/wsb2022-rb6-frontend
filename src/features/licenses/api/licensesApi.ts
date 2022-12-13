import { type IDataProviderSettings } from 'features/assets';
import { useDelete, useFetch, usePost, useUpdate } from 'lib/react-query';
import { apiUrl } from 'routes';
import { convertUrl } from 'utils';
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

export const useDeleteLicense = <Number>() => {
  const context = useDelete<Number>(apiUrl.licenseById, apiUrl.licenses);
  return context;
};

export const useUpdateLicense = <T>() => {
  const context = useUpdate<T>(apiUrl.licenseById, apiUrl.licenses);
  return context;
};

export const useAddLicense = <T>() => {
  const context = usePost<T>(apiUrl.licenses);
  return context;
};

export const useGetLicenseCategory = () => {
  const context = useFetch<ILicenseCategory>(apiUrl.licensesCategory);
  return context;
};

export const useDeployLicense = <T>(id: number) => {
  const context = usePost<T>(convertUrl(apiUrl.licenseDeploys, { id }));
  return context;
};

export const useDetachLicense = <T>(id: number) => {
  const context = useUpdate<T>(apiUrl.detachLicense, convertUrl(apiUrl.licenseDeploys, { id }));
  return context;
};

export const useGetLicenseHistory = <T>(url: string, params: IDataProviderSettings) => {
  const context = useFetch<T>(url, params);
  return context;
};

export const useDeleteLicenseFile = <Number>(id: number) => {
  const context = useDelete<Number>(
    apiUrl.deleteLicenseFile,
    convertUrl(apiUrl.licenseFile, { id }),
  );
  return context;
};
