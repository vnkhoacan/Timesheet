const DepartmentManagement = require("../../functions/ProductOwner/DepartmentManagement");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadDepartment = async (req, res) => {
  try {
    var result = await DepartmentManagement.loadDepartment(req.body.member_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const addDepartment = async (req, res) => {
  try {
    
    var department = req.body.department;
    var result = await DepartmentManagement.addDepartment(
      department.department_name,
      department.department_description,
      department.member_id
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const editDepartment = async (req, res) => {
  try {
    
    var department = req.body.department;
    var result = await DepartmentManagement.editDepartment(
      department.department_id,
      department.department_name,
      department.department_description
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const deleteDepartment = async (req, res) => {
  try {
    console.log(req.body);
    var result = true;
    var rows = req.body.rows;
    for (var i = 0; i < rows.length; i++)
      result = await DepartmentManagement.deleteDepartment(
        rows[i].department_id
      );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
module.exports = {
  loadDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
};
