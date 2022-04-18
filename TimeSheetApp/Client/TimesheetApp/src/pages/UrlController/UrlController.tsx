import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Page404: React.FC = () => {
  const [host, setHost] = useState<string>("");

  const changeUrl = () => {
    var host_api: any = document.getElementById("host_api");
    host_api.innerText = host;
    alert("ok");
  };

  return (
    <IonPage>
      <IonContent>
        {/* Error Page */}
        <div>
          <div className="w-75 p-5">
            <div>
              <input
                onChange={(e: any) => setHost(e.target.value)}
                className="form-control"
                type="text"
                name=""
                id=""
                placeholder="Change host"
              />
            </div>
            <div className="d-flex align-items-center py-3">
              <button onClick={changeUrl} className="btn btn-primary me-3">
                Update
              </button>
              <Link to="/home">Back to Home</Link>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Page404;
