import { Container, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from 'features/login/assets/login_background.jpg';

export const BackgroundContainer = styled(Container)(({ theme }) => {
  return {
    background: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    height: '100vh',
    minHeight: '120%',
    width: '100%',
    minWidth: '100%',
    color: theme.palette.grey[300],
  };
});

export const LoginBox = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.dark,
    height: '100vh',
    minHeight: '120%',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '2px solid ' + theme.palette.primary.main,
  };
});

export const ActionButton = styled(Button)(({ theme }) => {
  return {
    display: 'flex',
    margin: 'auto',
    marginTop: '5%',
    color: theme.palette.text.primary,
  };
});

export const focusColors = {
  '& .MuiInputLabel-root.Mui-focused': { color: 'secondary.main' },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: 'secondary.main',
    },
  },
};
