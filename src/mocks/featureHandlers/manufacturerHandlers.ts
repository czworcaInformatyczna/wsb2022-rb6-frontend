import { type IManufacturer } from 'features/manufacturer/types';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const addManufacturer = rest.post<IManufacturer>(
  url(apiUrl.addAssetManufacturer),
  async (req, res, ctx) => {
    return await res(ctx.status(200));
  },
);

export const manufacturerHandlers = [addManufacturer];
