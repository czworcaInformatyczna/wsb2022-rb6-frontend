import { type ICategory } from 'features/category/types';

import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const addCategory = rest.post<ICategory>(url(apiUrl.addAssetCategory), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

export const categoryHandlers = [addCategory];
