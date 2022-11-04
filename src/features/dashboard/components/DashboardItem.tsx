import { Grid } from '@mui/material';
import { LoadingScreen } from 'components/Elements/Loading';

interface IDashboardItem {
  children: JSX.Element;
  loading: boolean;
  title: string;
}
export const DashboardItem = ({ title, children, loading }: IDashboardItem) => {
  return (
    <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
      <h2>{title}</h2>
      {loading ? <LoadingScreen /> : children}
    </Grid>
  );
};
