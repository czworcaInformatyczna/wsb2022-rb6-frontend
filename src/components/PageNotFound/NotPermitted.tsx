import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import BlockIcon from '@mui/icons-material/Block';

export const NotPermitted = () => {
  return (
    <Box>
      <Typography align="center" variant="h2" color="error">
        Permission denied
      </Typography>
      <Typography align="center" variant="h1" color="error">
        <BlockIcon fontSize="inherit" />
      </Typography>
    </Box>
  );
};
