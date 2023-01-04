import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { type IUser } from '../types';
import { LoadingScreen } from 'components/Elements/Loading';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { TabPanel } from 'features/assets/components/detailsComponents/TabPanel';
import UserInformations from './UserInformations';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import PersonIcon from '@mui/icons-material/Person';
import UserAssets from './UserAssets';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import UserLicenses from './AssetLicenses';
import { useGetProfile } from '../api';
import { getAvatar } from 'utils/getImage';
import { convertUrl } from 'utils';
import { apiUrl } from 'routes';

export const MyProfile = () => {
  const [image, setImage] = useState<JSX.Element>(<Box>No Photo</Box>);
  const [tab, setTab] = useState(0);
  const { data: user, isLoading } = useGetProfile<IUser>();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    if (user)
      getAvatar(convertUrl(apiUrl.avatar, { id: user?.id }))
        .then((response) => setImage(<img width="80%" src={response} alt="Asset" />))
        .catch((e) => console.log(e));
  }, [user, user?.id]);

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
              Profile
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
                <Tab icon={<PersonIcon />} label="Informations" />
                <Tab icon={<FormatListBulletedIcon />} label="Assets" />
                <Tab icon={<StickyNote2OutlinedIcon />} label="Licenses" />
              </Tabs>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <TabPanel tab={tab} index={0}>
              {user ? <UserInformations image={image} user={user} showLinks /> : <NoResult />}
            </TabPanel>
            <TabPanel tab={tab} index={1}>
              <UserAssets assets={user?.assets ? user.assets : []} />
            </TabPanel>
            <TabPanel tab={tab} index={2}>
              <UserLicenses licenses={user?.licences ? user.licences : []} />
            </TabPanel>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
