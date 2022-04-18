const ProgressProject = require("../../functions/ProductOwner/ProgressProject");

const loadSummary = async (req, res) => {
  try {
    var hoursByMonth = await ProgressProject.sumHoursByMonth(
      req.body.project_id
    );
    var hoursByDay = await ProgressProject.sumHoursByDay(req.body.project_id);
    var countTS = await ProgressProject.countTimesheet(req.body.project_id);
    res.json({ hoursByDay, hoursByMonth, countTS });
  } catch (error) {
    console.log(error);
    res.json(null);
  }
};

module.exports = { loadSummary };
