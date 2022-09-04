import * as React from 'react';
import { Badge, Box, IconButton, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import AccountMenu from './accountMenu';
import NotificationsIcon from '@mui/icons-material/Notifications';

const ProfilePanel=()=>{
    return ( 
        <Box height="100%" display="flex" alignItems="center" justifyContent="flex-end">
            <IconButton onClick={()=>{}} aria-label="Notification" component="label" sx={{ color: "black" }}>
                
                        <Badge badgeContent={4} color="warning" anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                            <NotificationsIcon color="action" />
                        </Badge>
                            </IconButton>
                        <IconButton sx={{ padding: 0, borderRadius: 0, height: "100%" }} aria-label="upload picture" component="label">
                           <Typography sx={{marginRight:1}}> User</Typography>
                            <Avatar sx={{ width: 30, height: 30 }} alt="Uemy Sharp" src="/static/images/avatar/1.jpg" />
                        </IconButton>
                        <AccountMenu />
                        <IconButton aria-label="upload picture" component="label" sx={{

                            height: "100%",
                            borderRadius: 0,
                            
                        }}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
     );
}

export default ProfilePanel;