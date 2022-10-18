import { assetStatusOptions, getModelOptions } from 'mocks/mockData';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const statusOptions = [
  rest.get(url(apiUrl.assetsCategory), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetStatusOptions));
  }),
];

const modelOptions = [
  rest.get(url(apiUrl.assetsModel), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getModelOptions));
  }),
];

export const assetHandlers = [...statusOptions, ...modelOptions];
