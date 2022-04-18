import React, { useEffect, useState } from "react";
import ValidationIcon from "../../ValidationIcon";

interface Props {
  regex: any;
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  isSubmited: boolean;
  placeholder:string;
}

const BaseInput: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState<string>("");
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
      <div className="relative-position">
        <input
          defaultValue={props.defaultValue}
          onChange={(event: any) => {
            validateInput(event);
          }}
          type="text"
          style={{border:"none"}}
          className="form-control"
          placeholder={props.placeholder}
        />
        <ValidationIcon isChanged={isChanged} error={error} />
      </div>
    </div>
  );
};

export default BaseInput;
