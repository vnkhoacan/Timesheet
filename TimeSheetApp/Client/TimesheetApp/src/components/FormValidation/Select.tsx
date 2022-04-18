import { useState, useEffect } from "react";
import SelectValidationIcon from "./SelectValidationIcon";

interface Props {
  label: string;
  name: string;
  handleChange: any;
  arr: any;
  idName: string;
  defaultValue: any;
  isRequired: boolean;
  isSubmited: boolean;
}

const SelectInput: React.FC<Props> = (props: Props) => {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateInput = (event: any) => {
    setIsChanged(true);
    props.handleChange(event);
  };

  useEffect(() => {
    if (props.isSubmited && props.isRequired) {
      setIsChanged(true);
      if (!value) setError("This field is required.");
    }
  }, [props.isSubmited]);

  return (
    <div className="mb-3">
      <label
        className="form-label"
      >
        {props.label}
      </label>
      <div className="relative-position">
        <select
          onChange={(event) => {
            validateInput(event);
          }}
          defaultValue={props.defaultValue}
          className="form-select"
        >
          <option>Open this select menu</option>
          {props.arr.map((value: any) => {
            return (
              <option value={value[props.idName]}>{value[props.name]}</option>
            );
          })}
        </select>
        <SelectValidationIcon error={error} isChanged={isChanged} />
      </div>
    </div>
  );
};

export default SelectInput;
