const TimesheetReport = require("../../functions/Employee/TimesheetReport");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadTimesheetByEmployee = async (req, res) => {
  try {
    var result = await TimesheetReport.loadTimesheetByEmployee(
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
const submitTimesheet = async (req, res) => {
  try {
    var result = await TimesheetReport.submitTimesheet(
      req.body.project_id,
      req.body.employee_id,
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const deleteTimesheet = async (req, res) => {
  try {
    var rows = req.body.rows;
    var result = true;
    for (var i = 0; i < rows.length; i++)
      result = await TimesheetReport.deleteTimesheet(rows[i].timesheet_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const updateTimesheet = async (req, res) => {
  try {
    var timesheet = req.body.timesheet;
    var result = await TimesheetReport.updateTimesheet(
      timesheet.timesheet_id,
      timesheet.work_date,
      timesheet.timesheet_description,
      timesheet.hours
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(false);
  }
};

module.exports = {
  loadTimesheetByEmployee,
  submitTimesheet,
  deleteTimesheet,
  updateTimesheet,
};
