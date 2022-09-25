import { Box, CircularProgress, Typography } from '@mui/material';
import { type LoadingProps } from './domain';

const LoadingScreen = ({ size = 200, displayText = false }: LoadingProps) => {
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
        <CircularProgress size={size} sx={{ alignSelf: 'center' }} />
        {displayText && <Typography variant="h4"> Loading... Please wait...</Typography>}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
