import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  Button,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useGetAssetFile } from 'features/assets/api';
import { useState } from 'react';
import downloadFile from 'utils/downloadFile';
import { apiUrl } from 'routes';
import { changeDateTimeFormat, convertUrl, isArrayEmpty } from 'utils';

import { CreateModal } from 'components/Elements/CreateModal';

import { useConfirm } from 'material-ui-confirm';
import { useTheme } from '@mui/material/styles';
import { getVariant } from 'utils';
import { useSnackbar } from 'notistack';
import { type ILicenseFiles } from 'features/licenses/types';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import UploadFile from 'features/assets/components/detailsComponents/UploadFile';
import { useDeleteLicenseFile } from 'features/licenses/api';

export const LicensesFiles = ({ id, isManage }: { id: number; isManage: boolean }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirm = useConfirm();
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { data: files } = useGetAssetFile<ILicenseFiles>(convertUrl(apiUrl.licenseFile, { id }), {
    asset_id: id,
    per_page: pageSize,
    page: page + 1,
  });
  const deleteFile = useDeleteLicenseFile(id);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = (file_id: number) => {
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
        deleteFile.mutate(file_id, {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('File has been deleted', { variant });
          },
        });
        return null;
      })
      .catch(() => {});
  };

  return (
    <Box mb={4}>
      {isManage && (
        <Button color="primary" variant="contained" onClick={() => setOpen(true)} sx={{ ml: 2 }}>
          Upload file
        </Button>
      )}
      {isArrayEmpty(files?.data) ? (
        <NoResult />
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <TableContainer sx={{ maxHeight: 440 }}>
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
                    <TableCell>Extension</TableCell>
                    <TableCell>Size (Kb)</TableCell>
                    <TableCell>Upload date</TableCell>
                    <TableCell>Uploaded by</TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files?.data.map((file: any) => {
                    return (
                      <TableRow key={file.id}>
                        <TableCell width="30%">{file.name}</TableCell>
                        <TableCell>{file.extension}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{changeDateTimeFormat(file.created_at)}</TableCell>

                        <TableCell>{file.uploader.email}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            sx={{ margin: 1 }}
                            color="success"
                            onClick={() => {
                              downloadFile(
                                convertUrl(apiUrl.downloadLicenseFile, { id: file.id }),
                                file.name,
                              );
                            }}
                          >
                            Download
                          </Button>
                          {isManage && (
                            <Button
                              variant="contained"
                              sx={{ margin: 1 }}
                              onClick={() => handleDelete(file.id)}
                              color="error"
                            >
                              Delete
                            </Button>
                          )}
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
              count={files ? files.total : 0}
              rowsPerPage={pageSize}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      )}
      <CreateModal
        open={open}
        setOpen={setOpen}
        content={<UploadFile type="License" assetId={id} closeModal={closeModal} />}
      />
    </Box>
  );
};
