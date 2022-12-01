import { Box, Grid, MenuItem, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { ActionMenu } from 'components/Elements/DetailsActionMenu/ActionMenu';
import { useDeleteUser } from '../api';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';
import { getVariant } from 'utils';
import { useGetAssetsDataById } from 'features/assets';
import { type IUser } from '../types';
import { LoadingScreen } from 'components/Elements/Loading';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { TabPanel } from 'features/assets/components/detailsComponents/TabPanel';
import UserInformations from './UserInformations';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import PersonIcon from '@mui/icons-material/Person';
import UserAssets from './UserAssets';

export const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [tab, setTab] = useState(0);
  const { data: user, isLoading } = useGetAssetsDataById<IUser>(
    Number(id),
    apiUrl.users + '/' + id,
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (!Number(id)) {
      navigate(routePath.pageNotFound);
    }
  }, [id, navigate]);

  const handleDeleteUser = () => {
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
        deleteUser.mutate(id, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('User has been deleted', { variant });
            navigate(routePath.users);
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
              User - {user?.name} {user?.surname}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xl={6} xs={6} display="flex" justifyContent="flex-end">
            <ActionMenu>
              <MenuItem onClick={() => navigate('/Users/Edit/' + id)}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteUser}>Delete</MenuItem>
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
                <Tab icon={<PersonIcon />} label="Informations" />
                <Tab icon={<FormatListBulletedIcon />} label="Assets" />
              </Tabs>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <TabPanel tab={tab} index={0}>
              {user ? <UserInformations user={user} /> : <NoResult />}
            </TabPanel>
            <TabPanel tab={tab} index={1}>
              <UserAssets assets={user?.assets ? user.assets : []} />
            </TabPanel>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
