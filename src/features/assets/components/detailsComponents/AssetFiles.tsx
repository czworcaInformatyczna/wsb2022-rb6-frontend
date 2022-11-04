import { Box, Table, TableBody, TableRow, TableCell, Grid, TableHead, Button } from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import { type IAssetFiles } from 'features/assets/types';
import { apiUrl } from 'routes';
import { isArrayEmpty } from 'utils';
import NoResult from './noResult';

export const AssetFiles = ({ id }: { id: number }) => {
  const { data: files } = useGetAssetsDataById<IAssetFiles[]>(Number(id), apiUrl.assetFiles);

  return (
    <Box mb={4}>
      {isArrayEmpty(files) ? (
        <NoResult />
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
                  <TableCell>Name</TableCell>
                  <TableCell>Extension</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Upload date</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files?.map((file: any) => {
                  return (
                    <TableRow key={file.id}>
                      <TableCell width="30%">{file.name}</TableCell>
                      <TableCell>{file.extension}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.upload_date}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="success">
                          Download
                        </Button>
                      </TableCell>
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
