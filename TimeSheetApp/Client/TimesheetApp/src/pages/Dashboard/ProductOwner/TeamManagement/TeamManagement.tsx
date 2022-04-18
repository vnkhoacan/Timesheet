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
import NumberValidation from "../../../../components/FormValidation/NumberValidation";
import Select from "../../../../components/FormValidation/Select";
import Header from "../../../../components/Text/Header";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

//--------------------------------------------------------------
//--------------------------------------------------------------
//global
var formValue: any = {
  team_name: "",
  team_budget: 0,
  team_description: "",
  project_id: "",
  manager_id: "",

};
//--------------------------------------------------------------
//--------------------------------------------------------------
const TeamManagement: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const [projects, setProjects] = useState<any>([]);
  const [projectBudget, setProjectBudget] = useState<number>(100);
  const [managers, setManagers] = useState([]);
  const [submitType, setSubmitType] = useState("");
  const [isLoadedForm, setIsLoadedForm] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [defaultRows, setDefaultRows] = useState([]);
  const selectors: any = useSelector((allSelectors) => allSelectors);
  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  var checkedRows: any = [];

  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post("TeamManagement/LoadTeam", {
        member_id: selectors.memberInfo.member_id,
      });
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
      id: "team_name",
      numeric: false,
      disablePadding: true,
      label: "Team Name",
    },
    {
      id: "team_description",
      numeric: false,
      disablePadding: true,
      label: "Team Description",
    },
    {
      id: "project_name",
      numeric: false,
      disablePadding: true,
      label: "Project Name",
    },
    {
      id: "manager_name",
      numeric: false,
      disablePadding: true,
      label: "Manager Name",
    },
    {
      id: "team_budget",
      numeric: false,
      disablePadding: true,
      label: "Budget",
    },
    {
      id: "team_amount",
      numeric: false,
      disablePadding: true,
      label: "Amount",
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

      var pb = 0;
      for (var i in projects) {
        if (formValue.project_id.toString() === projects[i].project_id.toString()) {
          pb =  projects[i].current_budget - parseFloat(formValue.team_budget);
          projects[i].current_budget = pb;
          break;
        }
      }
      setProjects(projects);
      setProjectBudget(pb);

      if (submitType === "add") {
        setIsLoadedForm(false);
        console.log(formValue);
        var addResult = await HttpClient.post("TeamManagement/AddTeam", {
          team: formValue,
        });
        if (addResult) {
          var newRow: any = { ...formValue };
          projects.map((value: any) => {
            if (value.project_id.toString() === newRow.project_id.toString())
              newRow.project_name = value.project_name;
          });
          managers.map((value: any) => {
            if (value.manager_id.toString() === newRow.manager_id.toString())
              newRow.manager_name = value.manager_name;
          });
          newRow.team_id = addResult;
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
        var editResult = await HttpClient.post("TeamManagement/EditTeam", {
          team: formValue,
        });
        if (editResult) {
          var newRow: any = { ...formValue };
          var newRows: any = [...defaultRows];
          projects.map((value: any) => {
            if (value.project_id.toString() === newRow.project_id.toString())
              newRow.project_name = value.project_name;
          });
          managers.map((value: any) => {
            if (value.manager_id.toString() === newRow.manager_id.toString())
              newRow.manager_name = value.manager_name;
          });
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

  var filter = [
    {
      label: "Manager Name",
      name: "manager_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Team Description",
      name: "team_description",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Team Name",
      name: "team_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Project Name",
      name: "project_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Budget",
      name: "team_budget",
      type: "number",
      dataFilter: [],
    },
  ];

  const filterData = (data: any) => {
    setDefaultRows(data);
  };

  const edit = (data: any, index: number) => {
    formValue = { ...data };
    console.log(data);
    setIsShownForm(!isShownForm);
    setSubmitType("edit");
    setEditIndex(index);
    getBudget(data.project_id);
    setMessage("");
  };

  const search = (value: any, name: any) => {
    if (value) {
      var temp = defaultRows;
      temp = temp.filter(
        (v: any) =>
          v[name]
            .toString()
            .toUpperCase()
            .indexOf(value.toString().toUpperCase()) >= 0
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

  const getBudget = (projectID: string): void => {
    if (projectID) {
      var currentProject: number = 0;
      for (var i in projects) {
        if (projectID.toString() === projects[i].project_id.toString()) {
          currentProject = parseFloat(projects[i].current_budget) + parseFloat(formValue.team_budget);
          break;
        }
      }
      setProjectBudget(currentProject);
    }
  };

  const Form = () => {
    const hc = (event: any, name: string): void => {
      formValue[name] = event.target.value;
      console.log(event.target.value);
      setMessage("");
    };

    const loadFormData = async (): Promise<void> => {
      if (selectors.memberInfo.permission) {
        var newRows = await HttpClient.post("TeamManagement/LoadFormData", {
          member_id: selectors.memberInfo.member_id,
        });

        if (newRows) {
          setProjects(newRows.projectInfo);
          setManagers(newRows.managerInfo);
        }
      }
    };

    useEffect(() => {
      if (isLogedIn) loadFormData();
    }, [isLogedIn]);

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
              <h4 className="m-0 px-4">Member Detail</h4>
              <div className="p-4">
                <div className="form-bg_input-group">
                  <BaseInput
                    defaultValue={formValue.team_name}
                    errorMessage="This field contain minimum 3 characters."
                    label="Team Name"
                    regex={/.{3,}/}
                    handleChange={(e: any) => {
                      hc(e, "team_name");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <NumberValidation
                    defaultValue={formValue.team_budget}
                    label="Team Budget"
                    handleChange={(e: any) => {
                      hc(e, "team_budget");
                    }}
                    isRequired={true}
                    from={1}
                    to={projectBudget}
                    isSubmited={isSubmited}
                  />
                </div>
                <TextArea
                  defaultValue={formValue.team_description}
                  errorMessage="This field must contains minimum 3 characters."
                  label="Team Description"
                  regex={/.{3,}/}
                  handleChange={(e: any) => {
                    hc(e, "team_description");
                  }}
                  isRequired={true}
                  isSubmited={isSubmited}
                />
                <div className="form-bg_input-group">
                  <Select
                    defaultValue={formValue.project_id}
                    handleChange={(e: any) => {
                      hc(e, "project_id");
                      getBudget(e.target.value);
                    }}
                    label="Project Name"
                    idName="project_id"
                    arr={projects}
                    name="project_name"
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <div className="mb-3">
                    <label className="form-label">Project Budget</label>
                    <input
                      type="text"
                      value={projectBudget}
                      disabled
                      style={{ padding: "2px 15px" }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-bg_input-group">
                  <Select
                    defaultValue={formValue.manager_id}
                    handleChange={(e: any) => {
                      hc(e, "manager_id");
                    }}
                    label="Manager Name"
                    idName="manager_id"
                    arr={managers}
                    name="manager_name"
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <NumberValidation
                    defaultValue={formValue.team_amount}
                    label="Team Amount"
                    handleChange={(e: any) => {
                      hc(e, "team_amount");
                    }}
                    isRequired={true}
                    from={1}
                    to={1000000}
                    isSubmited={isSubmited}
                  />
                </div>
                <SubmitButton
                  hasLoaded={isLoadedForm}
                  text={submitType === "add" ? "Add Team" : "Edit Team"}
                />
              </div>
            </form>
          </div>
        </>
      );
    }
    return <></>;
  };

  const DataTable = () => {
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
                        "TeamManagement/DeleteTeam",
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
      <Header title="Team Management" />
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
                  formValue = {
                    team_name: "",
                    team_budget: 0,
                    team_description: "",
                    project_id: "",
                    manager_id: "",
                  };
                  setProjectBudget(0);
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-flex align-items-center">
                  <AddIcon />
                  <span style={{ marginLeft: "10px" }}>Add Team</span>
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
                <Text style={{ marginLeft: "10px", cursor: "pointer" }}>
                  <ExportButton
                    fileName="team-management"
                    content={
                      <p className="d-flex align-items-center">
                        <DownloadIcon />
                        <span style={{ marginLeft: "10px" }}>Export</span>
                      </p>
                    }
                    rootData={rows}
                  />
                </Text>
              </Text>
            </div>
          </div>
        </div>
        {Form()}
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

export default TeamManagement;
