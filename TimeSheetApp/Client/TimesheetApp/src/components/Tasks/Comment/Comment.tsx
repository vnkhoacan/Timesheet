// modules
import DateConverter from "../../../services/Date/DateConverter";

// componenets
import FlexAvatar from "../../Avatar/FlexAvatar";

interface Props {
  member_name: string;
  avatar: string;
  content: string;
  comment_date: string;
}

const Comment: React.FC<Props> = (props: Props) => {
  return (
    <div className="d-flex mt-3">
      <FlexAvatar
        style={{ width: "32px", height: "32px", fontSize: "14px" }}
        src={props.avatar}
        name={props.member_name}
      />
      <div style={{ borderRadius: "5px" }} className="light-border p-2 ms-3">
        <div>
          <span className="medium-font-size">{props.member_name} - </span>
          <span className="light-color medium-font-size">
            {DateConverter.parseShortDate(props.comment_date)}
          </span>
        </div>
        <div className="medium-font-size">{props.content}</div>
      </div>
    </div>
  );
};

export default Comment;
