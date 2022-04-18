import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import "./TimesheetCode.css";
import Button from "@mui/material/Button/Button";
import HttpClient from "../../../../services/HttpClient/HttpClient";
import Header from "../../../../components/Text/Header";

const TimesheetCode: React.FC = () => {
  const [status, setStatus] = useState<boolean>(false);

  const [qrCode, setQrCode] = useState<string>("");

  const [err, setErr] = useState<string>("");

  const memberInfo = useSelector((s: any) => s.memberInfo);

  const project_id = useSelector((s: any) => s.project_id);

  const socketID = useSelector((s: any) => s.socketID);

  const socket = useSelector((s: any) => s.socket);

  const isConnectedSocket = useSelector((s: any) => s.isConnectedSocket);

  const determineTime = (): string => {
    var date = new Date();
    if (date.getHours() >= 7 && date.getHours() <= 12) return "Morning Shift";
    if (date.getHours() >= 13 && date.getHours() <= 17)
      return "Afternoon Shift";
    if (date.getHours() > 17) return "Night Shift";
    return "";
  };

  const takeAttendant = async (): Promise<void> => {
    try {
      console.log({
        project_id: project_id,
        employee_id: memberInfo.member_id,
      });
      var result = await HttpClient.post("TimesheetReport/SubmitTimesheet", {
        project_id: project_id,
        employee_id: memberInfo.member_id,
      });
      if (!result) setErr("Fail to take attendant");
      setStatus(false);
    } catch (error: any) {
      console.log(error);
      setErr("Error : " + error.message);
    }
  };

  useEffect(() => {
    if (isConnectedSocket) {
      var newValue = { ...memberInfo };
      newValue.socketID = socketID;
      console.log(newValue);
      setQrCode(JSON.stringify(newValue));
      socket.on("TakeAttendant", (info: any) => {
        //alert("ok");
        setStatus(true);
      });
    }
  }, [socket]);

  return (
    <div className="timesheet-code">
      <Header title="Timesheet Code" />
      <div className="d-flex h-75 w-100">
        <div className="m-auto p-3">
          <div className="d-flex justify-content-center">
            <QRCode value={qrCode} title={"nsdf"} />
          </div>
          <p
            style={{ fontSize: "14px" }}
            className="description mt-3 text-center light-color"
          >
            Put the QR Code in font of the Scanner to take attendant
          </p>
          {status ? (
            <div
              style={{ display: "grid" }}
              className="align-items-center justify-content-center"
            >
              <h4 className="text-center">
                You are working in the {determineTime()}
              </h4>
              <p
                style={{ fontSize: "14px", width: "400px" }}
                className="text-center light-color"
              >
                Scan QR code successful. Please select "Take Attendance" to complete the process.
              </p>

              <div className="d-flex justify-content-center">
                <Button
                  style={{ width: "200px" }}
                  onClick={takeAttendant}
                  variant="contained"
                >
                  Take Attendance
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
          {err ? <div className="base-error">{err}</div> : ""}
        </div>
      </div>
    </div>
  );
};

export default TimesheetCode;
