import { API_URL } from 'config';
import { rest } from 'msw';

const url = (path: string): string => `${API_URL}${path}`;

export const handlers = [
  rest.post(url('/login'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: 'mock_token_value',
      }),
    );
  }),
];
