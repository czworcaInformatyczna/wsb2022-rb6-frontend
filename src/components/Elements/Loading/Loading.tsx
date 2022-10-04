import { Box, CircularProgress, Typography } from '@mui/material';

export interface LoadingProps {
  displayText?: boolean;
  size?: number;
  textSize?: TextSize;
}
export enum TextSize {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export const LoadingScreen = ({
  size = 200,
  displayText = false,
  textSize = TextSize.H3,
}: LoadingProps) => {
  return (
    <Box
      alignContent="center"
      data-testid="loadingBox"
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
