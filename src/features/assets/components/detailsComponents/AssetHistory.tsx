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
} from '@mui/material';
import { useGetAssetHistory } from 'features/assets/api';
import { type IAssetHistory } from 'features/assets/types';
import { useState } from 'react';
import { apiUrl } from 'routes';
import { changeDateTimeFormat, isArrayEmpty } from 'utils';
import NoResult from './noResult';

export const AssetHistory = ({ id }: { id: number }) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const { data: history } = useGetAssetHistory<IAssetHistory>(apiUrl.assetHistory, {
    item_type: 'asset',
    per_page: pageSize,
    page: page,
    item_id: id,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const getObjectKeys = (obj: {}) => {
    let result = '';
    Object.keys(obj).map((value) => (result += value + ', '));
    return result;
  };

  return (
    <Box mb={4}>
      {isArrayEmpty(history?.data) ? (
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
                    <TableCell width="10%">Date</TableCell>
                    <TableCell width="10%">User</TableCell>
                    <TableCell width="15%">Action</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history?.data.map((action: any) => {
                    return (
                      <TableRow key={action.id}>
                        <TableCell>{changeDateTimeFormat(action.updated_at)}</TableCell>
                        <TableCell>{action.user_id}</TableCell>
                        <TableCell>{action.action_type}</TableCell>
                        <TableCell>{action.target}</TableCell>
                        <TableCell>{getObjectKeys(action.description)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={history ? history.total : 0}
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
