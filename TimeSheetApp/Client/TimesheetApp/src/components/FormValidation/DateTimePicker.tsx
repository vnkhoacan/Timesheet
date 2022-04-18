import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePickerTemplate from "@mui/lab/DateTimePicker";

interface Props {
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  isSubmited:boolean;
}

const DateTimePicker: React.FC<Props> = (props:Props) => {
  const [value, setValue] = React.useState(props.defaultValue?new Date(props.defaultValue):new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePickerTemplate
        renderInput={(props: any) => <TextField {...props} />}
        label=""
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
          props.handleChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;