import { Close } from '@mui/icons-material';
import { ButtonBase, DialogTitle, SxProps } from '@mui/material';
import React from 'react';

interface DialogTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
  sx?: SxProps;
  id?: string;
  className?: string;
}

export default function DialogHeader(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }} {...other}>
      {children}
      {onClose ? (
        <ButtonBase
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            marginTop: '-6px',
            marginRight: '-6px',
            backgroundColor: 'white',
            borderRadius: '6px',
            width: '34px',
            height: '34px',
            boxShadow: '0px 3px 8px rgba(167, 174, 181, 0.4)',
            zIndex: (theme) => theme.zIndex.modal + 100,

            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </ButtonBase>
      ) : null}
    </DialogTitle>
  );
}
