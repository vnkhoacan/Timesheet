import React, { useState,useEffect } from "react";
import ValidationIcon from "./ValidationIcon";

interface Props {
  label: any;
  from: number;
  to: number;
  handleChange: any;
  defaultValue: any;
  isRequired: boolean;
  multiple: boolean;
  isSubmited: boolean;
}

const FileInput: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [filesArr, setFilesArr] = useState<any>([]);

  const validateInput = (event: any) => {
    var checkingFiles = event.target.files;
    setIsChanged(true);
    setFilesArr(event.target.files);
    if (checkingFiles.length) {
      var checkingResult = true;
      for (var i in checkingFiles) {
        if (
          checkingFiles[i].size < props.from ||
          checkingFiles[i].size > props.to
        ) {
          checkingResult = false;
          break;
        }
      }
      if (checkingResult) {
        setError("");
        props.handleChange(event);
      } else
        setError("This file must be from " + props.from + " to " + props.to);
    } else {
      if (props.isRequired) setError("This field is required.");
    }
  };

  useEffect(() => {
    if (props.isSubmited && props.isRequired) {
      setIsChanged(true);
      if (!filesArr.length) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <div className="mb-3">
      {/* <label
        className={
          "form-label " + (error && props.isSubmited ? "base-error" : "")
        }
      >
        {props.label}
      </label> */}
      <label className="form-label">{props.label}</label>
      <div className="relative-position">
        <input
          defaultValue={props.defaultValue}
          onChange={(event) => {
            validateInput(event);
          }}
          //style={{ border: error && props.isSubmited ? "1px solid red" : "" }}
          type="file"
          className="form-control"
          multiple={props.multiple}
        />
        <ValidationIcon error={error} isChanged={isChanged} />
      </div>
    </div>
  );
};

export default FileInput;
