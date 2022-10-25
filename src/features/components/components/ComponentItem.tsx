import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useDeleteComponent, useUpdateComponent } from 'features/components';
import { useForm } from 'react-hook-form';
import { type IComponents } from 'features/components';

export const ComponentItem = ({ id, name }: any) => {
  const deleteComponent = useDeleteComponent();
  const updateComponent = useUpdateComponent();
  const { register, handleSubmit, watch } = useForm<IComponents>();
  const watchedInput = watch('name');
  return (
    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mb: 1 }}>
      <Box sx={{ border: 1, p: 1 }}>
        <TextField
          {...register('name')}
          type="text"
          label="Name"
          size="small"
          variant="standard"
          defaultValue={name || '-'}
        />
      </Box>
      <Button
        onClick={handleSubmit(() => deleteComponent.mutate(id))}
        color="error"
        variant="contained"
        sx={{ ml: 1 }}
      >
        Delete
      </Button>
      <Button
        onClick={handleSubmit(() => updateComponent.mutate({ id, body: { name: watchedInput } }))}
        color="primary"
        variant="contained"
        sx={{ ml: 1 }}
      >
        Update
      </Button>
    </Box>
  );
};
