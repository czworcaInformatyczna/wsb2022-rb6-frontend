import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { SelectInput } from 'components/Elements/FormInputs';
import { useGetAssets } from 'features/components';
import { useGetUsers } from 'features/users/api';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { routePath } from 'routes';
import { getVariant } from 'utils';
import { useDeployLicense } from '../api';
import { type IDeploy, type IDeployForm } from '../types';

const DeployLicense = () => {
  const navigate = useNavigate();
  const methods = useForm<IDeployForm>();
  const { handleSubmit, reset, watch, control } = methods;
  const watchStatus = watch('model');
  const { id } = useParams();
  const { data: users } = useGetUsers();
  const { enqueueSnackbar } = useSnackbar();
  const deployLicense = useDeployLicense<IDeploy>(Number(id));
  const { data: assets } = useGetAssets();

  useEffect(() => {
    if (id === undefined) navigate(routePath.licenses);
  }, [id, navigate]);

  const onSubmit = async (data: IDeployForm) => {
    const modelId = data.model === 'asset' ? data?.asset?.id : data?.user?.id;
    const tempData: IDeploy = {
      model: data.model,
      model_id: modelId ? modelId : null,
    };
    if (id !== undefined)
      deployLicense.mutate(tempData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('License has been deploed', { variant });
          navigate(-1);
          reset();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          const variant = getVariant('error');
          enqueueSnackbar(e.message, { variant });
          console.log(e);
        },
      });
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
      <Box>
        <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Typography color="primary" ml={2} variant="h4">
              Deploy License
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
              <Grid
                mt={2}
                alignContent="center"
                display="flex"
                item
                justifyContent="center"
                lg={12}
                mb={2}
                md={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <FormControl>
                  <FormLabel id="deploy-radio-group">Deploy to</FormLabel>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="model"
                    defaultValue="user"
                    render={({ field }) => (
                      <RadioGroup row {...field}>
                        <FormControlLabel value="asset" control={<Radio />} label="Asset" />
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
              {watchStatus === 'user' ? (
                <SelectInput
                  label="User"
                  name="user"
                  options={users ? users.data : []}
                  createButton={false}
                />
              ) : null}
              {watchStatus === 'asset' ? (
                <SelectInput
                  label="Asset"
                  name="asset"
                  options={assets ? assets.data : []}
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
                  Deploy
                </Button>
              </Stack>
            </Grid>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default DeployLicense;
