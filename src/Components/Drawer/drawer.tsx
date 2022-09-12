import { Hidden, Toolbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import { type CSSObject, type Theme, styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import Header from '../Header/header';
import SideMenu from '../Menu/menu';
import AppRoutes from '../routes';
import { type AppBarProps } from './domain';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => {
  return {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: drawerWidth,
  };
};

const closedMixin = (theme: Theme): CSSObject => {
  return {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  };
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (property) => {
    return property !== 'open';
  },
})<AppBarProps>(({ theme, open }) => {
  return {
    transition: theme.transitions.create(['width', 'margin'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
    zIndex: theme.zIndex.drawer + 1,
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
    ...(!open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    }),
  };
});

const Drawer = styled(MuiDrawer)(({ theme, open }) => {
  return {
    boxSizing: 'border-box',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: drawerWidth,

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  };
});

const MiniDrawer = (): JSX.Element => {
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
          <Header toogleOpen={toogleDrower} />
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
      <Box
        component="main"
        sx={{
          flexGrow: 0,
          pr: 3,
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

export default MiniDrawer;
