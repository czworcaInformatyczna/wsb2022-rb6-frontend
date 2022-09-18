import { Box, Chip } from '@mui/material';

const StatusChip = (status: string) => {
  return (
    <Box>
      {(() => {
        switch (status) {
          case 'Ready to deploy':
            return (
              <Chip
                label={
                  <Box width="100px" textAlign="center">
                    {status}
                  </Box>
                }
                color="success"
              />
            );
          case 'Deployed':
            return (
              <Chip
                label={
                  <Box width="100px" textAlign="center">
                    {status}
                  </Box>
                }
                color="info"
              />
            );
          case 'Maintenance':
            return (
              <Chip
                label={
                  <Box width="100px" textAlign="center">
                    {status}
                  </Box>
                }
                color="warning"
              />
            );
          case 'Archived':
            return (
              <Chip
                label={
                  <Box width="100px" textAlign="center">
                    {status}
                  </Box>
                }
                color="error"
              />
            );
          default:
            return <p>{status}</p>;
        }
      })()}
    </Box>
  );
};

export default StatusChip;
