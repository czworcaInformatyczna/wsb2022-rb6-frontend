import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
  componentsHandlers,
  manufacturerHandlers,
} from 'mocks/featureHandlers';

export const handlers = [
  ...assetHandlers,
  ...loginHandlers,
  ...licensesHandlers,
  ...componentsHandlers,
  ...manufacturerHandlers,
];
