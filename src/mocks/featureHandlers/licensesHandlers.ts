import { url } from 'utils';
import { rest } from 'msw';
import { apiUrl } from 'routes';
import licensesMockData from 'features/licenses/api/licensesMockData.json';
const licenses = [
  rest.get(url(apiUrl.licenses), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(licensesMockData));
  }),
];

export const licensesHandlers = [...licenses];
