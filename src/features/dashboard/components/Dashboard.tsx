/* eslint-disable react/no-array-index-key */
import { Grid } from '@mui/material';
import { ColumnChart, LineChart, BarChart, DonutChart } from 'components/Charts';
import {
  DashboardItem,
  statusChartConfig,
  useGetStatistics,
  assetCategoriesConfig,
  activeUsersConfig,
} from 'features/dashboard';
interface IDashboardItems {
  chart: JSX.Element;
  title: string;
}

export const Dashboard = () => {
  const { data, isLoading } = useGetStatistics();
  let dashboardItems: IDashboardItems[] = [];

  if (data) {
    dashboardItems = [
      {
        title: 'Statuses',
        chart: <DonutChart data={data.donutData} config={statusChartConfig} />,
      },
      { title: 'Asset location', chart: <BarChart data={data.barData} /> },
      {
        title: 'Number of active users',
        chart: <LineChart data={data.lineData} config={activeUsersConfig} />,
      },
      {
        title: 'Asset Categories',
        chart: <ColumnChart data={data.columnData} config={assetCategoriesConfig} />,
      },
    ];
  }

  return (
    <Grid container spacing={4}>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <h1>Dashboard</h1>
      </Grid>
      {dashboardItems.map((item, index) => (
        <DashboardItem key={index} title={item.title} loading={isLoading}>
          {item.chart}
        </DashboardItem>
      ))}
    </Grid>
  );
};
