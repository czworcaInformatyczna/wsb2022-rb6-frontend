import { Box, Typography } from '@mui/material';

const NoResult = () => {
  return (
    <Box
      m={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'secondary.main',
        minHeight: '50px',
        borderRadius: 1,
      }}
    >
      <Typography m={2}>No Results</Typography>
    </Box>
  );
};

export default NoResult;
