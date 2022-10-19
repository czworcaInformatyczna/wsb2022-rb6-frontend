import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TableHead,
  Typography,
  Button,
} from '@mui/material';
import { useGetAssetFiles } from 'features/assets/api';

export const AssetFiles = ({ id }: { id: number }) => {
  const { data: files } = useGetAssetFiles(Number(id));

  return (
    <Box mb={4}>
      {files === undefined || files.length === 0 ? (
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
                  <TableCell>Name</TableCell>
                  <TableCell>Extension</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Upload date</TableCell>
                  <TableCell align="right"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((file: any) => {
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
