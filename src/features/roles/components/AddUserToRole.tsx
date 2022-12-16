import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { SelectInput } from 'components/Elements/FormInputs';

import { type IsModal } from 'features/manufacturer/types';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getVariant } from 'utils';
import { useGetUsers } from 'features/users/api';
import { type IUserId, type IAddUsersToRole } from 'features/users/types';
import { type IAddToRole } from '../types';
import { useAddUsersToRole } from '../api';

export const AddUserToRole = ({ isModal = false }: IsModal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<IAddToRole>();
  const { handleSubmit, setError, reset } = methods;
  const addToRole = useAddUsersToRole<IAddUsersToRole>();
  const { data: users } = useGetUsers({ per_page: 30 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [reset]);

  const getUsersIdArray = (usersArray: IUserId[]) => {
    const tempArray: number[] = [];
    usersArray.map((user) => {
      tempArray.push(user.id);
    });
    return tempArray;
  };

  const onSubmit = async (data: IAddToRole) => {
    const tempData = {
      users: getUsersIdArray(data.users),
    };

    if (id !== undefined)
      addToRole.mutate(
        { id: id, body: tempData },
        {
          onSuccess: () => {
            const variant = getVariant('success');
            enqueueSnackbar('User has been added', { variant });
            reset();
            navigate(-1);
          },
          onError(error) {
            const e: { message: string } = error.response?.data as { message: string };
            setError('users', { type: 'server', message: e.message }, { shouldFocus: false });
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
      <Box>
        <Grid alignItems="center" container justifyContent="start" pt={2} spacing={0}>
          <Grid item lg={12} md={12} sm={12} xl={12} xs={12}>
            <Typography ml={2} variant="h4">
              {id}
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
                label="Users"
                name="users"
                options={users?.data ? users.data : []}
                createButton={false}
                multipleValues
                showEmails
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
    </Box>
  );
};
