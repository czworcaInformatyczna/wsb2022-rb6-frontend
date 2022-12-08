import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton } from '@mui/material';
import { AccountMenu } from 'components/Header/AccountMenu';
import { useAuth } from 'providers/AuthProvider';

export const ProfilePanel = () => {
  const { handleLogout } = useAuth();

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="flex-end">
      {/* <IconButton
        aria-label="upload picture"
        component="label"
        sx={{
          borderRadius: 0,
          height: '100%',
          padding: 0,
        }}
      ></IconButton> */}
      <AccountMenu />
      <IconButton
        onClick={handleLogout}
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
