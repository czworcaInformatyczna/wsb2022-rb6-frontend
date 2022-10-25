import { Button } from '@mui/material';
import { useDeleteComponents } from '../api';

export const ComponentItem = ({ id, name }: any) => {
  const deleteComponent = useDeleteComponents();
  return (
    <>
      <p>{name}</p>
      <Button
        onClick={async () => await deleteComponent.mutateAsync(id)}
        color="error"
        variant="contained"
      >
        Delete
      </Button>
    </>
  );
};
