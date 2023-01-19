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
import { useGetLicenses } from 'features/assets/api';
import { type IAssetLicenses } from 'features/assets/types';
import { useState } from 'react';
import { isArrayEmpty } from 'utils';
import NoResult from './noResult';

export const AssetLicenses = ({ id }: { id: number }) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const { data: licenses } = useGetLicenses<IAssetLicenses>({
    per_page: pageSize,
    page: page,
    model: 'assets',
    model_id: id,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (
    <Box mb={4}>
      {isArrayEmpty(licenses?.data) ? (
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
                    <TableCell>Name</TableCell>
                    <TableCell>Key</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Expiration date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {licenses?.data.map((license: any) => {
                    return (
                      <TableRow key={license.id}>
                        <TableCell>{license.name}</TableCell>
                        <TableCell>{license.product_key}</TableCell>
                        <TableCell>{license.email}</TableCell>
                        <TableCell>{license.expiration_date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30]}
              component="div"
              count={licenses ? licenses.total : 0}
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
