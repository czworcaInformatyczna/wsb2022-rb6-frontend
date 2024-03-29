import { userPermissionsList, usersList } from 'mocks/mockData';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const users = rest.get(url(apiUrl.users), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(usersList));
});

const createUser = rest.post(url(apiUrl.users), (req, res, ctx) => {
  return res(ctx.status(200));
});

const deleteUser = rest.delete(url(apiUrl.usersById), (req, res, ctx) => {
  return res(ctx.status(200));
});

const editUser = rest.patch(url(apiUrl.usersById), (req, res, ctx) => {
  return res(ctx.status(200));
});

const userDetails = rest.get(url(apiUrl.usersById), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(usersList.data[0]));
});

const userAvatar = rest.get(url('/avatar'), (req, res, ctx) => {
  return res(ctx.status(200));
});

const permissions = rest.get(url('/user/permissions'), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(userPermissionsList));
});

export const userHandlers = [
  permissions,
  users,
  createUser,
  userDetails,
  deleteUser,
  editUser,
  userAvatar,
];
