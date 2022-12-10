import { Box, Button, Divider, Grid, Typography } from '@mui/material';

import { TextInput } from 'components/Elements/FormInputs';
import { useGetAssetsDataById } from 'features/assets';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { convertUrl, getVariant } from 'utils';
import { useAddManufacturer, useUpdateManufacturer } from '../api';
import { type IsModal, type IManufacturer } from '../types';

export const AddManufacturer = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IManufacturer>();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const { handleSubmit, setError, reset } = methods;
  const addManufacturer = useAddManufacturer<IManufacturer>(apiUrl.addManufacturer);
  const updateManufacturer = useUpdateManufacturer<IManufacturer>();
  const { data: manufacturer, refetch } = useGetAssetsDataById<IManufacturer>(
    Number(id),
    convertUrl(apiUrl.manufacturerById, { id }),
    action === 'Add' ? false : true,
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );

  useEffect(() => {
    reset();
    const isEdit = location.pathname.includes('Edit');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setAction('Edit');
      if (manufacturer !== undefined) {
        void refetch();
        reset({ name: manufacturer.name });
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [manufacturer, id, isIdNotValid, location.pathname, navigate, refetch, reset]);

  const onSubmit = async (data: IManufacturer) => {
    if (action === 'Add')
      addManufacturer.mutate(data, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('Manufacturer has been added', { variant });
          reset();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          setError('name', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });

    if (action === 'Edit' && id)
      updateManufacturer.mutate(
        { id: id, body: data },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Manufacturer has been updated', { variant });
            navigate(routePath.manufacturers);
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            setError('name', { type: 'server', message: e.message }, { shouldFocus: false });
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
          <Typography ml={2} variant="h4">
            {action} manufacturer
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
            <TextInput label="Name" name="name" rules={{ required: 'Required value' }} />
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
                {action}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};
