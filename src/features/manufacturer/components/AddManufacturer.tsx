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
  Typography,
} from '@mui/material';

import { TextInput } from 'components/Elements/FormInputs';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { apiUrl } from 'routes';
import { getVariant } from 'utils';
import { useAddManufacturer } from '../api';
import { type IsModal, type IManufacturer } from '../types';

export const AddManufacturer = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IManufacturer>();
  const { handleSubmit, setError, reset } = methods;
  const [url, setUrl] = useState<string>(apiUrl.addAssetManufacturer);
  const addManufacturer = useAddManufacturer<IManufacturer>(url);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl((event.target as HTMLInputElement).value);
  };

  const onSubmit = async (data: IManufacturer) => {
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
            Add manufacturer
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
              item
              lg={12}
              md={12}
              sm={12}
              xl={12}
              xs={12}
              display="flex"
              justifyContent="center"
            >
              <FormControl>
                <FormLabel id="manufacturer-radio-group">Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={url}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={apiUrl.addAssetManufacturer}
                    control={<Radio />}
                    label="Asset"
                  />
                  <FormControlLabel disabled value="License" control={<Radio />} label="License" />
                </RadioGroup>
              </FormControl>
            </Grid>
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
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Box>
  );
};
