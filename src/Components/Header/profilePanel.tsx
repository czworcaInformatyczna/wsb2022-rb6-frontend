import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useAuth } from 'hooks';
import { AccountMenu } from 'components/Header';

export const ProfilePanel = () => {
  const { auth } = useAuth();
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="flex-end">
      <IconButton
        aria-label="Notification"
        component="label"
        onClick={() => {}}
        sx={{
          color: 'black',
        }}
      >
        <Badge
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          badgeContent={4}
          color="warning"
        >
          <NotificationsIcon color="action" />
        </Badge>
      </IconButton>
      <IconButton
        aria-label="upload picture"
        component="label"
        sx={{
          borderRadius: 0,
          height: '100%',
          padding: 0,
        }}
      >
        <Typography
          sx={{
            marginRight: 1,
          }}
        >
          {' '}
          {auth.email}
        </Typography>
        <Avatar
          alt="Uemy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{
            height: 30,
            width: 30,
          }}
        />
      </IconButton>
      <AccountMenu />
      <IconButton
        aria-label="upload picture"
        component="label"
        sx={{
          borderRadius: 0,
          height: '100%',
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};
