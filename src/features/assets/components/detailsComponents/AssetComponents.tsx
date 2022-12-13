import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  TablePagination,
  TableContainer,
} from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import NoResult from './noResult';
import { apiUrl } from 'routes';
import { type IAssetComponents } from 'features/assets/types';
import { convertUrl, isArrayEmpty } from 'utils';
import { useState } from 'react';

export const AssetComponents = ({ id }: { id: number }) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);

  const { data: components } = useGetAssetsDataById<IAssetComponents>(
    Number(id),
    convertUrl(apiUrl.components, {
      asset_id: id,
      per_page: pageSize,
      page: page + 1,
    }),
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (
    <Box mb={4}>
      {isArrayEmpty(components?.data) ? (
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
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Serial</TableCell>
                    <TableCell>Category </TableCell>
                    <TableCell>Manufacturer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {components?.data.map((component: any) => {
                    return (
                      <TableRow key={component.id}>
                        <TableCell>{component.id}</TableCell>
                        <TableCell>{component.name}</TableCell>
                        <TableCell>{component.serial}</TableCell>
                        <TableCell>{component.asset_component_category.name}</TableCell>
                        <TableCell>{component.manufacturer.name}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={components ? components.total : 0}
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
