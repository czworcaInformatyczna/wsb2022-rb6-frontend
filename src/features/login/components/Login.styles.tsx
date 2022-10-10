import { Container, Box, Button } from '@mui/material';
import { styled } from '@mui/system';
import BackgroundImage from 'features/login/assets/login_background.jpg';

export const BackgroundContainer = styled(Container)({
  background: `url(${BackgroundImage})`,
  backgroundSize: 'cover',
  position: 'fixed',
  top: '-10%',
  left: '0',
  minHeight: '120%',
  minWidth: '100%',
});

export const LoginBox = styled(Box)(({ theme }) => {
  return {
    backgroundColor: theme.palette.background.dark,
    padding: '1rem',
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '15rem',
  };
});

export const ActionButton = styled(Button)(({ theme }) => {
  return {
    marginTop: '5%',
    marginLeft: '50%',
    color: theme.palette.text.primary,
  };
});
