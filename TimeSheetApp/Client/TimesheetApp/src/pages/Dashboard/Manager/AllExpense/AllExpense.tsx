import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NoCheckTable from "../../../../components/Table/NoCheckTable";
import TableProgressor from "../../../../components/Table/TableProgressor";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import Filter from "../../../../components/Filter/Filter";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import Text from "../../../../components/Text/Text";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextAlert from "../../../../components/Alert/Text/TextAlert";
import Select from "../../../../components/FormValidation/Select";
import SubmitButton from "../../../../components/Button/SubmitButton";
import ImageDetail from "../../../../components/Image/ImageDetail/ImageDetail";
import ImageConverter from "../../../../services/Image/ImageConverter";
import Header from "../../../../components/Text/Header";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

import "./AllExpense.css";

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
    id: "expense_cost",
    numeric: true,
    disablePadding: false,
    label: "Cost",
  },
  {
    id: "expense_status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "expense_type",
    numeric: true,
    disablePadding: false,
    label: "Type",
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
  const [defaultRows, setDefaultRows] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoadedForm, setIsLoadedForm] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [isShownForm, setIsShownForm] = useState<boolean>(false);
  const [isShownFilter, setIsShownFilter] = useState<boolean>(false);
  const [selectionMessage, setSelectionMessage] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [budget, setBudget] = useState<number>(0);

  const selectors: any = useSelector((allSelectors) => allSelectors);
  const memberInfo: any = useSelector((s: any) => s.memberInfo);
  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // load timesheet list
  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var result = await HttpClient.post("AllExpense/LoadExpenseByManager", {
        project_id: selectors.project_id,
        manager_id: memberInfo.member_id,
      });
      console.log(result);
      if (result) {
        result.records = ImageConverter.stringToArray(result.records, "epath");
        setRows(result.records);
        setDefaultRows(result.records);
        setBudget(result.budget);
      }
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
    if (choosenRow.expense_id !== undefined) {
      if (
        choosenRow.expense_cost > budget &&
        choosenRow.expense_status === "Accepted"
      )
      {
        setMessage("overbudget");
      }
      else {
        setIsSubmited(true);
        setIsLoadedForm(false);
        var result = await HttpClient.post("AllExpense/SubmitExpense", {
          expense: {
            expense_id: choosenRow.expense_id,
            expense_status: choosenRow.expense_status,
          },
        });
        if (result) {
          var newRows = [...rows];
          newRows[editIndex].expense_status = choosenRow.expense_status;
          setRows(newRows);
          setDefaultRows(newRows);
          setMessage("success");
          if(choosenRow.expense_status === "Unapproved") setBudget(budget + newRows[editIndex].expense_cost);
          else setBudget(budget - newRows[editIndex].expense_cost);
        } else setMessage("warning");
        setIsLoadedForm(true);
      }
    }
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
      label: "Cost",
      name: "expense_cost",
      type: "number",
      dataFilter: [],
    },
    {
      label: "Type",
      name: "expense_type",
      type: "checkbox",
      dataFilter: [],
      data: [],
    },
    {
      label: "Status",
      type: "checkbox",
      name: "expense_status",
      data: [],
      dataFilter: [],
    },
  ];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const filterField = () => {
    filter.map((value: any) => {
      if (value.type === "checkbox")
        rows.map((member: any) => {
          if (value.data.indexOf(member[value.name]) < 0)
            value.data.push(member[value.name]);
        });
    });
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const filterData = (data: any) => {
    console.log(data);
    setDefaultRows(data);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const detail = (data: any, index: number) => {
    choosenRow = { ...data };
    setIsShownForm(true);
    setEditIndex(index);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const search = (value: any, name: any) => {
    console.log(name);
    if (value) {
      var temp = defaultRows;
      temp = temp.filter(
        (v: any) => v[name].toUpperCase().indexOf(value.toString().toUpperCase()) >= 0
      );
      console.log(temp);
      setDefaultRows(temp);
    } else setDefaultRows(rows);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------

  var data = defaultRows;
  filterField();

  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const ProcessedSelectionMessage: React.FC = () => {
    if (selectionMessage === "success")
      return (
        <TextAlert
          error="Excute successfully"
          severity="success"
        />
      );
    else if (selectionMessage === "warning")
      return (
        <TextAlert error="Fail to excute" severity="warning" />
      );
    else return <></>;
  };

  const ProcessedFormMessage: React.FC = () => {
    if (message === "success")
      return <TextAlert error="Excute successfully" severity="success" />;
    else if (message === "warning")
      return <TextAlert error="Fail to excute" severity="warning" />;
    else if (message === "overbudget")
      return <TextAlert error="Expense is over budget" severity="info" />;
    else return <></>;
  };

  const ImageForm: React.FC = () => {
    if (editIndex >= 0) {
      if (defaultRows[editIndex].epath.length) {
        return defaultRows[editIndex].epath.map((value: any) => {
          return (
            <div className="form-bg_input-group">
              <ImageDetail
                type="server"
                biStyle={{}}
                siStyle={{}}
                src={value}
              />
            </div>
          );
        });
      }
    }
    return <></>;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="all-timesheet">
      <Header title="All Expense" />
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
                  fileName="all-expense"
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
                <div className="px-2 mt-5">
                  <ProcessedFormMessage />
                </div>
                <h4 className="m-0 p-4">Expense Detail</h4>
                <div className="p-4">
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Member Name : </label>
                    <input
                      value={choosenRow.member_name}
                      disabled
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Position Name : </label>
                    <input
                      value={choosenRow.position_name}
                      disabled
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Department Name : </label>
                    <input
                      value={choosenRow.department_name}
                      disabled
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Cost : </label>
                    <input
                      value={choosenRow.expense_cost}
                      disabled
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Purpose or Reason : </label>
                    <textarea
                      disabled
                      className="form-control"
                      value={choosenRow.purpose_or_reason}
                    ></textarea>
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <label className="form-label">Expense Type : </label>
                    <input
                      value={choosenRow.expense_type}
                      disabled
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-bg_input-group">
                    <Select
                      label="Status"
                      defaultValue={choosenRow.expense_status}
                      handleChange={(e: any) => {
                        choosenRow.expense_status = e.target.value;
                      }}
                      isRequired={true}
                      arr={[
                        { expense_status: "Unapproved" },
                        { expense_status: "Accepted" },
                        { expense_status: "Approved" },
                      ]}
                      idName="expense_status"
                      name="expense_status"
                      isSubmited={isSubmited}
                    />
                  </div>
                  <SubmitButton
                    text="Submit Expense"
                    hasLoaded={isLoadedForm}
                  />
                  <div className="mt-2">
                    <ImageForm />
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
            <p>Current Budget : {budget} $</p>
            {isLoaded ? (
              <NoCheckTable
                icon={() => {
                  return (
                    <Tooltip title="Approve">
                      <IconButton style={{ position: "relative" }}>
                        <AddBoxIcon />
                      </IconButton>
                    </Tooltip>
                  );
                }}
                tool={(row: any, index: number) => {
                  return (
                    <Text>
                      <span
                        onClick={() => {
                          detail(row, index);
                          setMessage("");
                          setIsSubmited(false);
                        }}
                        style={{ cursor: "pointer" }}
                        className="d-flex justify-content-center"
                      >
                        <FindInPageIcon /> Detail
                      </span>
                    </Text>
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
