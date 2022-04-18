import React, { useState, useEffect } from "react";
import ValidationIcon from "./ValidationIcon";

interface Props {
  label: any;
  regex: any;
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isRequired: boolean;
  isSubmited:boolean;
}

const TextArea: React.FC<Props> = (props: Props) => {
  const [error, setError] = useState("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const validateInput = (event: any) => {
    setIsChanged(true);
    var checkingText = event.target.value;
    if (checkingText) {
      const regexp = props.regex;
      const checkingResult = regexp.exec(checkingText);
      if (checkingResult !== null) {
        setError("");
        props.handleChange(event);
      } else setError(props.errorMessage);
    } else if (props.isRequired) setError("This field is required.");
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
        <textarea
          defaultValue={props.defaultValue}
          onChange={(event: any) => {
            validateInput(event);
          }}
          className="form-control"
        />
        <ValidationIcon isChanged={isChanged} error={error} />
      </div>
    </div>
  );
};

export default TextArea;
