import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Typography,
} from '@mui/material';

interface CheckboxLabelProps extends CheckboxProps {
  label?: string;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
}

export default function CheckboxLabel({
  labelPlacement = 'end',
  ...props
}: CheckboxLabelProps) {
  return (
    <FormControlLabel
      labelPlacement={labelPlacement}
      sx={props.sx}
      control={<Checkbox {...props} />}
      label={
        <Typography variant={props.size === 'small' ? 'caption' : 'body1'}>
          {props.label}
        </Typography>
      }
    />
  );
}
