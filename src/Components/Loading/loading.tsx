import { Box, CircularProgress, Typography } from '@mui/material';
import { TextSize, type LoadingProps } from './domain';

const LoadingScreen = ({
  size = 200,
  displayText = false,
  textSize = TextSize.H3,
}: LoadingProps) => {
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
        {displayText && <Typography variant={textSize}> Loading... Please wait...</Typography>}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
