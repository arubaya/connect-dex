import { Alert, AlertColor, Snackbar } from '@mui/material';
import React from 'react';

interface ToastProps {
  severity?: AlertColor;
  open: boolean;
  message: string;
  onClose: (open: boolean) => void;
}

const Toast = ({
  open = false,
  severity = 'success',
  message,
  onClose,
}: ToastProps) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    onClose(false);
  };
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
