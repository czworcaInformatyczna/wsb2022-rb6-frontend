import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingScreen } from 'components/Elements/Loading';

interface IDashboardItem {
  children: JSX.Element;
  loading: boolean;
  title: string;
}
export const DashboardItem = ({ title, children, loading }: IDashboardItem) => {
  return (
    <Grid item lg={12} md={12} sm={12} xl={12} xs={12} ml={3}>
      <Typography ml={2} variant="h4">
        {title}
      </Typography>
      <Box sx={{ width: '75%', height: '90%' }}>{loading ? <LoadingScreen /> : children}</Box>
    </Grid>
  );
};
