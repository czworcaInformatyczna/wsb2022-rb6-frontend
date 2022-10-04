import { Statuses } from 'features/assets';
import { Box, Chip } from '@mui/material';

export const StatusChip = (status: string) => {
  return (
    <Box>
      {(() => {
        switch (status) {
          case Statuses.ReadyToDeploy:
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
          case Statuses.Deployed:
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
          case Statuses.Maintenance:
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
          case Statuses.Archived:
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
