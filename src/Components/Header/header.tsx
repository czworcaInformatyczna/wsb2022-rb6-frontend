import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import { Hidden, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { AccountMenu } from './accountMenu';
import { type headerProps as myProps } from './domain';
import ProfilePanel from './profilePanel';
import SearchInput from './searchInput';

const Header = (props: myProps) => {
  return (
    <Box
      alignItems="center"
      display="flex"
      height="100%"
      left="0px"
      maxHeight="48px"
      position="fixed"
      right="0px"
      sx={{
        backgroundColor: 'primary.main',
      }}
      top="0px"
    >
      <Grid container>
        <Grid item lg={2} md={2} sm={3} xl={1} xs={5}>
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="flex-start"
            maxWidth="240px"
            width="auto"
          >
            <ListItemButton
              component={Link}
              disableRipple
              style={{
                color: 'primary',
              }}
              sx={{
                '&:hover': {
                  bgcolor: 'primary.main',
                },
              }}
              to="/"
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="InvenMan" />
            </ListItemButton>
          </Box>
        </Grid>
        <Grid item lg={1} md={1} sm={1} xl={1} xs={2}>
          <Box alignItems="center" display="flex" height="100%" justifyContent="flex-start">
            <IconButton
              aria-label="upload picture"
              component="label"
              onClick={props.toogleOpen}
              sx={{
                color: 'black',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid container item justifyContent="center" lg={6} md={6} sm={3} xl={8} xs={4}>
          <Box alignItems="center" display="flex" height="100%" justifyContent="flex-start">
            <SearchInput />
          </Box>
        </Grid>
        <Grid item lg={3} md={3} sm={5} xl={2} xs={1}>
          <Box alignItems="center" display="flex" height="100%" justifyContent="flex-end">
            <Hidden smDown>
              <ProfilePanel />
            </Hidden>
            <Hidden smUp>
              <AccountMenu />
            </Hidden>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
