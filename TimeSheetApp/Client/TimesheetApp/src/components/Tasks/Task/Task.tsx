// modules
import DateConverter from "../../../services/Date/DateConverter";
// componenents
import FlexAvatar from "../../Avatar/FlexAvatar";
import PriorityTag from "../../Tasks/Tags/Priority/Priority";
// stylesheet
import "./Task.css";

interface Props {
  task_name: string;
  due: string;
  start: string;
  members: any;
  priority: string;
  commentNumber: number;
  task_status:boolean;
}

const Task: React.FC<Props> = (props: Props) => {
  const priority: any = [
    { name: "Low", color: "#4caf50" },
    { name: "Medium", color: "#2196f3" },
    { name: "High", color: "#ff9800" },
    { name: "Very High", color: "#f44336" },
  ];

  const getPriorityColor = (name: string): string => {
    var color: string = "";
    priority.map((value: any) => {
      if (value.name === name) color = value.color;
    });
    return color;
  };

  return (
    <div className="card-detail">
      {/* start color */}
      <div className="color">
        <div className="orange" />
        <div className="red" />
        <div className="blue" />
      </div>
      <p className="my-2 medium-weight medium-font-size">{props.task_name}</p>
      {/* end color */}
      {/* start date and quest */}
      <div className="detail d-flex">
        {props.due ? (
          <div className="due d-flex me-2">
            <i className="bx bx-time-five" style={{ color: "#ffffff" }} />
            <div className="date">
              {DateConverter.parseShortDate(props.due)}
            </div>
          </div>
        ) : (
          ""
        )}
        {props.start ? (
          <div className="quest d-flex">
            <i className="bx bx-check-circle" style={{ color: "#ffffff" }} />
            <div className="check-num">
              {DateConverter.parseShortDate(props.start)}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="d-flex mt-2">
        {props.priority ? (
          <PriorityTag
            name={props.priority}
            color={getPriorityColor(props.priority)}
          />
        ) : (
          ""
        )}

        <div>
          <div
            className="py-1 px-2"
            style={{
              color: "white",
              background: props.task_status ? "#4caf50" : "#ff9800",
              borderRadius: "15px",
              fontSize: "13px",
            }}
          >
            {props.task_status ? "Done" : "Doing"}
          </div>
        </div>
      </div>
      {/* end date and quest */}
      <div className="avatar d-flex mt-3">
        {/* thieu avatar */}
        {props.members.map((member: any, index: number) => {
          return (
            <div className="me-2">
              <FlexAvatar
                key={"member" + index}
                style={{ width: "32px", height: "32px", fontSize: "15px" }}
                src={member.avatar}
                name={member.member_name}
              />
            </div>
          );
        })}
      </div>
      {/* start footer */}
      <div className="card-detail_footer">
        <div className="left">
          {/* <i className="bx bx-show" style={{ color: "#a4a4a4" }} />{" "} */}
          <span className="d-flex align-items-center">
            <i className="material-icons-outlined">visibility</i>
          </span>
        </div>
        <div className="right">
          <span className="file d-flex align-items-center">
            <i className="material-icons-outlined">attachment</i>
            <span className="card-detail_footer_number">2</span>
          </span>
          <span className="comment d-flex align-items-center">
            <i className="material-icons-outlined">comment</i>
            <span className="card-detail_footer_number">
              {props.commentNumber}
            </span>
          </span>
        </div>
      </div>
      {/* end footer */}
    </div>
  );
};

export default Task;
