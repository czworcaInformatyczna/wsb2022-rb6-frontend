import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
  componentsHandlers,
} from 'mocks/featureHandlers';

export const handlers = [
  ...assetHandlers,
  ...loginHandlers,
  ...licensesHandlers,
  ...componentsHandlers,
];
