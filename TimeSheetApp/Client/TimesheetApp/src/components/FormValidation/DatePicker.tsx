import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ValidationIcon from "./ValidationIcon";

import "./DatePicker.css";

interface Props {
  label: any;
  handleChange: any;
  defaultValue: any;
  isSubmited: boolean;
  isRequired:boolean;
}

const DateInput: React.FC<Props> = (props: Props) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState(new Date(props.defaultValue));
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const validateInput = (date: any) => {
    if (date) {
      props.handleChange(date);
      setValue(new Date(date));
      setError("");
    } else setError(props.label + " is required.");
  };

  useEffect(() => {
    if (props.isSubmited && props.isRequired) {
      setIsChanged(true);
      if (!value.toString()) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div style={{ position: "relative" }} className="mb-3 form_date-picker">
        <label className="form-label">{props.label}</label>
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: "100%",
              position: "absolute",
              top: "50%",
              left: "0",
              zIndex: 1,
              transform: "translateY(-50%)",
            }}
          >
            <MobileDatePicker
              inputFormat="yyyy/MM/dd"
              value={value}
              onChange={validateInput}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <input
            style={{ border: error ? "1px solid red" : "" }}
            type="text"
            className="form-control"
          />
          <ValidationIcon error={error} isChanged={isChanged} />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default DateInput;
