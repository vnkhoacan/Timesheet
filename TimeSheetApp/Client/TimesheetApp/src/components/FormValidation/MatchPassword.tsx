import React, { useState,useEffect } from "react";
import ValidationIcon from "./ValidationIcon";

interface Props {
  label: any;
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
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
    setValue(checkingText);
    if (checkingText) {
      if (props.defaultValue === checkingText) {
        setError("");
        props.handleChange(event);
      } else setError(props.errorMessage);
    } else {
      setError("This field is required.");
    }
  };

  useEffect(() => {
    if (props.isSubmited && value) {
      setIsChanged(true);
      if (!value) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <div className="mb-3">
      <label className="form-label">{props.label}</label>
      <div className="relative-position">
        <input
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
