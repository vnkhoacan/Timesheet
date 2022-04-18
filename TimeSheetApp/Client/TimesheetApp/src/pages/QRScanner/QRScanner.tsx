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
import { scanOutline, stopCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./QRScanner.css";
//--------------------------------------------------------------
//--------------------------------------------------------------
const QRScanner: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [err, setErr] = useState<string>();
  const [hideBg, setHideBg] = useState("");
  const socket = useSelector((allSelectors: any) => allSelectors.socket);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const takeAttendant = (socketID: string): void => {
    socket.emit("TakeAttendant", socketID);
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const startScan = async () => {
    BarcodeScanner.hideBackground(); // make background of WebView transparent
    setHideBg("hideBg");

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      var content = result.content !== undefined ? result.content : "";
      var memberInfo: any = JSON.parse(content);
      //alert(result.content)
      takeAttendant(memberInfo.socketID);
      //present(result.content!, [{ text: "OK", role: "cancel" }]);
      // log the raw scanned content
    }
    stopScan();
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    setHideBg("");
  };
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const [present] = useIonAlert();
  //--------------------------------------------------------------
  //--------------------------------------------------------------
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
  //--------------------------------------------------------------
  //--------------------------------------------------------------
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
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
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
        <IonButton
          className="start-scan-button"
          hidden={!!hideBg}
          onClick={startScan}
        >
          <IonIcon icon={scanOutline} slot="start" />
          Start Scan
        </IonButton>
        <div hidden={!hideBg} className="scan-box" />
      </IonContent>
    </IonPage>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default QRScanner;
