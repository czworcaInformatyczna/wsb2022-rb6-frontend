import { assetStatusOptions, getModelOptions } from 'mocks';
import { rest } from 'msw';
import { apiUrl } from 'routes';

export const fetchAssetsCategory = rest.get(apiUrl.assetsCategory, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(assetStatusOptions));
});

export const fetchAssetsModel = rest.get(apiUrl.assetsModel, async (req, res, ctx) => {
  return await res(ctx.status(200), ctx.json(getModelOptions));
});

export const handlers = [fetchAssetsCategory, fetchAssetsModel];
