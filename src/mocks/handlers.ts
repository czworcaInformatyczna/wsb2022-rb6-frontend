import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
  componentsHandlers,
  manufacturerHandlers,
  categoryHandlers,
  modelHandlers,
  rolesHandlers,
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
  ...rolesHandlers,
  ...userHandlers,
];
