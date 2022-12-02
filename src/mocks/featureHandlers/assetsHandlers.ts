import {
  assetStatusOptions,
  assetComponents,
  assetDetails,
  assetDetailsEdit,
  assetFiles,
  assetHistory,
  assetImage,
  assetLicenses,
  assetMaintenances,
  assetQRCode,
  modelList,
} from 'mocks/mockData';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';
import testData from 'features/assets/api/testData.json';

const statusOptions = rest.get(url(apiUrl.assetsCategory), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetStatusOptions));
});

const modelOptions = rest.get(url(apiUrl.assetsModel), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(modelList));
});

const assets = rest.get(url(apiUrl.assets), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(testData));
});

const details = rest.get(url(apiUrl.assetInfo + '*'), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetDetails));
});

const detailsEdit = rest.get(url(apiUrl.assetInfoEdit), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetDetailsEdit));
});

const image = rest.get(url(apiUrl.assetImage), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetImage));
});

const qRCode = rest.get(url(apiUrl.assetQRCode), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetQRCode));
});

const licenses = rest.get(url(apiUrl.assetLicenses), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetLicenses));
});

const components = rest.get(url(apiUrl.assetComponents), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetComponents));
});

const history = rest.get(url(apiUrl.assetHistory), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetHistory));
});

const maintenances = rest.get(url(apiUrl.assetMaintenances), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetMaintenances));
});

const files = rest.get(url(apiUrl.assetFiles), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(assetFiles));
});

const addAsset = rest.post<FormData>(url(apiUrl.assets), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const deleteAsset = rest.delete(url(apiUrl.assetsById), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const editAsset = rest.patch(url(apiUrl.assetsById + '*'), async (req, res, ctx) => {
  return await res(ctx.status(200));
});
const downloadAssetFile = rest.get(
  url(apiUrl.assetFiles + '/*/download'),
  async (req, res, ctx) => {
    return await res(ctx.status(200));
  },
);
const deleteAssetFile = rest.delete(url(apiUrl.assetFilesById), async (req, res, ctx) => {
  return await res(ctx.status(200));
});
const uploadFile = rest.post(url(apiUrl.assetFiles), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

export const assetHandlers = [
  statusOptions,
  modelOptions,
  assets,
  details,
  image,
  detailsEdit,
  qRCode,
  licenses,
  components,
  history,
  maintenances,
  files,
  addAsset,
  deleteAsset,
  editAsset,
  downloadAssetFile,
  deleteAssetFile,
  uploadFile,
];
