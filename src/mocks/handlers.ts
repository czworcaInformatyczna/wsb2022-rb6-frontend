import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
  componentsHandlers,
  manufacturerHandlers,
  categoryHandlers,
  modelHandlers,
  userHandlers,
} from 'mocks/featureHandlers';

export const handlers = [
  ...assetHandlers,
  ...loginHandlers,
  ...licensesHandlers,
  ...componentsHandlers,
  ...manufacturerHandlers,
  ...categoryHandlers,
  ...modelHandlers,
  ...userHandlers,
];
