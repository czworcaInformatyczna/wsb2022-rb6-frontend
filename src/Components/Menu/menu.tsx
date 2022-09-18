import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ColorModeContext } from '../../App';
import { type WrapProps, type menuProps as myProps, type Nested } from './domain';
import { menuItems } from './menuItems';

export const Wrap: React.FC<WrapProps> = ({ if: condition, with: wrapper, children }) => {
  return !condition ? wrapper(children) : <>{children}</>;
};

export const menuItemList = (
  open: boolean,
  openNested: Nested,
  handleClick: (id: number) => void,
) =>
  menuItems.map((value) => {
    return value.link != null ? (
      <div key={value.id}>
        <Wrap
          if={open}
          with={(children) => {
            return (
              <Tooltip placement="right" title={value.name}>
                <Box>{children}</Box>
              </Tooltip>
            );
          }}
        >
          <ListItemButton component={Link} to={value.link}>
            <ListItemIcon>{value.icon}</ListItemIcon>

            <ListItemText
              primary={value.name}
              sx={{
                opacity: open ? 1 : 0,
              }}
            />
          </ListItemButton>
        </Wrap>
        <Divider />
      </div>
    ) : (
      <div key={value.id}>
        <Wrap
          if={open}
          with={(children) => {
            return (
              <Tooltip placement="right" title={value.name}>
                <Box>{children}</Box>
              </Tooltip>
            );
          }}
        >
          <ListItemButton
            onClick={() => {
              handleClick(value.id);
            }}
          >
            <ListItemIcon>{value.icon}</ListItemIcon>
            <ListItemText
              primary={value.name}
              sx={{
                opacity: open ? 1 : 0,
              }}
            />
            {open && (openNested[value.id] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Divider />
        </Wrap>
        {openNested !== undefined && (
          <Collapse in={openNested[value.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {value.nestedList.map((nestedValue) => {
                return (
                  <div key={nestedValue.id}>
                    <Wrap
                      if={open}
                      with={(children) => {
                        return (
                          <Tooltip placement="right" title={nestedValue.name}>
                            <Box>{children}</Box>
                          </Tooltip>
                        );
                      }}
                    >
                      <ListItemButton
                        component={Link}
                        dense
                        sx={{
                          pl: open ? 4 : 3,
                        }}
                        to={nestedValue.link}
                      >
                        <ListItemIcon>{nestedValue.icon}</ListItemIcon>
                        <ListItemText
                          primary={nestedValue.name}
                          sx={{
                            opacity: open ? 1 : 0,
                          }}
                        />
                      </ListItemButton>
                    </Wrap>
                    <Divider />
                  </div>
                );
              })}
            </List>
          </Collapse>
        )}
      </div>
    );
  });

const SideMenu = (props: myProps) => {
  const [openNested, setOpenNested] = React.useState<Nested>({});
  const handleColorMode = React.useContext(ColorModeContext);

  React.useEffect(() => {
    if (openNested === undefined) {
      const object: Nested = {};
      for (const value of menuItems) {
        if (value.link == null) {
          object[value.id] = false;
        }

        setOpenNested(object);
      }
    }
  }, [openNested]);

  const handleClick = (id: number) => {
    setOpenNested({
      ...openNested,
      [id]: !openNested[id],
    });
  };

  return (
    <Box
      align-items="flex-start"
      display="flex"
      flexDirection="column"
      height="100vh"
      overflow="auto"
      sx={{
        overflowX: 'hidden',
      }}
    >
      <List
        aria-labelledby="nested-list-subheader"
        component="nav"
        sx={{
          bgcolor: 'background.primary',
          flex: 'none',
          flexGrow: 1,
          order: 3,
          paddingTop: 0,
          width: '100%',
        }}
      >
        <>
          <ListItemButton
            component={Link}
            disableRipple
            sx={{
              '&:hover': {
                bgcolor: 'primary.main',
              },
              color: 'primary.main',
              backgroundColor: 'primary.main',
            }}
            to="/"
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="InvenMan" />
          </ListItemButton>

          <Divider />
          <Box>{menuItemList(props.open, openNested, handleClick)}</Box>
        </>
      </List>
      <Box
        align-self="stretch"
        flex="none"
        flex-grow="0"
        order="5"
        sx={{
          maxWidth: props.open ? '240px' : '55px',
        }}
      >
        <Divider />
        <ListItemButton
          onClick={handleColorMode.toggleColorMode}
          sx={{
            height: '48px',
          }}
        >
          <ListItemIcon>
            <QrCode2Icon />
          </ListItemIcon>
          <ListItemText
            primary="Scanner"
            sx={{
              opacity: props.open ? 1 : 1,
            }}
          />
        </ListItemButton>
        <Divider />
        <ListItemButton
          sx={{
            height: '48px',
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            sx={{
              opacity: props.open ? 1 : 1,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default SideMenu;
