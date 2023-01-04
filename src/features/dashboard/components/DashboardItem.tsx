import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingScreen } from 'components/Elements/Loading';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';

interface IDashboardItem {
  children: JSX.Element;
  link: string;
  loading: boolean;
  title: string;
}
export const DashboardItem = ({ title, children, loading, link }: IDashboardItem) => {
  const navigate = useNavigate();
  return (
    <Grid item lg={6} md={12} sm={12} xl={6} xs={12}>
      <Box
        sx={{ backgroundColor: 'background.paper', boxShadow: 2, width: '100%', height: '100%' }}
      >
        <Typography color="secondary" ml={2} pt={2} variant="h4">
          {title}
        </Typography>
        <Box p={1} sx={{ width: '100%', height: '90%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', height: { xl: '92%', lg: '90%', sm: '93%', xs: '90%' } }}>
            {loading ? <LoadingScreen /> : children}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <Button onClick={() => navigate(link)} endIcon={<ArrowForwardIcon />}>
                show
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
