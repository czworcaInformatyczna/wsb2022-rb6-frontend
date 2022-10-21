import { type Dispatch, type SetStateAction } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { style } from 'components/Elements/CreateModal';

export interface ICreateModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  textContent: string;
  title: string;
}

export const CreateModal = ({ open, setOpen, title, textContent }: ICreateModal) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        closeAfterTransition
        onClose={handleClose}
        open={open}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography component="h2" id="transition-modal-title" variant="h6">
              {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {textContent}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
