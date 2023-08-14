import React from 'react';

import * as icon from '@mui/icons-material';

import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';

export default function PasswordInput(props: TextFieldProps) {
  const [visiblePassword, setVisiblePaswword] = React.useState(false);

  const handleChangeVisible = () => {
    setVisiblePaswword(!visiblePassword);
  };

  return (
    <TextField
      type={visiblePassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              role="button"
              aria-label="toggle password visibility"
              onClick={() => handleChangeVisible()}
              edge="end"
            >
              {visiblePassword ? <icon.VisibilityOff /> : <icon.Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
