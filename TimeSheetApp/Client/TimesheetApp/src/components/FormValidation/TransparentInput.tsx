import React, { useEffect, useState } from "react";
import TIValidationIcon from "./TIValidationIcon";

interface Props {
  regex: any;
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  isSubmited: boolean;
  type: string;
  clickCheck: any;
  clickClose: any;
  isTransparent: boolean;
  open: any;
  close: any;
}

const BaseInput: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState<string>("");
  // const [isShown, setIsShown] = useState<boolean>(false);
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

  const pressEnter = (event: any) => {
    if (event.keyCode === 13) 
    {
      props.close();
      setIsChanged(false);
    }
  };

  useEffect(() => {
    if (props.isSubmited && props.isRequired) {
      setIsChanged(true);
      if (!value) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <div
      onClick={() => {
        props.open();
      }}
      onBlur={() => {
        props.close();
        setIsChanged(false);
      }}
    >
      <div className="relative-position">
        {props.isTransparent ? (
          props.defaultValue
        ) : (
          <input
            defaultValue={props.defaultValue}
            onChange={(event: any) => {
              validateInput(event);
            }}
            onKeyDown={pressEnter}
            type={props.type}
            className=""
            style={{
              border: "none",
              outline: "none",
              color: "black",
              padding: "10px 15px",
            }}
            autoFocus
          />
        )}
        <TIValidationIcon
          clickClose={props.clickClose}
          clickCheck={props.clickCheck}
          isChanged={isChanged}
          error={error}
        />
      </div>
    </div>
  );
};

export default BaseInput;
