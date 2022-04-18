const AllTimesheet = require("../../functions/Manager/AllTimesheet");
//--------------------------------------------------------------
//--------------------------------------------------------------
const loadTimesheetByManager = async (req, res) => {
  try {
    var result = await AllTimesheet.loadTimesheetByManager(req.body.manager_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
//--------------------------------------------------------------
//--------------------------------------------------------------
const approveTimesheet = async (req, res) => {
  try {
    var rows = req.body.rows;
    var result = true;
    for (var i = 0; i < rows.length; i++)
      result = await AllTimesheet.approveTimesheet(rows[i].timesheet_id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};
module.exports = { loadTimesheetByManager,approveTimesheet };
