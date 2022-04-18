// components
import Capcha from "../../components/Capcha/Capcha";
import SubmitButton from "../../components/Button/SubmitButton";
import TextAlert from "../../components/Alert/Text/TextAlert";
import { IonContent, IonPage } from "@ionic/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BaseInput from "../../components/FormValidation/BaseInput";
import NumberValidation from "../../components/FormValidation/NumberValidation";
import PasswordInput from "../../components/FormValidation/PasswordInput";
import MatchPassword from "../../components/FormValidation/MatchPassword";

// module
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import HttpClient from "../../services/HttpClient/HttpClient";
import $ from "jquery";
// stylesheet
import "./Register.css";
//--------------------------------------------------------------
//--------------------------------------------------------------
const Register: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  // declare variables
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [capchaCode, setCapchaCode] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState<boolean>(false);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [user, setUser] = useState<any>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
    street_code: "",
    street_name: "",
    area: "",
    city: "",
    country: "",
  });
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const handleChange = (event: any, name: string): void => {
    var newUser: any = { ...user };
    newUser[name] = event.target.value;
    setError("");
    setUser(newUser);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const authenticate = async (e: any): Promise<void> => {
    e.preventDefault();
    var isValid = true;
    setIsSubmited(true);
    for (var item in user) {
      if (!user[item]) isValid = false;
    }
    if (isValid) {
      var capchaTextTemp = $("#register_capcha").attr("data-text");
      if (capchaTextTemp === capchaCode) {
        setIsLoaded(false);
        var result = await HttpClient.post("User/Register", { user: user });
        if (result) {
          setError("success");
          setIsLoaded(true);
        } else {
          setError("fail");
          setIsLoaded(true);
        }
      } else setError("capcha");
    }
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const RegisterMessage: React.FC = () => {
    if (error === "success")
      return (
        <TextAlert severity="success" error="You has registered successfully" />
      );
    if (error === "capcha")
      return <TextAlert severity="info" error="Capcha is incorrect" />;
    if (error === "fail")
      return (
        <TextAlert severity="info" error="Your email has already existed." />
      );
    if (error === "password")
      return (
        <TextAlert severity="info" error="Confirm password is incorrect" />
      );
    return <> </>;
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  useEffect(() => {
    Capcha.createCaptcha("register_capcha");
  }, []);
  useEffect(() => {
    if (error) Capcha.createCaptcha("register_capcha");
  }, [error]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <IonPage>
      <IonContent>
        <div className="register">
          <div className="container_form">
            <div className="title">Get Started !</div>
            <div className="content">
              <form
                onSubmit={(e) => {
                  authenticate(e);
                }}
              >
                <div className="pt-2 pb-2">
                  <RegisterMessage />
                </div>
                <div className="user-details">
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="First Name must contain a-z A-Z."
                      label="First Name"
                      regex={/^[A-Za-z]{1,}$/}
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "first_name");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="Last Name must contain a-z A-Z."
                      label="Last Name"
                      regex={/^[A-Za-z]{2,}$/}
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "last_name");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="Email is invalid. Ex : viet@gmail.com."
                      label="Email : "
                      regex={
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      }
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "email");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <PasswordInput
                      defaultValue=""
                      errorMessage="Password contains a-z, A-Z, 0-9 and minimum 8 characters"
                      label="Password : "
                      regex={
                        /^(?=[A-Za-z])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/
                      }
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "password");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <MatchPassword
                      defaultValue={user.password}
                      errorMessage="You must fill in correctly the entered password."
                      label="Confirm Password : "
                      handleChange={(event: any) => {
                        handleChange(event, "confirm_password");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <NumberValidation
                      defaultValue=""
                      label="Street Code : "
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "street_code");
                      }}
                      from={0}
                      to={1000}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="Invalid."
                      label="Street Name : "
                      regex={/^/}
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "street_name");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="Invalid."
                      label="Area : "
                      regex={/^/}
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "area");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="Invalid."
                      label="City : "
                      regex={/^/}
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "city");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <BaseInput
                      defaultValue=""
                      errorMessage="Invalid."
                      label="Country : "
                      regex={/^/}
                      isRequired={true}
                      handleChange={(event: any) => {
                        handleChange(event, "country");
                      }}
                      isSubmited={isSubmited}
                    />
                  </div>
                  <div className="input-box">
                    <div className="form-group d-flex">
                      <input
                        onChange={(e: any) => {
                          setCapchaCode(e.target.value);
                          setError("");
                        }}
                        type="text"
                        className="form-control me-2"
                      />
                      <Capcha.CapchaImage idName="register_capcha" />
                    </div>
                  </div>
                </div>

                <SubmitButton text="Register" hasLoaded={isLoaded} />
                <div style={{ marginTop: "80px" }} className="form-group">
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                    }}
                  >
                    Had an account ?{" "}
                    <Link style={{ textDecoration: "none" }} to="/login">
                      Login
                    </Link>
                  </span>
                </div>
                <div  style={{ fontSize: "14px", fontWeight: 300 }} className="form-group">
                  <Link style={{ textDecoration: "none" }} to="/home">
                    <ArrowBackIcon sx={{ fontSize: 14 }} /> Back Home
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
