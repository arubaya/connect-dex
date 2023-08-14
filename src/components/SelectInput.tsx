import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

interface CustomSelectProps extends SelectProps {
  datas: {
    display: any;
    value: any;
  }[];
}

export default function SelectInput(props: CustomSelectProps) {
  return (
    <FormControl
      variant={props.variant}
      sx={{ minWidth: '200px' }}
      size={props.size}
      fullWidth={props.fullWidth}
      className={props.className}
      required={props.required}
    >
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        size={undefined}
        variant={undefined}
        className=""
        {...props}
      >
        {props.datas.map((data, index) => (
          <MenuItem value={data.value} key={index}>
            {data.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
