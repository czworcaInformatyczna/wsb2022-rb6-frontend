import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { UploadImage } from 'components/Elements/FormInputs';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getVariant } from 'utils';
import { useUploadAvatar } from '../api';
import { type IAvatar } from '../types';

const UploadAvatar = () => {
  const methods = useForm<any>();
  const navigate = useNavigate();
  const { handleSubmit } = methods;
  const uploadAvatar = useUploadAvatar<FormData>();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (data: IAvatar) => {
    const formData = new FormData();
    formData.append('avatar', data.avatar);
    uploadAvatar.mutate(formData, {
      onSuccess: () => {
        const variant = getVariant('success');
        enqueueSnackbar('Avatar has been uploaded', { variant });
        methods.reset();
        navigate(-1);
      },
      onError(error) {
        const e: { message: string } = error.response?.data as { message: string };
        methods.setError('file', { type: 'server', message: e.message }, { shouldFocus: false });
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
      <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
        <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
          <Typography ml={2} variant="h4">
            Upload Avatar
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
            <UploadImage buttonText="Select avatar" name="avatar" accept="image/*" />
          </Grid>
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
            <Stack direction="row" mr={2} spacing={1}>
              <Button color="success" type="submit" variant="contained">
                Upload
              </Button>
            </Stack>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};

export default UploadAvatar;
