import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../../../components/Text/Header";

import BaseTable from "../../../../components/Table/BaseTable";
import TableProgressor from "../../../../components/Table/TableProgressor";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import TextAlert from "../../../../components/Alert/Text/TextAlert";
import DatePicker from "../../../../components/FormValidation/DatePicker";
import BaseInput from "../../../../components/FormValidation/BaseInput";
import NumberValidation from "../../../../components/FormValidation/NumberValidation";
import SubmitButton from "../../../../components/Button/SubmitButton";
import Filter from "../../../../components/Filter/Filter";
import DeleteIcon from "@mui/icons-material/Delete";
import Text from "../../../../components/Text/Text";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import Alert_YESNO from "../../../../components/Alert/ButtonAlert/Alert_YESNO/Alert_YESNO";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DateConverter from "../../../../services/Date/DateConverter";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

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
    id: "project_name",
    numeric: false,
    disablePadding: true,
    label: "Project Name",
  },
  {
    id: "project_description",
    numeric: true,
    disablePadding: false,
    label: "Project Description",
  },
  {
    id: "from_date",
    numeric: true,
    disablePadding: false,
    label: "From Date",
  },
  {
    id: "to_date",
    numeric: true,
    disablePadding: false,
    label: "To Date",
  },
  {
    id: "budget",
    numeric: true,
    disablePadding: false,
    label: "Budget",
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
var project: any = {
  project_name: "",
  project_description: "",
  from_date: new Date().toString(),
  to_date: new Date().toString(),
  budget: "",
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const ProjectList: React.FC = () => {
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
  const memberInfo: any = useSelector((s: any) => s.memberInfo);
  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post("ProjectManagement/LoadProject", {
        member_id: memberInfo.member_id,
      });
      newRows.map((value: any) => {
        value.from_date = new Date(value.from_date).toLocaleDateString();
        value.to_date = new Date(value.to_date).toLocaleDateString();
        value.created_on = new Date(value.created_on).toLocaleDateString();
      });

      if (newRows) {
        setRows(newRows);
        setDefaultRows(newRows);
      }
      setIsLoaded(true);
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const getRows = async (rows: any): Promise<void> => {
    checkedRows = rows;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const submit = async (e: any): Promise<void> => {
    e.preventDefault();
    console.log(project);
    var isValid = true;
    for (var item in project) if (!project[item]) isValid = false;
    if (isValid) {
      if (submitType === "add") {
        setIsLoadedForm(false);
        project.member_id = memberInfo.member_id;
        project.from_date =
          new Date(project.from_date).getFullYear() +
          "-" +
          (new Date(project.from_date).getMonth() + 1) +
          "-" +
          new Date(project.from_date).getDate();
        project.to_date =
          new Date(project.to_date).getFullYear() +
          "-" +
          (new Date(project.to_date).getMonth() + 1) +
          "-" +
          new Date(project.to_date).getDate();
        var addResult: string = await HttpClient.post(
          "ProjectManagement/AddProject",
          { project: project }
        );
        if (addResult) {
          var newRow: any = { ...project };
          newRow.project_id = addResult;
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
        project.from_date =
          new Date(project.from_date).getFullYear() +
          "-" +
          (new Date(project.from_date).getMonth() + 1) +
          "-" +
          new Date(project.from_date).getDate();
        project.to_date =
          new Date(project.to_date).getFullYear() +
          "-" +
          (new Date(project.to_date).getMonth() + 1) +
          "-" +
          new Date(project.to_date).getDate();
        project.member_id = memberInfo.member_id;
        var editResult: boolean = await HttpClient.post(
          "ProjectManagement/UpdateProject",
          {
            project: project,
          }
        );

        if (editResult) {
          var newRow: any = { ...project };
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
      label: "Project Name",
      name: "project_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Project Description",
      name: "project_description",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "From Date",
      name: "from_date",
      type: "date",
      dataFilter: [],
    },
    {
      label: "To Date",
      type: "date",
      name: "to_date",
      dataFilter: [],
    },
    {
      label: "Budget",
      type: "number",
      name: "budget",
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
    setDefaultRows(data);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const stringToDate = (str: any) => {
    var strDate = "";
    var d = "";
    for (var item = 0; item < str.length; item++) {
      console.log(strDate);
      if (str[item] === "/") {
        if (item + 1 < str.length) d = "-" + strDate + d;
        strDate = "";
      } else strDate = strDate + str[item];
    }
    d = strDate + d;
    return d;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const edit = (data: any, index: number) => {
    project = { ...data };
    project.from_date = stringToDate(project.from_date);
    project.to_date = stringToDate(project.to_date);
    setEditIndex(index);
    setIsShownForm(true);
    setSubmitType("edit");
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const search = (value: any, name: any) => {
    if (value) {
      var temp = defaultRows;
      temp = temp.filter(
        (v: any) => v[name].toString().toUpperCase().indexOf(value.toString().toUpperCase()) >= 0
      );
      console.log(temp);
      setDefaultRows(temp);
    } else setDefaultRows(rows);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
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
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const ProcessedFormMessage: React.FC = () => {
    if (message === "success")
      return (
        <TextAlert error="This has done successfully" severity="success" />
      );
    if (message === "warning")
      return <TextAlert error="This has failed to do" severity="warning" />;
    else return <></>;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const Form: React.FC = () => {
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    const hc = (event: any, name: string): void => {
      project[name] = event.target.value;
      setMessage("");
    };
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    const hcDatePicker = (date: any, name: string): void => {
      project[name] = DateConverter.dateToString(date);
      setMessage("");
    };
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    if (isShownForm) {
      return (
        <>
          <div className="base-dark-bg" />
          <div className="form-bg">
            <form onSubmit={submit} className="light-border m-auto">
              <CloseIcon
                onClick={() => {
                  setIsShownForm(false);
                  setMessage("");
                }}
                className="form-bg_icon"
              />
              <div className="mt-5 px-3">
                <ProcessedFormMessage />
              </div>
              <h4 className="m-0 p-4">Project Detail</h4>

              <div id="project-list_form" className="p-4">
                <BaseInput
                  errorMessage="Project Name must contains a-z A-Z 0-9 and minimum 3 characters."
                  label="Project Name : "
                  regex={/^(?=[A-Za-z])[A-Za-z\d]{3,}$/}
                  handleChange={(e: any) => {
                    hc(e, "project_name");
                  }}
                  defaultValue={project.project_name}
                  isRequired={true}
                  isSubmited={isSubmited}
                />
                <BaseInput
                  errorMessage="Project Description must contains a-z A-Z 0-9 and minimum 3 characters."
                  label="Project Description : "
                  regex={/^(?=[A-Za-z])[A-Za-z\d]{3,}$/}
                  defaultValue={project.project_description}
                  handleChange={(e: any) => {
                    hc(e, "project_description");
                  }}
                  isRequired={true}
                  isSubmited={isSubmited}
                />
                <DatePicker
                  handleChange={(e: any) => {
                    hcDatePicker(e, "from_date");
                  }}
                  label="From Date : "
                  isRequired={true}
                  defaultValue={project.from_date}
                  isSubmited={isSubmited}
                />
                <DatePicker
                  handleChange={(e: any) => {
                    hcDatePicker(e, "to_date");
                  }}
                  isRequired={true}
                  label="To Date : "
                  defaultValue={project.to_date}
                  isSubmited={isSubmited}
                />
                <NumberValidation
                  label="Project Budget : "
                  defaultValue={project.budget}
                  handleChange={(e: any) => {
                    hc(e, "budget");
                  }}
                  isRequired={true}
                  from={1}
                  to={1000000000}
                  isSubmited={isSubmited}
                />
                <SubmitButton
                  hasLoaded={isLoadedForm}
                  text={submitType === "add" ? "Add Project" : "Edit Project"}
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
                        "ProjectManagement/DeleteProject",
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
  filterField();
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="">
      <Header title="Project Management" />
      <div className="py-5 px-3">
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-6 col-12 mb-2"></div>
          <div className="col-xl-6 col-12 mb-2">
            <div className="table-tool">
              <Text
                onClick={() => {
                  setSubmitType("add");
                  setIsShownForm(true);
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-flex align-items-center">
                  <AddIcon />
                  <span style={{ marginLeft: "10px" }}>Add Project</span>
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
                  fileName="project-management"
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

export default ProjectList;
