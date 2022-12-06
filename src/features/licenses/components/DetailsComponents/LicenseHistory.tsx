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
import NoResult from 'features/assets/components/detailsComponents/noResult';
import { useGetLicenseHistory } from 'features/licenses/api';
import { type ILicenseHistory } from 'features/licenses/types';
import { useState } from 'react';
import { apiUrl } from 'routes';
import { changeDateTimeFormat, convertUrl, isArrayEmpty } from 'utils';

export const LicenseHistory = ({ id }: { id: number }) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const { data: history } = useGetLicenseHistory<ILicenseHistory>(
    convertUrl(apiUrl.licenseHistory, { id }),
    {
      per_page: pageSize,
      page: page + 1,
    },
  );

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
                    <TableCell width="15%">Date</TableCell>
                    <TableCell width="20%">User</TableCell>
                    <TableCell width="15%">Action</TableCell>
                    <TableCell width="15%">Target</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history?.data.map((action: any) => {
                    return (
                      <TableRow key={action.id}>
                        <TableCell>{changeDateTimeFormat(action.created_at)}</TableCell>
                        <TableCell>{action.user.email}</TableCell>
                        <TableCell>{action.action}</TableCell>
                        <TableCell>
                          {action.licencable.email
                            ? action.licencable.email
                            : action.licencable.name}
                        </TableCell>
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
