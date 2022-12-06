import {
  licenseCategoryOptions,
  licenseManufacturerOptions,
  licenseEditMock,
  licenseDetailsMock,
  licenseDeploysMock,
  assetHistory,
} from 'mocks';
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

export const fetchLicenseDetails = rest.get(url(apiUrl.licenseById), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseDetailsMock));
});

export const fetchLicenseDeployment = rest.get(url(apiUrl.licenseDeploys), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseDeploysMock));
});

export const fetchLicenseHistory = rest.get(url(apiUrl.licenseHistory), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetHistory));
});

export const fetchAssetEmptyResponse = rest.get(url('*'), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json([]));
});

export const handlers = [
  fetchLicenseCategory,
  fetchLicenseEditInfo,
  fetchAssetEmptyResponse,
  fetchLicenseHistory,
];
