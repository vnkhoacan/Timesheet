// components
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import { Button } from "@mui/material";
import Navbar from "../../components/Menubar/Navbar/Navbar";
import Footer from "../../components/Text/Footer/Footer";
// stylesheet
import "./Download.css";

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent>
        {/* code html css */}
        <div className="download">
          <div className="download_container">
            <div className="row">
            <div className="col-xl-6 col-12">
                <div className="d-flex w-100 h-100 align-items-center p-3">
                  <img
                    className="w-100"
                    src="assets/images/download-demo.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-xl-6 col-12">
                <h1 className="download_title">
                  Download Timesheet for Android
                </h1>
                <h5 className="download_sub-title">
                  Timsheet App released on Android
                </h5>
                <p className="d-flex align-items-center  download_description">
                  <i className="material-icons-outlined me-2 download_check">
                    task_alt
                  </i>
                  Manage your project easily
                </p>
                <p className="d-flex align-items-center  download_description">
                  <i className="material-icons-outlined me-2 download_check">
                    task_alt
                  </i>
                  Contact with your team conveniently and fast
                </p>
                <p className="d-flex align-items-center  download_description">
                  <i className="material-icons-outlined me-2 download_check">
                    task_alt
                  </i>
                  Report the summary for the project
                </p>
                <Button className="mt-4" variant="contained">
                  <i
                    style={{ fontSize: "20px" }}
                    className="material-icons-outlined me-3"
                  >
                    file_download
                  </i>
                  <a style={{color:"white"}} href="assets/apk/app-debug.apk" download>Download Now</a>
                </Button>
              </div>
              
            </div>
          </div>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
