import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { Button } from "@mui/material";
import { scanOutline, stopCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DateConverter from "../../services/Date/DateConverter";
import { useHistory } from "react-router-dom";
import "./LoginQR.css";

const LoginQR: React.FC = () => {
  const history = useHistory();

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const [memberByQR, setMemberByQR] = useState<any>({
    socketID: "",
  });

  const [err, setErr] = useState<string>();

  const [hideBg, setHideBg] = useState("");

  const socket = useSelector((allSelectors: any) => allSelectors.socket);

  const startScan = async () => {
    console.log("start");
    BarcodeScanner.hideBackground(); // make background of WebView transparent
    setHideBg("hideBg");

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      var content = result.content !== undefined ? result.content : "";
      //present(result.content!, [{ text: "OK", role: "cancel" }]);
      var newMemberByQR: any = {socketID:content.replaceAll("+","")};;
      //alert(newMemberByQR);
      console.log(newMemberByQR);
      alert(newMemberByQR.socketID);
      setMemberByQR(newMemberByQR);
      sendMemberInfo(newMemberByQR);
      new Audio("assets/sound/message-notification.mp3").play();

      // log the raw scanned content
    }
    stopScan();
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("");
  };

  const [present] = useIonAlert();

  const sendMemberInfo = (newMemberByQR: any) => {
    socket.emit("SendMemberInfo", {
      memberInfo: memberInfo,
      socketID: newMemberByQR.socketID,
    });
  };

  const login = () => {
    socket.emit("SendRequestForLogin", {
      socketID: memberByQR.socketID,
    });
  };

  const refuse = () => {
    setMemberByQR({
      socketID: "",
      createdOn: new Date().toString(),
    });
  };

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
          return true;
        }

        return false;
      } catch (error: any) {
        setErr(error.message);
        console.log(error.message);
      }
    };

    checkPermission();

    return () => {};
  }, []);

  if (err) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>QRScanner</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRow>
            <IonText color="danger">{err}</IonText>
          </IonRow>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Button
            onClick={() => {
              history.goBack();
            }}
            style={{ zIndex: 11 }}
          >
            <i style={{ fontSize: "15px" }} className="material-icons">
              arrow_back_ios
            </i>
            Back
          </Button>
          <IonTitle>QRScanner</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" hidden={!hideBg} onClick={stopScan}>
              <IonIcon icon={stopCircleOutline} slot="start" />
              Stop Scan
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className={hideBg}>
        {memberByQR.socketID && !hideBg ? (
          <div className="w-100 h-100 d-flex">
            <div
              style={{
                display: "grid",
                justifyContent: "justify-content-center",
              }}
              className="m-auto"
            >
              <img src="assets/images/laptopqr.png" alt="" />
              <h4 style={{ fontSize: "14px" }} className="text-center">
                Do you want to login by QR Code ?
              </h4>
              <p style={{ fontSize: "14px" }} className="text-center">
                Login Code :{" "}
                <span className="medium-weight">{memberByQR.socketID}</span>
              </p>
              <p style={{ fontSize: "14px" }} className="text-center">
                Time :{" "}
                <span className="medium-weight">
                  {DateConverter.parseShortDateTime(new Date().toString())}
                </span>
              </p>
              <Button
                onClick={login}
                style={{ marginTop: "100px" }}
                variant="contained"
              >
                Login
              </Button>

              <p
                onClick={refuse}
                style={{ textDecoration: "underline" }}
                className="text-center mt-5 light-color medium-weight pointer-cursor"
              >
                Refuse
              </p>
            </div>
          </div>
        ) : (
          <IonButton
            className="start-scan-button"
            hidden={!!hideBg}
            onClick={startScan}
          >
            <IonIcon icon={scanOutline} slot="start" />
            Start Scan
          </IonButton>
        )}
        <div hidden={!hideBg} className="scan-box" />
      </IonContent>
    </IonPage>
  );
};

export default LoginQR;
