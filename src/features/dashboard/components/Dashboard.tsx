/* eslint-disable react/no-array-index-key */
import { Grid } from '@mui/material';
import { ColumnChart } from 'components/Charts/Column/ColumnChart';
import { LineChart } from 'components/Charts/Line/LineChart';
import { BarChart } from 'components/Charts/Bar/BarChart';
import { DonutChart } from 'components/Charts/Donut/DonutChart';
import { useGetStatistics } from 'features/dashboard';
import { DashboardItem } from 'features/dashboard';

interface IDashboardItems {
  chart: JSX.Element;
  title: string;
}

export const Dashboard = () => {
  const { data, isLoading } = useGetStatistics();
  let dashboardItems: IDashboardItems[] = [];

  if (data) {
    dashboardItems = [
      { title: 'Donut', chart: <DonutChart data={data.donutData} /> },
      { title: 'Bar', chart: <BarChart data={data.barData} /> },
      { title: 'Linechart', chart: <LineChart data={data.lineData} /> },
      { title: 'ColumnChart', chart: <ColumnChart data={data.columnData} /> },
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
