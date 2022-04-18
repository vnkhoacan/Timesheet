const TimesheetStatistic = require("../../functions/Manager/TimesheetStatistic");

const loadSummary = async (req, res) => {
  try {
    var hoursByDay = await TimesheetStatistic.sumHoursByDay(
      req.body.project_id,
      req.body.manager_id
    );

    var hoursByMembers = await TimesheetStatistic.sumHoursByMembers(
      req.body.project_id,
      req.body.manager_id
    );

    var countTS = await TimesheetStatistic.countTimesheet(
      req.body.project_id,
      req.body.manager_id
    );

    var sumHours = await TimesheetStatistic.sumHours(
      req.body.project_id,
      req.body.manager_id
    );

    res.json({ hoursByMembers, countTS, hoursByDay, sumHours });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadSummary };
