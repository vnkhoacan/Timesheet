import React, { useEffect, useState } from "react";
import ValidationIcon from "../../ValidationIcon";

interface Props {
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isSelected: boolean;
  placeholder: string;
}

const BaseInput: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  //const [value, setValue] = useState<string>("");

  const validateInput = (event: any) => {
    var checkingText = event.target.value;
    setIsChanged(true);

    if (props.isSelected) {
      setError("");
      props.handleChange(event);
    } else setError(props.errorMessage);

    if (!checkingText) {
      setIsChanged(false);
      setError("");
    }
  };

  return (
    <div className="mb-3">
      <div className="relative-position">
        <input
          defaultValue={props.defaultValue}
          onChange={(event: any) => {
            validateInput(event);
          }}
          type="text"
          className="form-control"
          placeholder={props.placeholder}
        />
        <ValidationIcon isChanged={isChanged} error={error} />
      </div>
    </div>
  );
};

export default BaseInput;
