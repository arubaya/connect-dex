import { SearchRounded } from '@mui/icons-material';
import {
  InputAdornment,
  TextField,
  TextFieldProps,
  styled,
} from '@mui/material';

interface SearchbarTextFieldProps extends TextFieldProps<'outlined'> {
  dataLength?: string;
}

const SearchbarTextField = styled(
  ({ dataLength, placeholder, ...props }: SearchbarTextFieldProps) => (
    <TextField
      placeholder={dataLength ? `Search ${dataLength} contacts` : undefined}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    boxShadow:
      'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
  },
}));

export default SearchbarTextField;
