import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../Header/header';
import SideMenu from '../Menu/menu';
import { Hidden, Toolbar } from '@mui/material';
import { AppBarProps } from './domain';
import AppRoutes from '../routes';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
  ...(!open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
   
  }),
}));

const Drawer = styled(MuiDrawer)(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



 const MiniDrawer=()=>{
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  
  const toogleDrower = () => {
    localStorage.setItem("openDrawer", ""+!open+"")
    setOpen(!open);
  };
  
  React.useEffect(() => {
    let isOpen = localStorage.getItem("openDrawer");
    if(isOpen==="false"){
      setOpen(false)
    }
    else{
      setOpen(true)
    }
    
  }, []);
 
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <Toolbar>
      <AppBar position="fixed" open={open} >
        <Header toogleOpen ={ toogleDrower}/>
      </AppBar>
      </Toolbar>
      <Hidden smDown>
      <Drawer variant="permanent" open={open}>
        <SideMenu open={open}/>
      </Drawer>
      </Hidden>
      <Hidden smUp>
      <Drawer variant="temporary"
            anchor='left'
            onClose={toogleDrower}
           
            ModalProps={{
              keepMounted: true, 
            }} open={open}>
        <SideMenu open={open}/>
      </Drawer>
      </Hidden>
      <Box sx={{width:"100%",mr:5 }}>
      <DrawerHeader/>
      <Box component="main" sx={{ flexGrow: 0,backgroundColor:'background.paper', width:"100%", boxShadow:1,borderRadius:1, marginTop:2 }}>
        <AppRoutes/>
      </Box>
      </Box>
    </Box>
  );
}
export default MiniDrawer