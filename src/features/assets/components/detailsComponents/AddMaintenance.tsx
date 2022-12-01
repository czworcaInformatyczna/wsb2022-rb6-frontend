import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import {
  DatePickerInput,
  TextInput,
  MultiLineTextInput,
  SelectInput,
} from 'components/Elements/FormInputs';
import { useAddAssetMaintenances } from 'features/assets/api';
import { type IMaintenance, type IMaintenanceForm } from 'features/assets/types';
import { type IsModal } from 'features/manufacturer/types';
import { useGetUsers } from 'features/users/api';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { apiUrl } from 'routes';
import { getVariant } from 'utils';

export const AddMaintenance = ({ isModal = false }: IsModal) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IMaintenanceForm>();
  const { handleSubmit, setError } = methods;
  const addManufacturer = useAddAssetMaintenances<IMaintenance>(apiUrl.assetMaintenances);
  const { data: users } = useGetUsers();
  const navigate = useNavigate();
  const onSubmit = async (data: IMaintenanceForm) => {
    if (id) data.asset_id = Number(id);
    const tempData = {
      ...data,
      maintenance_type: data.maintenance_type.id,
      user_id: data.user_id.id,
    };

    addManufacturer.mutate(tempData, {
      onSuccess: () => {
        const variant = getVariant('success');
        enqueueSnackbar('Maintenance has been added', { variant });
        navigate(-1);
      },
      onError(error) {
        const e: { message: string } = error.response?.data as { message: string };
        setError('title', { type: 'server', message: e.message }, { shouldFocus: false });
      },
    });
  };

  const types = [
    {
      id: 'repair',
      name: 'Repair',
    },
    {
      id: 'clean',
      name: 'Clean',
    },
    {
      id: 'software_instalation',
      name: 'Software instalation',
    },
    {
      id: 'os_reinstall',
      name: 'OS reinstall',
    },
  ];

  return (
    <Box
      alignSelf="center"
      sx={{
        width: isModal ? '100%' : { lg: '60%', xs: '100%' },
        flexGrow: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        marginTop: 2,
      }}
    >
      <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography pl={2} variant="h4">
            Add maintenance
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
            <TextInput label="Title" name="title" rules={{ required: 'Required value' }} />
            <SelectInput
              label="User"
              name="user_id"
              options={users ? users.data : []}
              createButton={false}
            />
            <SelectInput
              label="type"
              name="maintenance_type"
              options={types}
              createButton={false}
            />
            <DatePickerInput label="Start" name="start_date" />
            <DatePickerInput label="End" name="end_date" />
            <MultiLineTextInput label="Notes" name="notes" rows={4} />
            <Grid
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
              <Button
                color="success"
                type="submit"
                variant="contained"
                sx={{
                  marginRight: 2,
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};
