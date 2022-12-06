import { Box, Grid, MenuItem, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import { TabPanel } from 'features/assets/components/detailsComponents/TabPanel';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { LicenseInfo } from './DetailsComponents/LicenseInfo';
import { LicenseDeployment } from './DetailsComponents/LicenseDeployment';
import { type ILicenseFormInput } from '../types';
import { useGetAssetsDataById } from 'features/assets';
import { convertUrl, getVariant } from 'utils';
import { LoadingScreen } from 'components/Elements/Loading';
import { ActionMenu } from 'components/Elements/DetailsActionMenu/ActionMenu';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { useDeleteLicense } from '../api';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { LicenseHistory } from './DetailsComponents/LicenseHistory';
import { LicensesFiles } from './DetailsComponents/LicensesFiles';
import FolderIcon from '@mui/icons-material/Folder';

export const LicenseDetails = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const deleteLicense = useDeleteLicense();
  const { data: licenseDetails } = useGetAssetsDataById<ILicenseFormInput>(
    Number(id),
    convertUrl(apiUrl.licenseById, { id: id }),
  );

  useEffect(() => {
    if (!Number(id)) {
      navigate(routePath.pageNotFound);
    }
  }, [id, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleDelete = () => {
    const bgColor = { sx: { backgroundColor: theme.palette.background.paper } };
    confirm({
      title: (
        <Box component="span" sx={{ color: 'error.main' }}>
          Are you sure?
        </Box>
      ),
      description: (
        <Box component="span" sx={{ color: theme.palette.text.primary }}>
          This action is permanent!
        </Box>
      ),
      contentProps: bgColor,
      titleProps: bgColor,
      dialogActionsProps: bgColor,
      confirmationButtonProps: { variant: 'contained', color: 'success' },
      cancellationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(() => {
        deleteLicense.mutate(id, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Asset has been deleted', { variant });
            navigate(routePath.assets);
          },
        });
        return null;
      })
      .catch(() => {});
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
        <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
          <Typography ml={2} mt={2} variant="h4" color="primary.main">
            License
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xl={6} xs={6} display="flex" justifyContent="flex-end">
          <ActionMenu>
            <MenuItem
              disabled={licenseDetails?.remaining_slots < 1}
              onClick={() => navigate(convertUrl(routePath.deployLicense, { id: id }))}
            >
              Deploy
            </MenuItem>
            <MenuItem onClick={() => navigate(convertUrl(routePath.editLicense, { id: id }))}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </ActionMenu>
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
              <Tab icon={<FolderIcon />} label="Files" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <TabPanel tab={tab} index={0}>
            {licenseDetails !== undefined ? (
              <LicenseInfo licenseDetails={licenseDetails} />
            ) : (
              <LoadingScreen displayText />
            )}
          </TabPanel>
          <TabPanel tab={tab} index={1}>
            <LicenseDeployment id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={2}>
            <LicenseHistory id={Number(id)} />
          </TabPanel>
          <TabPanel tab={tab} index={3}>
            <LicensesFiles id={Number(id)} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
