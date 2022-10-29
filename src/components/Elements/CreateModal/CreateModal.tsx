import { type Dispatch, type SetStateAction } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { style } from 'components/Elements/CreateModal';

export interface ICreateModal {
  content: JSX.Element;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CreateModal = ({ open, setOpen, content }: ICreateModal) => {
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
          <Box sx={style}>{content}</Box>
        </Fade>
      </Modal>
    </div>
  );
};
