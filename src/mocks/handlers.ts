import {
  assetHandlers,
  loginHandlers,
  licensesHandlers,
  dashboardHandlers,
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
  ...dashboardHandlers,
  ...rolesHandlers,
  ...userHandlers,
];
