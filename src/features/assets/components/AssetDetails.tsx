import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import FolderIcon from '@mui/icons-material/Folder';
import { TabPanel } from './detailsComponents/TabPanel';
import { AssetInfo } from './detailsComponents/AssetInfo';
import { AssetLicenses } from './detailsComponents/AssetLicenses';
import { AssetComponents } from './detailsComponents/AssetComponents';
import { AssetHistory } from './detailsComponents/AssetHistory';
import { AssetMaintenance } from './detailsComponents/AssetMaintenance';
import { AssetFiles } from './detailsComponents/AssetFiles';
import { useNavigate, useParams } from 'react-router-dom';
import { routePath } from 'routes';
export const AssetDetails = () => {
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
            Asset
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
              <Tab icon={<WebAssetIcon />} label="Asset" />
              <Tab icon={<StickyNote2OutlinedIcon />} label="Licenses" />
              <Tab icon={<AccountTreeOutlinedIcon />} label="Components" />
              <Tab icon={<HistoryToggleOffIcon />} label="History" />
              <Tab icon={<BuildCircleOutlinedIcon />} label="Maintenance" />
              <Tab icon={<FolderIcon />} label="Files" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <TabPanel tab={tab} index={0}>
            <AssetInfo id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={1}>
            <AssetLicenses id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={2}>
            <AssetComponents id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={3}>
            <AssetHistory id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={4}>
            <AssetMaintenance id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={5}>
            <AssetFiles id={Number(id)} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};