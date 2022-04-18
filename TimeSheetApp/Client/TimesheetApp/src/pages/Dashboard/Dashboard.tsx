// components
import { IonContent, IonPage, IonRouterOutlet } from "@ionic/react";
import Sidebar from "../../components/Menubar/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Menubar/DashboardNavbar/DashboardNavbar";
import { Route, Redirect } from "react-router";
import ProjectManagement from "./ProductOwner/ProjectManagement/ProjectManagement";
import TeamAssignment from "./ProductOwner/TeamAssignment/TeamAssignment";
import AllTimesheet from "./Manager/AllTimesheet/AllTimesheet";
import ExpenseReport from "./Employee/ExpenseReport/ExpenseReport";
import AllExpense from "./Manager/AllExpense/AllExpense";
import TimesheetReport from "./Employee/TimesheetReport/TimesheetReport";
import MyTeam from "./General/MyTeam/MyTeam";
import DepartmentManagement from "./ProductOwner/DepartmentManagement/DepartmentManagement";
import PositionManagement from "./ProductOwner/PositionManagement/PositionManagement";
import MemberManagement from "./ProductOwner/MemberManagement/MemberManagement";
import TeamManagement from "./ProductOwner/TeamManagement/TeamManagement";
import ProgressProject from "./ProductOwner/ProgressProject/ProgressProject";
import BudgetProject from "./ProductOwner/BudgetProject/BugdetProject";
import TimesheetStatistic from "./Manager/TimesheetStatistic/TimesheetStatistic";
import ExpenseStatistic from "./Manager/ExpenseStatistic/ExpenseStatistic";
import TimesheetSummary from "./Employee/TimesheetSummary/TimesheetSummary";
import ExpenseSummary from "./Employee/ExpenseSummary/ExpenseSummary";
import Chat from "./General/Chat/Chat";
import TimesheetCode from "./Employee/TimesheetCode/TimesheetCode";
import Taskboard from "./General/Taskboard/Taskboard";
import Calendar from "./General/Calendar/Calendar";
import TaskboardDetail from "./General/TaskboardDetail/TaskboardDetail";
import TaskList from "./General/TaskList/TaskList";
import FileManager from "./General/FileManager/FileManager";
import Note from "./General/Note/Note";
import Profile from "./General/Profile/Profile";

// stylesheet
import "./Dashboard.css";
// module
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NativeStorage from "../../services/NativeStorage/NativeStorage";
import Mailbox from "./General/Mailbox/Mailbox";

