import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  Typography,
} from '@mui/material';
import { useGetAssetHistory } from 'features/assets/api';

export const AssetHistory = ({ id }: { id: number }) => {
  const { data: history } = useGetAssetHistory(Number(id));

  return (
    <Box mb={4}>
      {history === undefined || history.length === 0 ? (
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
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Table
              sx={{
                backgroundColor: 'background.default',
              }}
            >
              <TableHead
                sx={{
                  backgroundColor: 'secondary.main',
                }}
              >
                <TableRow>
                  <TableCell width="10%">Date</TableCell>
                  <TableCell width="10%">User</TableCell>
                  <TableCell width="15%">Action</TableCell>
                  <TableCell>Target</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history.map((action: any) => {
                  return (
                    <TableRow key={action.id}>
                      <TableCell>{action.date}</TableCell>
                      <TableCell>{action.user}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>{action.target}</TableCell>
                      <TableCell>{action.notes}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
