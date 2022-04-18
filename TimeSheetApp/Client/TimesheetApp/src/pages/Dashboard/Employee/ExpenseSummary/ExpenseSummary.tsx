// components
import GBThree from "../../../../components/Charts/BarChart/GBThree";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import PieThree from "../../../../components/Charts/PieChart/PieThree";
import BasicLine from "../../../../components/Charts/LineChart/Basic";

// module
import { useState, useEffect } from "react";
import { useParams } from "react-router";
// css
import "../../../../stylesheet/Statistic.css";

const ExpenseSummary: React.FC = () => {
  const [countEx, setCountEx] = useState<any>({});

  const [costByDay, setCostByDay] = useState<any>({});

  const [costByMonth, setCostByMonth] = useState<any>({});

  const { projectID, memberID } = useParams<any>();

  const loadSummary = async (): Promise<void> => {
    var result = await HttpClient.post("ExpenseSummary/LoadSummary", {
      employee_id: memberID,
      project_id: projectID,
    });

    var total =
      result.countEx.approval + result.countEx.waiting + result.countEx.unapproval;
    

    if (total) {
      setCostByDay(result.costByDay);
      setCostByMonth(result.costByMonth);
      setCountEx(result.countEx);
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

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="statistic">
      <div className="header">
        <h1 className="m-0">Welcome back Timesheet !</h1>
      </div>
      {/* <div className="row w-100 m-0">
        <div className="col-xl-6 col-12 mb-2"></div>
        <div className="col-xl-6 col-12 mb-2">
          <div className="table-tool  pe-3 pt-3">
            <Text style={{ marginLeft: "10px", cursor: "pointer" }}>
              <p className="d-flex align-items-center">
                <FilterListIcon />
                <span style={{ marginLeft: "10px" }}>Filter</span>
              </p>
            </Text>
            <Text style={{ marginLeft: "10px", cursor: "pointer" }}>
              <p className="d-flex align-items-center">
                <DownloadIcon />
                <span style={{ marginLeft: "10px" }}>Export</span>
              </p>
            </Text>
          </div>
        </div>
      </div> */}
      {countEx.approval + countEx.waiting + countEx.unapproval ? (
        <>
          <div className="mp">
            <div className="summary d-flex">
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Summary</h5>
                  <h1 style={{ color: "#2196f3" }}>
                    {countEx.approval + countEx.waiting + countEx.unapproval}
                  </h1>
                  <h4 style={{ color: "#2196f3" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Approval</h5>
                  <h1 style={{ color: "#f44336" }}>{countEx.approval}</h1>
                  <h4 style={{ color: "#f44336" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Waiting</h5>
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
                    ds1Name="Approved"
                    ds2Name="Waiting"
                    ds3Name="Unapproved"
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
                            Unapproval Cost
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
                Approval Summary By Day
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <BasicLine
                    dsName="Approved"
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
                      ds3Name="Unapproved"
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
                Waiting Summary By Day
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
                      ds3Name="Unapproved"
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
                Unapproval Summary By Day
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
                      ds3Name="Unapproved"
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
        <p className="py-3 px-3">Current, You don't have any expense</p>
      )}
    </div>
  );
};

export default ExpenseSummary;
