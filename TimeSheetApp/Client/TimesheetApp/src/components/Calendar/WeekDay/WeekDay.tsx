// components
import Task from "../Task/Task";
// stylesheet
import "./WeekDay.css";

const WeekDay: React.FC = () => {
  return (
    <div className="week-day">
      <div className="week-day_shift-box">
        <p className="week-day_shift">Morning</p>
        <Task title="Task : Design Logo" due={"2021-11-10 14:12:29.750"} />
        <Task title="Note : Appointment" due={"2021-11-5 14:12:29.750"} />
        <Task title="Task : Code App" due={"2021-10-28 14:12:29.750"} />
      </div>
      <div className="week-day_shift-box">
        <p className="week-day_shift">Afternoon</p>
        <Task title="Task : Design Logo" due={"2021-11-10 14:12:29.750"} />
        <Task title="Note : Appointment" due={"2021-11-5 14:12:29.750"} />
        <Task title="Task : Code App" due={"2021-10-28 14:12:29.750"} />
      </div>
      <div className="week-day_shift-box">
        <p className="week-day_shift">Night</p>
        <Task title="Task : Design Logo" due={"2021-11-10 14:12:29.750"} />
        <Task title="Note : Appointment" due={"2021-11-5 14:12:29.750"} />
        <Task title="Task : Code App" due={"2021-10-28 14:12:29.750"} />
      </div>
    </div>
  );
};

export default WeekDay;
