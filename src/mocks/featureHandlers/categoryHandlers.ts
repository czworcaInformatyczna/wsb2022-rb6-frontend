import { type ICategory } from 'features/category/types';
import { componentCategoryList } from 'mocks/mockData';

import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const addCategory = rest.post<ICategory>(url(apiUrl.addAssetCategory), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const getCategory = rest.get(url(apiUrl.componentCategoryList), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(componentCategoryList));
});

export const categoryHandlers = [addCategory, getCategory];
