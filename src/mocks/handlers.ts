import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
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
  ...manufacturerHandlers,
  ...categoryHandlers,
  ...modelHandlers,
  ...rolesHandlers,
  ...userHandlers,
];
