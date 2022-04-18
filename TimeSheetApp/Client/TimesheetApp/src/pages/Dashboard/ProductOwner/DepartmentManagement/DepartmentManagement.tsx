import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BaseTable from "../../../../components/Table/BaseTable";
import TableProgressor from "../../../../components/Table/TableProgressor";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import TextAlert from "../../../../components/Alert/Text/TextAlert";
import SubmitButton from "../../../../components/Button/SubmitButton";
import Filter from "../../../../components/Filter/Filter";
import DeleteIcon from "@mui/icons-material/Delete";
import Text from "../../../../components/Text/Text";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import Alert_YESNO from "../../../../components/Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextArea from "../../../../components/FormValidation/TextArea";
import BaseInput from "../../../../components/FormValidation/BaseInput";
import Header from "../../../../components/Text/Header";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

//global
var formValue: any = {};

const DepartmentManagement: React.FC = () => {
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const [submitType, setSubmitType] = useState("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [isLoadedForm, setIsLoadedForm] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [defaultRows, setDefaultRows] = useState([]);
  const selectors: any = useSelector((allSelectors) => allSelectors);
  const isLogedIn: boolean = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];

  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post(
        "DepartmentManagement/LoadDepartment",
        {
          member_id: selectors.memberInfo.member_id,
        }
      );
      if (newRows) {
        setRows(newRows);
        setDefaultRows(newRows);
        setIsLoaded(true);
      }
    }
  };

  var headCells: readonly any[] = [
    {
      id: "",
      numeric: false,
      disablePadding: true,
      label: "Number",
    },
    {
      id: "department_name",
      numeric: false,
      disablePadding: true,
      label: "Department Name",
    },
    {
      id: "department_description",
      numeric: true,
      disablePadding: false,
      label: "Department Description",
    },
    {
      id: "",
      numeric: true,
      disablePadding: false,
      label: "",
    },
  ];

  const getRows = async (cRows: any): Promise<void> => {
    checkedRows = cRows;
  };

  const submit = async (e: any): Promise<void> => {
    e.preventDefault();
    var isValid = true;
    for (var item in formValue) if (!formValue[item]) isValid = false;
    if (isValid) {
      // submit using add
      if (submitType === "add") {
        setIsLoadedForm(false);
        formValue.member_id = selectors.memberInfo.member_id;

        var addResult: string = await HttpClient.post(
          "DepartmentManagement/AddDepartment",
          { department: formValue }
        );

        if (addResult) {
          var newRow: any = { ...formValue };
          newRow.department_id = addResult;
          var newRows: any = [...defaultRows];
          newRows.push(newRow);
          setDefaultRows(newRows);
          setRows(newRows);
          setIsLoadedForm(true);
          setMessage("success");
        } else {
          setIsLoadedForm(true);
          setMessage("warning");
        }
      }
      // submit using
      if (submitType === "edit") {
        setIsLoadedForm(false);
        var editResult: boolean = await HttpClient.post(
          "DepartmentManagement/EditDepartment",
          { department: formValue }
        );
        if (editResult) {
          var newRow: any = { ...formValue };
          var newRows: any = [...defaultRows];
          if (editIndex >= 0) newRows[editIndex] = { ...newRow };
          setDefaultRows(newRows);
          setRows(newRows);
          setIsLoadedForm(true);
          setMessage("success");
        } else {
          setIsLoadedForm(true);
          setMessage("warning");
        }
      }
    }
    else setIsSubmited(true);
  };

  var filter = [
    {
      label: "Department Name",
      name: "department_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Department Description",
      name: "department_description",
      type: "empty",
      dataFilter: [],
    },
  ];

  const filterData = (data: any) => {
    setRows(data);
  };

  const edit = (data: any, index: number) => {
    formValue = { ...data };
    setEditIndex(rows.findIndex((v:any)=>v.department_id === data.department_id));
    setIsShownForm(!isShownForm);
    setSubmitType("edit");
    setMessage("");
    setIsSubmited(false);
  };

  const search = (value: any, name: any) => {
    if (value) {
      if (name) {
        var temp = [...rows];
        temp = temp.filter(
          (v: any) => v[name].toUpperCase().indexOf(value.toUpperCase()) >= 0
        );
        setDefaultRows(temp);
      }
    } else setDefaultRows(rows);
  };

  const ProcessedSelectionMessage: React.FC = () => {
    if (selectedMessage === "success")
      return (
        <TextAlert
          error="Project has deleted successfully"
          severity="success"
        />
      );
    else if (selectedMessage === "warning")
      return (
        <TextAlert error="Project has failed to delete" severity="warning" />
      );
    else return <></>;
  };

  const ProcessedFormMessage: React.FC = () => {
    if (message === "success")
      return <TextAlert error="Excute successfully" severity="success" />;
    if (message === "warning")
      return <TextAlert error="Fail to excute" severity="warning" />;
    else return <></>;
  };

  const handleChange = (e: any, name: string) => {
    var newValue: any = { ...formValue };
    newValue[name] = e.target.value;
    formValue = newValue;
    setMessage("");
  };

  const Form: React.FC = () => {
    if (isShownForm) {
      return (
        <>
          <div className="base-dark-bg" />
          <div className="form-bg">
            <form onSubmit={submit} className="light-border m-auto">
              <CloseIcon
                onClick={() => {
                  setIsShownForm(!isShownForm);
                }}
                className="form-bg_icon"
              />
              <div className="mt-5 px-3">
                <ProcessedFormMessage />
              </div>
              <h4 className="m-0 px-4">Department Detail</h4>
              <div className="p-4">
                <div className="">
                  <BaseInput
                    defaultValue={formValue.department_name}
                    errorMessage="This field contain minimum 3 characters."
                    label="Department Name"
                    regex={/.{3,}/}
                    handleChange={(e: any) => {
                      handleChange(e, "department_name");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <TextArea
                  defaultValue={formValue.department_description}
                  errorMessage="This field contain minimum 3 characters."
                  label="Department Description"
                  regex={/.{3,}/}
                  handleChange={(e: any) => {
                    handleChange(e, "department_description");
                  }}
                  isRequired={true}
                  isSubmited={isSubmited}
                />
                <SubmitButton
                  hasLoaded={isLoadedForm}
                  text={
                    submitType === "add" ? "Add Department" : "Edit Department"
                  }
                />
              </div>
            </form>
          </div>
        </>
      );
    }
    return <></>;
  };

  const DataTable: React.FC = () => {
    if (isLoaded) {
      return (
        <BaseTable
          checkBoxValue=""
          fieldCheckBox=""
          checkedRows={getRows}
          icon={() => {
            return (
              <Tooltip title="Delete">
                <IconButton style={{ position: "relative" }}>
                  <DeleteIcon />
                  <Alert_YESNO
                    yesFunction={async () => {
                      var checkedData = defaultRows.filter(
                        (value: any, index: any) =>
                          checkedRows.indexOf(index.toString()) >= 0
                      );
                      var result = await HttpClient.post(
                        "DepartmentManagement/DeleteDepartment",
                        { rows: checkedData }
                      );
                      if (result) {
                        var newData = defaultRows.filter(
                          (value: any, index: any) =>
                            checkedRows.indexOf(index.toString()) < 0
                        );
                        setDefaultRows(newData);
                        setRows(newData);
                        setSelectedMessage(result ? "success" : "warning");
                      } else {
                        setSelectedMessage(result ? "success" : "warning");
                      }
                    }}
                    noFunction={() => {}}
                    header="Notification"
                    message="Do you want to remove this."
                    yesText="Ok"
                    noText="Cancel"
                  />
                </IconButton>
              </Tooltip>
            );
          }}
          tool={(row: any, index: number) => {
            return (
              <Text>
                <span
                  onClick={() => {
                    edit(row, index);
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
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //filterField();
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="">
      <Header title="Department Management" />
      <div className="py-5 px-3">
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-6 col-12 mb-2"></div>
          <div className="col-xl-6 col-12 mb-2">
            <div className="table-tool">
              <Text
                onClick={() => {
                  setIsShownForm(!isShownForm);
                  setSubmitType("add");
                  setMessage("");
                  formValue = {};
                  setIsSubmited(false);
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-flex align-items-center">
                  <AddIcon />
                  <span style={{ marginLeft: "10px" }}>Add Department</span>
                </p>
              </Text>
              <Text
                style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                  setIsShownFilter(!isShownFilter);
                }}
              >
                <p className="d-flex align-items-center">
                  <FilterListIcon />
                  <span style={{ marginLeft: "10px" }}>Filter</span>
                </p>
              </Text>
              <Text style={{ marginLeft: "10px", cursor: "pointer" }}>
                <ExportButton
                  fileName="department-management"
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
        <Form />
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
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
