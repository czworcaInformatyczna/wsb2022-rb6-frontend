import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      alignContent="center"
      display="flex"
      justifyContent="center"
      sx={{
        backgroundColor: 'background.default',
      }}
    >
      <Box alignContent="center" display="flex" flexDirection="column">
        <CircularProgress size={200} sx={{ alignSelf: 'center' }} />
        <Typography variant="h4"> Loading... Please wait...</Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
