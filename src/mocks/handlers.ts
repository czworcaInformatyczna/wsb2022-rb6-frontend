import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
  componentsHandlers,
  dashboardHandlers,
} from 'mocks/featureHandlers';

export const handlers = [
  ...assetHandlers,
  ...loginHandlers,
  ...licensesHandlers,
  ...componentsHandlers,
  ...dashboardHandlers,
];
