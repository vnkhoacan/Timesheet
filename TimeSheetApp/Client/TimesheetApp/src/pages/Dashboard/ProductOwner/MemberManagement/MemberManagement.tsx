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
import BaseInput from "../../../../components/FormValidation/BaseInput";
import PasswordInput from "../../../../components/FormValidation/PasswordInput";

import Select from "../../../../components/FormValidation/Select";
import Header from "../../../../components/Text/Header";
import ExportButton from "../../../../components/Button/Export/Excel/ExportButton";

//--------------------------------------------------------------
//--------------------------------------------------------------
//global
var formValue: any = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  permission: "",
  department_id: "",
  position_id: "",
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const MemberManagement: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const [department, setDepartment] = useState([]);
  const [position, setPosition] = useState([]);
  const [submitType, setSubmitType] = useState("");
  const [isLoadedForm, setIsLoadedForm] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isShownFilter, setIsShownFilter] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);
  const [rows, setRows] = useState([]);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [defaultRows, setDefaultRows] = useState([]);
  const isLogedIn: boolean = useSelector((s: any) => s.isLogedIn);
  const memberInfo: any = useSelector((s: any) => s.memberInfo);

  var checkedRows: any = [];
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const load = async (): Promise<void> => {
    if (isLogedIn) {
      setIsLoaded(false);
      var newRows = await HttpClient.post(
        "MemberManagement/LoadMemberByEmail",
        {
          member_id: memberInfo.member_id,
        }
      );
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
    var a: any = [];
    newValue.map((value) => {
      var b = "";
      for (var i = 0; i < value.epath.length; i++) {
        b += value.epath[i] == "," ? "" : value.epath[i];
        if (value.epath[i + 1] == "," || i == value.epath.length - 1) {
          a.push(b);
          b = "";
        }
      }
      value.epath = a;
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
      id: "email",
      numeric: false,
      disablePadding: true,
      label: "Email",
    },
    // {
    //   id: "default_password",
    //   numeric: false,
    //   disablePadding: true,
    //   label: "Password",
    // },
    {
      id: "member_name",
      numeric: false,
      disablePadding: true,
      label: "Member Name",
    },
    {
      id: "permission",
      numeric: false,
      disablePadding: true,
      label: "Permission",
    },
    {
      id: "created_on",
      numeric: false,
      disablePadding: true,
      label: "Created On",
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
    console.log(formValue);
    var isValid = true;
    for (var item in formValue) if (!formValue[item]) isValid = false;
    if (isValid) {
      if (submitType === "add") {
        setIsLoadedForm(false);
        formValue.email = formValue.email + getOrganizationEmail();
        formValue.created_on = dateToString(new Date());
        formValue.member_name =
          formValue.first_name + " " + formValue.last_name;

        var addResult: string = await HttpClient.post(
          "MemberManagement/AddMember",
          {
            member: formValue,
          }
        );
        if (addResult) {
          var newRow: any = { ...formValue };
          newRow.member_id = addResult;
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
        formValue.email = formValue.email + getOrganizationEmail();
        formValue.member_name =
          formValue.first_name + " " + formValue.last_name;
        var editResult: boolean = await HttpClient.post(
          "MemberManagement/EditMember",
          {
            member: formValue,
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
    } else setIsSubmited(true);
  };

  var filter = [
    {
      label: "Member Name",
      name: "member_name",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Member Description",
      name: "member_description",
      type: "empty",
      dataFilter: [],
    },
    {
      label: "Created On",
      name: "created_on",
      type: "date",
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

  const getOrganizationEmail = (): string => {
    if (memberInfo.permission) {
      var email = memberInfo.email;
      var start = "";
      for (var i in email) if (email[i] === "@") start = i;
      email = email.substring(start, email.length);
      return email;
    }
    return "";
  };

  const getEmail = (oldEmail: string): string => {
    var email: any = oldEmail;
    var end: any;
    for (var i in email) if (email[i] === "@") end = i;
    email = email.substring(0, end);
    return email;
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
    setEditIndex(rows.findIndex((v: any) => v.member_id === data.member_id));
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
          (v: any) =>
            v[name]
              .toString()
              .toUpperCase()
              .indexOf(value.toString().toUpperCase()) >= 0
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
      return (
        <TextAlert error="This has done successfully" severity="success" />
      );
    if (message === "success")
      return <TextAlert error="This has failed to do" severity="warning" />;
    else return <></>;
  };

  const Form = () => {
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    const hc = (e: any, name: string) => {
      var newValue: any = { ...formValue };
      newValue[name] = e.target.value;
      formValue = newValue;
      setMessage("");
    };
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    const loadDepartment = async (): Promise<void> => {
      if (memberInfo.permission) {
        var result = await HttpClient.post(
          "DepartmentManagement/LoadDepartment",
          {
            member_id: memberInfo.member_id,
          }
        );
        setDepartment(result);
      }
    };
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    const loadPosition = async (): Promise<void> => {
      if (memberInfo.permission) {
        var result = await HttpClient.post("PositionManagement/LoadPosition", {
          member_id: memberInfo.member_id,
        });
        setPosition(result);
      }
    };

    const genderSelect = [
      { gender: 1, genderStr: "Male" },
      { gender: 0, genderStr: "Female" },
    ];
    //--------------------------------------------------------------
    //--------------------------------------------------------------
    useEffect(() => {
      if (!department.length) loadDepartment();
      if (!position.length) loadPosition();
    }, []);
    //--------------------------------------------------------------
    //--------------------------------------------------------------
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
                    defaultValue={getEmail(formValue.email)}
                    errorMessage="This field contain minimum 3 characters."
                    label="Email"
                    regex={/.{3,}/}
                    handleChange={(e: any) => {
                      hc(e, "email");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <label className="form-label">Organization Email</label>
                  <input
                    value={getOrganizationEmail()}
                    disabled
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-bg_input-group">
                  <BaseInput
                    defaultValue={formValue.first_name}
                    errorMessage="This field contain minimum 3 characters."
                    label="First Name"
                    regex={/.{3,}/}
                    handleChange={(e: any) => {
                      hc(e, "first_name");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <BaseInput
                    defaultValue={formValue.last_name}
                    errorMessage="This field contain minimum 3 characters."
                    label="Last Name"
                    regex={/.{3,}/}
                    handleChange={(e: any) => {
                      hc(e, "last_name");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <PasswordInput
                    defaultValue={formValue.password}
                    errorMessage="Password contains at least a-z, A-Z, 0-9 and minimum 8 characters."
                    label="Password"
                    regex={
                      /^(?=[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/
                    }
                    handleChange={(e: any) => {
                      hc(e, "password");
                    }}
                    isRequired={true}
                    isSubmited={isSubmited}
                  />
                </div>
                <div className="form-bg_input-group">
                  <Select
                    defaultValue={formValue.permission}
                    handleChange={(e: any) => {
                      hc(e, "permission");
                    }}
                    label="Permission"
                    name="permission"
                    arr={[
                      { permission: "Manager" },
                      { permission: "Employee" },
                    ]}
                    idName="permission"
                    isSubmited={isSubmited}
                    isRequired={true}
                  />
                </div>
                <div className="form-bg_input-group">
                  <Select
                    defaultValue={formValue.department_id}
                    handleChange={(e: any) => {
                      hc(e, "department_id");
                    }}
                    label="Department"
                    idName="department_id"
                    arr={department}
                    name="department_name"
                    isSubmited={isSubmited}
                    isRequired={true}
                  />
                </div>
                <div className="form-bg_input-group">
                  <Select
                    defaultValue={formValue.position_id}
                    handleChange={(e: any) => {
                      hc(e, "position_id");
                    }}
                    label="Position"
                    idName="position_id"
                    arr={position}
                    name="position_name"
                    isRequired={true}
                    isSubmited={isSubmited}
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
                        "MemberManagement/DeleteMember",
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

  const filterRows = () => {
    var newRows: any = [...rows];
    for (var i in newRows) delete newRows[i].default_password;
    console.log(newRows);
    return newRows;
  };

  //filterField();
  //component did mount
  useEffect(() => {
    load();
  }, [isLogedIn]);

  return (
    <div className="">
      <Header title="Member Management" />
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
                  setIsSubmited(false);
                  formValue = {
                    email: "",
                    password: "",
                    first_name: "",
                    last_name: "",
                    permission: "",
                    department_id: "",
                    position_id: "",
                  };
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
                  fileName="member-management"
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
            {DataTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;
