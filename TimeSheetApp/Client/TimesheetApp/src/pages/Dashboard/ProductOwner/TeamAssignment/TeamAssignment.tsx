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
import Header from "../../../../components/Text/Header";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";
//--------------------------------------------------------------
//--------------------------------------------------------------
const TeamAssignment: React.FC = () => {
  const [message, setMessage] = useState("");
  const [formValue, setFormValue] = useState<any>({});
  const [defaultMemberID, setDefaultMemberID] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [submitType, setSubmitType] = useState("");
  const [isLoadedForm, setIsLoadedForm] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);
  const [rows, setRows] = useState<any>([]);
  const [teamInfo, setTeamInfo] = useState<any>({ team_amount: 0 });
  const [defaultRows, setDefaultRows] = useState<any>([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const project_id: any = useSelector((s: any) => s.project_id);
  const memberInfo: any = useSelector((s: any) => s.memberInfo);

  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);
  var checkedRows: any = [];

  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post(
        "TeamAssignment/LoadMemberInProject",
        {
          manager_id: memberInfo.member_id,
          project_id: project_id,
        }
      );
      for (var i in newRows.teamMember)
        newRows.teamMember[i].team_id = newRows.teamInfo.team_id;
      if (newRows) {
        setIsLoaded(true);
        setRows(newRows.teamMember);
        setDefaultRows(newRows.teamMember);
        setTeamInfo(newRows.teamInfo);
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
      id: "",
      numeric: true,
      disablePadding: false,
      label: "",
    },
  ];

  const getRows = async (rows: any): Promise<void> => {
    checkedRows = rows;
  };

  const submit = async (e: any): Promise<void> => {
    e.preventDefault();
    var isValid = true;
    for (var item in formValue) if (!formValue[item]) isValid = false;
    if (isValid) {
      if (submitType === "add") {
        var isExistedMember = rows.some(
          (v: any) => v.member_id === formValue.member_id
        );
        if (isExistedMember) setMessage("isexisted");
        else if (rows.length >= teamInfo.team_amount) setMessage("overamount");
        else {
          var isExisted = rows.some(
            (row: any) => row.member_id === formValue.member_id
          );
          if (isExisted) setMessage("warning");
          else {
            setIsLoadedForm(false);
            var addResult = await HttpClient.post(
              "TeamAssignment/AddMemberIntoTeam",
              {
                team_id: teamInfo.team_id,
                member_id: formValue.member_id,
              }
            );
            if (addResult) {
              var newRow: any = { ...formValue };
              newRow.team_id = teamInfo.team_id;
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
        }
      }
      if (submitType === "edit") {
        setIsLoadedForm(false);
        var editResult = await HttpClient.post(
          "TeamAssignment/EditMemberFromTeam",
          {
            team_id: teamInfo.team_id,
            member_id: defaultMemberID,
            member_id_change: formValue.member_id,
          }
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

  var filter = [
    {
      label: "Member Name",
      name: "member_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Department",
      name: "department_name",
      type: "empty",
      //data: [],
      dataFilter: [],
    },
    {
      label: "Position",
      type: "empty",
      name: "position_name",
      //data: [],
      dataFilter: [],
    },
  ];

  const filterField = () => {
    filter.map((value: any) => {
      if (value.type === "checkbox") {
        defaultRows.map((member: any) => {
          if (value.data.indexOf(member[value.name]) < 0)
            value.data.push(member[value.name]);
        });
      }
    });
  };

  const filterData = (data: any) => {
    setDefaultRows(data);
  };

  const resetData = () => {
    setDefaultRows(rows);
  };

  const edit = (data: any, index: number) => {
    var newData = { ...data };
    setIsShownForm(true);
    setSubmitType("edit");
    setFormValue(newData);
    setDefaultMemberID(data.member_id);
    setEditIndex(index);
    setMessage("");
    setSelectedMessage("");
  };

  const search = (value: any, name: any) => {
    if (value) {
      var temp = [...defaultRows];
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

  const ProcessedFormMessage = () => {
    if (message === "success")
      return <TextAlert error="Excute successfully" severity="success" />;
    if (message === "warning")
      return <TextAlert error="Fail to excute" severity="warning" />;
    if (message === "overamount")
      return (
        <TextAlert
          error="You have exceeded the allowed number of members"
          severity="warning"
        />
      );
    if (message === "isexisted")
      return (
        <TextAlert
          error="The member is added into your team"
          severity="warning"
        />
      );
    else return <></>;
  };

  const Form = () => {
    const loadMemberByEmail = async (): Promise<any> => {
      if (isLogedIn) {
        var member_id = memberInfo.member_id;
        var result = await HttpClient.post("TeamAssignment/LoadMemberByEmail", {
          member_id: member_id,
        });

        if (result) setMembers(result);
      }
    };

    useEffect(() => {
      loadMemberByEmail();
    }, [isLogedIn]);

    if (isShownForm) {
      return (
        <>
          <div className="base-dark-bg" />
          <div className="form-bg">
            <form onSubmit={submit} className="light-border m-auto">
              <CloseIcon
                onClick={() => {
                  setIsShownForm(false);
                }}
                className="form-bg_icon"
              />
              <div className="mt-5 px-3">
                <ProcessedFormMessage />
              </div>
              <h4 className="m-0 p-4">Member Detail</h4>
              <div id="project-list_form" className="p-4">
                <Select
                  defaultValue={formValue.member_id}
                  handleChange={(e: any) => {
                    var newValue: any = {};
                    members.map((v: any) => {
                      if (e.target.value === v.member_id.toString()) {
                        newValue.member_id = v.member_id;
                        newValue.member_name = v.member_name;
                        newValue.department_name = v.department_name;
                        newValue.position_name = v.position_name;
                      }
                    });
                    setFormValue({ ...formValue, ...newValue });
                  }}
                  label="Member Name"
                  idName="member_id"
                  arr={members}
                  name="member_name"
                  isSubmited={isSubmited}
                  isRequired={true}
                />
                <div className="m-3">
                  <label className="form-label">Department : </label>
                  <input
                    disabled
                    defaultValue={formValue.department_name}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="m-3">
                  <label className="form-label">Position : </label>
                  <input
                    disabled
                    defaultValue={formValue.position_name}
                    type="text"
                    className="form-control"
                  />
                </div>
                <SubmitButton
                  hasLoaded={isLoadedForm}
                  text={submitType === "add" ? "Add Member" : "Edit Member"}
                />
              </div>
            </form>
          </div>
        </>
      );
    }
    return "";
  };

  //component did mount
  useEffect(() => {
    if (!isLoaded) load();
    filterField();
  }, [isLogedIn]);

  return (
    <div className="">
      <Header title="Team Assignment" />
      <div className="py-5 px-3">
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-6 col-12 mb-2"></div>
          <div className="col-xl-6 col-12 mb-2">
            <div className="table-tool">
              <Text
                onClick={() => {
                  setIsShownForm(true);
                  setSubmitType("add");
                  setMessage("");
                  setSelectedMessage("");
                }}
                style={{ cursor: "pointer" }}
              >
                <p className="d-flex align-items-center">
                  <AddIcon />
                  <span style={{ marginLeft: "10px" }}>Add Member</span>
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
                  fileName="team-assignment"
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
        {Form()}
        <p className="p-3">Member Amount : {teamInfo.team_amount}</p>
        <div className="row w-100 m-0 mb-3">
          <div className="col-xl-4 col-12">
            {isShownFilter ? (
              <Filter
                search={search}
                data={defaultRows}
                filter={filter}
                filterData={filterData}
                resetData={resetData}
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
                              "TeamAssignment/DeleteMemberFromTeam",
                              { rows: checkedData }
                            );
                            if (result) {
                              var newData = defaultRows.filter(
                                (value: any, index: any) =>
                                  checkedRows.indexOf(index.toString()) < 0
                              );
                              setRows(newData);
                              setDefaultRows(newData);
                              setSelectedMessage(
                                result ? "success" : "warning"
                              );
                            } else {
                              setSelectedMessage(
                                result ? "success" : "warning"
                              );
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
            ) : (
              <TableProgressor />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAssignment;
