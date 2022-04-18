// components
import GBMulti from "../../../../components/Charts/BarChart/GBMulti";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import PieThree from "../../../../components/Charts/PieChart/PieThree";
import LCMulti from "../../../../components/Charts/LineChart/LCMulti";

// module
import { useState, useEffect } from "react";
import { useParams } from "react-router";
// css
import "../../../../stylesheet/Statistic.css";

const ExpenseStatistic: React.FC = () => {
  const { projectID, memberID } = useParams<any>();

  const [costByMembers, setCostByMembers] = useState<any>([]);

  const [countEx, setCountEx] = useState<any>({});

  const [sumCost, setSumCost] = useState<any>({
    approval: 0,
    waiting: 0,
    unapproval: 0,
  });

  const [costByDay, setCostByDay] = useState<any>([]);

  const loadSummary = async (): Promise<void> => {
    if (projectID && memberID) {
      var result = await HttpClient.post("ExpenseStatistic/LoadSummary", {
        project_id: projectID,
        manager_id: memberID,
      });

      var total =
        result.countEx.approval +
        result.countEx.unapproval +
        result.countEx.waiting;

      if (total) {
        setCountEx(result.countEx);
        setCostByMembers(result.costByMembers);
        setCostByDay(result.costByDay);
        setSumCost(result.sumCost);
      }
    }
  };

  function stringToColor(string: any) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const getBCLabels = (): any => {
    var labels: any = [];
    costByMembers.map((value: any) => {
      labels.push(value.member_name);
    });
    return labels;
  };

  const getBCDatasets = (): any => {
    var datasets: any = [];
    if (costByMembers.length) {
      var data: any = [];
      var bgColors: any = [];
      costByMembers.map((value: any) => {
        data.push(value.sum_cost);
        bgColors.push(stringToColor(value.member_name));
      });
      datasets.push({
        label: "1",
        data: data,
        backgroundColor: bgColors,
      });
    }

    return datasets;
  };

  const getLCLabels = (): any => {
    var labels: any = [];
    if (costByDay.length) {
      costByDay.map((value: any) => {
        value.ex.map((v: any) => {
          if (labels.indexOf(v.expense_date) < 0) labels.push(v.expense_date);
        });
      });
    }

    return labels;
  };

  const getLCDatasets = (): any => {
    var datasets: any = [];
    costByDay.map((value: any) => {
      var data = value.ex.map((v: any) => v.sum_cost);
      datasets.push({
        label: value.member_name,
        data: data,
        backgroundColor: "transparent",
        borderColor: stringToColor(value.member_name),
        fill: true,
      });
    });

    return datasets;
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="statistic">
      <div className="header">
        <h1 className="m-0">Welcome back Expense !</h1>
      </div>
      {/* <div className="row w-100 m-0 mp">
        <div className="col-xl-6 col-12 mb-2"></div>
        <div className="col-xl-6 col-12 mb-2">
          <div className="table-tool pe-3 pt-3">
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
                  <h5 style={{ color: "#6b7280" }}>Morning</h5>
                  <h1 style={{ color: "#f44336" }}>{countEx.approval}</h1>
                  <h4 style={{ color: "#f44336" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Afternoon</h5>
                  <h1 style={{ color: "#f59e0b" }}>{countEx.waiting}</h1>
                  <h4 style={{ color: "#f59e0b" }}>Expense</h4>
                </div>
              </div>
              <div className="w-25 p-3">
                <div className="summary-box">
                  <h5 style={{ color: "#6b7280" }}>Night</h5>
                  <h1 style={{ color: "#22c55e" }}>{countEx.unapproval}</h1>
                  <h4 style={{ color: "#22c55e" }}>Expense</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="mp">
            <div className="statistic-box mt-3">
              <p style={{ fontSize: "20px" }} className="mt-3 mb-3">
                Summary By Month
              </p>
              <div className="row">
                <div className="col-xl-9 col-sm-12">
                  <GBMulti labels={getBCLabels()} datasets={getBCDatasets()} />
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
                            {(
                              sumCost.approval +
                              sumCost.unapproval +
                              sumCost.waiting
                            ).toFixed(2)}
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
                            {sumCost.approval.toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#166534" }}
                          >
                            Morning Cost
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
                            {sumCost.waiting.toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Afternoon Cost
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
                            {sumCost.unapproval.toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Night Cost
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
                Summary By Day
              </p>
              <div className="row">
                <div className="col-xl-9">
                  <LCMulti labels={getLCLabels()} datasets={getLCDatasets()} />
                </div>
                <div className="col-xl-3">
                  <div className="w-100 h-100">
                    <PieThree
                      ds1Name="Morning"
                      ds2Name="Afternoon"
                      ds3Name="Night"
                      ds1={sumCost.approval}
                      ds2={sumCost.waiting}
                      ds3={sumCost.unapproval}
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

export default ExpenseStatistic;
