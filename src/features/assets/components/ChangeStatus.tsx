import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { SelectInput } from 'components/Elements/FormInputs';

import { LoadingScreen } from 'components/Elements/Loading';
import { useGetUsers } from 'features/users/api';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { getVariant } from 'utils';
import { useGetAssetsDataById, useUpdateAsset } from '../api';
import { StatusesList } from '../api/statuses';
import { type IAssetFormInput, type IAssetDetails, type IChangeStatus, Statuses } from '../types';

const ChangeStatus = () => {
  const navigate = useNavigate();
  const methods = useForm<IAssetFormInput>();
  const statusOptions = StatusesList;

  const { handleSubmit, reset, watch } = methods;
  const watchStatus = watch('Status');
  const { id } = useParams();
  const {
    data: assetDetails,
    isFetched,
    isLoading,
    isError,
  } = useGetAssetsDataById<IAssetDetails>(Number(id), apiUrl.assetInfo + id);
  const { data: users } = useGetUsers();
  const { enqueueSnackbar } = useSnackbar();
  const updateAsset = useUpdateAsset();

  useEffect(() => {
    if (id === undefined) navigate(routePath.assets);
    else {
      const statusObject = statusOptions?.find((option) => option.id === assetDetails?.status);
      reset({ Status: statusObject });
    }
  }, [assetDetails?.status, id, navigate, reset, statusOptions]);

  const onSubmit = async (data: IAssetFormInput) => {
    const tempData: IChangeStatus = {
      ...(data.current_holder_id && {
        current_holder_id: data.Status?.id === Statuses.Deployed ? data.current_holder_id.id : null,
      }),
      status: data.Status?.id,
    };
    if (id !== undefined)
      updateAsset.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Status has been changed', { variant });
            navigate('/AssetDetails/' + id);
            reset();
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            console.log(e);
          },
        },
      );
  };

  return (
    <Box
      alignSelf="center"
      sx={{
        width: { lg: '60%', xs: '100%' },
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      {isLoading && <LoadingScreen displayText />}
      {isError && <Typography color="error">Asset id is not valid</Typography>}
      {isFetched && !isError && !isLoading && assetDetails && (
        <Box>
          <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
              <Typography color="primary" ml={2} variant="h4">
                Change Status - {assetDetails.name}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: '100%',
              }}
            >
              <Grid alignContent="center" container display="flex" item mt={2} spacing={2}>
                <SelectInput
                  label="Status"
                  name="Status"
                  options={statusOptions ? statusOptions : []}
                  createButton={false}
                />
                {watchStatus?.id === Statuses.Deployed ? (
                  <SelectInput
                    label="User"
                    name="current_holder_id"
                    options={users ? users.data : []}
                    createButton={false}
                  />
                ) : null}
              </Grid>
              <Grid
                mt={2}
                alignContent="center"
                display="flex"
                item
                justifyContent="flex-end"
                lg={12}
                mb={2}
                md={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <Stack direction="row" mr={2} spacing={1}>
                  <Button color="error" onClick={() => navigate(-1)} variant="contained">
                    Cancel
                  </Button>
                  <Button color="success" type="submit" variant="contained">
                    Change
                  </Button>
                </Stack>
              </Grid>
            </form>
          </FormProvider>
        </Box>
      )}
    </Box>
  );
};

export default ChangeStatus;
