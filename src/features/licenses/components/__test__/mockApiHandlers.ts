import { licenseCategoryOptions, licenseManufacturerOptions, licenseEditMock } from 'mocks';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

export const fetchLicenseCategory = rest.get(apiUrl.licensesCategory, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(licenseCategoryOptions));
});

export const fetchLicenseManufacturers = rest.get(
  apiUrl.licensesManufacturers,
  async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(licenseManufacturerOptions));
  },
);

export const fetchLicenseEditInfo = rest.get(apiUrl.licenseInfoEdit, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(licenseEditMock));
});

export const fetchAssetEmptyResponse = rest.get(url('*'), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json([]));
});

export const handlers = [fetchLicenseCategory, fetchLicenseEditInfo, fetchAssetEmptyResponse];
