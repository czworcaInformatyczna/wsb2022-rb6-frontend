import { Box, Chip } from '@mui/material';

const StatusChip = (status: string) => {
  return (
    <Box>
      {(() => {
        switch (status) {
          case 'Ready to deploy':
            return (
              <Chip
                color="success"
                label={
                  <Box textAlign="center" width="100px">
                    {status}
                  </Box>
                }
              />
            );
          case 'Deployed':
            return (
              <Chip
                color="info"
                label={
                  <Box textAlign="center" width="100px">
                    {status}
                  </Box>
                }
              />
            );
          case 'Maintenance':
            return (
              <Chip
                color="warning"
                label={
                  <Box textAlign="center" width="100px">
                    {status}
                  </Box>
                }
              />
            );
          case 'Archived':
            return (
              <Chip
                color="error"
                label={
                  <Box textAlign="center" width="100px">
                    {status}
                  </Box>
                }
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
