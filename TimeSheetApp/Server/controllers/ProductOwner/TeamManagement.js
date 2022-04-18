const TeamManangement = require("../../functions/ProductOwner/TeamManangement");

const addTeam = async (req, res) => {
  try {
    var team = req.body.team;
    var result = await TeamManangement.addTeam(
      team.team_name,
      team.team_description,
      team.project_id,
      team.manager_id,
      team.team_budget,
      team.team_amount
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const loadTeam = async (req, res) => {
  try {
    var result = await TeamManangement.loadTeam(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

const editTeam = async (req, res) => {
  try {
    var team = req.body.team;
    var result = await TeamManangement.editTeam(
      team.team_id,
      team.team_name,
      team.team_description,
      team.manager_id,
      team.project_id,
      team.team_budget,
      team.team_amount
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const deleteTeam = async (req, res) => {
  try {
    var result = true;
    var rows = req.body.rows;
    for (var i = 0; i < rows.length; i++)
      result = await TeamManangement.deleteTeam(rows[i].team_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

const loadFormData = async (req, res) => {
  try {
    var managerInfo = await TeamManangement.loadManager(req.body.member_id);
    var projectInfo = await TeamManangement.loadProjectBudget(
      req.body.member_id
    );
    res.json({ projectInfo, managerInfo });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { addTeam, loadTeam, editTeam, deleteTeam, loadFormData };
