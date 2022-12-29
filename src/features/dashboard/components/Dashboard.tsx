/* eslint-disable react/no-array-index-key */
import { Grid, Box, Typography } from '@mui/material';
import { DashboardItem, useDashboardItems } from 'features/dashboard';

export const Dashboard = () => {
  const { dashboardItems, isLoading } = useDashboardItems();

  return (
    <Box
      alignSelf="center"
      sx={{
        width: { lg: '100%', xs: '100%' },
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} variant="h4">
            Dashboard
          </Typography>
        </Grid>

        {dashboardItems
          ? dashboardItems.map((item, index) => (
              <DashboardItem key={index} title={item.title} loading={isLoading}>
                {item.chart}
              </DashboardItem>
            ))
          : null}
      </Grid>
    </Box>
  );
};
