import * as React from 'react';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import { Hidden, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchInput from './searchInput';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ProfilePanel from './profilePanel';
import AccountMenu from './accountMenu';

interface myProps {

    toogleOpen: () => void;
}

function Header(props: myProps) {
    return (
        <Box
            position="fixed"
            maxHeight="48px"
            height="100%"
            left="0px"
            right="0px"
            top="0px"
            display="flex"
            alignItems="center"
            sx={{
                backgroundColor: 'primary.main'
            }}
        >

            <Grid container>
                <Grid item xl={1} lg={2} md={2} sm={3} xs={5}>
                    <Box height="100%" display="flex" alignItems="center" justifyContent="flex-start" width="auto" maxWidth="240px">
                        <ListItemButton component={Link} disableRipple to="/" style={{ color: "primary" }}
                            sx={{
                                "&:hover": {
                                    bgcolor: "primary.main"
                                }
                            }}>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="InvenMan"
                            />
                        </ListItemButton>
                    </Box>
                </Grid>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={2}>
                    <Box height="100%" display="flex" alignItems="center" justifyContent="flex-start">
                        <IconButton onClick={props.toogleOpen} aria-label="upload picture" component="label" sx={{ color: "black" }}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item xl={8} lg={6} md={6} sm={3} xs={4} container justifyContent="center" >

                    <Box height="100%" display="flex" alignItems="center" justifyContent="flex-start">
                        <SearchInput />
                    </Box>


                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={5} xs={1}>

                    <Box height="100%" display="flex" alignItems="center" justifyContent="flex-end">
                        <Hidden smDown>
                            <ProfilePanel />
                        </Hidden>
                        <Hidden smUp>
                            <AccountMenu />
                        </Hidden>
                    </Box>

                </Grid>

            </Grid>


        </Box>);
}

export default Header;