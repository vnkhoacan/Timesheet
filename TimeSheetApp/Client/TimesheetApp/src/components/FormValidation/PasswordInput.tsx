import React, { useState,useEffect } from "react";
import ValidationIcon from "./ValidationIcon";

interface Props {
  label: any;
  regex: any;
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  isSubmited: boolean;
}

const PasswordInput: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");


  const validateInput = (event: any) => {
    var checkingText = event.target.value;
    setIsChanged(true);
    setValue(event.target.value);
    if (checkingText) {
      const regexp = props.regex;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        setError("");
        props.handleChange(event);
      } else setError(props.errorMessage);
    } else {
      if (props.isRequired) setError("This field is required.");
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
          type="password"
          className="form-control"
        />
        <ValidationIcon error={error} isChanged={isChanged} />
      </div>
    </div>
  );
};

export default PasswordInput;
