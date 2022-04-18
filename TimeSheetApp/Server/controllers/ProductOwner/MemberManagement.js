const MemberManagement = require("../../functions/ProductOwner/MemberManagement");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadMemberByEmail = async (req, res) => {
  try {
    var result = await MemberManagement.loadMemberByEmail(
      req.body.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const addMember = async (req, res) => {
  try {
    var member = req.body.member;
    var result = await MemberManagement.addMember(
      member.email,
      member.password,
      member.first_name,
      member.last_name,
      member.permission,
      member.department_id,
      member.position_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const editMember = async (req, res) => {
  try {
    var member = req.body.member;
    var result = await MemberManagement.editMember(
      member.member_id,
      member.email,
      member.password,
      member.first_name,
      member.last_name,
      member.gender,
      member.permission,
      member.department_id,
      member.position_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const deleteMember = async (req, res) => {
  try {
    var result = true;
    var rows = req.body.rows;
    for (var i = 0; i < rows.length; i++)
      result = await MemberManagement.deleteMember(rows[i].member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

module.exports = { loadMemberByEmail, editMember, addMember, deleteMember };
