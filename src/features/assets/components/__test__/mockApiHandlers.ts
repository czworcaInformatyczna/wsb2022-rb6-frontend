import {
  assetStatusOptions,
  assetModelOptions,
  assetDetailsEdit,
  assetComponents,
  assetHistory,
  assetDetails,
  assetLicenses,
  assetMaintenances,
} from 'mocks';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

export const fetchAssetsCategory = rest.get(apiUrl.assetsCategory, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetStatusOptions));
});

export const fetchAssetsModel = rest.get(apiUrl.assetsModel, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetModelOptions));
});

export const fetchAssetsInfo = rest.get(apiUrl.assetInfoEdit, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetDetailsEdit));
});

export const fetchAssetsComponents = rest.get(apiUrl.components + '?*', async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetComponents));
});

export const fetchAssetsHistory = rest.get(apiUrl.assetHistory, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetHistory));
});

export const fetchAssetsDetails = rest.get(apiUrl.assetInfo, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetDetails));
});

export const fetchAssetsLicenses = rest.get(apiUrl.assetLicenses, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetLicenses));
});

export const fetchAssetsMaintenances = rest.get(apiUrl.assetMaintenances, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetMaintenances));
});

export const fetchAssetEmptyResponse = rest.get(url('*'), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json([]));
});

export const handlers = [
  fetchAssetsCategory,
  fetchAssetsModel,
  fetchAssetsInfo,
  fetchAssetsComponents,
  fetchAssetEmptyResponse,
  fetchAssetsHistory,
  fetchAssetsDetails,
  fetchAssetsLicenses,
  fetchAssetsMaintenances,
];
