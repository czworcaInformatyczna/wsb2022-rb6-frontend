import {
  assetStatusOptions,
  getAssetDetails,
  getAssetDetailsEdit,
  getAssetImage,
  getAssetLicenses,
  getAssetQRCode,
  getModelOptions,
} from 'mocks/mockData';
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

const assetsDetails = [
  rest.get(url(apiUrl.assetInfo), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAssetDetails));
  }),
];

const assetsDetailsEdit = [
  rest.get(url(apiUrl.assetInfoEdit), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAssetDetailsEdit));
  }),
];

const assetImage = [
  rest.get(url(apiUrl.assetImage), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAssetImage));
  }),
];

const assetQRCode = [
  rest.get(url(apiUrl.assetQRCode), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAssetQRCode));
  }),
];

const assetLicenses = [
  rest.get(url(apiUrl.assetLicenses), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(getAssetLicenses));
  }),
];

export const assetHandlers = [
  ...statusOptions,
  ...modelOptions,
  ...assets,
  ...assetsDetails,
  ...assetImage,
  ...assetsDetailsEdit,
  ...assetQRCode,
  ...assetLicenses,
];
