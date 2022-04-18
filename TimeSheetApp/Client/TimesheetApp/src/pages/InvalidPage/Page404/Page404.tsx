import { IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import "./Page404.css";
//--------------------------------------------------------------
//--------------------------------------------------------------
const Page404: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        {/* Error Page */}
        <div id="notfound">
          <div className="notfound">
            <div className="notfound-404">
              <h3>Oops! Page not found</h3>
              <h1>
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
            </div>
            <h2>we are sorry, but the page you requested was not found</h2>
            <p className="text-center">
              <Link to="/home">Back to Home</Link>
            </p>
          </div>
        </div>

        {/* <div className="page-404">
          <div className="page-404_content">
            <img src="/assets/images/page-404.gif" alt="" />
            <div className="page-404_text w-100">
              <h1 className="text-center">Oops! Page Not Be Found</h1>
              <p className="text-center">
                We are sorry but the page you are looking for does not exist,
                have been removed, name changed or is temporarily unavailable
              </p>
              <p className="text-center">
                <Link to="/home">Back to Home</Link>
              </p>
            </div>
          </div>
        </div> */}
      </IonContent>
    </IonPage>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default Page404;
