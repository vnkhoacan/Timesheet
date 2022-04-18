import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../../../components/Text/Header";
import BaseTable from "../../../../components/Table/BaseTable";
import TableProgressor from "../../../../components/Table/TableProgressor";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import Filter from "../../../../components/Filter/Filter";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Alert_YESNO from "../../../../components/Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Text from "../../../../components/Text/Text";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TextAlert from "../../../../components/Alert/Text/TextAlert";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

import "./AllTimesheet.css";

var headCells: readonly any[] = [
  {
    id: "",
    numeric: false,
    disablePadding: true,
    label: "Number",
  },
  {
    id: "member_name",
    numeric: true,
    disablePadding: false,
    label: "Member Name",
  },
  {
    id: "department_name",
    numeric: true,
    disablePadding: false,
    label: "Department",
  },
  {
    id: "position_name",
    numeric: true,
    disablePadding: false,
    label: "Position",
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
var choosenRow: any = {};
//--------------------------------------------------------------
//--------------------------------------------------------------
const AllTimesheet: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [rows, setRows] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);
  const [isShownFilter, setIsShownFilter] = useState<boolean>(false);
  const [defaultRows, setDefaultRows] = useState<any>([]);
  const [selectionMessage, setSelectionMessage] = useState<string>("");
  const memberInfo: any = useSelector((s: any) => s.memberInfo);
  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // load timesheet list
  const load = async (): Promise<void> => {
    if (memberInfo.permission) {
      setIsLoaded(false);
      var newRows = await HttpClient.post(
        "AllTimesheet/LoadTimesheetByManager",
        {
          manager_id: memberInfo.member_id,
        }
      );
      if (newRows) {
        setRows(newRows);
        setDefaultRows(newRows);
      }
      console.log(newRows);

      setIsLoaded(true);
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const getcheckedRows = (rows: any) => {
    checkedRows = rows;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const submit = async (e: any): Promise<void> => {
    e.preventDefault();
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  var filter = [
    {
      label: "Member Name",
      name: "member_name",
      type: "empty",
      dataFilter: [],
    },
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

  const filterData = (data: any) => {
    setDefaultRows(data);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const detail = (data: any) => {
    choosenRow = { ...data };
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const search = (value: any, name: any) => {
    console.log(name);
    if (value) {
      var temp = defaultRows;
      temp = temp.filter(
        (v: any) => v[name].toString().toUpperCase().indexOf(value.toString().toUpperCase()) >= 0
      );
      setDefaultRows(temp);
    } else setDefaultRows(rows);
  };

  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const ProcessedSelectionMessage: React.FC = () => {
    if (selectionMessage === "success")
      return (
        <TextAlert
          error="Timesheet has approved successfully"
          severity="success"
        />
      );
    else if (selectionMessage === "warning")
      return (
        <TextAlert
          error="Timesheet has failed to approved"
          severity="warning"
        />
      );
    else return <></>;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  filterField();
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //component did mount
  useEffect(() => {
    if (isLogedIn) load();
  }, [isLogedIn]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="all-timesheet">
      <Header title="All Timesheet" />
      <div className="py-5 px-3">
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-6 col-12 mb-2"></div>
          <div className="col-xl-6 col-12 mb-2">
            <div className="d-flex justify-content-end">
              <Text
                className="base-text"
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                  setIsShownFilter(!isShownFilter);
                }}
              >
                <span className="d-flex align-items-center">
                  <FilterListIcon />
                  <span style={{ marginLeft: "10px" }}>Filter</span>
                </span>
              </Text>
              <Text style={{ marginLeft: "10px", cursor: "pointer" }}>
                <ExportButton
                  fileName="all-timesheet"
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
        {isShownForm ? (
          <>
            <div className="base-dark-bg" />
            <div className="form-bg">
              <form
                onSubmit={submit}
                className="light-border m-auto form-bg_two-input"
              >
                <CloseIcon
                  onClick={() => {
                    setIsShownForm(false);
                  }}
                  className="form-bg_icon"
                />
                <h4 className="m-0 p-4">Timesheet Detail</h4>
                <div className="p-4">
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Project Name :</label>
                    <input
                      value={choosenRow.project_name}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Member Name</label>
                    <input
                      value={choosenRow.member_name}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Position Name</label>
                    <input
                      value={choosenRow.position_name}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Department Name</label>
                    <input
                      value={choosenRow.department_name}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Work Date</label>
                    <input
                      value={choosenRow.work_date}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Hours</label>
                    <input
                      value={choosenRow.hours}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Status</label>
                    <input
                      value={choosenRow.status}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          ""
        )}

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
            <ProcessedSelectionMessage />
            {isLoaded ? (
              <BaseTable
                checkBoxValue="Unapproved"
                fieldCheckBox="status"
                checkedRows={getcheckedRows}
                icon={() => {
                  return (
                    <Tooltip title="Approve">
                      <IconButton style={{ position: "relative" }}>
                        <AddBoxIcon />
                        <Alert_YESNO
                          yesFunction={async () => {
                            // var checkedData = isloadeddefaultRows.filter(
                            //   (value: any, index: any) =>
                            //     checkedRows.indexOf(index.toString()) >= 0
                            // );
                            // var result = await HttpClient.post(
                            //   "AllTimesheet/ApproveTimesheet",
                            //   { rows: checkedData }
                            // );
                            // if (result) {
                            //   var newData: any = [...isloadeddefaultRows];
                            //   checkedRows.map((value: any) => {
                            //     newData[value].status = "Approved";
                            //   });
                            //   setState({
                            //     ...state,
                            //     rows: newData,
                            //     defaultRows: newData,
                            //     selectionMessage: result ? "success" : "warning",
                            //   });
                            // } else {
                            //   setState({
                            //     ...state,
                            //     selectionMessage: result ? "success" : "warning",
                            //   });
                            // }
                          }}
                          noFunction={() => {}}
                          header="Notification"
                          message="Do you want to approve this."
                          yesText="Ok"
                          noText="Cancel"
                        />
                      </IconButton>
                    </Tooltip>
                  );
                }}
                tool={(row: any) => {
                  return (
                    <Link
                      to={
                        "/dashboard/timesheet-summary/" +
                        row.project_id +
                        "-" +
                        row.employee_id
                      }
                    >
                      <Text>
                        <span
                          style={{ cursor: "pointer" }}
                          className="d-flex justify-content-center"
                        >
                          <FindInPageIcon /> Detail
                        </span>
                      </Text>
                    </Link>
                  );
                }}
                chooseRow={() => {}}
                rows={defaultRows}
                headCells={headCells}
              />
            ) : (
              <TableProgressor />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTimesheet;
