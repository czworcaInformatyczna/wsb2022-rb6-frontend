import { Grid } from '@mui/material';

export const DashboardItem = ({ title, children }: any) => {
  return (
    <Grid item lg={6} md={6} sm={12} xl={6} xs={12}>
      <h2>{title}</h2>
      {children}
    </Grid>
  );
};
