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
  Stack,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import { type IMaintenance, type IAssetMaintenances } from 'features/assets/types';
import NoResult from './noResult';
import { apiUrl, routePath } from 'routes';
import { changeDateTimeFormat, convertUrl, getVariant, isArrayEmpty } from 'utils';
import { useDeleteMaintenance, useGetAssetMaintenances } from 'features/assets/api';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import { useConfirm } from 'material-ui-confirm';

export const AssetMaintenance = ({ id }: { id: number }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const deleteMaintenance = useDeleteMaintenance();
  const { data: maintenances } = useGetAssetMaintenances<IAssetMaintenances>(
    apiUrl.assetMaintenances,
    {
      asset_id: id,
      per_page: pageSize,
      page: page,
    },
  );
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const handleDelete = (maintenanceId: number) => {
    const bgColor = { sx: { backgroundColor: theme.palette.background.paper } };
    confirm({
      title: (
        <Box component="span" sx={{ color: 'error.main' }}>
          Are you sure?
        </Box>
      ),
      description: (
        <Box component="span" sx={{ color: theme.palette.text.primary }}>
          This action is permanent!
        </Box>
      ),
      contentProps: bgColor,
      titleProps: bgColor,
      dialogActionsProps: bgColor,
      confirmationButtonProps: { variant: 'contained', color: 'success' },
      cancellationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(() => {
        deleteMaintenance.mutate(maintenanceId, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Maintenance has been deleted', { variant });
          },
        });
        return null;
      })
      .catch(() => {});
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
                    <TableCell>{}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maintenances?.data.map((action: IMaintenance) => {
                    return (
                      <TableRow key={action.id}>
                        <TableCell>{action.title}</TableCell>
                        <TableCell>{action.maintenance_type}</TableCell>
                        <TableCell>{changeDateTimeFormat(action.start_date)}</TableCell>
                        <TableCell>{changeDateTimeFormat(action.end_date)}</TableCell>
                        <TableCell>{action.user?.email}</TableCell>
                        <TableCell>{action.notes}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Edit">
                              <IconButton
                                onClick={() =>
                                  navigate(
                                    convertUrl(routePath.editAssetMaintenances, { id: action.id }),
                                  )
                                }
                                color="warning"
                                aria-label="edit"
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => {
                                  if (action.id !== undefined) handleDelete(action.id);
                                }}
                                color="error"
                                aria-label="delete"
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </Tooltip>
                          </Stack>
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
