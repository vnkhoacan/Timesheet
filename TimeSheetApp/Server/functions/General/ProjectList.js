const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadProjectByMember(member_id, permission) {
  try {
    var records = [];
    if (permission == "Manager") {
      records = await query(
        "select t.project_id,project_name,CONCAT(first_name,' ',last_name) product_owner_name,avatar from projects p  inner join members m on p.member_id=m.member_id  inner join teams t on t.project_id=p.project_id where manager_id=" +
          member_id
      );
    } else if (permission == "Employee") {
      records = await query(
        "select p.project_id,project_name,CONCAT(first_name,' ',last_name) manager_name,avatar from team_member tm  inner join teams t on tm.team_id=t.team_id  inner join projects p on t.project_id=p.project_id inner join members m on m.member_id=t.manager_id where tm.member_id=" +
          member_id
      );
    }
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
module.exports = { loadProjectByMember };
