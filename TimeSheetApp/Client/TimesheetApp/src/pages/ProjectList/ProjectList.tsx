// components
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Navbar from "../../components/Menubar/Navbar/Navbar";
import ProjectItem from "./ProjectItem/ProjectItem";
import Header from "../../components/Text/Header";
import Footer from "../../components/Text/Footer/Footer";

// stylesheet
import "./ProjectList.css";
// module
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import HttpClient from "../../services/HttpClient/HttpClient";
import NativeStorage from "../../services/NativeStorage/NativeStorage";

const ProjectList: React.FC = () => {

  // declare variables
  var [projects, setProjects] = useState<any>([]);
  var memberInfo = useSelector((selectors: any) => selectors.memberInfo);
  var [status, setStatus] = useState<string>("");

  const loadProjectByMember = async (): Promise<void> => {
    var data = await NativeStorage.get("memberInfo");
    var memberInfo = JSON.parse(data);
    if (memberInfo) {
      var result = await HttpClient.post("ProjectList/LoadProjectByMember", {
        member_id: memberInfo.member_id,
        permission: memberInfo.permission,
      });
      console.log(result);
      setProjects(result);
      setStatus("LogedIn");
    } else setStatus("NotLogedIn");
  };

  // render connect function when dispatch
  useEffect(() => {
    loadProjectByMember();
  }, [memberInfo]);

  if (status === "LogedIn")
    return (
      <IonPage className="project-list">
        <IonHeader>
          <Navbar />
        </IonHeader>
        <IonContent>
          <div className="w-100 h-100">
            <Header title="Project List" />
            <div className="project-item_box px-3 py-3">
              {projects.map((value: any) => {
                return (
                  <ProjectItem
                    project_id={value.project_id}
                    project_name={value.project_name}
                    name={
                      memberInfo.permission === "Manager"
                        ? "Product Owner : " + value.product_owner_name
                        : "Manager : " + value.manager_name
                    }
                    url={
                      memberInfo.permission === "Manager"
                        ? "/dashboard/timesheet-statistic/" +
                          value.project_id +
                          "-" +
                          memberInfo.member_id
                        : "/dashboard/timesheet-summary/" +
                          value.project_id +
                          "-" +
                          memberInfo.member_id
                    }
                  />
                );
              })}
            </div>
          </div>
          <Footer />
        </IonContent>
      </IonPage>
    );
  if (status === "NotLogedIn") return <Redirect to="/invalid-page/404" />;
  return <></>;
};

export default ProjectList;
