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

export const LoginBox = styled(Box)(() => {
  return {
    backgroundColor: '#2C387E',
    height: '100vh',
    minHeight: '120%',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeft: '2px solid #0A7FB1',
  };
});

export const ActionButton = styled(Button)(() => {
  return {
    backgroundColor: '#3f51b5',
    display: 'flex',
    margin: 'auto',
    marginTop: '5%',
    color: '#ffffff',
  };
});

export const focusColors = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0A7FB1' },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      borderColor: '#0A7FB1',
    },
  },
};
