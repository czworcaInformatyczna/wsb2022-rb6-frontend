import { assetHandlers, loginHandlers, licensesHandlers } from 'mocks/featureHandlers';

export const handlers = [...assetHandlers, ...loginHandlers, ...licensesHandlers];
