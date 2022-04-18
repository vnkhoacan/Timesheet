import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import HttpClient from "../../../../services/HttpClient/HttpClient";
// components
import Member from "./Member/Member";
import Header from "../../../../components/Text/Header";

const MyTeam: React.FC = () => {
  const memberInfo = useSelector((s: any) => s.memberInfo);
  const project_id = useSelector((s: any) => s.project_id);
  const [members, setMembers] = useState<any>([]);
  const [manager, setManager] = useState<any>({});
  const [budget, setBudget] = useState<number>(0);

  const loadMyTeam = async (): Promise<void> => {
    var result = await HttpClient.post("MyTeam/LoadTeamByMember", {
      member_id: memberInfo.member_id,
      permission: memberInfo.permission,
      project_id: project_id,
    });
    if (memberInfo.permission === "Employee") {
      setMembers(result.teamMember);
      setManager(result.managerInfo);
    }
    if (memberInfo.permission === "Manager") {
      setMembers(result.teamMember);
      setManager({
        member_name: memberInfo.last_name + " " + memberInfo.first_name,
        avatar: memberInfo.avatar,
      });
      console.log(result.budget);
      setBudget(result.budget);
    }
  };

  useEffect(() => {
    if (project_id) loadMyTeam();
  }, [project_id]);

  return (
    <div className="my-team">
      <Header title="My Team" />
      <div className="row w-100 m-0 mb-3 py-5 px-3">
        {budget ? <p>Team Budget : {budget} $</p> : ""}
        <p className="p-3">Team Manager</p>
        <Member
          member_name={manager.member_name}
          department_name={
            "Working at " + manager.department_name + " department"
          }
          position_name={"Working at " + manager.position_name + " position"}
          avatar={manager.avatar}
        />
        <p className="p-3">Team Member</p>
        {members.length ? (
          members.map((value: any) => {
            return (
              <Member
                member_name={value.member_name}
                department_name={
                  "Working at " + value.department_name + " department"
                }
                position_name={
                  "Working at " + value.position_name + " position"
                }
                avatar={value.avatar}
              />
            );
          })
        ) : (
          <p>Current, Your team don't have any members</p>
        )}
      </div>
    </div>
  );
};

export default MyTeam;
