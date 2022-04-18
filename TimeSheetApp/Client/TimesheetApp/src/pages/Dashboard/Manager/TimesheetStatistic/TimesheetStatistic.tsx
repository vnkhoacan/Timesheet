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

const TimesheetStatistic: React.FC = () => {
  const { projectID, memberID } = useParams<any>();

  const [hoursByMembers, setHoursByMembers] = useState<any>([]);

  const [countTS, setCountTS] = useState<any>({});

  const [sumHours, setSumHours] = useState<any>({
    morning: 0,
    afternoon: 0,
    night: 0,
  });

  const [hoursByDay, setHoursByDay] = useState<any>([]);

  const loadSummary = async (): Promise<void> => {
    if (projectID && memberID) {
      var result = await HttpClient.post("TimesheetStatistic/LoadSummary", {
        project_id: projectID,
        manager_id: memberID,
      });

      var total =
        result.countTS.morning +
        result.countTS.afternoon +
        result.countTS.night;

      if (total) {
        setCountTS(result.countTS);
        setHoursByMembers(result.hoursByMembers);
        setHoursByDay(result.hoursByDay);
        setSumHours(result.sumHours);
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
    hoursByMembers.map((value: any) => {
      labels.push(value.member_name);
    });
    return labels;
  };

  const getBCDatasets = (): any => {
    var datasets: any = [];
    if (hoursByMembers.length) {
      var data: any = [];
      var bgColors: any = [];
      hoursByMembers.map((value: any) => {
        data.push(value.sum_hours);
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
    if (hoursByDay.length) {
      hoursByDay.map((value: any) => {
        value.ts.map((v: any) => {
          if (labels.indexOf(v.work_date) < 0) labels.push(v.work_date);
        });
      });
    }

    return labels;
  };

  const getLCDatasets = (): any => {
    var datasets: any = [];
    hoursByDay.map((value: any) => {
      var data = value.ts.map((v: any) => v.sum_hours);
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
        <h1 className="m-0">Welcome back Timesheet !</h1>
      </div>

      {countTS.morning + countTS.afternoon + countTS.night ? (
        <>
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
                              sumHours.morning +
                              sumHours.night +
                              sumHours.afternoon
                            ).toFixed(2)}
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
                            {sumHours.morning.toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#166534" }}
                          >
                            Morning Hours
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
                            {sumHours.afternoon.toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Afternoon Hours
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
                            {sumHours.night.toFixed(2)}
                          </h1>
                          <p
                            className="m-0 text-center"
                            style={{ color: "#64748b " }}
                          >
                            Night Hours
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
                      ds1={sumHours.morning}
                      ds2={sumHours.afternoon}
                      ds3={sumHours.night}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="py-3 px-3">Current, You don't have any timesheet</p>
      )}
      {/* <div className="row w-100 m-0 mp">
        <div className="col-xl-6 col-12 mb-2"></div>
        <div className="col-xl-6 col-12 mb-2">
          <div className="table-tool pe-3 pt-3">
            <Text
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={() => {
                setIsShownFilter(!isShownFilter);
              }}
            >
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
    </div>
  );
};

export default TimesheetStatistic;
