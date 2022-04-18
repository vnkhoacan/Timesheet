const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadPosition(member_id) {
  try {
    var records = await query(
      "select * from position where member_id=" + member_id
    );
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function deletePosition(position_id) {
  try {
    await query("delete from position where position_id=" + position_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function addPosition(position_name, position_description, member_id) {
  try {
    var position = await query(
      "insert into position values('" +
        position_name +
        "','" +
        position_description +
        "'," +
        member_id +
        ");select @@IDENTITY AS 'identity'"
    );
    return position[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function editPosition(position_id, position_name, position_description) {
  try {
    await query(
      "update position set position_name='" +
        position_name +
        "',position_description='" +
        position_description +
        "' where position_id=" +
        position_id
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = {
  loadPosition,
  deletePosition,
  addPosition,
  editPosition,
};
