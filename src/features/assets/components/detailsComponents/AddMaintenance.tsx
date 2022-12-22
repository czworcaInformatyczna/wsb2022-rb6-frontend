import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import {
  DatePickerInput,
  TextInput,
  MultiLineTextInput,
  SelectInput,
} from 'components/Elements/FormInputs';
import {
  useAddAssetMaintenances,
  useEditAssetMaintenances,
  useGetAssetsDataById,
} from 'features/assets/api';
import {
  type IMaintenance,
  type IMaintenanceDetails,
  type IMaintenanceForm,
} from 'features/assets/types';
import { type IsModal } from 'features/manufacturer/types';
import { useGetUsers } from 'features/users/api';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { convertUrl, getVariant } from 'utils';

export const AddMaintenance = ({ isModal = false }: IsModal) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IMaintenanceForm>();
  const { handleSubmit, setError, reset } = methods;
  const addMaintenance = useAddAssetMaintenances<IMaintenance>(apiUrl.assetMaintenances);
  const { data: users } = useGetUsers({ per_page: 30 });
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const editMaintenance = useEditAssetMaintenances<IMaintenance>();
  const types = useMemo(
    () => [
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
    ],
    [],
  );

  const { data: maintenance, refetch } = useGetAssetsDataById<IMaintenanceDetails>(
    Number(id),
    convertUrl(apiUrl.assetMaintenanceEdit, { id }),
    action === 'Add' ? false : true,
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );
  const setValues = useCallback(
    (values: IMaintenanceDetails) => {
      reset({
        title: values.title,
        user_id: values.user,
        maintenance_type: types.find((x) => (x.name = values.maintenance_type)),
        start_date: values.start_date,
        end_date: values.end_date,
        notes: values.notes,
      });
    },
    [reset, types],
  );

  useEffect(() => {
    const isEdit = location.pathname.includes('Edit');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setAction('Edit');
      if (maintenance !== undefined) {
        void refetch();
        setValues(maintenance);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [id, isIdNotValid, location.pathname, maintenance, navigate, refetch, reset, setValues]);

  const onSubmit = async (data: IMaintenanceForm) => {
    if (id) data.asset_id = Number(id);
    const tempData = {
      ...data,
      maintenance_type: data.maintenance_type.id,
      user_id: data.user_id.id,
    };

    if (action === 'Add')
      addMaintenance.mutate(tempData, {
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
    if (action === 'Edit' && id !== undefined)
      editMaintenance.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Maintenance has been added', { variant });
            navigate(-1);
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            setError('title', { type: 'server', message: e.message }, { shouldFocus: false });
          },
        },
      );
  };

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
            {action} maintenance
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
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  marginRight: 2,
                }}
              >
                <Button onClick={() => navigate(-1)} color="error" variant="contained">
                  Cancel
                </Button>
                <Button color="success" type="submit" variant="contained">
                  {action}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};