const Dashboard: React.FC = () => {
  // declare variables
  var socket = useSelector((s: any) => s.socket);

  var dispatch = useDispatch();

  var memberInfo = useSelector((s: any) => s.memberInfo);

  var isLogedIn = useSelector((s: any) => s.isLogedIn);

  var isConnectedSocket = useSelector((s: any) => s.isConnectedSocket);

  var hasConnectedSocket = useSelector((s: any) => s.hasConnectedSocket);

  var [isShownSidebar, setIsShownSidebar] = useState<boolean>(true);
  var [sidebarClass, setSidebarClass] = useState<string>("");

  const toggleSidebar = () => {
    setIsShownSidebar(!isShownSidebar);
    setSidebarClass(!isShownSidebar ? "" : "w-100");
  };

  // connect to app
  const connect = (): void => {
    if (isConnectedSocket && isLogedIn) {
      if (!hasConnectedSocket) {
        socket.emit("Online", {
          email: memberInfo.email,
          member_id: memberInfo.member_id,
        });
      }

      dispatch({
        type: "SET_STATE",
        payload: {
          hasConnectedSocket: true,
        },
      });
    }
  };

  // render connect function when dispatch
  useEffect(() => {
    connect();
  }, [isConnectedSocket, isLogedIn]);

  return (
    <IonPage id="dashboard">
      <IonContent>
        <div className="row w-100 m-0 p-0">
          {isShownSidebar ? (
            <>
              <div
                onClick={toggleSidebar}
                id="dashboard_dark-bg"
                className="dark-bg"
              ></div>
              <div className="sidebar light-border">
                <Sidebar />
              </div>
            </>
          ) : (
            ""
          )}
          <div className={"side-content " + sidebarClass}>
            <div className="side-content_navbar">
              <DashboardNavbar toggleBar={toggleSidebar} />
            </div>
            <div className="side-content_content">
              <IonContent>
                <Nested />
              </IonContent>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

const Nested: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [permission, setPermission] = useState<string>("");
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const loadPermission = async (): Promise<void> => {
    var data: any = await NativeStorage.get("memberInfo");
    var memberInfo: any = JSON.parse(data);
    if (memberInfo) setPermission(memberInfo.permission);
    else setPermission("Empty");
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  useEffect(() => {
    loadPermission();
  }, []);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  if (permission === "ProductOwner") return <PO_Nested />;
  if (permission === "Manager") return <M_Nested />;
  if (permission === "Employee") return <E_Nested />;
  if (permission === "Empty") return <Redirect to="/login" />;
  return <></>;
  //--------------------------------------------------------------
  //--------------------------------------------------------------
};

const PO_Nested: React.FC = () => {
  return (
    <IonRouterOutlet
      style={{
        overflowY: "auto",
        display: "block",
        maxHeight: "100%",
      }}
    >
      <Route exact path="/dashboard/task-board/:boardName-:boardID">
        <TaskboardDetail />
      </Route>
      <Route exact path="/dashboard/profile">
        <Profile />
      </Route>
      <Route exact path="/dashboard/note">
        <Note />
      </Route>
      <Route exact path="/dashboard/calendar">
        <Calendar />
      </Route>
      <Route exact path="/dashboard/mail-box">
        <Mailbox />
      </Route>
      <Route exact path="/dashboard/file-manager">
        <FileManager />
      </Route>
      <Route exact path="/dashboard/task-board">
        <Taskboard />
      </Route>
      <Route exact path="/dashboard/project-management">
        <ProjectManagement />
      </Route>
      <Route exact path="/dashboard/team-assignment">
        <TeamAssignment />
      </Route>
      <Route exact path="/dashboard/department-management">
        <DepartmentManagement />
      </Route>
      <Route exact path="/dashboard/position-management">
        <PositionManagement />
      </Route>
      <Route exact path="/dashboard/member-management">
        <MemberManagement />
      </Route>
      <Route exact path="/dashboard/team-management">
        <TeamManagement />
      </Route>
      <Route exact path="/dashboard/progress-project">
        <ProgressProject />
      </Route>
      <Route exact path="/dashboard/budget-project">
        <BudgetProject />
      </Route>
      <Route exact path="/dashboard/chat">
        <Chat />
      </Route>
    </IonRouterOutlet>
  );
};

const M_Nested: React.FC = () => {
  return (
    <IonRouterOutlet
      style={{
        overflowY: "auto",
        display: "block",
        maxHeight: "100%",
      }}
    >
      <Route exact path="/dashboard/profile">
        <Profile />
      </Route>
      <Route exact path="/dashboard/note">
        <Note />
      </Route>
      <Route exact path="/dashboard/mail-box">
        <Mailbox />
      </Route>
      <Route exact path="/dashboard/file-manager">
        <FileManager />
      </Route>
      <Route exact path="/dashboard/task-list">
        <TaskList />
      </Route>
      <Route exact path="/dashboard/task-board/:boardName-:boardID">
        <TaskboardDetail />
      </Route>
      <Route exact path="/dashboard/calendar">
        <Calendar />
      </Route>
      <Route exact path="/dashboard/task-board">
        <Taskboard />
      </Route>
      <Route exact path="/dashboard/timesheet-summary/:projectID-:memberID">
        <TimesheetSummary />
      </Route>
      <Route exact path="/dashboard/expense-summary/:projectID-:memberID">
        <ExpenseSummary />
      </Route>
      <Route exact path="/dashboard/team-assignment">
        <TeamAssignment />
      </Route>
      <Route exact path="/dashboard/all-timesheet">
        <AllTimesheet />
      </Route>
      <Route exact path="/dashboard/all-expense">
        <AllExpense />
      </Route>
      <Route exact path="/dashboard/my-team">
        <MyTeam />
      </Route>
      <Route exact path="/dashboard/timesheet-statistic/:projectID-:memberID">
        <TimesheetStatistic />
      </Route>
      <Route exact path="/dashboard/expense-statistic/:projectID-:memberID">
        <ExpenseStatistic />
      </Route>
      <Route exact path="/dashboard/chat">
        <Chat />
      </Route>
    </IonRouterOutlet>
  );
};

const E_Nested: React.FC = () => {
  return (
    <IonRouterOutlet
      style={{
        overflowY: "auto",
        display: "block",
        maxHeight: "100%",
      }}
    >
      <Route exact path="/dashboard/profile">
        <Profile />
      </Route>
      <Route exact path="/dashboard/note">
        <Note />
      </Route>
      <Route exact path="/dashboard/mail-box">
        <Mailbox />
      </Route>
      <Route exact path="/dashboard/calendar">
        <Calendar />
      </Route>
      <Route exact path="/dashboard/file-manager">
        <FileManager />
      </Route>
      <Route exact path="/dashboard/task-list">
        <TaskList />
      </Route>
      <Route exact path="/dashboard/task-board">
        <Taskboard />
      </Route>
      <Route exact path="/dashboard/task-board/:boardName-:boardID">
        <TaskboardDetail />
      </Route>
      <Route exact path="/dashboard/timesheet-report">
        <TimesheetReport />
      </Route>
      <Route exact path="/dashboard/expense-report">
        <ExpenseReport />
      </Route>
      <Route exact path="/dashboard/my-team">
        <MyTeam />
      </Route>
      <Route exact path="/dashboard/timesheet-summary/:projectID-:memberID">
        <TimesheetSummary />
      </Route>
      <Route exact path="/dashboard/expense-summary/:projectID-:memberID">
        <ExpenseSummary />
      </Route>
      <Route exact path="/dashboard/chat">
        <Chat />
      </Route>
      <Route exact path="/dashboard/timesheet-code">
        <TimesheetCode />
      </Route>
    </IonRouterOutlet>
  );
};

export default Dashboard;
