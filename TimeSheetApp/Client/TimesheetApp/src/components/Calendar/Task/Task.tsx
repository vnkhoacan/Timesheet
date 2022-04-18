// components
// stylesheet
import "./Task.css";

interface Props {
  title: string;
  due: string;
}

const Task: React.FC<Props> = (props: Props) => {
  const bgColor = ["#ec4899", "#6366f1", "#14b8a6"];
    // 5 10 20          20
  function determineStatus() {
    var currentDate = new Date();
    var soondate = new Date(props.due),
      comingDate = new Date(props.due),
      outDate = new Date(props.due);
    soondate.setDate(soondate.getDate() - 10);
    comingDate.setDate(comingDate.getDate() - 5);
    if(currentDate <= soondate) return bgColor[2];
    if(currentDate <= comingDate) return bgColor[1];
    if(currentDate >= outDate) return bgColor[0];
  }

  return (
    <div className="calendar-task">
      <div style={{ background: determineStatus() }} className="calendar-task_content">
        {props.title}
      </div>
    </div>
  );
};

export default Task;
