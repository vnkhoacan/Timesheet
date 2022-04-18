const query = require("../../sql-query/SQLQuery");
//--------------------------------------------------------------
//--------------------------------------------------------------
async function loadMemberByEmail(member_id) {
  try {
    console.log(member_id);
    var records = await query(
      "select m.member_id,first_name,last_name,CONCAT(first_name, ' ', last_name) AS member_name,CASE WHEN gender=0 THEN 'Female' WHEN gender=1 THEN 'Male' END as gender,permission, (FORMAT (created_on, 'HH:mm:ss dd/MM/yyyy')) created_on,email,password,department_name,position_name,p.position_id,d.department_id from members m inner join position p on m.position_id=p.position_id inner join department d on m.department_id=d.department_id where email like '%' + (select RIGHT(email, LEN(email) - CHARINDEX('@', email)) from members m2 where m2.member_id=" +
        member_id +
        ")"
    );
    console.log(records);
    return records;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function addMember(
  email,
  password,
  first_name,
  last_name,
  permission,
  department_id,
  position_id
) {
  try {
    var member = await query(
      "insert into members values('" +
        password +
        "','" +
        email +
        "','" +
        first_name +
        "','" +
        last_name +
        "',NULL,NULL,NULL,getdate(),'" +
        permission +
        "'," +
        (department_id?department_id:"NULL") +
        "," +
        (position_id?position_id:"NULL")  +
        ",NULL,getdate());select @@IDENTITY AS 'identity'"
    );
    return member[0].identity;
  } catch (error) {
    console.log(error);
    return null;
  }
}
//--------------------------------------------------------------
//--------------------------------------------------------------
async function editMember(
  member_id,
  email,
  password,
  first_name,
  last_name,
  gender,
  permission,
  department_id,
  position_id
) {
  try {
    await query(
      "update members set email='" +
        email +
        "',password='" +
        password +
        "',first_name='" +
        first_name +
        "',last_name='" +
        last_name +
        "',gender='" +
        gender +
        "',permission='" +
        permission +
        "',department_id=" +
        department_id +
        ",position_id=" +
        position_id +
        " where member_id=" +
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
async function deleteMember(member_id) {
  try {
    await query("delete from members where member_id=" + member_id);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = { loadMemberByEmail, deleteMember, editMember, addMember };
