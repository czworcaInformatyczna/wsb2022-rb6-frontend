import { Box, Grid, MenuItem, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { ActionMenu } from 'components/Elements/DetailsActionMenu/ActionMenu';
import { useDeleteRole } from '../api';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { convertUrl, getVariant } from 'utils';
import { useGetAssetsDataById } from 'features/assets';
import { type IRole } from '../types';
import { LoadingScreen } from 'components/Elements/Loading';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';
import { TabPanel } from 'features/assets/components/detailsComponents/TabPanel';
import Permissions from './Permissions';
import RoleUsers from './RoleUsers';
import { PermissionContext } from 'providers/Permissions/Permission.provider';

export const RoleDetails = () => {
  const { id } = useParams();
  const permission = useContext(PermissionContext);
  const [isManage, setIsManage] = useState<boolean>(false);
  const navigate = useNavigate();
  const deleteRole = useDeleteRole();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [tab, setTab] = useState(0);
  const { data: role, isLoading } = useGetAssetsDataById<IRole>(
    Number(id),
    apiUrl.roles + '/' + id,
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!Number(id)) {
      navigate(routePath.pageNotFound);
    }

    if (permission) {
      const check = permission.find((perm) => 'Manage Roles' === perm);
      setIsManage(check ? true : false);
    }
  }, [id, navigate, permission]);

  const handleDeleteRole = () => {
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
        deleteRole.mutate(id, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Role has been deleted', { variant });
            navigate(routePath.roles);
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
      {isLoading ? (
        <LoadingScreen displayText />
      ) : (
        <Grid alignItems="center" container direction="row" justifyContent="left">
          <Grid item lg={6} md={6} sm={6} xl={6} xs={6}>
            <Typography ml={2} mt={2} variant="h4" color="primary.main">
              Role - {role?.role.name}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xl={6} xs={6} display="flex" justifyContent="flex-end">
            {isManage && (
              <ActionMenu>
                <MenuItem
                  onClick={() => navigate(convertUrl(routePath.addToRole, { id: role?.role.name }))}
                >
                  Add users to role
                </MenuItem>
                <MenuItem onClick={() => navigate('/Roles/Edit/' + id)}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteRole}>Delete</MenuItem>
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
                <Tab icon={<AdminPanelSettingsIcon />} label="Permissions" />
                <Tab icon={<GroupIcon />} label="Users" />
              </Tabs>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <TabPanel tab={tab} index={0}>
              <Permissions role={role?.rolePermissions ? role.rolePermissions : []} />
            </TabPanel>
            <TabPanel tab={tab} index={1}>
              <RoleUsers id={Number(id)} role={role?.role.name ? role?.role.name : ''} />
            </TabPanel>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
