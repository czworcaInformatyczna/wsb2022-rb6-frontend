import { type ICategory } from 'features/category/types';
import { allCategoryList, componentCategoryList } from 'mocks/mockData';

import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const addCategory = rest.post<ICategory>(url(apiUrl.addAssetCategory), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const getCategory = rest.get(url(apiUrl.componentCategoryList), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(componentCategoryList));
});

const getAllCategories = rest.get(url(apiUrl.allCategories), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(allCategoryList));
});

export const categoryHandlers = [addCategory, getCategory, getAllCategories];
