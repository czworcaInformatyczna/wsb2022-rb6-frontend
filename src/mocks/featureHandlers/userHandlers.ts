import { usersList } from 'mocks/mockData';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const users = rest.get(url(apiUrl.users), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(usersList));
});

export const userHandlers = [users];
