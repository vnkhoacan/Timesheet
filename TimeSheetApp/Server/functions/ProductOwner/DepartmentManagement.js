const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadDepartment(member_id) {
  try {
    var records = await query(
      "select * from department where member_id=" + member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function deleteDepartment(department_id) {
  try {
    await query("delete from department where department_id=" + department_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function addDepartment(
  department_name,
  department_description,
  member_id
) {
  try {
    var department = await query(
      "insert into department values('" +
        department_name +
        "','" +
        department_description +
        "'," +
        member_id +
        ");select @@IDENTITY AS 'identity'"
    );
    return department[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function editDepartment(
  department_id,
  department_name,
  department_description
) {
  try {
    await query(
      "update department set department_name='" +
        department_name +
        "',department_description='" +
        department_description +
        "' where department_id=" +
        department_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = {
  loadDepartment,
  deleteDepartment,
  addDepartment,
  editDepartment,
};
