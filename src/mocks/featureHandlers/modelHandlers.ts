import { type IModel } from 'features/model/types';
import { categoryList, manufacturerList, modelList } from 'mocks/mockData';

import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const addModel = rest.post<IModel>(url(apiUrl.addAssetModel), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const models = rest.get(url(apiUrl.models), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(modelList));
});

const manufacturerOptions = rest.get(url(apiUrl.manufacturerList), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(manufacturerList));
});

const categoryOptions = rest.get(url(apiUrl.categoryList), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(categoryList));
});

const deleteModel = rest.delete(url(apiUrl.models + '/*'), (req, res, ctx) => {
  return res(ctx.status(200));
});

export const modelHandlers = [addModel, manufacturerOptions, categoryOptions, models, deleteModel];
