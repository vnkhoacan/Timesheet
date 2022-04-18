import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BaseTable from "../../../../components/Table/BaseTable";
import TableProgressor from "../../../../components/Table/TableProgressor";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import Filter from "../../../../components/Filter/Filter";
import Text from "../../../../components/Text/Text";
import Header from "../../../../components/Text/Header";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
//--------------------------------------------------------------
//--------------------------------------------------------------
// global
var formValue: any = {
  project_id: "",
  hours: "",
  work_date: "",
  timesheet_description: "",
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const TimesheetReport: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [defaultRows, setDefaultRows] = useState<any>([]);
  const [isShownFilter, setIsShownFilter] = useState<boolean>(false);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);
  const [rows, setRows] = useState<any>([]);
  const selectors: any = useSelector((allSelectors) => allSelectors);
  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  //--------------------------------------------------------------
  //--------------------------------------------------------------

  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post(
        "TimesheetReport/LoadTimesheetByEmployee",
        {
          member_id: selectors.memberInfo.member_id,
        }
      );
      if (newRows) {
        setRows(newRows);
        setDefaultRows(newRows);
      }
      setIsLoaded(true);
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  var headCells: readonly any[] = [
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: "Number",
    },
    {
      id: "member_name",
      numeric: false,
      disablePadding: true,
      label: "Member Name",
    },
    {
      id: "time_in",
      numeric: true,
      disablePadding: false,
      label: "Time In",
    },
    {
      id: "time_out",
      numeric: true,
      disablePadding: false,
      label: "Time Out",
    },
    {
      id: "hours",
      numeric: true,
      disablePadding: false,
      label: "Hours",
    },
    {
      id: "",
      numeric: true,
      disablePadding: false,
      label: "",
    },
  ];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  var filter = [
    {
      label: "Time In",
      name: "time_in",
      type: "date",
      dataFilter: [],
    },
    {
      label: "Time Out",
      name: "time_out",
      type: "date",
      dataFilter: [],
    },
    {
      label: "Hours",
      name: "hours",
      type: "number",
      dataFilter: [],
    },
  ];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const filterField = () => {
    filter.map((value: any) => {
      if (value.type === "checkbox")
        defaultRows.map((member: any) => {
          if (value.data.indexOf(member[value.name]) < 0)
            value.data.push(member[value.name]);
        });
    });
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const filterData = (data: any) => {
    setDefaultRows(data);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const dateToString = (d: Date): string => {
    var temp = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return temp;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const search = (value: any, name: any) => {
    if (value) {
      var temp: any = defaultRows;
      temp = temp.filter(
        (v: any) => v[name].toString().toUpperCase().indexOf(value.toString().toUpperCase()) >= 0
      );
      setDefaultRows(temp);
    } else setDefaultRows(rows);
  };

  const DataTable: React.FC = () => {
    if (isLoaded) {
      return (
        <BaseTable
          checkBoxValue=""
          fieldCheckBox=""
          checkedRows={() => {}}
          icon={() => {
            return "";
            // <Tooltip title="Delete">
            //   <IconButton style={{ position: "relative" }}>
            //     <DeleteIcon />
            //     <Alert_YESNO
            //       yesFunction={async () => {
            //         var checkedData = state.rowTemp.filter(
            //           (value: any, index: any) =>
            //             checkedRows.indexOf(index.toString()) >= 0
            //         );
            //         var result = await HttpClient.post(
            //           "TimesheetReport/DeleteTimesheet",
            //           { rows: checkedData }
            //         );
            //         if (result) {
            //           var newData = state.rowTemp.filter(
            //             (value: any, index: any) =>
            //               checkedRows.indexOf(index.toString()) < 0
            //           );
            //           setState({
            //             ...state,
            //             rows: newData,
            //             rowTemp: newData,
            //             hasProcessedSelection: result ? "success" : "warning",
            //           });
            //         } else {
            //           setState({
            //             ...state,
            //             hasProcessedSelection: result ? "success" : "warning",
            //           });
            //         }
            //       }}
            //       noFunction={() => {}}
            //       header="Notification"
            //       message="Do you want to remove this."
            //       yesText="Ok"
            //       noText="Cancel"
            //     />
            //   </IconButton>
            // </Tooltip>
          }}
          tool={(row: any) => {
            return (
              <Text>
                <span
                  onClick={() => {
                    //edit(row);
                  }}
                  style={{ cursor: "pointer" }}
                  className="d-flex justify-content-center"
                >
                  <ModeEditIcon /> Edit
                </span>
              </Text>
            );
          }}
          chooseRow={() => {}}
          rows={defaultRows}
          headCells={headCells}
        />
      );
    }
    return <TableProgressor />;
  };

  filterField();
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);

  return (
    <div className="">
      <Header title="Timesheet Report" />
      <div className="py-5 px-3">
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-6 col-12 mb-2"></div>
          <div className="col-xl-6 col-12 mb-2">
            <div className="table-tool">
              <Text
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                  setIsShownFilter(true);
                }}
              >
                <p className="d-flex align-items-center">
                  <FilterListIcon />
                  <span style={{ marginLeft: "10px" }}>Filter</span>
                </p>
              </Text>
              <Text style={{ marginLeft: "10px", cursor: "pointer" }}>
                <ExportButton
                  fileName="timesheet-report"
                  content={
                    <p className="d-flex align-items-center">
                      <DownloadIcon />
                      <span style={{ marginLeft: "10px" }}>Export</span>
                    </p>
                  }
                  rootData={rows}
                />
              </Text>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-12">
            {isShownFilter ? (
              <Filter
                search={search}
                data={defaultRows}
                filter={filter}
                filterData={filterData}
                resetData={() => setDefaultRows(rows)}
              />
            ) : (
              ""
            )}
          </div>
          <div
            className={isShownFilter ? "col-xl-8 col-12" : "col-xl-12 col-12"}
          >
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetReport;
