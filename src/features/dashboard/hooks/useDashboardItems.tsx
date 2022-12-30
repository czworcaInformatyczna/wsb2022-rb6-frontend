import { Bar, Donut } from 'components/Dashboard';
import {
  useGetStatistics,
  getAssetCategoriesProps,
  getManufacturerProps,
  getAssetStatusesProps,
} from 'features/dashboard';
import { routePath } from 'routes';

interface IDashboardItems {
  chart: JSX.Element;
  link: string;
  title: string;
}

export const useDashboardItems = () => {
  const { data, isLoading } = useGetStatistics();
  let dashboardItems: IDashboardItems[] = [];

  if (data) {
    dashboardItems = [
      {
        title: 'Manufacturer',
        chart: <Donut {...getManufacturerProps(data.manufacturer)} />,
        link: routePath.manufacturers,
      },
      {
        title: 'Asset Statuses',
        chart: <Donut {...getAssetStatusesProps(data.assetStatus)} />,
        link: routePath.assets,
      },
      {
        title: 'Asset Categories',
        chart: <Bar {...getAssetCategoriesProps(data.assetCategory)} />,
        link: routePath.categories,
      },
    ];
  }

  return { dashboardItems, isLoading };
};
