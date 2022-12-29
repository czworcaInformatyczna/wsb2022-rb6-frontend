import { Bar, Donut } from 'components/Dashboard';
import {
  useGetStatistics,
  getAssetCategoriesProps,
  getManufacturerProps,
  getAssetStatusesProps,
} from 'features/dashboard';

interface IDashboardItems {
  chart: JSX.Element;
  title: string;
}

export const useDashboardItems = () => {
  const { data, isLoading } = useGetStatistics();
  let dashboardItems: IDashboardItems[] = [];

  if (data) {
    dashboardItems = [
      {
        title: 'Asset Categories',
        chart: <Bar {...getAssetCategoriesProps(data.assetCategory)} />,
      },
      {
        title: 'Manufacturer',
        chart: <Donut {...getManufacturerProps(data.manufacturer)} />,
      },
      {
        title: 'Asset Statuses',
        chart: <Donut {...getAssetStatusesProps(data.assetStatus)} />,
      },
    ];
  }

  return { dashboardItems, isLoading };
};
