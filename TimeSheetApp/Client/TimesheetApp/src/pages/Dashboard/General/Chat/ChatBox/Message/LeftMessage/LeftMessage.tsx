import MyAvatar from "../../../../../../../components/Avatar/Avatar";
import DateConverter from "../../../../../../../services/Date/DateConverter";

import "./LeftMessage.css";
interface Props {
  member_name: string;
  avatar: string;
  content: string;
  sent_date:string;
}

const LeftMessage: React.FC<Props> = (props:Props) => {

  return (
    <div className="left-message">
      <div className="d-flex p-3">
        <MyAvatar src={props.avatar} name={props.member_name} />
        <div className="triangle"></div>
        <div className="left-message_content">{props.content}</div>
      </div>
      <div className="left-message_date ms-4 mt-2">{DateConverter.parseShortDate(props.sent_date)}</div>
    </div>
  );
};

export default LeftMessage;
