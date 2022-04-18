import React, { useState, useEffect } from "react";
import ValidationIcon from "./ValidationIcon";

interface Props {
  label: any;
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  from: number;
  to: number;
  isSubmited: boolean;
}

const NumberValidation: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const validateInput = (event: any) => {
    var checkingNumber = parseInt(event.target.value);
    setIsChanged(true);
    setValue(event.target.value);
    if (checkingNumber) {
      if (checkingNumber >= props.from && checkingNumber <= props.to) {
        setError("");
        props.handleChange(event);
      } else
        setError("This number must be from " + props.from + " to " + props.to);
    } else {
      if (props.isRequired)
        setError("This field is required and must contain 0-9.");
    }
  };

  useEffect(() => {
    if (props.isSubmited && props.isRequired) {
      setIsChanged(true);
      if (!value) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <div className="mb-3">
      <label className="form-label">{props.label}</label>
      <div className="relative-position">
        <input
          defaultValue={props.defaultValue}
          onChange={(event) => {
            validateInput(event);
          }}
          type="text"
          className="form-control"
        />
        <ValidationIcon error={error} isChanged={isChanged} />
      </div>
    </div>
  );
};

export default NumberValidation;
