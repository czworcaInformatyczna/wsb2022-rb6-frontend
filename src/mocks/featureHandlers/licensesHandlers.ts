import { convertUrl, url } from 'utils';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import licensesMockData from 'features/licenses/api/licensesMockData.json';
import {
  licenseCategoryOptions,
  licenseManufacturerOptions,
  licenseDetailsMock,
  licenseDeploysMock,
  licenseHistoryMock,
  licenseFilesMock,
} from 'mocks/mockData';
const licenses = rest.get(url(apiUrl.licenses), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licensesMockData));
});

const categoryOptions = rest.get(url(apiUrl.licensesCategory), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseCategoryOptions));
});
const manufacturersOptions = rest.get(url(apiUrl.licensesManufacturers), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseManufacturerOptions));
});

const licenseEdit = rest.patch(url(apiUrl.licenseById), (req, res, ctx) => {
  return res(ctx.status(200));
});

const licenseDetails = rest.get(url(apiUrl.licenseById), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseDetailsMock));
});

const deleteLicense = rest.delete(url(apiUrl.licenseById), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseDetailsMock));
});

const licenseDeploys = rest.get(url(apiUrl.licenseDeploys), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseDeploysMock));
});
const licenseHistory = rest.get(url(apiUrl.licenseHistory), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseHistoryMock));
});

const addLicense = rest.post(url(apiUrl.licenses), (req, res, ctx) => {
  return res(ctx.status(200));
});

const addLicenseCategory = rest.post(url(apiUrl.licenseCategory), (req, res, ctx) => {
  return res(ctx.status(200));
});

const returnLicense = rest.patch(
  url(convertUrl(apiUrl.detachLicense, { id: '*' })),
  (req, res, ctx) => {
    return res(ctx.status(200));
  },
);

const licenseFiles = rest.get(url(convertUrl(apiUrl.licenseFile, { id: '*' })), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(licenseFilesMock));
});

const downloadLicenseFile = rest.get(
  url(convertUrl(apiUrl.downloadLicenseFile, { id: '*' })),
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(licenseFilesMock));
  },
);

const deleteLicenseFile = rest.delete(
  url(convertUrl(apiUrl.deleteLicenseFile, { id: '*' })),
  (req, res, ctx) => {
    return res(ctx.status(200));
  },
);

const uploadLicenseFile = rest.post(
  url(convertUrl(apiUrl.licenseFile, { id: '*' })),
  (req, res, ctx) => {
    return res(ctx.status(200));
  },
);

const deployLicense = rest.post(
  url(convertUrl(apiUrl.licenseDeploys, { id: '*' })),
  (req, res, ctx) => {
    return res(ctx.status(200));
  },
);

export const licensesHandlers = [
  returnLicense,
  addLicense,
  licenses,
  categoryOptions,
  manufacturersOptions,
  licenseEdit,
  licenseDetails,
  licenseDeploys,
  licenseHistory,
  addLicenseCategory,
  licenseFiles,
  downloadLicenseFile,
  deleteLicenseFile,
  uploadLicenseFile,
  deleteLicense,
  deployLicense,
];
