// components
import FlexAvatar from "../../Avatar/FlexAvatar";

// stylesheet

interface Props {
  member_name: string;
  avatar: string;
  email: string;
}

const EmailItem: React.FC<Props> = (props: Props) => {
  return (
    <div className="d-flex align-items-center px-3 py-2">
      <FlexAvatar
        style={{ width: "32px", height: "32px", fontSize: "15px" }}
        src={props.avatar}
        name={props.member_name}
      />
      <div className="ms-2">
        <div className="medium-font-size">{props.member_name}</div>
        <div style={{fontSize:"11px"}}>{props.email}</div>
      </div>
    </div>
  );
};

export default EmailItem;
