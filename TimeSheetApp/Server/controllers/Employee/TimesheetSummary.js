const TimesheetSummary = require("../../functions/Employee/TimesheetSummary");

const loadSummary = async (req, res) => {
  try {
    var hoursByMonth = await TimesheetSummary.sumHoursByMonth(
      req.body.project_id,
      req.body.employee_id
    );

    var hoursByDay = await TimesheetSummary.sumHoursByDay(
      req.body.project_id,
      req.body.employee_id
    );

    var countTS = await TimesheetSummary.countTimesheet(
      req.body.project_id,
      req.body.employee_id
    );

    res.json({ hoursByMonth, hoursByDay, countTS });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadSummary };
