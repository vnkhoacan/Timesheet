// components
import FlexAvatar from "../../Avatar/FlexAvatar";

// stylesheet
import "./ListMember.css";
interface Props {
  members: any;
}

const ListMember: React.FC<Props> = (props: Props) => {
  return (
    <div className="absolute-position mail-box_list-member light-border">
      {props.members.map((member: any,index:number) => {
        return (
          <>
            {index>0?<div className="d-flex"><div className="dropdown-divider w-75 my-0 ms-auto"></div></div>:""}
            <div className="d-flex align-items-center px-3 py-2">
              <FlexAvatar
                style={{ width: "32px", height: "32px", fontSize:"15px" }}
                src={member.avatar}
                name={member.member_name}
              />
              <div className="medium-font-size mail-box_list-member_name">
                {member.member_name}
              </div>
            </div>
            
          </>
        );
      })}
    </div>
  );
};

export default ListMember;
