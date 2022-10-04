import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Logout from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import { Hidden } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useAuth } from 'hooks';

export const AccountMenu = (): JSX.Element => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
  const { setAuth } = useAuth();
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleLogout = () => {
    setAuth({ email: '', token: '' });
  };

  return (
    <>
      <Box>
        <Tooltip title="Account">
          <IconButton
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            size="small"
            sx={{
              borderRadius: 0,
              height: '100%',
              padding: 0,
            }}
          >
            <Hidden smUp>
              <MoreVertIcon />
            </Hidden>
            <Hidden smDown>
              <ArrowDropDownIcon />
            </Hidden>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        PaperProps={{
          elevation: 0,
          sx: {
            '& .MuiAvatar-root': {
              height: 32,
              ml: -0.5,
              mr: 1,
              width: 32,
            },
            '&:before': {
              content: '""',
              display: 'block',
              height: 10,
              position: 'absolute',
              bgcolor: 'background.paper',
              right: 14,
              top: 0,
              transform: 'translateY(-50%) rotate(45deg)',
              width: 10,
              zIndex: 0,
            },
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            overflow: 'visible',
          },
        }}
        anchorEl={anchorElement}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        id="account-menu"
        onClick={handleClose}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
