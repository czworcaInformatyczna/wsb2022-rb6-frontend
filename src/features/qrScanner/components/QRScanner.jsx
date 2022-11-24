import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';

const QRScanner = (Props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleScan = (data) => {
    if (data != null) {
      if (error !== null) setError(null);
      Props.setOpen(false);
      navigate('Asset/' + data.text + '/Status');
    }
  };

  const handleError = (err) => {
    if (error === null) setError(err);
  };

  return (
    <Box>
      <Typography color="error" p={2}>
        {error !== null && 'Camera not found'}
      </Typography>
      <QrReader delay={1000} onError={handleError} onScan={handleScan} />
    </Box>
  );
};

export default QRScanner;
