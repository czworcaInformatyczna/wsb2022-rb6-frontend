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
import { type IAssetFiles } from 'features/assets/types';
import { useState } from 'react';
import downloadFile from 'utils/downloadFile';
import { apiUrl } from 'routes';
import { changeDateTimeFormat, isArrayEmpty } from 'utils';
import NoResult from './noResult';
import { CreateModal } from 'components/Elements/CreateModal';
import UploadFile from './UploadFile';
import { useAuth } from 'providers/AuthProvider';

export const AssetFiles = ({ id }: { id: number }) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const { auth } = useAuth();
  const { data: files } = useGetAssetFile<IAssetFiles>(apiUrl.assetFiles, {
    asset_id: id,
    per_page: pageSize,
    page: page,
  });
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

  return (
    <Box mb={4}>
      {isArrayEmpty(files?.data) ? (
        <NoResult />
      ) : (
        <Grid alignItems="center" container pt={2} pl={2} pr={2} spacing={2}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{ margin: 1 }}
            >
              Upload file
            </Button>
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
                    <TableCell>Notes</TableCell>
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
                        <TableCell>{file.notes}</TableCell>
                        <TableCell>{file.uploader.email}</TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            sx={{ margin: 1 }}
                            color="success"
                            onClick={() => {
                              downloadFile(
                                apiUrl.assetFiles + '/' + file.id + '/download',
                                file.name,
                                auth.token ? auth.token : '',
                              );
                            }}
                          >
                            Download
                          </Button>
                          <Button variant="contained" sx={{ margin: 1 }} color="error">
                            Delete
                          </Button>
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
        content={<UploadFile assetId={id} closeModal={closeModal} />}
      />
    </Box>
  );
};
