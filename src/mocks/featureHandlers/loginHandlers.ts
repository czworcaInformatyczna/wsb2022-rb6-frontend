import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

export const successfulLogin = [
  rest.post(url(apiUrl.login), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock_token_value',
      }),
    );
  }),
];

export const loginHandlers = [...successfulLogin];
