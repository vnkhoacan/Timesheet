const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadMemberInProject(manager_id, project_id) {
  try {
    var teamInfo = await query(
      "select team_id,team_name,team_amount from teams t inner join projects p on t.project_id=p.project_id where t.project_id=" +
        project_id +
        " and manager_id=" +
        manager_id
    );
    var teamMember = await query(
      "select tm.member_id,CONCAT(first_name,' ',last_name) member_name,position_name,department_name from team_member tm inner join teams t on tm.team_id=t.team_id inner join members m on m.member_id=tm.member_id inner join position p on p.position_id=m.position_id inner join department d on d.department_id=m.department_id where project_id=" +
        project_id +
        " and manager_id=" +
        manager_id
    );
    return { teamInfo: teamInfo[0], teamMember };
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function deleteMemberFromTeam(team_id, member_id) {
  try {
    await query(
      "delete from team_member where team_id=" +
        team_id +
        " and member_id=" +
        member_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function addMemberIntoTeam(team_id, member_id) {
  try {
    await query(
      "insert into team_member(team_id,member_id) values(" +
        team_id +
        "," +
        member_id +
        ")"
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function editMemberFromTeam(member_id_change, member_id, team_id) {
  try {
    await query(
      "update team_member set member_id=" +
        member_id_change +
        " where member_id=" +
        member_id +
        " and team_id=" +
        team_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadMemberByEmail(member_id) {
  try {
    var records = await query(
      "select m.member_id,CONCAT(first_name, ' ', last_name) AS member_name,CASE WHEN gender=0 THEN 'False' WHEN gender=1 THEN 'True' END as gender,department_name,position_name from members m inner join position p on m.position_id=p.position_id inner join department d on m.department_id=d.department_id where email like '%' + (select RIGHT(email, LEN(email) - CHARINDEX('@', email)) from members m2 where m2.member_id=" +
        member_id +
        ") and permission ='Employee'"
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
module.exports = {
  loadMemberInProject,
  deleteMemberFromTeam,
  editMemberFromTeam,
  addMemberIntoTeam,
  loadMemberByEmail,
};
