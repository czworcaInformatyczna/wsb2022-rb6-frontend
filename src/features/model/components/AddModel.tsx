import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { CreateModal } from 'components/Elements/CreateModal';
import { SelectInput, TextInput } from 'components/Elements/FormInputs';
import { AddCategory } from 'features/category/components/AddCategory';
import { AddManufacturer } from 'features/manufacturer/components/AddManufacturer';
import { type IsModal } from 'features/manufacturer/types';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { apiUrl } from 'routes';
import { getVariant } from 'utils';
import { useAddModel, useGetCategory, useGetManufacturer } from '../api';
import { type IModelForm, type IModel } from '../types';

export const AddModel = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IModelForm>();
  const { handleSubmit, setError, reset } = methods;
  const addModel = useAddModel<IModel>(apiUrl.addAssetModel);
  const { data: manufacturerOptions } = useGetManufacturer();
  const { data: categoryOptions } = useGetCategory();
  const [open, setOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<JSX.Element>(<Box />);

  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setOpen(true);
  };

  const onSubmit = async (data: IModelForm) => {
    const tempData = {
      ...data,
      manufacturer_id: data.manufacturer_id.id,
      asset_category_id: data.asset_category_id.id,
    };

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
      <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} variant="h4">
            Add Model
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
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};
