import { Grid } from '@mui/material';
import { ColumnChart } from 'components/Charts/Column/ColumnChart';
import { LineChart } from 'components/Charts/Line/LineChart';
import { BarChart } from 'components/Charts/Bar/BarChart';
import { DonutChart } from 'components/Charts/Donut/DonutChart';
import { useGetStatistics } from 'features/dashboard';
import { DashboardItem } from 'features/dashboard';

export const Dashboard = () => {
  const { data } = useGetStatistics();

  return (
    <Grid container spacing={4}>
      <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
        <h1>Dashboard</h1>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
        <h2>Some diagram</h2>
        <ColumnChart />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
        <h2>Some diagram</h2>
        <LineChart />
      </Grid>

      <DashboardItem title="Donut">
        <DonutChart data={data?.donutData} />
      </DashboardItem>
      <DashboardItem title="Bar">
        <BarChart data={data?.barData} />
      </DashboardItem>
    </Grid>
  );
};
