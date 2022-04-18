// components
import GBThree from "../../../../components/Charts/BarChart/GBThree";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import PieThree from "../../../../components/Charts/PieChart/PieThree";
import Text from "../../../../components/Text/Text";
import BasicLine from "../../../../components/Charts/LineChart/Basic";

// icon
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
// module
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// css
import "../../../../stylesheet/Statistic.css";

const ProgressProject: React.FC = () => {
  const [hoursByDay, setHoursByDay] = useState<any>({});

  const [hoursByMonth, setHoursByMonth] = useState<any>({});

  const [countTS, setCountTS] = useState<any>({});

  const [projects, setProjects] = useState<any>([]);

  const memberInfo: any = useSelector((s: any) => s.memberInfo);

  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  const loadSummary = async (project_id: string): Promise<void> => {
    if (project_id) {
      var result = await HttpClient.post("ProgressProject/LoadSummary", {
        project_id: project_id,
      });

      setHoursByDay(result.hoursByDay);
      setHoursByMonth(result.hoursByMonth);
      setCountTS(result.countTS);
    }
  };

  const getTotalByName = (value: any, name: string, groupName: string): any => {
    if (value[name] !== undefined) {
      var total = 0;
      value[name].map((value: any) => {
        total += value[groupName];
      });
      return total;
    }
    return 0;
  };

  const loadProjects = async (): Promise<void> => {
    if (isLogedIn) {
      var result = await HttpClient.post("ProjectManagement/LoadProject", {
        member_id: memberInfo.member_id,
      });
      if (result) {
        setProjects(result);
        loadSummary(result.length ? result[0].project_id : "");
      }
    }
  };

  const getHours = (value: any, name: string): any => {
    if (value[name] !== undefined) {
      var arr: any = [];
      value[name].map((value: any) => {
        arr.push(value.sum_hours);
      });
      return arr;
    }
  };

  const getDay = (name: any): any => {
    if (hoursByDay[name] !== undefined) {
      var arr: any = [];
      hoursByDay[name].map((value: any) => {
        arr.push(value.work_date.substring(0, 10));
      });
      return arr;
    }
  };

  const getTotal = (): number => {
    if (hoursByDay.morning !== undefined) {
      var sum: number = 0;
      hoursByDay.morning.map((value: any) => {
        sum += value.sum_hours;
      });
      hoursByDay.afternoon.map((value: any) => {
        sum += value.sum_hours;
      });
      hoursByDay.night.map((value: any) => {
        sum += value.sum_hours;
      });
      return sum;
    }
    return 0;
  };

  const sumHoursByMonth = (name: string): number => {
    if (hoursByMonth[name] !== undefined) {
      var sum: number = 0;
      hoursByMonth[name].map((value: any) => {
        sum += value.sum_hours;
      });
      return sum;
    }
    return 0;
  };

  const FilterForm: React.FC = () => {
    return (
      <div className="mb-3 d-flex w-100 align-items-center justify-content-end">
        <label className="form-label me-2 large-font-size">
          Choose a project to statistic :
        </label>
        <select onChange={(e: any) => {}} className="form-control w-50">
          {projects.map((value: any) => {
            return (
              <option value={value.project_id}>{value.project_name}</option>
            );
          })}
        </select>
      </div>
    );
  };

  useEffect(() => {
    loadProjects();
  }, [isLogedIn]);
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div className="statistic">
      <div className="header">
        <h1 className="m-0">Welcome back Timesheet !</h1>
      </div>

      {projects.length ? (
        <>
          <div className="row w-100 m-0 mp">
            <div className="col-xl-6 col-12 mb-2"></div>
            <div className="col-xl-6 col-12 mb-2">
              <FilterForm />
            </div>
          </div>
          <div className="mp">
            <div className="summary d-flex">
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Summary</h5>
                  <h1 style={{ color: "#2196f3" }}>
                    {countTS.morning + countTS.afternoon + countTS.night}
                  </h1>
                  <h4 style={{ color: "#2196f3" }}>Timesheet</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Morning</h5>
                  <h1 style={{ color: "#f44336" }}>{countTS.morning}</h1>
                  <h4 style={{ color: "#f44336" }}>Timesheet</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Afternoon</h5>
                  <h1 style={{ color: "#f59e0b" }}>{countTS.afternoon}</h1>
                  <h4 style={{ color: "#f59e0b" }}>Timesheet</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Night</h5>
                  <h1 style={{ color: "#22c55e" }}>{countTS.night}</h1>
                  <h4 style={{ color: "#22c55e" }}>Timesheet</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Hours Summary By Month
              </p>
              <div className="row">
                <div className="col-xl-9 col-sm-12">
                  <GBThree
                    ds1Name="Morning"
                    ds2Name="Afternoon"
                    ds3Name="Night"
                    ds1={getHours(hoursByMonth, "morning")}
                    ds2={getHours(hoursByMonth, "afternoon")}
                    ds3={getHours(hoursByMonth, "night")}
                  />
                </div>
                <div className="col-xl-3 col-sm-12">
                  <div className="w-100 h-100">
                    <div className="number-statistic-box">
                      <div style={{ background: "#eef2ff" }} className="info">
                        <span>
                          <h1
                            style={{ color: "#3730a3" }}
                            className="text-center"
                          >
                            {getTotal()}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#3730a3" }}
                          >
                            Hours
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="number-statistic-box">
                      <div style={{ background: "#f0fdf4" }} className="info">
                        <span>
                          <h1
                            style={{ color: "#166534" }}
                            className="text-center"
                          >
                            {getTotalByName(
                              hoursByDay,
                              "morning",
                              "sum_hours"
                            ).toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#166534" }}
                          >
                            Hours in Morning
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="number-statistic-box">
                      <div style={{ background: "#f1f5f9" }} className="info">
                        <span>
                          <h1
                            style={{ color: "#64748b " }}
                            className="text-center"
                          >
                            {getTotalByName(
                              hoursByDay,
                              "afternoon",
                              "sum_hours"
                            ).toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Hours in Afternoon
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="number-statistic-box">
                      <div style={{ background: "#f1f5f9" }} className="info">
                        <span>
                          <h1
                            style={{ color: "#64748b " }}
                            className="text-center"
                          >
                            {getTotalByName(
                              hoursByDay,
                              "night",
                              "sum_hours"
                            ).toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Hours in Night
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Morning Summary By Day
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Morning"
                    ds={getHours(hoursByDay, "morning")}
                    labels={getDay("morning")}
                    color="#252f3e"
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Morning"
                      ds2Name="Afternoon"
                      ds3Name="Night"
                      ds1={sumHoursByMonth("morning")}
                      ds2={sumHoursByMonth("afternoon")}
                      ds3={sumHoursByMonth("night")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Afternoon Summary By Day
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Afternoon"
                    ds={getHours(hoursByDay, "afternoon")}
                    labels={getDay("afternoon")}
                    color="#22d3ee"
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Morning"
                      ds2Name="Afternoon"
                      ds3Name="Night"
                      ds1={sumHoursByMonth("morning")}
                      ds2={sumHoursByMonth("afternoon")}
                      ds3={sumHoursByMonth("night")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Night Summary By Day
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Night"
                    ds={getHours(hoursByDay, "night")}
                    labels={getDay("night")}
                    color="rgb(245, 158, 11)"
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Morning"
                      ds2Name="Afternoon"
                      ds3Name="Night"
                      ds1={sumHoursByMonth("morning")}
                      ds2={sumHoursByMonth("afternoon")}
                      ds3={sumHoursByMonth("night")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="py-3 px-3">Current, You don't have any projects</p>
      )}
    </div>
  );
};

export default ProgressProject;
