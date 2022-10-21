import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { type CSSObject, type Theme, styled } from '@mui/material/styles';
import { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

const drawerWidth = 240;

type AppBarProps = MuiAppBarProps & {
  open?: boolean;
};

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

export const AppBar = styled(MuiAppBar, {
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

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer)(({ theme, open }) => {
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
