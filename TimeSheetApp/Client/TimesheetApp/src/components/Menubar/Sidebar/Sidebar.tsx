// module
import * as React from "react";
import { useSelector } from "react-redux";
// components
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
// icon
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupIcon from "@mui/icons-material/Group";
import NoteIcon from "@mui/icons-material/Note";
import DescriptionIcon from "@mui/icons-material/Description";
import TimelineIcon from "@mui/icons-material/Timeline";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import ChatIcon from "@mui/icons-material/Chat";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
// stylesheet
import "./Sidebar.css";

// sidebar for employee
const EmployeeSidebar: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const project_id = useSelector((s: any) => s.project_id);
  const member_id = useSelector((s: any) => s.memberInfo.member_id);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <List
      className="dashboard_sidebar_main"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Sidebar
        </ListSubheader>
      }
    >
      <NavLink
        className="base-link"
        to={"/dashboard/timesheet-summary/" + project_id + "-" + member_id}
      >
        <ListItemButton>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheet Summary" />
        </ListItemButton>
      </NavLink>
      <NavLink
        className="base-link"
        to={"/dashboard/expense-summary/" + project_id + "-" + member_id}
      >
        <ListItemButton>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Expense Summary" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/timesheet-report">
        <ListItemButton>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheet Report" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/expense-report">
        <ListItemButton>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Expense Report" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/my-team">
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="My Team" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/chat">
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/mail-box">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons-outlined">mail</i>
          </ListItemIcon>
          <ListItemText primary="Mailbox" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/timesheet-code">
        <ListItemButton>
          <ListItemIcon>
            <QrCodeIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheet Code" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-board">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Taskboard" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-list">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Task List" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/calendar">
        <ListItemButton>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/note">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons">text_snippet</i>
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/profile">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons">person</i>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/file-manager">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons-outlined">drive_folder_upload</i>
          </ListItemIcon>
          <ListItemText primary="File Mananger" />
        </ListItemButton>
      </NavLink>
    </List>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
// sidebar for manager
const ManagerSidebar: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const project_id = useSelector((s: any) => s.project_id);
  const member_id = useSelector((s: any) => s.memberInfo.member_id);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <List
      className="dashboard_sidebar_main"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Timesheet
        </ListSubheader>
      }
    >
      <NavLink
        className="base-link"
        to={"/dashboard/timesheet-statistic/" + project_id + "-" + member_id}
      >
        <ListItemButton>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheet Statistic" />
        </ListItemButton>
      </NavLink>
      <NavLink
        className="base-link"
        to={"/dashboard/expense-statistic/" + project_id + "-" + member_id}
      >
        <ListItemButton>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Expense Statistic" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/all-timesheet">
        <ListItemButton>
          <ListItemIcon>
            <NoteIcon />
          </ListItemIcon>
          <ListItemText primary="All Timesheet" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/all-expense">
        <ListItemButton>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="All Expense" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/my-team">
        <ListItemButton>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="My Team" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/team-assignment">
        <ListItemButton>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Team Assignment" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/chat">
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/mail-box">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons-outlined">mail</i>
          </ListItemIcon>
          <ListItemText primary="Mailbox" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-board">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Taskboard" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-list">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIndIcon />
          </ListItemIcon>
          <ListItemText primary="Task List" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/calendar">
        <ListItemButton>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/note">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons">text_snippet</i>
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/profile">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons">person</i>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/file-manager">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons-outlined">drive_folder_upload</i>
          </ListItemIcon>
          <ListItemText primary="File Mananger" />
        </ListItemButton>
      </NavLink>
    </List>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
// sidebar for product owner
const ProductOwnerSidebar: React.FC = () => {
  return (
    <List
      className="dashboard_sidebar_main"
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Timesheet
        </ListSubheader>
      }
    >
      <NavLink className="base-link" to="/dashboard/progress-project">
        <ListItemButton>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Progress Project" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/budget-project">
        <ListItemButton>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Budget Project" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/project-management">
        <ListItemButton>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Project Management" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/member-management">
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Member Management" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/team-management">
        <ListItemButton>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Team Management" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/department-management">
        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon />
          </ListItemIcon>
          <ListItemText primary="Department Management" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/position-management">
        <ListItemButton>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Position Management" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/chat">
        <ListItemButton>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/mail-box">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons-outlined">mail</i>
          </ListItemIcon>
          <ListItemText primary="Mailbox" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/task-board">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Taskboard" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/calendar">
        <ListItemButton>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/note">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons">text_snippet</i>
          </ListItemIcon>
          <ListItemText primary="Notes" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/profile">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons">person</i>
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>
      </NavLink>
      <NavLink className="base-link" to="/dashboard/file-manager">
        <ListItemButton>
          <ListItemIcon>
            <i className="material-icons-outlined">drive_folder_upload</i>
          </ListItemIcon>
          <ListItemText primary="File Mananger" />
        </ListItemButton>
      </NavLink>
    </List>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
// check user sidebar
const Sidebar: React.FC = () => {
  const permission = useSelector((s: any) => s.memberInfo.permission);
  if (permission === "ProductOwner") return <ProductOwnerSidebar />;
  if (permission === "Manager") return <ManagerSidebar />;
  if (permission === "Employee") return <EmployeeSidebar />;
  return <></>;
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default Sidebar;
