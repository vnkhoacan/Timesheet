const TeamAssignment = require("../../functions/Manager/TeamAssignment");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadMemberInProject = async (req, res) => {
  try {
    var result = await TeamAssignment.loadMemberInProject(
      req.body.manager_id,
      req.body.project_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const deleteMemberFromTeam = async (req, res) => {
  try {
    var result = true;
    var rows = req.body.rows;
    for (var i = 0; i < rows.length; i++)
      result = await TeamAssignment.deleteMemberFromTeam(
        rows[i].team_id,
        rows[i].member_id
      );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const addMemberIntoTeam = async (req, res) => {
  try {
    
    var result = await TeamAssignment.addMemberIntoTeam(
      req.body.team_id,
      req.body.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const editMemberFromTeam = async (req, res) => {
  try {
    var result = await TeamAssignment.editMemberFromTeam(
      req.body.member_id_change,
      req.body.member_id,
      req.body.team_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadMemberByEmail = async (req, res) => {
  try {
    var result = await TeamAssignment.loadMemberByEmail(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------

module.exports = {
  loadMemberInProject,
  deleteMemberFromTeam,
  editMemberFromTeam,
  addMemberIntoTeam,
  loadMemberByEmail
};
