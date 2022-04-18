import Avatar from "../../../../../components/Avatar/Avatar";
import "./Member.css";
//--------------------------------------------------------------
//--------------------------------------------------------------
interface Props {
  member_name: string;
  department_name: string;
  position_name: string;
  avatar: string;
}
//--------------------------------------------------------------
//--------------------------------------------------------------
const Member: React.FC<Props> = (props: Props) => {
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  return (
    <div
      style={{ borderRadius: "15px", color: "black" }}
      className="my-team_member d-flex light-background align-items-center p-2 mb-3"
    >
      <Avatar name={props.member_name} src={props.avatar} />
      <div>
        <div className="mx-5 py-2">{props.member_name}</div>
      </div>
    </div>
  );
};
//--------------------------------------------------------------
//--------------------------------------------------------------
export default Member;
