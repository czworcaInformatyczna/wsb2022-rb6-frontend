import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';

export let components = [
  {
    id: '1',
    name: 'Example Component 1',
  },
  {
    id: '2',
    name: 'Example Component 2',
  },
];

// TO_DELETE
export const getComponents = rest.get(url(apiUrl.getAllComponents), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(components));
});

export const deleteComponents = rest.delete(url(apiUrl.component), (req, res, ctx) => {
  const { id } = req.params;
  components = components.filter((component) => component.id !== id);
  return res(ctx.status(204));
});

export const componentsHandlers = [getComponents, deleteComponents];
