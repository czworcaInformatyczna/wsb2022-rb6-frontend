import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { CreateModal } from 'components/Elements/CreateModal';
import { DatePickerInput, SelectInput, TextInput } from 'components/Elements/FormInputs';
import { CheckBox } from 'components/Elements/FormInputs/CheckBox';
import { LoadingScreen } from 'components/Elements/Loading';
import { useGetAssetsDataById } from 'features/assets';
import { AddCategory } from 'features/category/components/AddCategory';
import { AddManufacturer } from 'features/manufacturer/components/AddManufacturer';
import { type IsModal } from 'features/manufacturer/types';
import { useGetManufacturer } from 'features/model/api';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { getVariant } from 'utils';

import { useAddLicense, useUpdateLicense, useGetLicenseCategory } from '../api';
import { type ILicenseFormInput, type ILicense } from '../types';

const AddLicense = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<ILicenseFormInput>();
  const { handleSubmit, setError, reset, setValue } = methods;
  const addLicense = useAddLicense<ILicense>();
  const updateLicense = useUpdateLicense<ILicense>();
  const { data: manufacturerOptions } = useGetManufacturer();
  const { data: categoryOptions } = useGetLicenseCategory();
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<Box />);
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: license, refetch } = useGetAssetsDataById<ILicense>(
    Number(id),
    apiUrl.licenses + '/' + id,
    action === 'Add' ? false : true,
  );
  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setOpen(true);
  };

  const setValues = useCallback(
    (assetValues: any) => {
      setValue('name', assetValues.name);
      setValue('product_key', assetValues.product_key);

      const categoryObject = categoryOptions?.data.find((option) => {
        return option.id === assetValues.category_id;
      });

      setValue('category_id', categoryObject !== undefined ? categoryObject : null);
      const manufacturerObject = manufacturerOptions?.find(
        (option) => option.id === assetValues.manufacturer_id,
      );
      setValue('manufacturer_id', manufacturerObject !== undefined ? manufacturerObject : null);
      setValue('email', assetValues.email);
      setValue(
        'expiration_date',
        assetValues.expiration_date === null ? '' : assetValues.expiration_date,
      );
      setValue('reassignable', assetValues.reassignable);
      setValue('slots', assetValues.slots);
    },
    [categoryOptions?.data, manufacturerOptions, setValue],
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );
  useEffect(() => {
    const isEdit = location.pathname.includes('Edit');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setLoading(true);
      setAction('Edit');
      if (license !== undefined) {
        void refetch();
        setValues(license);
        setLoading(false);
      }
    }
  }, [id, isIdNotValid, license, location.pathname, navigate, refetch, reset, setValues]);

  const onSubmit = async (data: ILicenseFormInput) => {
    const tempData = {
      name: data.name,
      product_key: data.product_key,
      manufacturer_id: data.manufacturer_id?.id ? data.manufacturer_id.id : null,
      category_id: data.category_id?.id ? data.category_id.id : null,
      email: data.email,
      reassignable: data.reassignable,
      expiration_date:
        data.expiration_date !== ''
          ? new Date(data.expiration_date).toISOString().split('T')[0]
          : '',
      slots: data.slots,
    };

    if (action === 'Add')
      addLicense.mutate(tempData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('License has been added', { variant });
          reset();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          setError('name', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });

    if (action === 'Edit' && id)
      updateLicense.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('License has been edited', { variant });
            navigate(routePath.licenses);
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
      <CreateModal open={open} setOpen={setOpen} content={modalContent} />
      {loading && <LoadingScreen displayText />}
      {!loading && (
        <Box>
          <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
            <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
              <Typography ml={2} variant="h4">
                {action} License
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
                <TextInput label="Key" name="product_key" rules={{ required: 'Required value' }} />
                <SelectInput
                  label="Manufacturer"
                  name="manufacturer_id"
                  options={manufacturerOptions ? manufacturerOptions : []}
                  modalContent={<AddManufacturer isModal />}
                  openModal={openModal}
                />
                <SelectInput
                  label="Category"
                  name="category_id"
                  options={categoryOptions?.data ? categoryOptions.data : []}
                  modalContent={<AddCategory isModal />}
                  openModal={openModal}
                />
                <CheckBox label="Reassignable" name="reassignable" rules={{}} />
                <TextInput
                  label="Number of uses"
                  name="slots"
                  type="number"
                  rules={{ required: 'Required value' }}
                />

                <TextInput
                  label="Email"
                  name="email"
                  rules={{
                    required: 'Required value',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address',
                    },
                  }}
                />
                <DatePickerInput label="Expiration date" name="expiration_date" />

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
      )}
    </Box>
  );
};

export default AddLicense;
