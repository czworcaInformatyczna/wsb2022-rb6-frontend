import { url } from 'utils';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import licensesMockData from 'features/licenses/api/licensesMockData.json';
import {
  licenseCategoryOptions,
  licenseManufacturerOptions,
  licenseEditMock,
} from 'mocks/mockData';
const licenses = [
  rest.get(url(apiUrl.licenses), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(licensesMockData));
  }),
];

const categoryOptions = [
  rest.get(url(apiUrl.licensesCategory), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(licenseCategoryOptions));
  }),
];

const manufacturersOptions = [
  rest.get(url(apiUrl.licensesManufacturers), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(licenseManufacturerOptions));
  }),
];

const licenseEdit = [
  rest.get(url(apiUrl.licenseInfoEdit), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(licenseEditMock));
  }),
];
export const licensesHandlers = [
  ...licenses,
  ...categoryOptions,
  ...manufacturersOptions,
  ...licenseEdit,
];