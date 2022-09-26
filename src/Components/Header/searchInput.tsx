import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import * as React from 'react';

const Search = styled('div')(({ theme }) => {
  return {
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing(2),
    maxWidth: '300px',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  };
});

const SearchIconWrapper = styled('div')(({ theme }) => {
  return {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    position: 'absolute',
  };
});

const StyledInputBase = styled(InputBase)(({ theme }) => {
  return {
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    color: 'inherit',
  };
});

const SearchInput = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        inputProps={{
          'aria-label': 'search',
        }}
        placeholder="Search…"
      />
    </Search>
  );
};

export default SearchInput;
