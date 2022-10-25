import { type IComponents } from 'features/components';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';
import { v4 as uuidv4 } from 'uuid';

export let components: IComponents[] = [
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
export const getComponents = rest.get(url(apiUrl.components), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(components));
});

export const deleteComponents = rest.delete(url(apiUrl.component), (req, res, ctx) => {
  const { id } = req.params;
  components = components.filter((component) => component.id !== id);
  return res(ctx.status(204));
});

export const updateComponent = rest.patch(url(apiUrl.component), async (req, res, ctx) => {
  const { id } = req.params;
  const reqBody = await req.json();

  const index = components.findIndex((component) => component.id === id);
  components[index] = { id: id as string, name: reqBody.name };
  return await res(ctx.status(200));
});

export const addComponent = rest.post<IComponents>(
  url(apiUrl.components),
  async (req, res, ctx) => {
    const reqBody = await req.json();
    components.push({ id: uuidv4(), name: reqBody.name });
    return await res(ctx.status(200));
  },
);

export const componentsHandlers = [getComponents, deleteComponents, addComponent, updateComponent];
