import { rest } from 'msw';
import { apiUrl } from 'routes';
import { url } from 'utils';
import { statisticsData } from './data';

export const getStatistics = rest.get(url(apiUrl.statistics), (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(statisticsData));
});

export const dashboardHandlers = [getStatistics];
