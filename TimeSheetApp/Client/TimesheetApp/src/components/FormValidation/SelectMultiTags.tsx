import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  Item: any;
  data: any;
  SelectItem: any;
  label: string;
  handleChange: any;
  defaultValue: any;
  message: string;
}

const SelectMulti: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<any>([]);

  const handleChange = (event: any) => {
    props.handleChange(event);
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl
        style={{ width: "100%", marginBottom: 32 }}
        variant="outlined"
        sx={{ m: 1, width: 300 }}
      >
        <InputLabel id="demo-multiple-chip-label">{props.label}</InputLabel>
        <Select
          style={{ height: "50px" }}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple={true}
          value={props.defaultValue}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            return (
              <div className="d-flex">
                {selected.map((index: number) => {
                  return <props.Item {...props.data[index]} />;
                })}
              </div>
            );
          }}
          MenuProps={MenuProps}
        >
          {props.data.length ? (
            props.data.map((value: any, index: number) => {
              return (
                <MenuItem key={index} value={index}>
                  <props.SelectItem {...value} />
                </MenuItem>
              );
            })
          ) : (
            <div className="px-3">
              {props.message}
            </div>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMulti;
