import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { CreateModal } from 'components/Elements/CreateModal';
import { SelectInput, TextInput } from 'components/Elements/FormInputs';
import { LoadingScreen } from 'components/Elements/Loading';
import { useGetAssetsDataById } from 'features/assets';
import { AddCategory } from 'features/category/components/AddCategory';
import { AddManufacturer } from 'features/manufacturer/components/AddManufacturer';
import { type IsModal } from 'features/manufacturer/types';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiUrl, routePath } from 'routes';
import { getVariant } from 'utils';
import { useAddModel, useGetCategory, useGetManufacturer, useUpdateModel } from '../api';
import { type IModelForm, type IModel } from '../types';

export const AddModel = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IModelForm>();
  const { handleSubmit, setError, reset, setValue } = methods;
  const addModel = useAddModel<IModel>(apiUrl.addAssetModel);
  const updateAsset = useUpdateModel<IModel>();
  const { data: manufacturerOptions } = useGetManufacturer();
  const { data: categoryOptions } = useGetCategory();
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<Box />);
  const location = useLocation();
  const { id } = useParams();
  const [action, setAction] = useState<'Add' | 'Edit'>('Add');
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: asset, refetch } = useGetAssetsDataById<IModel>(
    Number(id),
    apiUrl.models + '/' + id,
    action === 'Add' ? false : true,
  );
  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setOpen(true);
  };

  const setValues = useCallback(
    (assetValues: any) => {
      setValue('name', assetValues.name);
      const categoryObject = categoryOptions?.find(
        (option) => option.id === assetValues.asset_category_id,
      );

      setValue('asset_category_id', categoryObject !== undefined ? categoryObject : null);
      const manufacturerObject = manufacturerOptions?.find(
        (option) => option.id === assetValues.manufacturer_id,
      );
      setValue('manufacturer_id', manufacturerObject !== undefined ? manufacturerObject : null);
    },
    [categoryOptions, manufacturerOptions, setValue],
  );

  const isIdNotValid = useCallback(
    (isEdit: boolean) => {
      return isEdit && id === undefined && !Number(id);
    },
    [id],
  );

  useEffect(() => {
    reset();
    const isEdit = location.pathname.includes('Model/Edit');
    if (isIdNotValid(isEdit)) {
      navigate(routePath.pageNotFound);
    }

    if (isEdit && id !== undefined) {
      setLoading(true);
      setAction('Edit');
      if (asset !== undefined) {
        void refetch();
        setValues(asset);
        setLoading(false);
      }
    }

    if (!isEdit) {
      setAction('Add');
    }
  }, [asset, id, isIdNotValid, location.pathname, navigate, refetch, reset, setValues]);

  const onSubmit = async (data: IModelForm) => {
    const tempData = {
      name: data.name,
      manufacturer_id: data.manufacturer_id?.id ? data.manufacturer_id.id : null,
      asset_category_id: data.asset_category_id?.id ? data.asset_category_id.id : null,
    };

    if (action === 'Add')
      addModel.mutate(tempData, {
        onSuccess: () => {
          const variant = getVariant('success');
          enqueueSnackbar('Model has been added', { variant });
          reset();
        },
        onError(error) {
          const e: { message: string } = error.response?.data as { message: string };
          setError('name', { type: 'server', message: e.message }, { shouldFocus: false });
        },
      });

    if (action === 'Edit' && id)
      updateAsset.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('Model has been edited', { variant });
            navigate(routePath.models);
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
                {action} Model
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
                <SelectInput
                  label="Manufacturer"
                  name="manufacturer_id"
                  options={manufacturerOptions ? manufacturerOptions : []}
                  modalContent={<AddManufacturer isModal />}
                  openModal={openModal}
                />
                <SelectInput
                  label="Category"
                  name="asset_category_id"
                  options={categoryOptions ? categoryOptions : []}
                  modalContent={<AddCategory isModal />}
                  openModal={openModal}
                />
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
