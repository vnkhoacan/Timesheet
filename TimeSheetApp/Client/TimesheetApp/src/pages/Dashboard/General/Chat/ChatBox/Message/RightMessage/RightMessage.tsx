import MyAvatar from "../../../../../../../components/Avatar/Avatar";
import DateConverter from "../../../../../../../services/Date/DateConverter";

import "./RightMessage.css";

interface Props {
  member_name: string;
  avatar: string;
  content: string;
  sent_date: string;
}

const RightMessage: React.FC<Props> = (props: Props) => {

  return (
    <div className="right-message">
      <div className="d-flex justify-content-end p-3">
        <div className="right-message_content">{props.content}</div>
        <div className="triangle"></div>
        <MyAvatar src={props.avatar} name={props.member_name} />
      </div>
      <div className="right-message_date me-4 mt-2">
        {DateConverter.parseShortDate(props.sent_date)}
      </div>
    </div>
  );
};

export default RightMessage;
