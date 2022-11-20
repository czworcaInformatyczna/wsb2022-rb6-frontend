import { type IRoles } from 'features/roles/types';
import { permissionsList, Role, Roles } from 'mocks/mockData';

import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

const addRole = rest.post<IRoles>(url(apiUrl.roles), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const deleteRole = rest.delete(url(apiUrl.rolesById), async (req, res, ctx) => {
  return await res(ctx.status(200));
});

const permissions = rest.get(url(apiUrl.permissions), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(permissionsList));
});

const role = rest.get(url(apiUrl.rolesById), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(Role));
});

const roles = rest.get(url(apiUrl.roles), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(Roles));
});

const updateRole = rest.patch(url(apiUrl.rolesById), (req, res, ctx) => {
  return res(ctx.status(200));
});

export const rolesHandlers = [addRole, permissions, role, roles, deleteRole, updateRole];
