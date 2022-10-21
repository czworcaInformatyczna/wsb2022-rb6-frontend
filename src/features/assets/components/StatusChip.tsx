import { Statuses } from 'features/assets';
import { Box, Chip, Typography } from '@mui/material';

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
                  <Box textAlign="center" width="110px">
                    <Typography fontWeight="bold" fontSize="14px">
                      {status}
                    </Typography>
                  </Box>
                }
              />
            );
          case Statuses.Deployed:
            return (
              <Chip
                color="info"
                label={
                  <Box textAlign="center" width="110px">
                    <Typography fontWeight="bold">{status}</Typography>
                  </Box>
                }
              />
            );
          case Statuses.Maintenance:
            return (
              <Chip
                color="warning"
                label={
                  <Box textAlign="center" width="110px">
                    <Typography fontWeight="bold">{status}</Typography>
                  </Box>
                }
              />
            );
          case Statuses.Archived:
            return (
              <Chip
                color="error"
                label={
                  <Box textAlign="center" width="110px">
                    <Typography fontWeight="bold">{status}</Typography>
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
