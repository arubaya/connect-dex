import * as React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarAlertProps extends SnackbarProps {
  onCloseAlert?: (event: React.SyntheticEvent) => void;
  severity?: 'success' | 'info' | 'warning' | 'error';
}

export default function SnackbarAlert({
  message,
  onCloseAlert,
  severity,
  ...props
}: SnackbarAlertProps) {
  return (
    <Snackbar {...props}>
      <Alert onClose={onCloseAlert} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
