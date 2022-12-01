import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
import { type IAssetMaintenances } from 'features/assets/types';
import NoResult from './noResult';
import { apiUrl, routePath } from 'routes';
import { changeDateTimeFormat, convertUrl, isArrayEmpty } from 'utils';
import { useGetAssetMaintenances } from 'features/assets/api';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const AssetMaintenance = ({ id }: { id: number }) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const { data: maintenances } = useGetAssetMaintenances<IAssetMaintenances>(
    apiUrl.assetMaintenances,
    {
      asset_id: id,
      per_page: pageSize,
      page: page,
    },
  );
  console.log(maintenances);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (
    <Box mb={4}>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate(convertUrl(routePath.addAssetMaintenance, { id }))}
        sx={{
          ml: 2,
        }}
      >
        Add maintenance
      </Button>
      {isArrayEmpty(maintenances?.data) ? (
        <NoResult />
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <TableContainer>
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
                    <TableCell width="20%">Title</TableCell>
                    <TableCell width="10%">Maintenance type</TableCell>
                    <TableCell width="10%">Start date</TableCell>
                    <TableCell width="10%">End date</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Notes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maintenances?.data.map((action: any) => {
                    return (
                      <TableRow key={action.id}>
                        <TableCell>{action.title}</TableCell>
                        <TableCell>{action.maintenance_type}</TableCell>
                        <TableCell>{changeDateTimeFormat(action.start_date)}</TableCell>
                        <TableCell>{changeDateTimeFormat(action.end_date)}</TableCell>
                        <TableCell>{action.user}</TableCell>
                        <TableCell>{action.notes}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={maintenances ? maintenances.total : 0}
              rowsPerPage={pageSize}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
