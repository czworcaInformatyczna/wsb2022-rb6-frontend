import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton, { listItemButtonClasses } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { menuItems } from './menuItems';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { WrapProps, menuProps as myProps, Nested } from './domain';
import { ColorModeContext } from "../../App"

export const Wrap: React.FC<WrapProps> = ({ if: condition, with: wrapper, children }) => {
    return !condition ? wrapper(children) : <>{children}</>
}

const SideMenu=(props: myProps)=> {


    const [openNested, setOpenNested] = React.useState<Nested>({});
    const colorMode = React.useContext(ColorModeContext);

    React.useEffect(() => {
        if (openNested === undefined) {
            var obj: Nested = {};
            menuItems.forEach(val => {
                if (val.link == null) {
                    obj[val.id] = false
                }
                setOpenNested(obj)
            })
        }
    })



    const handleClick = (id: number) => {
        setOpenNested({ ...openNested, [id]: !openNested[id] })
    };
    return (
        <Box height="100vh" display="flex" flexDirection="column" align-items="flex-start" overflow='auto'
            sx={{
                overflowX: "hidden"
            }}
        >

            <List
                sx={{ width: '100%', bgcolor: 'background.primary', paddingTop: 0, flex: "none", order: 3, flexGrow: 1 }}
                component="nav"
                aria-labelledby="nested-list-subheader"

            ><>
                    <ListItemButton component={Link} disableRipple to="/" style={{ color: "primary" }}
                        sx={{
                            backgroundColor: 'primary.main',

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

                    <Divider />
                    <Box >
                        {menuItems.map((val) => {

                            return (
                                val.link != null ? (<div key={val.id}>
                                    <Wrap if={props.open} with={(children) => {
                                        return (<Tooltip placement='right' title={val.name}>

                                            <Box>{children}</Box>
                                        </Tooltip>)
                                    }}>
                                        <ListItemButton component={Link} to={val.link} >
                                            <ListItemIcon>

                                                {val.icon}
                                            </ListItemIcon>

                                            <ListItemText sx={{ opacity: props.open ? 1 : 0 }} primary={val.name} />
                                        </ListItemButton>
                                    </Wrap>
                                    <Divider />
                                </div>)
                                    :
                                    (<div key={val.id}>
                                        <Wrap if={props.open} with={(children) => {
                                            return (<Tooltip placement='right' title={val.name}>

                                                <Box>{children}</Box>
                                            </Tooltip>)
                                        }}>
                                            <ListItemButton onClick={() => { handleClick(val.id) }}>
                                                <ListItemIcon>
                                                    {val.icon}
                                                </ListItemIcon>
                                                <ListItemText sx={{ opacity: props.open ? 1 : 0 }} primary={val.name} />
                                                {props.open && (openNested[val.id] ? <ExpandLess /> : <ExpandMore />)}
                                            </ListItemButton>
                                            <Divider />
                                        </Wrap>
                                        {openNested !== undefined && <Collapse in={openNested[val.id]} timeout="auto" unmountOnExit>

                                            <List component="div" disablePadding>
                                                {val.nestedList.map(nestedVal => {
                                                    return (
                                                        <div key={nestedVal.id}>
                                                            <Wrap if={props.open} with={(children) => {
                                                                return (<Tooltip placement='right' title={nestedVal.name}>

                                                                    <Box>{children}</Box>
                                                                </Tooltip>)
                                                            }}>
                                                                <ListItemButton component={Link} to={nestedVal.link} dense sx={{ pl: props.open? 4 : 3 }} >
                                                                    <ListItemIcon>
                                                                        {nestedVal.icon}
                                                                    </ListItemIcon>
                                                                    <ListItemText sx={{ opacity: props.open ? 1 : 0 }} primary={nestedVal.name} />
                                                                </ListItemButton>
                                                            </Wrap>
                                                            <Divider />
                                                        </div>
                                                    )
                                                })}

                                            </List>
                                        </Collapse>}
                                    </div>)
                            )

                        })}
                    </Box>
                </>
            </List>
            <Box flex="none" order="5" align-self="stretch" flex-grow="0" sx={{
                maxWidth: props.open ? "240px" : "55px"
            }}>
                <Divider />
                <ListItemButton sx={{
                    height: "48px"
                }} onClick={colorMode.toggleColorMode}>
                    
                    <ListItemIcon>
                        <QrCode2Icon />
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: props.open ? 1 : 1 }} primary="Scanner" />

                </ListItemButton>
                <Divider />
                <ListItemButton sx={{
                    height: "48px"
                }}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ opacity: props.open ? 1 : 1 }} primary="Settings" />

                </ListItemButton>
            </Box>
        </Box>
    );
}
export default SideMenu
