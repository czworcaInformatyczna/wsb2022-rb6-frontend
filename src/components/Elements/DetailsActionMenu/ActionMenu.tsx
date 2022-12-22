import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';

import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

export const ActionMenu = ({ children }: IProps): JSX.Element => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <>
      <Box mr={1}>
        <Button
          variant="contained"
          color="primary"
          aria-controls={open ? 'account-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
        >
          Actions
        </Button>
      </Box>
      <Menu
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
        {children}
      </Menu>
    </>
  );
};
