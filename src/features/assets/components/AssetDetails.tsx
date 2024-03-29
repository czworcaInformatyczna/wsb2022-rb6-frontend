import { Box, Grid, MenuItem, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
import { ActionMenu } from 'components/Elements/DetailsActionMenu/ActionMenu';
import { useDeleteAsset } from '../api';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { convertUrl, getVariant } from 'utils';
import { CreateModal } from 'components/Elements/CreateModal';
import Labels from './Labels';
import { PermissionContext } from 'providers/Permissions/Permission.provider';

export const AssetDetails = () => {
  const permission = useContext(PermissionContext);
  const [isManage, setIsManage] = useState<boolean>(false);
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const deleteAsset = useDeleteAsset();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<Box />);

  useEffect(() => {
    if (!Number(id)) {
      navigate(routePath.pageNotFound);
    }

    if (permission) {
      const check = permission.find((perm) => 'Manage Assets' === perm);
      setIsManage(check ? true : false);
    }
  }, [id, navigate, permission]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleOpenModal = () => {
    if (id && id !== null) {
      setModalContent(<Labels id={Number(id)} handleClose={() => setOpen(false)} />);
      setOpen(true);
    }
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
        deleteAsset.mutate(id, {
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
      <CreateModal open={open} content={modalContent} setOpen={setOpen} />
      <Grid alignItems="center" container direction="row" justifyContent="left">
        <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
          <Typography ml={2} mt={2} variant="h4" color="primary.main">
            Asset
          </Typography>
        </Grid>
        <Grid item lg={6} md={6} sm={6} xl={6} xs={6} display="flex" justifyContent="flex-end">
          {isManage && (
            <ActionMenu>
              <MenuItem
                onClick={() => navigate(convertUrl(routePath.assetChangeStatus, { id: id }))}
              >
                Change status
              </MenuItem>
              <MenuItem onClick={() => navigate(convertUrl(routePath.editAsset, { id: id }))}>
                Edit
              </MenuItem>
              <MenuItem disabled onClick={() => {}}>
                Clone
              </MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={() => handleOpenModal()}>Generate label</MenuItem>
            </ActionMenu>
          )}
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
            <AssetMaintenance id={Number(id)} isManage={isManage} />
          </TabPanel>
          <TabPanel tab={tab} index={5}>
            <AssetFiles id={Number(id)} isManage={isManage} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};
