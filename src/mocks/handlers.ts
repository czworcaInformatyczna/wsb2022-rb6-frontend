import { API_URL } from 'config';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { assetStatusOptions } from './mockData';

const url = (path: string): string => `${API_URL}${path}`;

export const handlers = [
  // login
  rest.post(url(apiUrl.login), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock_token_value',
      }),
    );
  }),

  // assets
  rest.get(url(apiUrl.assetsCategory), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(assetStatusOptions));
  }),
];
