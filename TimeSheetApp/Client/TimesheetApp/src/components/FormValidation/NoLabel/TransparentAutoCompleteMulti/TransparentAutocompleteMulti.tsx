import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import ValidationIcon from "../../ValidationIcon";

import "./TransparentAutocompleteMulti.css";

interface Props {
  errorMessage: any;
  handleChange: any;
  defaultValue: any;
  isRequired: Boolean;
  isSubmited: boolean;
}

const TransparentAutoCompleteMulti: React.FC<Props> = (props: Props) => {
  // declare variables
  const [error, setError] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);
  const [values, setValues] = useState<any>([]);

  const validateInput = (e: any,newValues:any) => {
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
    <div className="mb-3">
      <div className="relative-position">
        <Autocomplete
          multiple
          id="tags-standard"
          options={top100Films}
          getOptionLabel={(option: any) => {
            return option.title;
          }}
          onChange={validateInput}
          defaultValue={props.defaultValue}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                variant="standard"
                label=""
                placeholder="Favorites"
              />
            );
          }}
          
        />
        <ValidationIcon isChanged={isChange} error={error} />
      </div>
    </div>
  );
};

export default TransparentAutoCompleteMulti;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
];
