import { assetStatusOptions, getModelOptions } from 'mocks/mockData';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';
import testData from 'features/assets/api/testData.json';

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

const assets = [
  rest.get(url(apiUrl.assets), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testData));
  }),
];

export const assetHandlers = [...statusOptions, ...modelOptions, ...assets];
