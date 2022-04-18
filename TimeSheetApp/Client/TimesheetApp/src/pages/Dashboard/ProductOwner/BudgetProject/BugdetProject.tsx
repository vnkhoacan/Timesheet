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

const BudgetProject: React.FC = () => {
  const [costByDay, setCostByDay] = useState<any>({});

  const [countEx, setCountEx] = useState<any>({});

  const [costByMonth, setCostByMonth] = useState<any>({});

  const [projects, setProjects] = useState([]);

  const memberInfo: any = useSelector((s: any) => s.memberInfo);

  const isLogedIn: any = useSelector((s: any) => s.isLogedIn);

  const loadSummary = async (project_id: string): Promise<void> => {
    if (project_id) {
      var result = await HttpClient.post("BudgetProject/LoadSummary", {
        project_id: project_id,
      });
      setCostByDay(result.costByDay);
      setCostByMonth(result.costByMonth);
      setCountEx(result.countEx);
    }
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

  const getTotal = (value: any, name: string, groupName: string): any => {
    if (value[name] !== undefined) {
      var total = 0;
      value[name].map((value: any) => {
        total += value[groupName];
      });
      return total;
    }
  };

  const getCost = (value: any, name: string): any => {
    if (value[name] !== undefined) {
      var arr: any = [];
      value[name].map((value: any) => {
        arr.push(value.sum_cost);
      });
      return arr;
    }
  };

  const getDay = (name: any): any => {
    if (costByDay[name] !== undefined) {
      var arr: any = [];
      costByDay[name].map((value: any) => {
        arr.push(value.expense_date.substring(0, 10));
      });
      return arr;
    }
  };

  const totalCostByMonth = (): number => {
    if (costByMonth.approval !== undefined) {
      var sum: number = 0;
      costByMonth.approval.map((value: any) => {
        sum += value.sum_cost;
      });
      costByMonth.unapproval.map((value: any) => {
        sum += value.sum_cost;
      });
      return sum;
    }
    return 0;
  };

  const sumCostByMonth = (name: string): number => {
    if (costByMonth[name] !== undefined) {
      var sum: number = 0;
      costByMonth[name].map((value: any) => {
        sum += value.sum_cost;
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
    if (!projects.length) loadProjects();
  }, [isLogedIn]);

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
                  <h1 style={{ color: "#2196f3" }}>{countEx.approval}</h1>
                  <h4 style={{ color: "#2196f3" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Unapproval</h5>
                  <h1 style={{ color: "#f44336" }}>{countEx.approval}</h1>
                  <h4 style={{ color: "#f44336" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Approval</h5>
                  <h1 style={{ color: "#f59e0b" }}>{countEx.waiting}</h1>
                  <h4 style={{ color: "#f59e0b" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Unapproval</h5>
                  <h1 style={{ color: "#22c55e" }}>{countEx.unapproval}</h1>
                  <h4 style={{ color: "#22c55e" }}>Expense</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Cost Summary By Month
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <GBThree
                    ds1Name="Approval"
                    ds2Name="Waiting"
                    ds3Name="Unapproval"
                    ds1={getCost(costByMonth, "approval")}
                    ds2={getCost(costByMonth, "waiting")}
                    ds3={getCost(costByMonth, "unapproval")}
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <div className="number-statistic-box">
                      <div style={{ background: "#eef2ff" }} className="info">
                        <span>
                          <h1
                            style={{ color: "#3730a3" }}
                            className="text-center"
                          >
                            {totalCostByMonth()}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#3730a3" }}
                          >
                            Cost
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
                            {sumCostByMonth("approval")}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#166534" }}
                          >
                            Approval Cost
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
                            {sumCostByMonth("waiting")}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Waiting Cost
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
                            {sumCostByMonth("unapproval")}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Unapproval Cost
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
                Cost Summary By Day
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Approval"
                    ds={getCost(costByDay, "approval")}
                    labels={getDay("approval")}
                    color="#252f3e"
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Approval"
                      ds2Name="Waiting"
                      ds3Name="Unapproval"
                      ds1={sumCostByMonth("approval")}
                      ds2={sumCostByMonth("waiting")}
                      ds3={sumCostByMonth("unapproval")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Cost Summary By Month
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Waiting"
                    ds={getCost(costByDay, "waiting")}
                    labels={getDay("waiting")}
                    color="#22d3ee"
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Approval"
                      ds2Name="Waiting"
                      ds3Name="Unapproval"
                      ds1={sumCostByMonth("approval")}
                      ds2={sumCostByMonth("waiting")}
                      ds3={sumCostByMonth("unapproval")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Cost Summary By Month
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Unapproved"
                    ds={getCost(costByDay, "unapproval")}
                    labels={getDay("unapproval")}
                    color="rgb(245, 158, 11)"
                  />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Approval"
                      ds2Name="Waiting"
                      ds3Name="Unapproval"
                      ds1={sumCostByMonth("approval")}
                      ds2={sumCostByMonth("waiting")}
                      ds3={sumCostByMonth("unapproval")}
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

export default BudgetProject;
