// components
import { IonPage, IonContent, IonHeader } from "@ionic/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Menubar/Navbar/Navbar";
import Footer from "../../components/Text/Footer/Footer";

// stylesheet
import "./About.css";

const About: React.FC = () => {
  const [aboutClass, setAboutClass] = useState<string>("about-page_scroll");

  const scrollPage = (e: any): void => {
    console.log(e.target.scrollTop);
    if (e.target.scrollTop > 100) setAboutClass("");
    else setAboutClass("about-page_scroll");
  };

  return (
    <IonPage onScroll={scrollPage} className={"about-page " + aboutClass}>
      <IonHeader style={{ zIndex: aboutClass?0:10 }}>
        <div className="">
          <Navbar />
        </div>
      </IonHeader>
      <IonContent>
        {/* code html css */}
        <div onScroll={scrollPage} className="about">
          <div className="about_header">
            <div className="about_header-content">
              <div className="about_header-content_title">
                Timesheet Application
              </div>
              <div className="about_header-content_sub-title mb-5">
                Timesheet is a professional time management website & app for
                businesses
              </div>
              <NavLink to="/home" className="btn">
                Try Now
              </NavLink>
            </div>

            <svg
              className="jss7 about_header_art"
              viewBox="0 0 5120.2823 783.981"
            >
              <path d="M 3670.6043,209.14801 C 3337.6013,212.45223 3194.3342,96.609127 2881.1672,97.148137 2460.1603,97.873147 2207.0439,206.07082 1888.1669,209.14801 1526.117,212.64183 1299.0011,21.613727 710.167,19.147727 253.12399,17.233737 0.16694596,209.14801 0.16694596,209.14801 V 783.81429 H 5120.1153 V 186.11842 C 5119.0036,185.47889 4805.6453,5.3746871 4480.5297,0.25855706 4155.4141,-4.8575729 3988.4742,205.99394 3670.6043,209.14801 Z" />
            </svg>
          </div>
          <div className="about_body">
            <div className="Demo1">
              <div className="">
                <div className="row">
                  <div className="col-xl-6 col-12">
                    <img
                      src="assets/images/about-bc-demo.png"
                      alt=""
                      className="Demo1-img about_bc-demo"
                    />
                  </div>
                  <div className="col-xl-6 col-12">
                    <div className="Demo1-content">
                      <div className="text-icon">
                        <i className="material-icons-outlined Demo2_icon">
                          {" "}
                          bar_chart{" "}
                        </i>
                      </div>
                      <h3 className="text-h3">
                        Timesheet is a good application
                      </h3>
                      <p className="text-p">
                        Timesheet supports you in project management matters.
                        With specific features and fully meet the needs from
                        customers that we have learned. Timesheet can help you
                        monitor and track the progress, budget, members of the
                        project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Demo2">
              <div className="">
                <div className="row">
                  <div className="col-xl-6 col-12">
                    <div className="Demo2-content">
                      <div className="text-icon">
                        <i className="material-icons-outlined Demo2_icon">
                          {" "}
                          auto_stories{" "}
                        </i>
                      </div>
                      <h2 className="text-h2">
                        Timesheet is a flexible application
                      </h2>
                      <p className="text-p">
                        With this application, you can communicate with members
                        easily and quickly. At the same time, the application
                        has many other attractive features to make your work
                        easier.
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-12">
                    <img
                      src="assets/images/about-mailbox-demo.png"
                      alt=""
                      className="Demo2-img"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="Demo3">
              <div className="Demo3-content">
                {/* <div className="text-icon">
                <i className="material-icons-outlined"> verified </i>
              </div> */}
                <h2 className="text-h2">
                  Timesheet is a management application
                </h2>
                <p className="text-p">
                  The application includes many features to help you manage
                  projects. You can assign and manage work from team members
                  conveniently.
                </p>
              </div>
              <img
                src="assets/images/about-taskboard-demo.png"
                alt=""
                className="Demo3-img"
              />
            </div>
          </div>
          <Footer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
