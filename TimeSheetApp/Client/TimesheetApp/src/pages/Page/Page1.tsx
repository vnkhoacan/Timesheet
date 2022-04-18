import { IonContent, IonPage } from "@ionic/react";
import TaskList from "../Dashboard/General/TaskList/TaskList";
import * as React from "react";
import FileManager from "../Dashboard/General/FileManager/FileManager";

function ListMail() {
  return (
    <div style={{ background: "blue",width:"30%" }}>
      <div>list</div>
      <div>list</div>
      <div>list</div>
      <div>list</div>
      <div>list</div>
    </div>
  );
}

function DefaultMail() {
  return (
    <div style={{ background: "red",width:"70%" }}>
      <div>default</div>
      <div>default</div>
      <div>default</div>
      <div>default</div>
      <div>default</div>
    </div>
  );
}

const Dashboard: React.FC = () => {
  return (
    <IonPage id="dashboard" style={{ overflowY: "scroll" }}>
      <IonContent>
        <div className="d-flex">
          <ListMail />
          <DefaultMail />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
