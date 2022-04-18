const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadAllProject(member_id) {
  try {
    var records = await query(
      "select * from projects where member_id=" + member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function addProject(
  project_name,
  project_description,
  from_date,
  to_date,
  budget,
  member_id
) {
  try {
    var project = await query(
      "insert into projects values('" +
        project_name +
        "','" +
        project_description +
        "',convert(date,'" +
        from_date +
        "'),convert(date,'" +
        to_date +
        "'),getdate()," +
        member_id +
        "," +
        budget +
        ");select @@IDENTITY AS 'identity'"
    );
    return project[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function deleteProject(project_id) {
  try {
    await query(
      "delete tm from team_member tm inner join teams t on tm.team_id=t.team_id where project_id=" +
        project_id +
        " delete ei from expense_image ei inner join expenses e on e.expense_id=ei.expense_id where project_id=" +
        project_id +
        " delete e from expenses e where project_id=" +
        project_id +
        " delete t from teams t where project_id=" +
        project_id +
        " delete ts from timesheet ts where project_id=" +
        project_id +
        " delete p from projects p where project_id=" +
        project_id +
        ""
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function updateProject(
  project_id,
  project_name,
  project_description,
  from_date,
  to_date,
  budget
) {
  try {
    await query(
      "update projects set project_name='" +
        project_name +
        "',project_description='" +
        project_description +
        "',from_date=convert(date,'" +
        from_date +
        "'),to_date=convert(date,'" +
        to_date +
        "'),budget=" +
        budget +
        " where project_id=" +
        project_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  loadAllProject,
  addProject,
  deleteProject,
  updateProject,
};
