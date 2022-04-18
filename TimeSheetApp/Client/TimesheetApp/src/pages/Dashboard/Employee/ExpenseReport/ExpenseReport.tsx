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
import Select from "../../../../components/FormValidation/Select";
import Alert_YESNO from "../../../../components/Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import TextArea from "../../../../components/FormValidation/TextArea";
import NumberValidation from "../../../../components/FormValidation/NumberValidation";
import FileInput from "../../../../components/FormValidation/FileInput";
import DatePicker from "../../../../components/FormValidation/DatePicker";
import ImageDetail from "../../../../components/Image/ImageDetail/ImageDetail";
import Header from "../../../../components/Text/Header";
import InputService from "../../../../services/FormValidation/Input";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

//--------------------------------------------------------------
//--------------------------------------------------------------
//global
var formValue: any = {
  purpose_or_reason: "",
  expense_type: "",
  expense_date: "",
  expense_cost: "",
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const ExpenseReport: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [submitType, setSubmitType] = useState("");
  const [isLoadedForm, setIsLoadedForm] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [defaultRows, setDefaultRows] = useState([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const selectors: any = useSelector((allSelectors) => allSelectors);

  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post("ExpenseReport/LoadExpense", {
        member_id: selectors.memberInfo.member_id,
        project_id: selectors.project_id,
      });
      newRows = stringToArray(newRows);
      if (newRows) {
        setRows(newRows);
        setDefaultRows(newRows);
        setIsLoaded(true);
      }
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const stringToArray = (oldValue: any) => {
    var newValue = [...oldValue];
    newValue.map((value) => {
      if (value.epath) {
        var a: any = [];
        var b = "";
        for (var i = 0; i < value.epath.length; i++) {
          b += value.epath[i] == "," ? "" : value.epath[i];
          if (value.epath[i + 1] == "," || i == value.epath.length - 1) {
            a.push(b);
            b = "";
          }
        }
        value.epath = a;
      }
    });
    return newValue;
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
      id: "expense_date",
      numeric: false,
      disablePadding: true,
      label: "Expense Date",
    },
    {
      id: "expense_status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "expense_cost",
      numeric: true,
      disablePadding: false,
      label: "Cost",
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
  const getRows = async (cRows: any): Promise<void> => {
    checkedRows = cRows;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const submit = async (e: any): Promise<void> => {
    e.preventDefault();
    var isValid = true;
    for (var item in formValue) if (!formValue[item] && item !== "epath") isValid = false;
   
    
    if (isValid) {
      setIsSubmited(true);
      if (submitType === "add") {
        
        setIsLoadedForm(false);
        formValue.project_id = selectors.project_id;
        formValue.employee_id = selectors.memberInfo.member_id;
        formValue.expense_date = dateToString(formValue.expense_date);
        var addResult = await HttpClient.post("ExpenseReport/AddExpense", {
          expense: formValue,
        });
        formValue.expense_id = addResult;
        if (addResult) {
          var newRow: any = { ...formValue };
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
      if (submitType === "edit") {
        setIsLoadedForm(false);
        var fv = { ...formValue };
        console.log(fv);
        fv.isNew = files.length;
        fv.project_id = selectors.project_id;
        fv.employee_id = selectors.memberInfo.member_id;
        fv.expense_date = dateToString(formValue.expense_date);
        var editResult = await HttpClient.post("ExpenseReport/EditExpense", {
          expense: fv,
        });
        var imgFiles = [...files],
          filesPath = [];
        var resultUpload, resultAddPath;
        for (var i = 0; i < imgFiles.length; i++) {
          var file = imgFiles[i];
          var data = new FormData();
          data.append("expense_image", file);
          resultUpload = await HttpClient.upload(
            "ExpenseReport/UploadFile",
            data
          );
          filesPath.push(resultUpload);
          if (resultUpload)
            resultAddPath = await HttpClient.post(
              "ExpenseReport/AddExpenseImage",
              {
                expense: {
                  expense_id: formValue.expense_id,
                  expense_path: resultUpload,
                },
              }
            );
        }
        if (editResult) {
          var newRow: any = { ...formValue };
          if (filesPath.length) newRow.epath = filesPath;
          var newRows: any = [...defaultRows];
          if (editIndex >= 0) newRows[editIndex] = newRow;
          setDefaultRows(newRows);
          setRows(newRows);
          setIsLoadedForm(true);
          setMessage("success");
        } else {
          setMessage("warning");
          setIsLoadedForm(true);
        }
      }
    }
  };

  var filter = [
    {
      label: "Status",
      name: "expense_status",
      type: "checkbox",
      dataFilter: [],
      data: ["Approved", "Accepted", "Unapproved"],
    },
    {
      label: "Expense Date",
      name: "expense_date",
      type: "date",
      dataFilter: [],
    },
    {
      label: "Cost",
      name: "expense_cost",
      type: "number",
      dataFilter: [],
    },
    {
      label: "Expense Type",
      type: "checkbox",
      name: "expense_type",
      data: ["Travel", "Meal", "Hotel", "Transport", "Mobile", "Other"],
      dataFilter: [],
    },
  ];

  const filterField = () => {
    filter.map((value: any) => {
      if (value.type === "checkbox")
        rows.map((member: any) => {
          if (value.data.indexOf(member[value.name]) < 0)
            value.data.push(member[value.name]);
        });
    });
  };

  const filterData = (data: any) => {
    setDefaultRows(data);
  };

  const dateToString = (oldValue: any): string => {
    var dateStr =
      new Date(oldValue).getFullYear() +
      "-" +
      (new Date(oldValue).getMonth() + 1) +
      "-" +
      new Date(oldValue).getDate();
    return dateStr;
  };

  const edit = (data: any, index: number) => {
    formValue = { ...data };
    setIsShownForm(!isShownForm);
    setSubmitType("edit");
    setEditIndex(index);
  };

  const search = (value: any, name: any) => {
    if (value) {
      var temp = defaultRows;
      temp = temp.filter(
        (v: any) => v[name].toString().toUpperCase().indexOf(value.toString().toUpperCase()) >= 0
      );
      setDefaultRows(temp);
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
      return (
        <TextAlert error="This has done successfully" severity="success" />
      );
    if (message === "success")
      return <TextAlert error="This has failed to do" severity="warning" />;
    else return <></>;
  };

  const Form: React.FC = () => {
    const ImageForm: React.FC = () => {
      if (files.length) {
        return files.map((value: any) => {
          return (
            <div className="form-bg_input-group">
              <ImageDetail
                type="client"
                biStyle={{}}
                siStyle={{}}
                src={URL.createObjectURL(value)}
              />
            </div>
          );
        });
      } else {
        if (formValue?.epath) {
          return formValue.epath.map((value: any) => {
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
        return <></>;
      }
    };

    if (isShownForm) {
      return (
        <>
          <div className="base-dark-bg" />
          <div className="form-bg">
            <form
              onSubmit={submit}
              className="light-border m-auto form-bg_two-input"
            >
              <CloseIcon
                onClick={() => {
                  setIsShownForm(!isShownForm);
                }}
                className="form-bg_icon"
              />
              <div className="mt-5 px-3">
                <ProcessedFormMessage />
              </div>
              <h4 className="m-0 px-4">Expense Detail</h4>
              <div className="p-4">
                <div className="form-bg_input-group">
                  <Select
                    defaultValue={formValue.expense_type}
                    handleChange={(e: any) => {
                      InputService.handleChange(
                        e,
                        "expense_type",
                        setMessage,
                        formValue
                      );
                    }}
                    label="Expense Type"
                    name="expense_type"
                    arr={[
                      { expense_type: "Travel" },
                      { expense_type: "Meal" },
                      { expense_type: "Hotel" },
                      { expense_type: "Transport" },
                      { expense_type: "Mobile" },
                      { expense_type: "Other" },
                    ]}
                    idName="expense_type"
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <DatePicker
                    handleChange={(e: any) => {
                      InputService.handleChangeForDP(
                        e,
                        "expense_date",
                        setMessage,
                        formValue
                      );
                    }}
                    label="Expense Date : "
                    defaultValue={formValue.expense_date}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <NumberValidation
                    defaultValue={formValue.expense_cost}
                    label="Cost"
                    from={1}
                    to={100000}
                    handleChange={(e: any) => {
                      InputService.handleChange(
                        e,
                        "expense_cost",
                        setMessage,
                        formValue
                      );
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <TextArea
                  defaultValue={formValue.purpose_or_reason}
                  errorMessage="This field must contains a-z A-Z 0-9 and minimum 3 characters."
                  label="Purpose or Reason"
                  regex={/^/}
                  handleChange={(e: any) => {
                    InputService.handleChange(
                      e,
                      "purpose_or_reason",
                      setMessage,
                      formValue
                    );
                  }}
                  isRequired={true}
                  isSubmited={isSubmited}
                />
                <div className="mb-3">
                  <FileInput
                    handleChange={(e: any) => {
                      var selectedFiles = e.target.files;
                      var filesArr: any = [];
                      for (var i = 0; i < selectedFiles.length; i++)
                        filesArr.push(selectedFiles[i]);
                      setMessage("");
                      setFiles(filesArr);
                    }}
                    label="Expense Image"
                    isRequired={false}
                    isSubmited={isSubmited}
                    from={1}
                    to={100*1024*1024}
                    defaultValue=""
                    multiple={true}
                  />
                </div>
                <ImageForm />
                <SubmitButton
                  hasLoaded={isLoadedForm}
                  text={submitType === "add" ? "Add Expense" : "Edit Expense"}
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
                        "ExpenseReport/DeleteExpense",
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

  //filterField();
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);

  return (
    <div className="">
      <Header title="Expense Report" />
      <div className="py-5 px-3">
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-6 col-12 mb-2"></div>
          <div className="col-xl-6 col-12 mb-2">
            <div className="table-tool">
              <Text
                onClick={() => {
                  setIsShownForm(!isShownForm);
                  setSubmitType("add");
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-flex align-items-center">
                  <AddIcon />
                  <span style={{ marginLeft: "10px" }}>Add Expense</span>
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
                  fileName="expense-report"
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

export default ExpenseReport;
