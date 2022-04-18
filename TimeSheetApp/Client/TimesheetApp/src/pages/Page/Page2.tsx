import { IonContent, IonPage } from "@ionic/react";
import Sidebar from "../../components/Menubar/Sidebar/Sidebar";
import DashboardNavbar from "../../components/Menubar/DashboardNavbar/DashboardNavbar";
import $ from "jquery";
import GroupedBar from "../../components/Charts/BarChart/GroupedBar";
import { useState, useEffect } from "react";
import HttpClient from "../../services/HttpClient/HttpClient";
import "./ProgressProject.css";
//--------------------------------------------------------------
//--------------------------------------------------------------
const Dashboard: React.FC = () => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  const hideSidebar = () => {
    $("#dashboard  .side-content:eq(0)").removeClass("show_side-content");
    $("#dashboard .sidebar:eq(0)").removeClass("hide_sidebar");
    $("#dashboard  .side-content:eq(0)").addClass("hide_side-content");
    $("#dashboard .sidebar:eq(0)").addClass("show_sidebar");
    $("#dashboard .dark-bg:eq(0)").removeClass("show_dark-bg");
  };

  const [hours, setHours] = useState<any>({});
  const loadData = async (): Promise<void> => {
    var result = await HttpClient.post("ProgressProject/SumHoursByMonth", {
      project_id: 10010,
    });
    setHours(result);
  };

  const getHours = (name: any): any => {
    if (hours[name] !== undefined) {
      var arr: any = [];
      hours[name].map((value: any) => {
        arr.push(value.hours);
      });
      return arr;
    }
  };

  const sumHours = (): number => {
    if (hours.approval !== undefined) {
      var sum: number = 0;
      hours.approval.map((value: any) => {
        sum += value.hours;
      });
      hours.unapproval.map((value: any) => {
        sum += value.hours;
      });
      return sum;
    }
    return 0;
  };

  const sumHoursByName = (name: string): number => {
    if (hours[name] !== undefined) {
      var sum: number = 0;
      hours[name].map((value: any) => {
        sum += value.hours;
      });
      return sum;
    }
    return 0;
  };

  useEffect(() => {
    loadData();
  }, []);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <IonPage id="dashboard" style={{ overflowY: "scroll" }}>
      <IonContent>
        <div className="row w-100 h-100 m-0 p-0">
          <div
            onClick={hideSidebar}
            id="dashboard_dark-bg"
            className="dark-bg"
          ></div>
          <div className="sidebar light-border">
            <Sidebar />
          </div>
          <div className="side-content">
            <DashboardNavbar toggleBar={()=>{}} />
            <IonContent>
              <div className="progress-project">
                <div className="statistic">
                  <div className="row">
                    <div className="col-xl-9">
                      <GroupedBar
                        ds1Name="Approved"
                        ds2Name="Unapproved"
                        ds1={getHours("approval")}
                        ds2={getHours("unapproval")}
                      />
                    </div>
                    <div className="col-xl-3">
                      <div className="w-100 h-100">
                        <div className="number-statistic">
                          <div
                            style={{ background: "#eef2ff" }}
                            className="info"
                          >
                            <span>
                              <h1
                                style={{ color: "#3730a3" }}
                                className="text-center"
                              >
                                {sumHours()}
                              </h1>
                              <span style={{ color: "#3730a3" }}>Hours</span>
                            </span>
                          </div>
                        </div>
                        <div className="number-statistic">
                          <div
                            style={{ background: "#f0fdf4" }}
                            className="info"
                          >
                            <span>
                              <h1
                                style={{ color: "#166534" }}
                                className="text-center"
                              >
                                {sumHoursByName("approval")}
                              </h1>
                              <span style={{ color: "#166534" }}>
                                Approval Hours
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="number-statistic">
                          <div
                            style={{ background: "#f1f5f9" }}
                            className="info"
                          >
                            <span>
                              <h1
                                style={{ color: "#64748b " }}
                                className="text-center"
                              >
                                {sumHoursByName("unapproval")}
                              </h1>
                              <span style={{ color: "#64748b " }}>
                                Unapproval Hours
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </IonContent>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
