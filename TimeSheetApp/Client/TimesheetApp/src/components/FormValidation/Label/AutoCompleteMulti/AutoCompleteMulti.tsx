// components
import { Popper } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import ValidationIcon from "../../ValidationIcon";

// stylesheet
import "./AutoCompleteMulti.css";

interface Props {
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  isSubmited: boolean;
  label: string;
  options: any;
  getOptionLabel: any;
  placeholder: string;
}

const TransparentAutoCompleteMulti: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const [values, setValues] = useState<any>([]);

  const validateInput = (e: any, newValues: any) => {
    setIsChange(true);
    setValues(newValues);
    props.handleChange(newValues);
  };

  useEffect(() => {
    if (props.isSubmited && props.isRequired) {
      setIsChange(true);
      if (!values.length) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <div className="mb-3 label-autocomplete">
      {props.label ? <label className="form-label">{props.label}</label> : ""}
      <div className="relative-position">
        <input className="form-control absolute-position" />
        <div style={{ paddingTop: "5px" }} className="px-2">
          <Autocomplete
            multiple
            id="tags-standard"
            options={props.options}
            getOptionLabel={props.getOptionLabel}
            onChange={validateInput}
            defaultValue={props.defaultValue}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label=""
                placeholder={props.placeholder}
              />
            )}
          />
        </div>
        {/* <ValidationIcon isChanged={isChange} error={error} /> */}
      </div>
    </div>
  );
};

export default TransparentAutoCompleteMulti;
