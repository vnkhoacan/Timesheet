const ProjectManagement = require("../../functions/ProductOwner/ProjectManagement");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadAllProject = async (req, res) => {
  try {
    var result = await ProjectManagement.loadAllProject(
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
const addProject = async (req, res) => {
  try {
    var project = req.body.project;
    var result = await ProjectManagement.addProject(
      project.project_name,
      project.project_description,
      project.from_date,
      project.to_date,
      project.budget,
      project.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const deleteProject = async (req, res) => {
  try {
    var rows = req.body.rows;
    var result = true;
    for (var i = 0; i < rows.length; i++)
      result = await ProjectManagement.deleteProject(rows[i].project_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const updateProject = async (req, res) => {
  try {
    var project = req.body.project;
    var result = await ProjectManagement.updateProject(
      project.project_id,
      project.project_name,
      project.project_description,
      project.from_date,
      project.to_date,
      project.budget
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

module.exports = {
  loadAllProject,
  addProject,
  updateProject,
  deleteProject,
};
