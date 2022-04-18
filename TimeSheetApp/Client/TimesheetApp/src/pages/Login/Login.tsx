// components
import BaseInput from "../../components/FormValidation/BaseInput";
import PasswordInput from "../../components/FormValidation/PasswordInput";
import Capcha from "../../components/Capcha/Capcha";
import HttpClient from "../../services/HttpClient/HttpClient";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { IonContent, IonPage } from "@ionic/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SubmitButton from "../../components/Button/SubmitButton";
import QRCode from "react-qr-code";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import FlexAvatar from "../../components/Avatar/FlexAvatar";
// stylesheet
import "./Login.css";
// module
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import NativeStorage from "../../services/NativeStorage/NativeStorage";
import { useDispatch, useSelector } from "react-redux";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const socketID = useSelector((s: any) => s.socketID);

  const [memberQR, setMemberQR] = useState<any>({
    socketID: "",
    createdOn: new Date().toString(),
  });

  const memberInfo = useSelector((s: any) => s.memberInfo);
  const isLogedInWithQRCode = useSelector((s: any) => s.isLogedInWithQRCode);
  const isReceivedMemberInfo = useSelector((s: any) => s.isReceivedMemberInfo);

  const [error, setError] = useState<string>("");
  const [hasLoaded, setHasLoaded] = useState<boolean>(true);
  const [capchaCode, setCapchaCode] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  const [user, setUser] = useState<any>({ email: "", password: "" });
  const history = useHistory<any>();
  const [tab, setTab] = useState<number>(0);

  const changeTabs = (event: any, newValue: number) => {
    setTab(newValue);
  };

  const handleChange = (event: any, name: string): void => {
    var newUser: any = { ...user };
    newUser[name] = event.target.value;
    setUser({ ...newUser });
    setError("");
  };

  // load all
  const loadAll = async (member_id: number): Promise<any> => {
    var result = await HttpClient.post("All/LoadAll", { member_id: member_id });
    return result;
  };

  const login = async (): Promise<void> => {
    setIsSubmited(true);
    if (user.email && user.password) {
      setHasLoaded(false);
      var result = await HttpClient.post("User/Login", user);
      if (result && result.length) {
        authentication(result[0]);
      } else setError("Your email or password is incorrect");
      setHasLoaded(true);
      //var capchaTextTemp = $("#login_capcha").attr("data-text");
      // if (capchaTextTemp === capchaCode) {
      // } else setError("Capcha is incorrect");
    }
  };

  const authentication = async (newMemberInfo: any): Promise<void> => {
    var all = await loadAll(newMemberInfo.member_id);
    dispatch({
      type: "SET_STATE",
      payload: {
        memberInfo: newMemberInfo,
        isLogedIn: true,
        unreadMessages: all.unreadMessages,
        unreadMails: all.unreadMails,
      },
    });
    await NativeStorage.set("memberInfo", newMemberInfo);
    if (newMemberInfo.permission === "ProductOwner")
      history.push("/dashboard/progress-project");
    else history.push("/project-list");
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    if (isLogedInWithQRCode) {
      new Audio("assets/sound/message-notification.mp3").play();
      authentication(memberInfo);
    }
  }, [isLogedInWithQRCode]);

  useEffect(() => {
    if (socketID) {
      var newMemberQR = { ...memberQR };
      newMemberQR.socketID = socketID;
      setMemberQR(JSON.stringify(newMemberQR));
    }
  }, [socketID]);

  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // useEffect(() => {
  //   Capcha.createCaptcha("login_capcha");
  // }, []);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // useEffect(() => {
  //   if (error) Capcha.createCaptcha("login_capcha");
  // }, [error]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        <div className="login">
          <div className="login_box">
            <div className="login_box_header">
              <img
                className="logo m-auto"
                src="assets/icon/favicon.png"
                alt="logo"
              />
              <h2 className="m-auto pb-5 pt-3">Welcome to Timesheet</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tab}
                    onChange={changeTabs}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      sx={{ width: "50%" }}
                      label="QR Code"
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{ width: "50%" }}
                      label="Account"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                  {isReceivedMemberInfo ? (
                    <div style={{ display: "grid", justifyContent: "center" }}>
                      <div className="d-flex justify-content-center mb-2">
                        <FlexAvatar
                          style={{ width: "100px", height: "100px" }}
                          src={memberInfo.avatar}
                          name={
                            memberInfo.first_name + " " + memberInfo.last_name
                          }
                        />
                      </div>
                      <div
                        className="text-center mb-1"
                        style={{ fontWeight: 500 }}
                      >
                        {memberInfo.first_name + " " + memberInfo.last_name}
                      </div>
                      <p
                        style={{ fontSize: "14px" }}
                        className="text-center light-color"
                      >
                        Scan QR code successful. Please select "Login" on your
                        mobile device.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex">
                        <div className="m-auto light-border p-3">
                          <QRCode
                            size={220}
                            value={
                              socketID +
                              "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
                            }
                          />
                        </div>
                      </div>
                      <p
                        style={{ fontSize: "14px" }}
                        className="text-center light-color mt-3"
                      >
                        Scan QR code from the app to login
                      </p>
                    </>
                  )}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  {error ? (
                    <Alert className="mb-3" severity="warning">
                      {error}
                    </Alert>
                  ) : (
                    ""
                  )}
                  <BaseInput
                    defaultValue=""
                    errorMessage="Email is invalid. Ex : viet@gmail.com."
                    label="Email"
                    regex={
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    }
                    isRequired={true}
                    handleChange={(event: any) => {
                      handleChange(event, "email");
                    }}
                    isSubmited={isSubmited}
                  />
                  <PasswordInput
                    defaultValue=""
                    errorMessage="Password contains at least a-z, A-Z, 0-9 and minimum 8 characters."
                    label="Password"
                    regex={
                      /^(?=[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/
                    }
                    isRequired={true}
                    handleChange={(event: any) => {
                      handleChange(event, "password");
                    }}
                    isSubmited={isSubmited}
                  />
                  {/* <div className="d-flex mb-3">
              <input
                onChange={(e: any) => {
                  setCapchaCode(e.target.value);
                  setError("");
                }}
                type="text"
                className="form-control me-2"
              />
              <Capcha.CapchaImage idName="login_capcha" />
            </div> */}
                  <SubmitButton text="Login" hasLoaded={hasLoaded} />
                  <div
                    style={{
                      marginTop: "80px",
                      fontSize: "14px",
                      fontWeight: 300,
                    }}
                    className="form-group"
                  >
                    <span>
                      Need an account ?{" "}
                      <Link style={{ textDecoration: "none" }} to="/register">
                        Register
                      </Link>
                    </span>
                  </div>
                  <div
                    style={{ fontSize: "14px", fontWeight: 300 }}
                    className="form-group"
                  >
                    <Link style={{ textDecoration: "none" }} to="/home">
                      <ArrowBackIcon sx={{ fontSize: 14 }} /> Back Home
                    </Link>
                  </div>
                </TabPanel>
              </Box>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
