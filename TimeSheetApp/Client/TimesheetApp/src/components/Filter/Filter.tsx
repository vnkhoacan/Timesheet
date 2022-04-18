import React, { useMemo, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import "./Filter.css";
import { Button } from "@mui/material";
import SearchByField from "../FormValidation/NoLabel/SearchByField/SearchByField";

interface Props {
  data: any;
  filter: any;
  filterData: any;
  search: any;
  resetData: any;
}

var field = "";
const Filter: React.FC<Props> = (props: Props) => {
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const search = (e: any) => {
    if (field) props.search(e.target.value, field);
  };

  const handleChange = (value: any, name: any, index: number) => {
    props.filter.forEach((v: any) => {
      if (v.name === name) v.dataFilter[index] = value;
    });
  };

  const handleChangeCheck = (e: any, value: any, name: any) => {
    props.filter.forEach((v: any) => {
      if (v.name === name) {
        if (e.target.checked) v.dataFilter.push(value);
        else v.dataFilter = v.dataFilter.filter((vv: any) => vv !== value);
      }
    });
    console.log(props.filter);
  };

  const stringToDate = (str: any) => {
    var strDate = "";

    if (str.length >= 15) {
      strDate += str.substring(15, 19) + "-";
      strDate += str.substring(12, 14) + "-";
      strDate += str.substring(9, 11) + " ";
      strDate += str.substring(0, 8);
    } else strDate = str;

    return strDate;
  };

  const filterData = () => {
    var data = [...props.data];

    props.filter.map((value: any) => {
      if (value.dataFilter.length) {
        if (value.type === "date") {
          data = data.filter((v: any) => {
            return (
              new Date(value.dataFilter[0]).getTime() <=
                new Date(stringToDate(v[value.name])).getTime() &&
              new Date(stringToDate(v[value.name])).getTime() <=
                new Date(value.dataFilter[1]).getTime()
            );
          });
        }
        if (value.type === "number") {
          data = data.filter(
            (v: any) =>
              parseFloat(value.dataFilter[0]) <= parseFloat(v[value.name]) &&
              parseFloat(v[value.name]) <= parseFloat(value.dataFilter[1])
          );
        }
        if (value.type === "checkbox") {
          data = data.filter(
            (v: any) => value.dataFilter.indexOf(v[value.name]) >= 0
          );
        }
      }
    });
    props.filterData(data);
  };

  const FilterCheckBox: React.FC = (props: any) => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };
    return (
      <div className="mb-3">
        <label className="form-label">{props.label}</label>
        <div>
          {props.data.map((value: any) => {
            return (
              <>
                <Checkbox
                  onChange={(e: any) => {
                    handleChangeCheck(e, value, props.name);
                  }}
                  {...label}
                />{" "}
                <span> {value} </span>
              </>
            );
          })}
        </div>
      </div>
    );
  };

  const FilterNumber: React.FC = (props: any) => {
    return (
      <div className="mb-3">
        <label className="form-label">{props.label}</label>
        <div className="row">
          <div className="d-flex filter_group align-items-center">
            <label className="form-label filter_label d-flex">Min</label>
            <input
              onChange={(e) => {
                handleChange(e.target.value, props.name, 0);
              }}
              className="form-control"
              type="number"
            />
          </div>
          <div className="d-flex filter_group align-items-center">
            <label className="form-label filter_label">Max</label>
            <input
              onChange={(e) => {
                handleChange(e.target.value, props.name, 1);
              }}
              className="form-control"
              type="number"
            />
          </div>
        </div>
      </div>
    );
  };

  const FilterDate: React.FC = (props: any) => {
    return (
      <div className="mb-3">
        <label className="form-label">{props.label}</label>
        <div className="row">
          <div className="d-flex filter_group align-items-center">
            <label className="form-label filter_label d-flex">Min</label>
            <input
              onChange={(e) => {
                handleChange(e.target.value, props.name, 0);
              }}
              className="form-control"
              type="date"
            />
          </div>
          <div className="d-flex filter_group align-items-center">
            <label className="form-label filter_label">Max</label>
            <input
              onChange={(e) => {
                handleChange(e.target.value, props.name, 1);
              }}
              className="form-control"
              type="date"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="filter pb-3">
      <div className="filter-box">
        <div className="filter-box_search pb-2">
          <div className="w-50 me-1">
            <SearchByField
              defaultValue=""
              errorMessage="You must select a field to search."
              handleChange={(e: any) => {
                search(e);
              }}
              isSelected={isChanged}
              placeholder="Search"
            />
          </div>

          <select
            onChange={(e: any) => {
              field = e.target.value;
              setIsChanged(e.target.value !== "");
            }}
            className="form-select w-50 mb-3"
            aria-label="Default select example"
          >
            <option value="" selected>
              Open a field
            </option>
            {props.filter.map((value: any) => {
              return <option value={value.name}>{value.label}</option>;
            })}
          </select>
        </div>
        {props.filter.map((value: any) => {
          if (value.type === "checkbox") return <FilterCheckBox {...value} />;
          if (value.type === "date") return <FilterDate {...value} />;
          if (value.type === "number") return <FilterNumber {...value} />;
        })}
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => {
              filterData();
            }}
            variant="contained"
          >
            Filter
          </Button>
          <Button
            className="ms-2"
            onClick={() => props.resetData()}
            variant="contained"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
