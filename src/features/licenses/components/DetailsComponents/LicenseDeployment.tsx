import {
  Box,
  Table,
  TableBody,
  Grid,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableContainer,
} from '@mui/material';
import { useGetAssetsDataById } from 'features/assets/api';
import NoResult from 'features/assets/components/detailsComponents/noResult';
import { useDetachLicense } from 'features/licenses/api';
import { type IDeploy, type ILicenseDeploys } from 'features/licenses/types';
import { useSnackbar } from 'notistack';
import { apiUrl } from 'routes';
import { convertUrl, getVariant, isArrayEmpty } from 'utils';

export const LicenseDeployment = ({ id }: { id: number }) => {
  const { data: licenseDeploys } = useGetAssetsDataById<ILicenseDeploys>(
    Number(id),
    convertUrl(apiUrl.licenseDeploys, { id: id }),
  );
  const detachLicense = useDetachLicense<IDeploy>(id);
  const { enqueueSnackbar } = useSnackbar();
  const handleDetach = (model: string, modelId: number) => {
    const tempData = {
      model: model,
      model_id: modelId,
    };
    detachLicense.mutate(
      { id: id.toString(), body: tempData },
      {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('License has been returned', { variant });
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          const variant = getVariant('error');
          enqueueSnackbar(e.message, { variant });
        },
      },
    );
  };

  return (
    <Box mb={4}>
      {isArrayEmpty(licenseDeploys?.users) && isArrayEmpty(licenseDeploys?.assets) ? (
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
                    <TableCell>Deployed to</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right" width="10%">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {licenseDeploys?.users.map((deploy) => {
                    return (
                      <TableRow key={deploy.pivot.licencable_id}>
                        <TableCell>{deploy.email}</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleDetach('user', deploy.id)}
                            variant="contained"
                            color="error"
                          >
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {licenseDeploys?.assets.map((deploy) => {
                    return (
                      <TableRow key={deploy.pivot.licencable_id}>
                        <TableCell>{deploy.name}</TableCell>
                        <TableCell>Asset</TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => handleDetach('asset', deploy.id)}
                            variant="contained"
                            color="error"
                          >
                            Return
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

// id: number;
// notes: string;
// orderNumber: number;
