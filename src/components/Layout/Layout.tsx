import { Hidden, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import { Outlet } from 'react-router';
import { SideMenu } from '../Sidemenu';
import { AppBar, Drawer, DrawerHeader } from './';
import { Header } from '../Header';

export const Layout = (): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  const toogleDrower = () => {
    localStorage.setItem('openDrawer', String(!open) + '');
    setOpen(!open);
  };

  React.useEffect(() => {
    const isOpen = localStorage.getItem('openDrawer');
    if (isOpen === 'false') {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <CssBaseline />
      <Toolbar>
        <AppBar open={open} position="fixed">
          <Header handleToggleOpen={toogleDrower} />
        </AppBar>
      </Toolbar>
      <Hidden smDown>
        <Drawer open={open} variant="permanent">
          <SideMenu open={open} />
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <Drawer
          ModalProps={{
            keepMounted: true,
          }}
          anchor="left"
          onClose={toogleDrower}
          open={open}
          variant="temporary"
        >
          <SideMenu open={open} />
        </Drawer>
      </Hidden>
      <Box sx={{ width: '100%', mr: 5 }}>
        <DrawerHeader />
        <Box
          component="main"
          sx={{
            flexGrow: 0,
            backgroundColor: 'background.paper',
            width: '100%',
            boxShadow: 1,
            borderRadius: 1,
            marginTop: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
