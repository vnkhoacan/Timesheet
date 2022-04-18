/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
/* Theme variables */
import "./theme/variables.css";
/* Component */
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import QRScanner from "./pages/QRScanner/QRScanner";
import ProjectList from "./pages/ProjectList/ProjectList";
import LoginQR from "./pages/LoginQR/LoginQR";
import About from "./pages/About/About";
import Download from "./pages/Download/Download";
import UrlController from "./pages/UrlController/UrlController";

import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// module
import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// services
import NativeStorage from "./services/NativeStorage/NativeStorage";
// models
import HttpClient from "./services/HttpClient/HttpClient";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    authenticate();
    connectSocket();
  }, []);

  // connect socket after get socket id
  const connectSocket = (): void => {
    var host_api: any = document.getElementById("host_api");
    const HOST_NAME: string = host_api.innerText;
    var socket: any = io(HOST_NAME);
    socket.on("connect", () => {
      socket.on("ReceiveSessionID", function (socketID: string) {
        dispatch({
          type: "SET_STATE",
          payload: {
            socket: socket,
            socketID: socketID,
            isConnectedSocket: true,
          },
        });
      });

      socket.on("ReceiveMessage", (message: any) => {
        dispatch({
          type: "SET_STATE",
          payload: {
            message: message,
          },
        });
      });

      socket.on("ReceiveMemberInfo", (memberInfo: any) => {
        console.log("ReceiveMemberInfo");
        console.log(memberInfo);
        dispatch({
          type: "SET_STATE",
          payload: {
            memberInfo: memberInfo,
            isReceivedMemberInfo: true,
          },
        });
      });

      socket.on("ReceiveRequestForLogin", (loginData: any) => {
        console.log("ReceiveRequestForLogin");
        dispatch({
          type: "SET_STATE",
          payload: {
            isLogedIn: true,
            isLogedInWithQRCode: true,
          },
        });
      });

      // receive comment from members
      socket.on("ReceiveComment", (comment: any) => {
        dispatch({
          type: "SET_COMMENT",
          payload: comment,
        });
      });

      // receive mail from members
      socket.on("ReceiveMail", (mail: any) => {
        dispatch({
          type: "SET_MAIL",
          payload: mail,
        });
      });
    });
  };

  // check if user has loged in after
  const authenticate = async (): Promise<void> => {
    var memberInfo = await NativeStorage.get("memberInfo");
    var project_id = await NativeStorage.get("project_id");
    var all = [];
    console.log(memberInfo);
    console.log(project_id);
    if (memberInfo) all = await loadAll(JSON.parse(memberInfo).member_id);
    //await NativeStorage.clear();
    dispatch({
      type: "SET_STATE",
      payload: {
        memberInfo: memberInfo
          ? JSON.parse(memberInfo)
          : {
              member_id: "",
              first_name: "",
              last_name: "",
              email: "",
              permission: "",
              avatar: "",
            },
        isLogedIn: memberInfo ? true : false,
        project_id: project_id ? project_id : "",
        unreadMessages: memberInfo && all ? all.unreadMessages : [],
        unreadMails: memberInfo && all ? all.unreadMails : [],
      },
    });
  };

  // load all
  const loadAll = async (member_id: number): Promise<any> => {
    var result = await HttpClient.post("All/LoadAll", { member_id: member_id });
    return result;
  };

  return (
    <IonApp style={{ overflowY: "auto" }} className="base-theme">
      
      <IonReactRouter>
        <Switch>

          <IonRouterOutlet>
            {/* pages for invalid page */}
            {/* <Route exact>
              <Redirect to="/invalid-page/404" />
            </Route>
            <Route exact path="/invalid-page/404">
              <Page404 />
            </Route> */}
            <Route exact path="/url-controller">
              <UrlController />
            </Route>
            {/* pages for home */}
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/download">
              <Download />
            </Route>

            {/* pages for login */}
            <Route exact path="/login" component={Login} />

            <Route exact path="/login-qr">
              <LoginQR />
            </Route>

            {/* pages for register */}
            <Route exact path="/register">
              <Register />
            </Route>
            {/* pages for dashboard */}
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/all-timesheet">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/project-management">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/team-assignment">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/expense-report">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/all-expense">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/timesheet-report">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/my-team">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/department-management">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/position-management">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/member-management">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/team-management">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/progress-project">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/budget-project">
              <Dashboard />
            </Route>
            <Route
              exact
              path="/dashboard/timesheet-statistic/:projectID-:memberID"
            >
              <Dashboard />
            </Route>
            <Route
              exact
              path="/dashboard/expense-statistic/:projectID-:memberID"
            >
              <Dashboard />
            </Route>
            <Route
              exact
              path="/dashboard/timesheet-summary/:projectID-:memberID"
            >
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/expense-summary/:projectID-:memberID">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/chat">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/timesheet-code">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/task-board">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/task-board/:boardName-:boardID">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/calendar">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/task-list">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/file-manager">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/mail-box">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard/note">
              <Dashboard />
            </Route>

            <Route exact path="/dashboard/profile">
              <Dashboard />
            </Route>

            {/* project list */}
            <Route exact path="/project-list">
              <ProjectList />
            </Route>

            {/* pages for login */}
            <Route exact path="/qr-scanner">
              <QRScanner />
            </Route>
          </IonRouterOutlet>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
