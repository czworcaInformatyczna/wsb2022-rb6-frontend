import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import { TabPanel } from 'features/assets/components/detailsComponents/TabPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { routePath } from 'routes';
import { LicenseInfo } from './detailsComponents/LicenseInfo';
import { LicenseDeployment } from './detailsComponents/LicenseDeployment';

export const LicenseDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Number(id)) {
      navigate(routePath.pageNotFound);
    }
  }, [id, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        flexGrow: 1,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      <Grid alignItems="center" container direction="row" justifyContent="left">
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} mt={2} variant="h4" color="primary.main">
            License
          </Typography>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Box sx={{ maxWidth: { xl: '100%', lg: '100%', md: '100%', xs: 320, sm: 480 } }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="Asset details tabs"
            >
              <Tab icon={<StickyNote2OutlinedIcon />} label="License" />

              <Tab icon={<BuildCircleOutlinedIcon />} label="Deploy" />
              <Tab icon={<HistoryToggleOffIcon />} label="History" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <TabPanel tab={tab} index={0}>
            <LicenseInfo id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={1}>
            <LicenseDeployment id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={2}>
            3
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
