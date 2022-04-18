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

//--------------------------------------------------------------
//--------------------------------------------------------------
//global
var formValue: any = {};
//--------------------------------------------------------------
//--------------------------------------------------------------
const PositionManagement: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [message, setMessage] = useState("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [submitType, setSubmitType] = useState("");
  const [isLoadedForm, setIsLoadedForm] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [defaultRows, setDefaultRows] = useState([]);
  const selectors: any = useSelector((allSelectors) => allSelectors);
  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post("PositionManagement/LoadPosition", {
        member_id: selectors.memberInfo.member_id,
      });
      if (newRows) {
        setRows(newRows);
        setDefaultRows(newRows);
        setIsLoaded(true);
      }
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
      id: "position_name",
      numeric: false,
      disablePadding: true,
      label: "Position Name",
    },
    {
      id: "position_description",
      numeric: true,
      disablePadding: false,
      label: "Position Description",
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
    for (var item in formValue) if (!formValue[item]) isValid = false;
    if (isValid) {
      if (submitType === "add") {
        setIsLoadedForm(false);
        formValue.member_id = selectors.memberInfo.member_id;
        var addResult: string = await HttpClient.post(
          "PositionManagement/AddPosition",
          { position: formValue }
        );
        if (addResult) {
          var newRow: any = { ...formValue };
          newRow.position_id = addResult;
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
        var editResult: boolean = await HttpClient.post(
          "PositionManagement/EditPosition",
          { position: formValue }
        );
        if (editResult) {
          var newRow: any = { ...formValue };
          var newRows: any = [...defaultRows];
          if (editIndex >= 0) newRows[editIndex] = newRow;
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
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  var filter = [
    {
      label: "Position Name",
      name: "position_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Position Description",
      name: "position_description",
      type: "empty",
      dataFilter: [],
    },
  ];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const filterData = (data: any) => {
    setRows(data);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const edit = (data: any, index: number) => {
    formValue = { ...data };
    setEditIndex(index);
    setIsShownForm(!isShownForm);
    setSubmitType("edit");
    setMessage("");
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const search = (value: any, name: any) => {
    if (value) {
      var temp = defaultRows;
      temp = temp.filter(
        (v: any) => v[name].toUpperCase().indexOf(value.toUpperCase()) >= 0
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
    if (message === "warning")
      return <TextAlert error="This has failed to do" severity="warning" />;
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
              <h4 className="m-0 px-4">Position Detail</h4>
              <div className="p-4">
                <div className="">
                  <BaseInput
                    defaultValue={formValue.position_name}
                    errorMessage="This field contain minimum 3 characters."
                    label="Position Name"
                    regex={/.{3,}/}
                    handleChange={(e: any) => {
                      handleChange(e, "position_name");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <TextArea
                  defaultValue={formValue.position_description}
                  errorMessage="This field contain minimum 3 characters."
                  label="Position Description"
                  regex={/.{3,}/}
                  handleChange={(e: any) => {
                    handleChange(e, "position_description");
                  }}
                  isRequired={true}
                  isSubmited={isSubmited}
                />
                <SubmitButton
                  hasLoaded={isLoadedForm}
                  text={submitType === "add" ? "Add Position" : "Edit Position"}
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
                        "PositionManagement/DeletePosition",
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

  const filterRows = (): any => {
    var newRows: any = [...rows];

    for (var i in newRows) delete newRows[i].member_id;

    return newRows;
  };

  //filterField();
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);

  return (
    <div className="">
      <Header title="Position Management" />
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
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-flex align-items-center">
                  <AddIcon />
                  <span style={{ marginLeft: "10px" }}>Add Position</span>
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
                  fileName="position-management"
                  content={
                    <p className="d-flex align-items-center">
                      <DownloadIcon />
                      <span style={{ marginLeft: "10px" }}>Export</span>
                    </p>
                  }
                  rootData={filterRows()}
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

export default PositionManagement;
